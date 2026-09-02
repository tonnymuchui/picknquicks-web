'use client';

import { Download, Loader2, Plus } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { AdminOrderFiltersBar } from '@/components/admin/order/admin-order-filters-bar';
import { AdminOrderStats } from '@/components/admin/order/admin-order-stats';
import { AdminOrderTable } from '@/components/admin/order/admin-order-table';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { useAdminOrders } from '@/lib/order/order.queries';
import { UserRole } from '@/types/auth';

import type { OrderFilters } from '@/types/order';

export default function AdminOrdersPage() {
  return (
    <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
      <AdminOrdersContent />
    </ProtectedRoute>
  );
}

function AdminOrdersContent() {
  const [filters, setFilters] = useState<OrderFilters>({
    page: 0,
    size: 20,
    status: 'ALL',
  });

  const { data, isLoading } = useAdminOrders(filters);
  const orders = useMemo(() => {
    const search = filters.search?.trim().toLowerCase();
    return (data?.content ?? []).filter((order) => {
      const matchesStatus =
        !filters.status || filters.status === 'ALL' || order.status === filters.status;
      const matchesPayment =
        !filters.paymentMethod || order.paymentMethod === filters.paymentMethod;
      const matchesSearch =
        !search ||
        order.orderNumber.toLowerCase().includes(search) ||
        order.customerName.toLowerCase().includes(search) ||
        order.email.toLowerCase().includes(search);
      return matchesStatus && matchesPayment && matchesSearch;
    });
  }, [data?.content, filters.paymentMethod, filters.search, filters.status]);

  const handleExport = () => {
    const escape = (value: string | number) => `"${String(value).replaceAll('"', '""')}"`;
    const rows = [
      ['Order', 'Customer', 'Email', 'Status', 'Payment method', 'Payment status', 'Total'],
      ...orders.map((order) => [
        order.orderNumber,
        order.customerName,
        order.email,
        order.status,
        order.paymentMethod,
        order.paymentStatus,
        order.totalAmount,
      ]),
    ];
    const csv = rows.map((row) => row.map(escape).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `orders-page-${(filters.page ?? 0) + 1}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-7 xl:p-9">
      <div className="border-b border-black/10 bg-white pb-7">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-[#9a5d3b]">
                Fulfilment
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-.045em] text-black sm:text-4xl">
                Orders
              </h1>
              <p className="mt-2 text-sm text-black/50">
                {data?.totalElements
                  ? `${data.totalElements.toLocaleString()} total orders`
                  : 'Manage all customer orders'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                className="flex items-center gap-2 border border-black/20 px-4 py-2 text-sm font-medium text-black/70 hover:bg-[#f1f1f1] disabled:opacity-40"
                disabled={orders.length === 0}
                onClick={handleExport}
              >
                <Download size={16} />
                Export CSV
              </button>
              <Link
                className="flex items-center gap-2 bg-[#9a5d3b] px-4 py-2 text-sm font-semibold text-white hover:bg-[#754329]"
                href="/admin/orders/new"
              >
                <Plus size={16} /> Create customer order
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 py-6">
        <AdminOrderStats orders={data?.content ?? []} />

        <AdminOrderFiltersBar filters={filters} onChange={setFilters} />

        {isLoading ? (
          <div className=" border border-black/15 bg-white p-16 text-center ">
            <Loader2 className="mx-auto mb-3 animate-spin text-black/60" size={40} />
            <p className="text-black/65">Loading orders...</p>
          </div>
        ) : (
          <>
            <AdminOrderTable orders={orders} />

            {data !== undefined && data.totalPages > 1 ? (
              <div className="flex items-center justify-between">
                <p className="text-sm text-black/65">
                  Showing {(filters.page ?? 0) * (filters.size ?? 20) + 1}–
                  {Math.min(((filters.page ?? 0) + 1) * (filters.size ?? 20), data.totalElements)}{' '}
                  of {data.totalElements.toLocaleString()}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    className=" border border-black/20 px-4 py-2 text-sm font-medium hover:bg-[#f1f1f1] disabled:cursor-not-allowed disabled:opacity-40"
                    disabled={(filters.page ?? 0) === 0}
                    onClick={() => setFilters((f) => ({ ...f, page: (f.page ?? 0) - 1 }))}
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-sm text-black/70">
                    Page {(filters.page ?? 0) + 1} of {data.totalPages}
                  </span>
                  <button
                    className=" border border-black/20 px-4 py-2 text-sm font-medium hover:bg-[#f1f1f1] disabled:cursor-not-allowed disabled:opacity-40"
                    disabled={(filters.page ?? 0) >= data.totalPages - 1}
                    onClick={() => setFilters((f) => ({ ...f, page: (f.page ?? 0) + 1 }))}
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
