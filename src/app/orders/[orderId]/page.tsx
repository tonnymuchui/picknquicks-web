'use client';

import { AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

import { OrderDetails } from '@/components/order/order-details';
import { useOrder } from '@/lib/order/order.queries';

interface OrderPageProps {
  params: Promise<{ orderId: string }>;
}

export default function OrderPage({ params }: OrderPageProps) {
  const { orderId } = use(params);
  const { data: order, isLoading, error } = useOrder(orderId);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-black/65" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow">
          <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Order Not Found</h1>
          <p className="mb-6 text-gray-600">
            We couldn&apos;t find the order you&apos;re looking for.
          </p>
          <Link
            className="inline-block rounded-lg bg-[#9a5d3b] px-6 py-3 font-semibold text-white hover:bg-[#9a5d3b]"
            href="/orders"
          >
            View All Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <OrderDetails order={order} />
      </div>
    </div>
  );
}
