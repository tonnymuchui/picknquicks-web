'use client';

import { CheckCircle, Clock3, Loader2, RefreshCw, Smartphone, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';

import { useOrderPaymentStatus } from '@/lib/hooks/use-order-payment-status';
import { getGuestOrderAccess } from '@/lib/order/guest-order-access';
import { formatPriceKsh } from '@/lib/utils/currency';

import type { Order } from '@/types/order';

interface MpesaPaymentWaitingProps {
  orderId: string;
  order: Order;
}

function PaymentShell({ children }: { children: ReactNode }) {
  return (
    <main className="bg-canvas flex min-h-[75vh] items-center justify-center px-4 py-12">
      <section className="border-line w-full max-w-lg border bg-white p-7 text-center sm:p-10">
        {children}
      </section>
    </main>
  );
}

function StatusIcon({ tone, children }: { tone: string; children: ReactNode }) {
  return (
    <span className={`mx-auto flex size-20 items-center justify-center rounded-full ${tone}`}>
      {children}
    </span>
  );
}

export function MpesaPaymentWaiting({ orderId, order: initialOrder }: MpesaPaymentWaitingProps) {
  const { pollStatus, order, retry, secondsRemaining } = useOrderPaymentStatus(orderId);
  const displayOrder = order ?? initialOrder;
  const isCashOnDelivery = displayOrder.paymentMethod === 'CASH_ON_DELIVERY';
  const chargedAmount =
    displayOrder.payment?.amount ?? displayOrder.amountDueNow;
  const timerLabel = `${Math.floor(secondsRemaining / 60)}:${String(secondsRemaining % 60).padStart(2, '0')}`;
  const initiated = useRef(false);
  const [initiationError, setInitiationError] = useState<string>();

  useEffect(() => {
    const payment = initialOrder.payment;
    if (initiated.current || !payment || payment.status !== 'PENDING' || payment.amount <= 0) {
      return;
    }
    initiated.current = true;
    const guestToken = getGuestOrderAccess(orderId)?.guestToken;
    void fetch('/api/payments/mpesa/initiate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(guestToken ? { 'X-Guest-Order-Token': guestToken } : {}),
      },
      body: JSON.stringify({ paymentId: payment.id, phoneNumber: initialOrder.phoneNumber }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          setInitiationError(payload.error ?? 'M-Pesa prompt could not be started.');
        }
      })
      .catch(() => setInitiationError('M-Pesa is temporarily unreachable. Your order is safe.'));
  }, [initialOrder, orderId]);

  if (isCashOnDelivery && chargedAmount <= 0) {
    return (
      <PaymentShell>
        <StatusIcon tone="bg-[#f1f1f1] text-black">
          <CheckCircle aria-hidden="true" size={42} />
        </StatusIcon>
        <p className="text-warm mt-6 text-xs font-semibold uppercase tracking-[0.16em]">
          Order placed
        </p>
        <h1 className="mt-2 text-3xl font-medium tracking-[-0.035em]">
          No advance payment is required
        </h1>
        <p className="mt-3 text-sm leading-6 text-black/55">
          Your order is saved. The amount due on delivery is{' '}
          {formatPriceKsh(displayOrder.amountDueOnDelivery)}.
        </p>
        <Link
          className="bg-ink mt-7 flex min-h-14 items-center justify-center text-sm font-semibold text-white"
          href={`/orders/${orderId}/confirmation`}
        >
          View order confirmation
        </Link>
      </PaymentShell>
    );
  }

  if (pollStatus === 'success') {
    return (
      <PaymentShell>
        <StatusIcon tone="bg-[#f1f1f1] text-black">
          <CheckCircle aria-hidden="true" size={42} />
        </StatusIcon>
        <p className="text-warm mt-6 text-xs font-semibold uppercase tracking-[0.16em]">
          Payment received
        </p>
        <h1 className="mt-2 text-3xl font-medium tracking-[-0.035em]">Your order is confirmed</h1>
        <p className="mt-3 text-sm leading-6 text-black/55">
          {isCashOnDelivery
            ? `${formatPriceKsh(chargedAmount)} delivery payment received. ${formatPriceKsh(displayOrder.amountDueOnDelivery)} remains due on delivery.`
            : `${formatPriceKsh(chargedAmount)} received. Your order can now be prepared.`}
        </p>
        <Link
          className="bg-ink mt-7 flex min-h-14 items-center justify-center text-sm font-semibold text-white"
          href={`/orders/${orderId}/confirmation`}
        >
          View order confirmation
        </Link>
      </PaymentShell>
    );
  }

  if (pollStatus === 'failed') {
    return (
      <PaymentShell>
        <StatusIcon tone="bg-red-50 text-red-700">
          <XCircle aria-hidden="true" size={42} />
        </StatusIcon>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-red-700">
          Payment not completed
        </p>
        <h1 className="mt-2 text-3xl font-medium tracking-[-0.035em]">
          Your order is still available
        </h1>
        <p className="mt-3 text-sm leading-6 text-black/55">
          {displayOrder.payment?.failureReason ?? 'The M-Pesa payment was not completed.'}
        </p>
        <div className="mt-7 space-y-2">
          <Link
            className="bg-ink flex min-h-14 items-center justify-center text-sm font-semibold text-white"
            href={`/orders/${orderId}`}
          >
            View order details
          </Link>
          <Link
            className="border-ink flex min-h-12 items-center justify-center border text-sm font-semibold"
            href="/track-order"
          >
            Track order
          </Link>
        </div>
      </PaymentShell>
    );
  }

  if (pollStatus === 'timeout') {
    return (
      <PaymentShell>
        <StatusIcon tone="bg-[#f7f1e9] text-[#9a5d3b]">
          <Clock3 aria-hidden="true" size={40} />
        </StatusIcon>
        <p className="text-warm mt-6 text-xs font-semibold uppercase tracking-[0.16em]">
          Still waiting
        </p>
        <h1 className="mt-2 text-3xl font-medium tracking-[-0.035em]">
          Confirmation is taking longer
        </h1>
        <p className="mt-3 text-sm leading-6 text-black/55">
          Your order is saved. Retry the status check if you completed the prompt on your phone.
        </p>
        <button
          className="bg-ink mt-7 flex min-h-14 w-full items-center justify-center gap-2 text-sm font-semibold text-white"
          type="button"
          onClick={retry}
        >
          <RefreshCw aria-hidden="true" size={16} />
          Check again
        </button>
        <Link
          className="mt-2 flex min-h-12 items-center justify-center text-sm font-semibold underline underline-offset-4"
          href={`/orders/${orderId}`}
        >
          View order details
        </Link>
      </PaymentShell>
    );
  }

  return (
    <PaymentShell>
      <StatusIcon tone="bg-[#f2eee7] text-black">
        <Smartphone aria-hidden="true" size={40} strokeWidth={1.5} />
      </StatusIcon>
      <p className="text-warm mt-6 text-xs font-semibold uppercase tracking-[0.16em]">
        M-Pesa prompt sent
      </p>
      <h1 className="mt-2 text-3xl font-medium tracking-[-0.035em]">Check your phone</h1>
      <p className="mt-3 text-sm leading-6 text-black/55">
        Enter your M-Pesa PIN to approve {formatPriceKsh(chargedAmount)}.
      </p>
      <div className="border-line mt-7 border-y py-5">
        <p className="text-xs text-black/50">Waiting for payment confirmation</p>
        <p className="mt-2 text-3xl font-semibold">{formatPriceKsh(chargedAmount)}</p>
        {isCashOnDelivery ? (
          <p className="mt-2 text-xs text-black/50">
            {formatPriceKsh(displayOrder.amountDueOnDelivery)} remains payable on delivery.
          </p>
        ) : null}
      </div>
      <p aria-live="polite" className="mt-5 inline-flex items-center gap-2 text-sm text-black/55">
        <Loader2 aria-hidden="true" className="animate-spin" size={16} />
        Updates automatically · {timerLabel}
      </p>
      {initiationError ? (
        <p className="mt-3 border border-black/15 bg-[#f1f1f1] p-3 text-xs leading-5 text-black/65">
          {initiationError}
        </p>
      ) : null}
      <Link
        className="mt-5 flex min-h-11 items-center justify-center text-xs font-semibold underline underline-offset-4"
        href={`/orders/${orderId}`}
      >
        Complete payment later
      </Link>
    </PaymentShell>
  );
}
