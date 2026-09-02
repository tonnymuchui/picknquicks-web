import { NextResponse } from 'next/server';

import { createAdminClient, createClient } from '@/lib/supabase/server';

export async function GET(_: Request, { params }: { params: Promise<{ paymentId: string }> }) {
  const { paymentId } = await params;
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  if (!claims?.claims?.sub) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }
  const admin = createAdminClient();
  const { data } = await admin
    .from('payments')
    .select('id,status,amount,purpose,succeeded_at,provider_reference,order:orders!inner(user_id)')
    .eq('id', paymentId)
    .single();
  if (!data) {
    return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
  }
  const order = Array.isArray(data.order) ? data.order[0] : data.order;
  if (order.user_id !== claims.claims.sub) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return NextResponse.json({
    id: data.id,
    status: data.status,
    amount: data.amount,
    purpose: data.purpose,
    succeededAt: data.succeeded_at,
    reference: data.provider_reference,
  });
}
