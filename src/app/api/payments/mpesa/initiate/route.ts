import { createHash } from 'node:crypto';

import { NextResponse } from 'next/server';
import { z } from 'zod';

import { initiateStkPush, normalizeKenyanPhone } from '@/lib/payments/daraja';
import { createAdminClient, createClient } from '@/lib/supabase/server';

const schema = z.object({ paymentId: z.string().uuid(), phoneNumber: z.string().min(9) });
const hash = (value: string) => createHash('sha256').update(value).digest('hex');

export async function POST(request: Request) {
  const input = schema.safeParse(await request.json());
  if (!input.success) {
    return NextResponse.json({ error: 'Invalid payment request' }, { status: 422 });
  }
  const admin = createAdminClient();
  const { data: payment } = await admin
    .from('payments')
    .select('id,amount,status,order:orders!inner(id,order_number,user_id,guest_access_token_hash)')
    .eq('id', input.data.paymentId)
    .single();
  if (!payment) {
    return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
  }
  const order = Array.isArray(payment.order) ? payment.order[0] : payment.order;
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  const userId = claims?.claims?.sub;
  const { data: staffRoles } = userId
    ? await admin.from('user_roles').select('role').eq('user_id', userId)
    : { data: null };
  const isStaff = staffRoles?.some((row) => ['ADMIN', 'MANAGER'].includes(row.role));
  const guestToken = request.headers.get('x-guest-order-token');
  if (
    !isStaff &&
    (order.user_id
      ? userId !== order.user_id
      : !guestToken || hash(guestToken) !== order.guest_access_token_hash)
  ) {
    return NextResponse.json({ error: 'Not authorized for this order' }, { status: 403 });
  }
  if (payment.status === 'SUCCEEDED') {
    return NextResponse.json({ paymentId: payment.id, status: payment.status });
  }
  let phone: string;
  try {
    phone = normalizeKenyanPhone(input.data.phoneNumber);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Invalid phone' },
      { status: 422 }
    );
  }
  const { data: attempt, error: attemptError } = await admin.rpc('create_payment_attempt', {
    p_payment_id: payment.id,
    p_phone: phone,
  });
  if (attemptError || !attempt) {
    return NextResponse.json(
      { error: attemptError?.message ?? 'Could not create payment attempt' },
      { status: 409 }
    );
  }
  if (attempt.checkout_request_id) {
    return NextResponse.json({
      paymentId: payment.id,
      attemptId: attempt.id,
      status: attempt.status,
    });
  }
  try {
    const daraja = await initiateStkPush({
      amount: Number(payment.amount),
      phone,
      accountReference: order.order_number,
    });
    await admin
      .from('payment_attempts')
      .update({
        merchant_request_id: daraja.response.MerchantRequestID,
        checkout_request_id: daraja.response.CheckoutRequestID,
        request_payload: daraja.request,
        response_payload: daraja.response,
      })
      .eq('id', attempt.id);
    return NextResponse.json({
      paymentId: payment.id,
      attemptId: attempt.id,
      status: 'PROCESSING',
      customerMessage: daraja.response.CustomerMessage,
    });
  } catch (error) {
    await admin
      .from('payment_attempts')
      .update({
        provider_result_description:
          error instanceof Error ? error.message : 'Provider request failed',
        next_retry_at: new Date(Date.now() + 120_000).toISOString(),
      })
      .eq('id', attempt.id);
    return NextResponse.json(
      {
        error: 'M-Pesa did not confirm the prompt. We will verify before allowing a retry.',
        attemptId: attempt.id,
      },
      { status: 502 }
    );
  }
}
