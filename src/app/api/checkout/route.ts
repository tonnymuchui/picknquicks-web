import { createHash } from 'node:crypto';

import { NextResponse } from 'next/server';
import { z } from 'zod';

import { createAdminClient, createClient } from '@/lib/supabase/server';

const checkoutSchema = z.object({
  email: z.string().email(),
  phoneNumber: z.string().min(9),
  customerName: z.string().min(2).max(100),
  paymentMethod: z.enum(['MPESA_FULL', 'CASH_ON_DELIVERY']),
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
    .array(
      z.object({ productId: z.string().uuid(), quantity: z.number().int().positive().max(20) })
    )
    .min(1)
    .max(50),
  notes: z.string().max(1000).optional(),
});

export async function POST(request: Request) {
  const key = request.headers.get('idempotency-key');
  if (!key || key.length > 128) {
    return NextResponse.json(
      { error: 'A valid Idempotency-Key header is required' },
      { status: 400 }
    );
  }
  const input = checkoutSchema.safeParse(await request.json());
  if (!input.success) {
    return NextResponse.json(
      { error: 'Invalid checkout', issues: input.error.flatten() },
      { status: 422 }
    );
  }
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  const userId = claims?.claims?.sub ?? null;
  const admin = createAdminClient();
  const scopedKey = createHash('sha256')
    .update(`${userId ?? input.data.email}:${key}`)
    .digest('hex');
  const { data, error } = await admin.rpc('create_checkout', {
    p_idempotency_key: scopedKey,
    p_user_id: userId,
    p_email: input.data.email,
    p_phone: input.data.phoneNumber,
    p_customer_name: input.data.customerName,
    p_payment_method: input.data.paymentMethod,
    p_shipping_address: input.data.shippingAddress,
    p_items: input.data.items,
    p_notes: input.data.notes ?? null,
  });
  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error.code === '23505' ? 409 : 400 }
    );
  }
  return NextResponse.json(data, { status: 201 });
}
