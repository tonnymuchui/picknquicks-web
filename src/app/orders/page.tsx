'use client';

import { Loader2, Package } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { OrderHistoryCard } from '@/components/order/order-history-card';
import { useMyOrders } from '@/lib/order/order.queries';
import { UserRole } from '@/types/auth';

export default function OrdersPage() {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useMyOrders(page, 10);

  return (
    <ProtectedRoute requiredRoles={[UserRole.CUSTOMER]}>
      {isLoading ? (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <Loader2 className="h-8 w-8 animate-spin text-black/65" />
        </div>
      ) : !data || data.content.length === 0 ? (
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-16">
            <div className="mx-auto max-w-2xl text-center">
              <Package className="mx-auto mb-6 text-gray-300" size={80} />
              <h1 className="mb-4 text-3xl font-bold text-gray-900">No Orders Yet</h1>
              <p className="mb-8 text-gray-600">
                You haven&apos;t placed any orders yet. Start shopping to see your order history
                here.
              </p>
              <Link
                className="inline-block rounded-lg bg-[#9a5d3b] px-8 py-4 font-semibold text-white hover:bg-[#9a5d3b]"
                href="/products"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50">
          <div className="border-b bg-white">
            <div className="container mx-auto px-4 py-6">
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="mt-1 text-gray-600">View and track your orders</p>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-6">
              {data.content.map((order) => (
                <OrderHistoryCard key={order.id} order={order} />
              ))}
            </div>

            {data.totalPages > 1 ? (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  className="rounded-lg border border-gray-300 px-4 py-2 font-medium hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={page === 0}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-700">
                  Page {page + 1} of {data.totalPages}
                </span>
                <button
                  className="rounded-lg border border-gray-300 px-4 py-2 font-medium hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={page >= data.totalPages - 1}
                  onClick={() => setPage((p) => Math.min(data.totalPages - 1, p + 1))}
                >
                  Next
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
