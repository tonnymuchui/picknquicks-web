'use client';

import { CheckCircle, Clock3, Loader2, Package, RefreshCw } from 'lucide-react';
import Link from 'next/link';

import { useOrder } from '@/lib/order/order.queries';
import { formatPriceKsh } from '@/lib/utils/currency';

export function OrderConfirmation({ orderId }: { orderId: string }) {
  const orderQuery = useOrder(orderId);

  if (orderQuery.isLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f6f3ed] px-4">
        <Loader2 className="animate-spin" size={28} />
      </main>
    );
  }

  if (!orderQuery.data) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f6f3ed] px-4 py-12">
        <section className="w-full max-w-lg border border-black/15 bg-white p-8 text-center sm:p-11">
          <h1 className="text-3xl font-medium tracking-[-0.04em]">Order details unavailable</h1>
          <p className="mt-3 text-sm leading-6 text-black/55">
            Use your order number and email address to retrieve this order securely.
          </p>
          <Link
            className="mt-7 flex min-h-12 items-center justify-center bg-black px-5 text-sm font-semibold text-white"
            href="/track-order"
          >
            Track order
          </Link>
        </section>
      </main>
    );
  }

  const order = orderQuery.data;
  const isPaid = order.paymentStatus === 'COMPLETED';
  const isZeroChargeCod =
    order.paymentMethod === 'CASH_ON_DELIVERY' && (order.payment?.amount ?? 0) === 0;
  const confirmed = isPaid || isZeroChargeCod;

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f6f3ed] px-4 py-12">
      <section className="w-full max-w-2xl border border-black/15 bg-white p-7 sm:p-11">
        <span
          className={`flex size-16 items-center justify-center rounded-full ${confirmed ? 'bg-[#f1f1f1] text-black' : 'bg-[#f7f1e9] text-[#9a5d3b]'}`}
        >
          {confirmed ? <CheckCircle size={34} /> : <Clock3 size={32} />}
        </span>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#9a5d3b]">
          Order {order.orderNumber}
        </p>
        <h1 className="mt-2 text-4xl font-medium tracking-[-0.045em]">
          {confirmed ? 'Your order is confirmed.' : 'Your order has been received.'}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-black/55">
          {confirmed
            ? `We sent the order details to ${order.email}.`
            : 'Payment confirmation is still pending. You can return to the payment screen or track the order at any time.'}
        </p>

        <dl className="mt-8 grid gap-px bg-black/15 sm:grid-cols-3">
          <div className="bg-white p-4">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45">
              Total
            </dt>
            <dd className="mt-2 text-lg font-semibold">{formatPriceKsh(order.totalAmount)}</dd>
          </div>
          <div className="bg-white p-4">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45">
              Payment
            </dt>
            <dd className="mt-2 text-sm font-semibold">
              {order.paymentMethod === 'CASH_ON_DELIVERY' && isPaid
                ? 'DELIVERY FEE PAID'
                : order.paymentStatus.replaceAll('_', ' ')}
            </dd>
          </div>
          <div className="bg-white p-4">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45">
              Delivery to
            </dt>
            <dd className="mt-2 text-sm font-semibold">{order.shippingAddress.city}</dd>
          </div>
        </dl>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link
            className="min-h-13 flex items-center justify-center gap-2 bg-black px-5 text-sm font-semibold text-white"
            href={`/orders/${order.id}`}
          >
            <Package size={17} />
            View order details
          </Link>
          {confirmed ? (
            <Link
              className="min-h-13 flex items-center justify-center border border-black px-5 text-sm font-semibold"
              href="/products"
            >
              Continue shopping
            </Link>
          ) : (
            <Link
              className="min-h-13 flex items-center justify-center gap-2 border border-black px-5 text-sm font-semibold"
              href={`/orders/${order.id}/payment`}
            >
              <RefreshCw size={16} />
              Check payment
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
