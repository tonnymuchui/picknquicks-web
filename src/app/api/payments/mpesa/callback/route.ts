import { after, NextResponse } from 'next/server';

import { processEmailOutbox } from '@/lib/email/process-email-outbox';
import { callbackFingerprint, parseDarajaCallback } from '@/lib/payments/callback';
import { createAdminClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const token = new URL(request.url).searchParams.get('token');
  if (!process.env.DARAJA_CALLBACK_TOKEN || token !== process.env.DARAJA_CALLBACK_TOKEN) {
    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' });
  }
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' });
  }
  let callback: ReturnType<typeof parseDarajaCallback>;
  try {
    callback = parseDarajaCallback(raw);
  } catch {
    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' });
  }
  const admin = createAdminClient();
  const { data: attempt } = await admin
    .from('payment_attempts')
    .select('id,payment_id')
    .eq('checkout_request_id', callback.CheckoutRequestID)
    .maybeSingle();
  if (!attempt) {
    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' });
  }
  const eventId = `${callback.CheckoutRequestID}:${callback.ResultCode}:${callback.receipt || 'none'}`;
  const { error: eventError } = await admin
    .from('payment_events')
    .insert({
      payment_id: attempt.payment_id,
      attempt_id: attempt.id,
      provider: 'MPESA',
      provider_event_id: eventId,
      event_type: callback.ResultCode === 0 ? 'STK_SUCCEEDED' : 'STK_FAILED',
      payload: raw,
      payload_hash: callbackFingerprint(raw),
    });
  if (eventError?.code === '23505') {
    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' });
  }
  if (callback.ResultCode === 0 && callback.receipt && callback.amount > 0) {
    const { error } = await admin.rpc('settle_mpesa_payment', {
      p_attempt_id: attempt.id,
      p_receipt: callback.receipt,
      p_amount: callback.amount,
      p_event_id: eventId,
    });
    if (error) {
      await admin
        .from('payment_events')
        .update({ processing_error: error.message })
        .eq('provider_event_id', eventId);
    } else {
      after(async () => {
        try {
          await processEmailOutbox(10);
        } catch (emailError) {
          console.error('Post-payment email processing failed', emailError);
        }
      });
    }
  } else {
    await admin
      .from('payment_attempts')
      .update({
        status: callback.ResultCode === 1032 ? 'CANCELLED' : 'FAILED',
        provider_result_code: String(callback.ResultCode),
        provider_result_description: callback.ResultDesc,
        response_payload: raw,
        completed_at: new Date().toISOString(),
      })
      .eq('id', attempt.id);
    await admin
      .from('payments')
      .update({
        status: callback.ResultCode === 1032 ? 'CANCELLED' : 'FAILED',
        updated_at: new Date().toISOString(),
      })
      .eq('id', attempt.payment_id)
      .neq('status', 'SUCCEEDED');
    await admin
      .from('payment_events')
      .update({ processed_at: new Date().toISOString() })
      .eq('provider_event_id', eventId);
  }
  return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' });
}
