'use client';
/* eslint-disable @typescript-eslint/no-explicit-any -- Supabase generated database types are added after project linking. */
import { useQuery } from '@tanstack/react-query';
import {
  AlertTriangle,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { createClient } from '@/lib/supabase/client';
import { downloadCsv } from '@/lib/utils/csv';
import { formatPriceKsh } from '@/lib/utils/currency';

type View = 'payments' | 'inventory' | 'finance' | 'customers';
const config = {
  payments: {
    eyebrow: 'Money operations',
    title: 'Payments',
    description: 'Review payment attempts, references and exceptions alongside each order.',
  },
  inventory: {
    eyebrow: 'Stock control',
    title: 'Inventory',
    description: 'Review available, reserved and low stock across the catalog.',
  },
  finance: {
    eyebrow: 'Accounting control',
    title: 'Finance & ledger',
    description: 'Review posted journals and payment reconciliation.',
  },
  customers: {
    eyebrow: 'Relationships',
    title: 'Customers',
    description: 'Review customer accounts and purchase activity.',
  },
} as const;

export function OperationsView({ view }: { view: View }) {
  const [page, setPage] = useState(0);
  const pageSize = 25;
  const query = useQuery({
    queryKey: ['admin-operations', view, page],
    queryFn: async () => {
      const s = createClient();
      const from = page * pageSize;
      const to = from + pageSize - 1;
      if (view === 'payments') {
        const { data, error, count } = await s
          .from('payments')
          .select(
            'id,purpose,status,amount,created_at,provider_reference,order:orders(order_number,customer_name)',
            { count: 'exact' }
          )
          .order('created_at', { ascending: false })
          .range(from, to);
        if (error) {
          throw error;
        }
        return { rows: data ?? [], total: count ?? 0 };
      }
      if (view === 'inventory') {
        const { data, error, count } = await s
          .from('products')
          .select(
            'id,name,sku,stock_quantity,reserved_quantity,low_stock_threshold,cost_price,price,sale_price',
            { count: 'exact' }
          )
          .order('stock_quantity')
          .range(from, to);
        if (error) {
          throw error;
        }
        return { rows: data ?? [], total: count ?? 0 };
      }
      if (view === 'finance') {
        const { data, error, count } = await s
          .from('ledger_journals')
          .select(
            'id,description,reference_type,posted_at,ledger_entries(amount,direction,ledger_accounts(code,name))',
            { count: 'exact' }
          )
          .order('posted_at', { ascending: false })
          .range(from, to);
        if (error) {
          throw error;
        }
        return { rows: data ?? [], total: count ?? 0 };
      }
      const { data, error, count } = await s
        .from('profiles')
        .select('id,email,first_name,last_name,phone,enabled,created_at', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);
      if (error) {
        throw error;
      }
      return { rows: data ?? [], total: count ?? 0 };
    },
    staleTime: 30_000,
  });
  const meta = config[view];
  const exportRows = () => {
    const rows = query.data?.rows ?? [];
    const stamp = new Date().toISOString().slice(0, 10);
    if (view === 'payments') {
      downloadCsv(
        `payments-${stamp}-page-${page + 1}.csv`,
        ['Order', 'Customer', 'Purpose', 'Status', 'Provider reference', 'Amount KES', 'Created'],
        rows.map((raw: any) => [
          raw.order?.order_number,
          raw.order?.customer_name,
          raw.purpose,
          raw.status,
          raw.provider_reference,
          Number(raw.amount),
          new Date(raw.created_at).toISOString(),
        ])
      );
      return;
    }
    if (view === 'finance') {
      downloadCsv(
        `finance-ledger-${stamp}-page-${page + 1}.csv`,
        ['Journal', 'Reference type', 'Posted', 'Debit KES', 'Credit KES', 'Accounts'],
        rows.map((raw: any) => {
          const entries = raw.ledger_entries ?? [];
          return [
            raw.description,
            raw.reference_type,
            new Date(raw.posted_at).toISOString(),
            entries
              .filter((entry: any) => entry.direction === 'DEBIT')
              .reduce((sum: number, entry: any) => sum + Number(entry.amount), 0),
            entries
              .filter((entry: any) => entry.direction === 'CREDIT')
              .reduce((sum: number, entry: any) => sum + Number(entry.amount), 0),
            entries
              .map((entry: any) =>
                `${entry.ledger_accounts?.code ?? ''} ${entry.ledger_accounts?.name ?? ''}`.trim()
              )
              .join(' | '),
          ];
        })
      );
    }
  };
  return (
    <div className="p-4 sm:p-7 xl:p-9">
      <header className="flex flex-col justify-between gap-5 border-b border-black/10 pb-7 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#9a5d3b]">
            {meta.eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">
            {meta.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-black/50">{meta.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {view === 'payments' || view === 'finance' ? (
            <button
              className="flex h-11 items-center gap-2 border border-black/15 bg-white px-4 text-sm font-semibold disabled:opacity-40"
              disabled={!query.data?.rows.length}
              onClick={exportRows}
            >
              <Download size={15} /> Export CSV
            </button>
          ) : null}
          <button
            className="flex h-11 items-center gap-2 border border-black/15 bg-white px-4 text-sm font-semibold"
            onClick={() => query.refetch()}
          >
            <RefreshCw size={15} />
            Refresh
          </button>
        </div>
      </header>
      {query.isLoading ? (
        <div className="flex min-h-72 items-center justify-center gap-3 text-sm text-black/50">
          <Loader2 className="animate-spin" size={19} />
          Loading operational data…
        </div>
      ) : query.error ? (
        <div className="mt-6 border border-red-200 bg-red-50 p-5 text-sm text-red-800">
          <AlertTriangle className="mr-2 inline" size={17} />
          {query.error.message}
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto border border-black/10 bg-white">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-[#f1f1f1] text-[10px] font-bold uppercase tracking-[.13em] text-black/50">
              {view === 'payments' ? (
                <tr>
                  <th className="p-4">Order</th>
                  <th>Purpose</th>
                  <th>Status</th>
                  <th>Reference</th>
                  <th className="p-4 text-right">Amount</th>
                </tr>
              ) : view === 'inventory' ? (
                <tr>
                  <th className="p-4">Product</th>
                  <th>SKU</th>
                  <th>Available</th>
                  <th>Reserved</th>
                  <th className="text-right">Landed cost</th>
                  <th className="text-right">Selling price</th>
                  <th className="text-right">Profit / unit</th>
                  <th className="p-4 text-right">Potential profit</th>
                </tr>
              ) : view === 'finance' ? (
                <tr>
                  <th className="p-4">Journal</th>
                  <th>Reference</th>
                  <th>Posted</th>
                  <th className="p-4 text-right">Value</th>
                </tr>
              ) : (
                <tr>
                  <th className="p-4">Customer</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th className="p-4">Joined</th>
                </tr>
              )}
            </thead>
            <tbody>
              {query.data?.rows.map((raw: any) =>
                view === 'payments' ? (
                  <tr key={raw.id} className="border-black/8 border-t">
                    <td className="p-4 font-semibold">
                      {raw.order?.order_number}
                      <span className="block text-xs font-normal text-black/45">
                        {raw.order?.customer_name}
                      </span>
                    </td>
                    <td>{raw.purpose.replaceAll('_', ' ')}</td>
                    <td>
                      <Status value={raw.status} />
                    </td>
                    <td className="font-mono text-xs">{raw.provider_reference ?? '—'}</td>
                    <td className="p-4 text-right font-semibold">{formatPriceKsh(raw.amount)}</td>
                  </tr>
                ) : view === 'inventory' ? (
                  <tr key={raw.id} className="border-black/8 border-t">
                    <td className="p-4 font-semibold">{raw.name}</td>
                    <td className="font-mono text-xs">{raw.sku}</td>
                    <td>
                      <Status
                        value={
                          raw.stock_quantity - raw.reserved_quantity <= raw.low_stock_threshold
                            ? 'LOW'
                            : 'HEALTHY'
                        }
                      />
                      <span className="ml-2">{raw.stock_quantity - raw.reserved_quantity}</span>
                    </td>
                    <td>{raw.reserved_quantity}</td>
                    <td className="text-right">{formatPriceKsh(raw.cost_price)}</td>
                    <td className="text-right">{formatPriceKsh(raw.sale_price ?? raw.price)}</td>
                    <td className="text-right font-semibold">
                      {formatPriceKsh(Number(raw.sale_price ?? raw.price) - Number(raw.cost_price))}
                      <span className="block text-[10px] font-normal text-black/45">
                        {Number(raw.sale_price ?? raw.price) > 0
                          ? `${(((Number(raw.sale_price ?? raw.price) - Number(raw.cost_price)) / Number(raw.sale_price ?? raw.price)) * 100).toFixed(1)}% margin`
                          : '—'}
                      </span>
                    </td>
                    <td className="p-4 text-right font-semibold">
                      {formatPriceKsh(
                        (raw.stock_quantity - raw.reserved_quantity) *
                          (Number(raw.sale_price ?? raw.price) - Number(raw.cost_price))
                      )}
                    </td>
                  </tr>
                ) : view === 'finance' ? (
                  <tr key={raw.id} className="border-black/8 border-t">
                    <td className="p-4 font-semibold">{raw.description}</td>
                    <td>{raw.reference_type}</td>
                    <td>{new Date(raw.posted_at).toLocaleString('en-KE')}</td>
                    <td className="p-4 text-right font-semibold">
                      {formatPriceKsh(
                        (raw.ledger_entries ?? [])
                          .filter((e: any) => e.direction === 'DEBIT')
                          .reduce((s: number, e: any) => s + Number(e.amount), 0)
                      )}
                    </td>
                  </tr>
                ) : (
                  <tr key={raw.id} className="border-black/8 border-t">
                    <td className="p-4 font-semibold">
                      {raw.first_name} {raw.last_name}
                    </td>
                    <td>{raw.email}</td>
                    <td>{raw.phone ?? '—'}</td>
                    <td>
                      <Status value={raw.enabled ? 'ACTIVE' : 'DISABLED'} />
                    </td>
                    <td className="p-4">{new Date(raw.created_at).toLocaleDateString('en-KE')}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          {!query.data?.rows.length ? (
            <div className="p-12 text-center text-sm text-black/45">
              No records yet. Data appears here as your store operates.
            </div>
          ) : null}
        </div>
      )}
      {query.data && query.data.total > pageSize ? (
        <nav
          aria-label="Table pagination"
          className="mt-5 flex items-center justify-between text-sm"
        >
          <p className="text-black/50">
            {page * pageSize + 1}–{Math.min((page + 1) * pageSize, query.data.total)} of{' '}
            {query.data.total}
          </p>
          <div className="flex gap-2">
            <button
              className="flex min-h-10 items-center gap-1 border border-black/15 px-3 font-semibold disabled:opacity-35"
              disabled={page === 0 || query.isFetching}
              onClick={() => setPage((value) => Math.max(0, value - 1))}
            >
              <ChevronLeft size={15} /> Previous
            </button>
            <button
              className="flex min-h-10 items-center gap-1 border border-black/15 px-3 font-semibold disabled:opacity-35"
              disabled={(page + 1) * pageSize >= query.data.total || query.isFetching}
              onClick={() => setPage((value) => value + 1)}
            >
              Next <ChevronRight size={15} />
            </button>
          </div>
        </nav>
      ) : null}
      {view === 'finance' ? (
        <Link
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4"
          href="/admin/payments"
        >
          Review payment exceptions
          <ArrowUpRight size={15} />
        </Link>
      ) : null}
    </div>
  );
}
function Status({ value }: { value: string }) {
  const bad = ['FAILED', 'LOW', 'DISABLED', 'CANCELLED'].includes(value);
  return (
    <span
      className={`inline-flex border px-2.5 py-1 text-[10px] font-bold tracking-wide ${bad ? 'border-red-200 bg-red-50 text-red-700' : 'border-black/10 bg-[#f1f1f1] text-black/70'}`}
    >
      {value.replaceAll('_', ' ')}
    </span>
  );
}
