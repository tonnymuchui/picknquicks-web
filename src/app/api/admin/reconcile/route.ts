import { NextResponse } from 'next/server';

import { queryStkStatus } from '@/lib/payments/daraja';
import { createAdminClient, createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const cronAuthorized = Boolean(
    process.env.CRON_SECRET &&
    request.headers.get('authorization') === `Bearer ${process.env.CRON_SECRET}`
  );
  if (!cronAuthorized) {
    const scoped = await createClient();
    const {
      data: { user },
    } = await scoped.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { data: roles } = await scoped.from('user_roles').select('role').eq('user_id', user.id);
    if (!roles?.some((row) => row.role === 'ADMIN')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  const admin = createAdminClient();
  const { data: run, error: runError } = await admin
    .from('reconciliation_runs')
    .insert({})
    .select('id')
    .single();
  if (runError || !run) {
    return NextResponse.json(
      { error: runError?.message ?? 'Could not start reconciliation' },
      { status: 500 }
    );
  }
  const cutoff = new Date(Date.now() - 2 * 60_000).toISOString();
  const { data: attempts } = await admin
    .from('payment_attempts')
    .select('id,payment_id,checkout_request_id,payments(amount,status)')
    .eq('status', 'PROCESSING')
    .not('checkout_request_id', 'is', null)
    .lt('created_at', cutoff)
    .limit(25);
  let matched = 0;
  let exceptions = 0;

  for (const attempt of attempts ?? []) {
    const payment = Array.isArray(attempt.payments) ? attempt.payments[0] : attempt.payments;
    let result = 'MISSING';
    let providerStatus = 'QUERY_FAILED';
    const details: Record<string, unknown> = {};
    try {
      const provider = await queryStkStatus(attempt.checkout_request_id!);
      providerStatus = provider.ResultCode;
      details.description = provider.ResultDesc;
      if (provider.ResultCode === '0') {
        result = payment?.status === 'SUCCEEDED' ? 'MATCHED' : 'STATUS_MISMATCH';
      } else {
        result = payment?.status === 'SUCCEEDED' ? 'STATUS_MISMATCH' : 'MATCHED';
        if (payment?.status !== 'SUCCEEDED') {
          await admin
            .from('payment_attempts')
            .update({
              status: 'FAILED',
              provider_result_code: provider.ResultCode,
              provider_result_description: provider.ResultDesc,
              completed_at: new Date().toISOString(),
            })
            .eq('id', attempt.id);
          await admin
            .from('payments')
            .update({ status: 'FAILED' })
            .eq('id', attempt.payment_id)
            .eq('status', 'PROCESSING');
        }
      }
    } catch (error) {
      details.error = error instanceof Error ? error.message : 'Query failed';
    }
    if (result === 'MATCHED') {
      matched += 1;
    } else {
      exceptions += 1;
    }
    await admin.from('reconciliation_items').insert({
      run_id: run.id,
      payment_id: attempt.payment_id,
      expected_amount: payment?.amount ?? 0,
      provider_status: providerStatus,
      result,
      details,
    });
  }
  await admin
    .from('reconciliation_runs')
    .update({
      status: 'COMPLETED',
      completed_at: new Date().toISOString(),
      checked_count: attempts?.length ?? 0,
      matched_count: matched,
      exception_count: exceptions,
    })
    .eq('id', run.id);
  return NextResponse.json({ runId: run.id, checked: attempts?.length ?? 0, matched, exceptions });
}
