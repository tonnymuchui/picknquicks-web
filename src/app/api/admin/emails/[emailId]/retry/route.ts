import { after, NextResponse } from 'next/server';
import { z } from 'zod';

import { processEmailOutbox } from '@/lib/email/process-email-outbox';
import { createAdminClient, createClient } from '@/lib/supabase/server';

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ emailId: string }> }
) {
  const parsedId = z
    .string()
    .uuid()
    .safeParse((await params).emailId);
  const scoped = await createClient();
  const {
    data: { user },
  } = await scoped.auth.getUser();
  if (!user || !parsedId.success) {
    return NextResponse.json(
      { error: user ? 'Invalid email job' : 'Unauthorized' },
      { status: user ? 422 : 401 }
    );
  }

  const admin = createAdminClient();
  const { data: roles } = await admin.from('user_roles').select('role').eq('user_id', user.id);
  if (!roles?.some((row) => ['ADMIN', 'MANAGER'].includes(row.role))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const { data: job } = await admin
    .from('email_outbox')
    .select('id,order_id,template,status')
    .eq('id', parsedId.data)
    .single();
  if (!job || !['FAILED', 'DEAD'].includes(job.status)) {
    return NextResponse.json(
      { error: 'Only failed or dead email jobs can be retried' },
      { status: 409 }
    );
  }

  if (job.template === 'ORDER_CONFIRMATION') {
    const { data: pendingAdvance } = await admin
      .from('payments')
      .select('id')
      .eq('order_id', job.order_id)
      .in('purpose', ['ORDER_TOTAL', 'DELIVERY_FEE'])
      .neq('status', 'SUCCEEDED')
      .limit(1);
    if (pendingAdvance?.length) {
      return NextResponse.json(
        { error: 'The order confirmation will be released after its advance payment succeeds' },
        { status: 409 }
      );
    }
  }

  const { error } = await admin
    .from('email_outbox')
    .update({
      attempts: 0,
      last_error: null,
      next_attempt_at: new Date().toISOString(),
      status: 'PENDING',
    })
    .eq('id', job.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 409 });
  }
  await admin.from('audit_log').insert({
    actor_id: user.id,
    action: 'RETRY_EMAIL',
    entity_type: 'email_outbox',
    entity_id: job.id,
  });

  after(async () => {
    try {
      await processEmailOutbox(10);
    } catch (emailError) {
      console.error('Manual email retry failed', emailError);
    }
  });
  return NextResponse.json({ queued: true });
}
