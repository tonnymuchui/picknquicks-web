import { after, NextResponse } from 'next/server';
import { z } from 'zod';

import { processEmailOutbox } from '@/lib/email/process-email-outbox';
import { createAdminClient, createClient } from '@/lib/supabase/server';

const paramsSchema = z.object({ orderId: z.string().uuid() });

export async function POST(request: Request, { params }: { params: Promise<{ orderId: string }> }) {
  const parsed = paramsSchema.safeParse(await params);
  const scoped = await createClient();
  const {
    data: { user },
  } = await scoped.auth.getUser();
  if (!user || !parsed.success) {
    return NextResponse.json(
      { error: user ? 'Invalid order' : 'Unauthorized' },
      { status: user ? 422 : 401 }
    );
  }

  const admin = createAdminClient();
  const { data: roles } = await admin.from('user_roles').select('role').eq('user_id', user.id);
  if (!roles?.some((row) => ['ADMIN', 'MANAGER'].includes(row.role))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const { data: order } = await admin
    .from('orders')
    .select('id,order_number,email')
    .eq('id', parsed.data.orderId)
    .single();
  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  const requestKey = request.headers.get('idempotency-key') ?? crypto.randomUUID();
  const { error } = await admin.from('email_outbox').insert({
    order_id: order.id,
    template: 'ORDER_INVOICE',
    recipient: order.email,
    subject: `Invoice for ${order.order_number}`,
    payload: { orderId: order.id, requestedBy: user.id },
    idempotency_key: `manual-invoice:${order.id}:${requestKey}`,
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 409 });
  }

  after(async () => {
    try {
      await processEmailOutbox(10);
    } catch (emailError) {
      console.error('Manual invoice email processing failed', emailError);
    }
  });
  return NextResponse.json({ queued: true, recipient: order.email });
}
