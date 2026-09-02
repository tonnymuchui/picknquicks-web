import { after, NextResponse } from 'next/server';
import { z } from 'zod';

import { processEmailOutbox } from '@/lib/email/process-email-outbox';
import { createAdminClient, createClient } from '@/lib/supabase/server';

const schema = z
  .object({
    paymentId: z.string().uuid(),
    amount: z.number().positive(),
    channel: z.enum(['CASH', 'MPESA']),
    reference: z.string().trim().max(100).optional(),
  })
  .refine((input) => input.channel === 'CASH' || Boolean(input.reference), {
    message: 'An M-Pesa receipt or reference is required',
    path: ['reference'],
  });

export async function POST(request: Request) {
  const scoped = await createClient();
  const {
    data: { user },
  } = await scoped.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { data: roles } = await scoped.from('user_roles').select('role').eq('user_id', user.id);
  if (!roles?.some((row) => ['ADMIN', 'MANAGER'].includes(row.role))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const input = schema.safeParse(await request.json());
  const idempotencyKey = request.headers.get('idempotency-key');
  if (!input.success || !idempotencyKey) {
    return NextResponse.json(
      { error: 'Valid payment, amount, and Idempotency-Key are required' },
      { status: 422 }
    );
  }
  const { data, error } = await createAdminClient().rpc('record_delivery_collection_v2', {
    p_payment_id: input.data.paymentId,
    p_amount: input.data.amount,
    p_idempotency_key: idempotencyKey,
    p_actor: user.id,
    p_channel: input.data.channel,
    p_reference: input.data.reference ?? null,
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 409 });
  }
  after(async () => {
    try {
      await processEmailOutbox(10);
    } catch (emailError) {
      console.error('Post-collection email processing failed', emailError);
    }
  });
  return NextResponse.json({ recorded: data });
}
