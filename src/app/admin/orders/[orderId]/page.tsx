'use client';

import { ArrowLeft, Loader2, Package } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

import { AdminPaymentPanel } from '@/app/admin/orders/admin-payment-panel';
import { AdminStatusPanel } from '@/app/admin/orders/admin-status-panel';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { OrderDetails } from '@/components/order/order-details';
import { EmptyState } from '@/components/ui/empty-state';
import { useOrder } from '@/lib/order/order.queries';
import { UserRole } from '@/types/auth';

interface AdminOrderDetailPageProps {
  params: Promise<{ orderId: string }>;
}

export default function AdminOrderDetailPage({ params }: AdminOrderDetailPageProps) {
  return (
    <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
      <AdminOrderDetailContent params={params} />
    </ProtectedRoute>
  );
}

function AdminOrderDetailContent({ params }: AdminOrderDetailPageProps) {
  const { orderId } = use(params);
  const { data: order, isLoading } = useOrder(orderId);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-black/60" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <EmptyState
          description="This order may have been deleted or you don't have permission to view it."
          icon={Package}
          title="Order not found"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-7 xl:p-9">
      <div className="border-b border-black/10 bg-white pb-7">
        <Link
          className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-black/60 hover:text-black"
          href="/admin/orders"
        >
          <ArrowLeft size={16} />
          Back to orders
        </Link>
        <p className="text-xs font-bold uppercase tracking-[.18em] text-[#9a5d3b]">Fulfilment</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-.045em] text-black sm:text-4xl">
          Order {order.orderNumber}
        </h1>
      </div>

      <div className="py-6">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <OrderDetails showEmailAction order={order} showActions={false} />
          </div>

          <div className="space-y-6 xl:col-span-1">
            <AdminStatusPanel order={order} />

            <AdminPaymentPanel order={order} />
          </div>
        </div>
      </div>
    </div>
  );
}
