'use client';

import { AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

import { MpesaPaymentWaiting } from '@/components/payment/mpesa-payment-waiting';
import { getApiErrorMessage } from '@/lib/api/errors';
import { useOrder } from '@/lib/order/order.queries';

interface PaymentPageProps {
  params: Promise<{ orderId: string }>;
}

export default function PaymentPage({ params }: PaymentPageProps) {
  const { orderId } = use(params);
  const { data: order, error, isLoading, isFetching, refetch } = useOrder(orderId);

  if (isLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center p-4">
        <div className="text-muted-foreground flex items-center gap-3 text-sm">
          <Loader2 aria-hidden="true" className="animate-spin" size={22} />
          Loading payment details...
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center p-4">
        <section className="border-line w-full max-w-md rounded-lg border bg-white p-7 text-center sm:p-9">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-700">
            <AlertCircle aria-hidden="true" size={27} />
          </span>
          <h1 className="mt-5 text-2xl font-semibold tracking-[-0.025em]">
            Payment details unavailable
          </h1>
          <p className="text-muted-foreground mt-2 text-sm leading-6">
            {getApiErrorMessage(error, 'We could not load this order. Please try again.')}
          </p>
          <button
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-black px-5 text-sm font-semibold text-white disabled:opacity-60"
            disabled={isFetching}
            type="button"
            onClick={() => void refetch()}
          >
            {isFetching ? (
              <Loader2 aria-hidden="true" className="animate-spin" size={17} />
            ) : (
              <RefreshCw aria-hidden="true" size={17} />
            )}
            Try again
          </button>
          <Link
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-black px-5 text-sm font-semibold"
            href="/track-order"
          >
            Track an order
          </Link>
        </section>
      </main>
    );
  }

  return <MpesaPaymentWaiting order={order} orderId={orderId} />;
}
