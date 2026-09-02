'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2, MailCheck, RefreshCw, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { apiClient } from '@/lib/api/client';
import { getApiErrorMessage } from '@/lib/api/errors';
import { createClient } from '@/lib/supabase/client';
import { UserRole } from '@/types/auth';

type EmailJob = {
  id: string;
  template: string;
  recipient: string;
  subject: string;
  status: 'PENDING' | 'SENDING' | 'SENT' | 'FAILED' | 'DEAD';
  attempts: number;
  last_error: string | null;
  sent_at: string | null;
  created_at: string;
  order: { order_number: string } | null;
};

const emailKey = ['admin-email-delivery'] as const;

export default function AdminEmailsPage() {
  return (
    <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
      <AdminEmailsContent />
    </ProtectedRoute>
  );
}

function AdminEmailsContent() {
  const queryClient = useQueryClient();
  const emails = useQuery({
    queryKey: emailKey,
    queryFn: async (): Promise<EmailJob[]> => {
      const { data, error } = await createClient()
        .from('email_outbox')
        .select(
          'id,template,recipient,subject,status,attempts,last_error,sent_at,created_at,order:orders(order_number)'
        )
        .order('created_at', { ascending: false })
        .limit(100);
      if (error) {
        throw new Error(error.message);
      }
      return (data ?? []) as unknown as EmailJob[];
    },
    refetchInterval: 30_000,
  });
  const retry = useMutation({
    mutationFn: async (id: string) => apiClient.post(`/admin/emails/${id}/retry`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: emailKey });
      toast.success('Email queued for another delivery attempt');
    },
    onError: (error: unknown) => toast.error(getApiErrorMessage(error, 'Unable to retry email')),
  });
  const rows = emails.data ?? [];
  const sent = rows.filter((job) => job.status === 'SENT').length;
  const waiting = rows.filter((job) => ['PENDING', 'SENDING'].includes(job.status)).length;
  const failed = rows.filter((job) => ['FAILED', 'DEAD'].includes(job.status)).length;

  return (
    <div className="p-4 sm:p-7 xl:p-9">
      <header className="flex flex-col justify-between gap-5 border-b border-black/10 pb-7 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#9a5d3b]">Messaging</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">
            Email delivery
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-black/50">
            Confirm whether invoices, order confirmations, and payment receipts reached the email
            provider.
          </p>
        </div>
        <button
          className="inline-flex h-11 items-center gap-2 border border-black/15 bg-white px-4 text-sm font-semibold"
          disabled={emails.isFetching}
          onClick={() => emails.refetch()}
        >
          <RefreshCw className={emails.isFetching ? 'animate-spin' : ''} size={15} /> Refresh
        </button>
      </header>

      <section className="mt-6 grid gap-3 sm:grid-cols-3">
        <Summary label="Sent (latest 100)" value={sent} />
        <Summary label="Waiting" value={waiting} />
        <Summary label="Needs attention" value={failed} />
      </section>

      {emails.isLoading ? (
        <div className="flex min-h-72 items-center justify-center gap-3 text-sm text-black/50">
          <Loader2 className="animate-spin" size={19} /> Loading email delivery…
        </div>
      ) : emails.error ? (
        <div className="mt-6 border border-red-200 bg-red-50 p-5 text-sm text-red-800">
          {emails.error.message}
        </div>
      ) : rows.length ? (
        <div className="mt-6 overflow-x-auto border border-black/10 bg-white">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-[#f1f1f1] text-[10px] font-bold uppercase tracking-[.13em] text-black/50">
              <tr>
                <th className="p-4">Message</th>
                <th>Order</th>
                <th>Recipient</th>
                <th>Status</th>
                <th>Attempts</th>
                <th>Created</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[.07]">
              {rows.map((job) => (
                <tr key={job.id}>
                  <td className="max-w-xs p-4">
                    <p className="font-semibold">{job.subject}</p>
                    <p className="mt-1 text-[10px] text-black/40">
                      {job.template.replaceAll('_', ' ')}
                    </p>
                    {job.last_error ? (
                      <p className="mt-1 text-xs text-red-700">{job.last_error}</p>
                    ) : null}
                  </td>
                  <td className="font-mono text-xs">{job.order?.order_number ?? '—'}</td>
                  <td>{job.recipient}</td>
                  <td>
                    <Status value={job.status} />
                  </td>
                  <td>{job.attempts}</td>
                  <td className="text-xs text-black/50">
                    {new Date(job.created_at).toLocaleString('en-KE')}
                  </td>
                  <td className="p-4 text-right">
                    {['FAILED', 'DEAD'].includes(job.status) ? (
                      <button
                        className="inline-flex min-h-9 items-center gap-2 border border-black/15 px-3 text-xs font-semibold disabled:opacity-40"
                        disabled={retry.isPending}
                        onClick={() => retry.mutate(job.id)}
                      >
                        <RotateCcw size={14} /> Retry
                      </button>
                    ) : job.sent_at ? (
                      <span className="text-xs text-black/40">
                        {new Date(job.sent_at).toLocaleString('en-KE')}
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-6 border border-dashed border-black/20 bg-white p-12 text-center">
          <MailCheck className="mx-auto text-black/30" size={28} />
          <p className="mt-3 text-sm text-black/50">
            No transactional emails have been queued yet.
          </p>
        </div>
      )}
    </div>
  );
}

function Summary({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-black/[.08] bg-white p-5">
      <p className="text-xs text-black/45">{label}</p>
      <p className="mt-2 text-xl font-semibold">{value}</p>
    </div>
  );
}
function Status({ value }: { value: EmailJob['status'] }) {
  const tone =
    value === 'SENT'
      ? 'bg-emerald-50 text-emerald-700'
      : ['FAILED', 'DEAD'].includes(value)
        ? 'bg-red-50 text-red-700'
        : 'bg-[#f2eee7] text-[#754329]';
  return (
    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${tone}`}>{value}</span>
  );
}
