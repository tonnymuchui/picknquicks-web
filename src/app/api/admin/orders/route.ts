import { after, NextResponse } from 'next/server';
import { z } from 'zod';

import { processEmailOutbox } from '@/lib/email/process-email-outbox';
import { mapOrder } from '@/lib/supabase/mappers';
import { createAdminClient, createClient } from '@/lib/supabase/server';

const schema = z.object({
  email: z.string().email(),
  phoneNumber: z.string().min(9),
  customerName: z.string().min(2).max(100),
  paymentMethod: z.enum(['MPESA_FULL', 'CASH_ON_DELIVERY']),
  source: z.enum(['PHONE', 'IN_STORE']),
  shippingAddress: z.object({
    recipientName: z.string().min(2),
    phoneNumber: z.string().min(9),
    addressLine1: z.string().min(3),
    addressLine2: z.string().optional(),
    city: z.string().min(2),
    county: z.string().optional(),
    postalCode: z.string().optional(),
    notes: z.string().max(500).optional(),
  }),
  items: z
    .array(z.object({ productId: z.string().uuid(), quantity: z.number().int().min(1).max(20) }))
    .min(1)
    .max(50),
  notes: z.string().max(1000).optional(),
});

export async function POST(request: Request) {
  const scoped = await createClient();
  const {
    data: { user },
  } = await scoped.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data: roles } = await admin.from('user_roles').select('role').eq('user_id', user.id);
  if (!roles?.some((row) => ['ADMIN', 'MANAGER'].includes(row.role))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const input = schema.safeParse(await request.json());
  const idempotencyKey = request.headers.get('idempotency-key');
  if (!input.success || !idempotencyKey || idempotencyKey.length > 128) {
    return NextResponse.json(
      { error: 'Valid order details and an Idempotency-Key are required' },
      { status: 422 }
    );
  }

  const { data: created, error } = await admin.rpc('create_staff_order', {
    p_idempotency_key: `staff:${user.id}:${idempotencyKey}`,
    p_actor: user.id,
    p_email: input.data.email,
    p_phone: input.data.phoneNumber,
    p_customer_name: input.data.customerName,
    p_payment_method: input.data.paymentMethod,
    p_shipping_address: input.data.shippingAddress,
    p_items: input.data.items,
    p_notes: input.data.notes ?? null,
    p_source: input.data.source,
  });
  if (error || !created?.orderId) {
    return NextResponse.json({ error: error?.message ?? 'Order was not created' }, { status: 409 });
  }

  const { data: order, error: orderError } = await admin
    .from('orders')
    .select('*,order_items(*),payments(*,payment_attempts(*))')
    .eq('id', created.orderId)
    .single();
  if (orderError || !order) {
    return NextResponse.json(
      { error: orderError?.message ?? 'Order was not returned' },
      { status: 500 }
    );
  }

  after(async () => {
    try {
      await processEmailOutbox(10);
    } catch (emailError) {
      console.error('Back-office order email processing failed', emailError);
    }
  });
  return NextResponse.json({ data: mapOrder(order), success: true }, { status: 201 });
}
