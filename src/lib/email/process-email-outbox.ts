import 'server-only';

import { Resend } from 'resend';

import { orderDocumentSnapshot, renderOrderEmail } from '@/lib/email/order-email';
import { createAdminClient } from '@/lib/supabase/server';

interface EmailProcessingResult {
  id: string;
  status: 'SENT' | 'FAILED' | 'DEAD';
}

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  if (!from || !from.includes('@')) {
    throw new Error('RESEND_FROM_EMAIL is not configured correctly');
  }

  return { apiKey, from };
}

export async function processEmailOutbox(limit = 10): Promise<EmailProcessingResult[]> {
  const { apiKey, from } = getEmailConfig();
  const admin = createAdminClient();
  const { data: jobs, error: claimError } = await admin.rpc('claim_email_outbox', {
    p_limit: limit,
  });

  if (claimError) {
    throw new Error(`Could not claim email jobs: ${claimError.message}`);
  }

  const resend = new Resend(apiKey);
  const results: EmailProcessingResult[] = [];

  for (const job of jobs ?? []) {
    try {
      const { data: order, error: orderError } = await admin
        .from('orders')
        .select('*,order_items(*)')
        .eq('id', job.order_id)
        .single();

      if (orderError || !order) {
        throw new Error(orderError?.message ?? 'Order missing');
      }

      const type = job.template === 'PAYMENT_RECEIPT' ? 'RECEIPT' : 'INVOICE';
      let version = 1;
      if (type === 'RECEIPT' && job.payload?.paymentId) {
        const { data: payment } = await admin
          .from('payments')
          .select('purpose')
          .eq('id', job.payload.paymentId)
          .single();
        version = payment?.purpose === 'ORDER_BALANCE' ? 2 : 1;
      }

      const documentNumber = `${type === 'RECEIPT' ? 'RCT' : 'INV'}-${order.order_number}${version > 1 ? `-${version}` : ''}`;
      const html = renderOrderEmail(order, type);
      const { data: document, error: documentError } = await admin
        .from('documents')
        .upsert(
          {
            order_id: order.id,
            document_type: type,
            document_number: documentNumber,
            snapshot: orderDocumentSnapshot(order, type),
            version,
          },
          { onConflict: 'order_id,document_type,version' }
        )
        .select('id')
        .single();

      if (documentError || !document) {
        throw new Error(documentError?.message ?? 'Could not create invoice document');
      }

      const sent = await resend.emails.send(
        {
          from,
          to: [job.recipient],
          subject: job.subject,
          html,
          attachments: [
            {
              filename: `${documentNumber}.html`,
              content: Buffer.from(html, 'utf8'),
              contentType: 'text/html; charset=utf-8',
            },
          ],
          headers: { 'X-Entity-Ref-ID': order.id },
        },
        { idempotencyKey: job.idempotency_key }
      );

      if (sent.error || !sent.data?.id) {
        throw new Error(sent.error?.message ?? 'Resend did not return a message ID');
      }

      const { error: updateError } = await admin
        .from('email_outbox')
        .update({
          status: 'SENT',
          document_id: document.id,
          provider_message_id: sent.data.id,
          sent_at: new Date().toISOString(),
          last_error: null,
        })
        .eq('id', job.id);

      if (updateError) {
        throw new Error(`Email sent but outbox update failed: ${updateError.message}`);
      }
      results.push({ id: job.id, status: 'SENT' });
    } catch (error) {
      const status = Number(job.attempts) >= 6 ? 'DEAD' : 'FAILED';
      await admin
        .from('email_outbox')
        .update({
          status,
          last_error: error instanceof Error ? error.message : 'Unknown email error',
          next_attempt_at: new Date(
            Date.now() + Math.min(2 ** Number(job.attempts) * 60_000, 3_600_000)
          ).toISOString(),
        })
        .eq('id', job.id);
      results.push({ id: job.id, status });
    }
  }

  return results;
}
