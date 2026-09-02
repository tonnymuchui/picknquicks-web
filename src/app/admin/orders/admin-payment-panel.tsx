'use client';

import { Banknote, CheckCircle, Clock, Loader2, Smartphone, XCircle } from 'lucide-react';
import { useState } from 'react';

import { FormInput } from '@/components/ui/form-input';
import { Modal } from '@/components/ui/modal';
import { useInitiateAdminPayment, useRecordDeliveryPayment } from '@/lib/order/order.mutations';
import { formatPriceKsh } from '@/lib/utils/currency';

import type { Order, Payment } from '@/types/order';

const purposeLabels = {
  ORDER_TOTAL: 'Full order payment',
  DELIVERY_FEE: 'Delivery fee upfront',
  ORDER_BALANCE: 'Balance due on delivery',
  REFUND: 'Refund',
} as const;

export function AdminPaymentPanel({ order }: { order: Order }) {
  const initiatePayment = useInitiateAdminPayment();
  const collectPayment = useRecordDeliveryPayment();
  const [collecting, setCollecting] = useState<Payment | null>(null);
  const [channel, setChannel] = useState<'CASH' | 'MPESA'>('CASH');
  const [reference, setReference] = useState('');
  const payments = order.payments ?? (order.payment ? [order.payment] : []);

  const openCollection = (payment: Payment) => {
    setCollecting(payment);
    setChannel('CASH');
    setReference('');
  };
  const recordCollection = () => {
    if (!collecting) {
      return;
    }
    collectPayment.mutate(
      {
        amount: collecting.amount,
        channel,
        orderId: order.id,
        paymentId: collecting.id,
        reference: reference || undefined,
      },
      { onSuccess: () => setCollecting(null) }
    );
  };

  return (
    <>
      <section className="border border-black/15 bg-white p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-black">Payments</h3>
            <p className="mt-1 text-xs text-black/45">Every payment posts separately to finance.</p>
          </div>
          <span className="text-sm font-semibold">{formatPriceKsh(order.paidAmount)} paid</span>
        </div>

        <div className="mt-4 space-y-3">
          {payments.map((payment) => {
            const isAdvance = ['ORDER_TOTAL', 'DELIVERY_FEE'].includes(payment.purpose);
            const canCollect =
              payment.purpose === 'ORDER_BALANCE' &&
              payment.status !== 'COMPLETED' &&
              ['SHIPPED', 'DELIVERED'].includes(order.status);
            return (
              <div key={payment.id} className="rounded-xl border border-black/10 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-2.5">
                    <PaymentIcon status={payment.status} />
                    <div>
                      <p className="text-sm font-semibold">{purposeLabels[payment.purpose]}</p>
                      <p className="mt-0.5 text-[10px] font-semibold text-black/40">
                        {payment.status}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold">{formatPriceKsh(payment.amount)}</p>
                </div>
                {payment.mpesaReceiptNumber ? (
                  <p className="mt-3 border-t border-black/[.06] pt-3 font-mono text-xs text-black/55">
                    Ref: {payment.mpesaReceiptNumber}
                  </p>
                ) : null}
                {isAdvance && payment.status !== 'COMPLETED' && payment.status !== 'REFUNDED' ? (
                  <button
                    className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 bg-[#9a5d3b] px-3 text-xs font-semibold text-white disabled:opacity-50"
                    disabled={initiatePayment.isPending}
                    onClick={() =>
                      initiatePayment.mutate({
                        orderId: order.id,
                        paymentId: payment.id,
                        phoneNumber: order.phoneNumber,
                      })
                    }
                  >
                    {initiatePayment.isPending ? (
                      <Loader2 className="animate-spin" size={15} />
                    ) : (
                      <Smartphone size={15} />
                    )}
                    Send M-Pesa prompt
                  </button>
                ) : null}
                {canCollect ? (
                  <button
                    className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 bg-[#1f1c17] px-3 text-xs font-semibold text-white"
                    onClick={() => openCollection(payment)}
                  >
                    <Banknote size={15} /> Record delivery payment
                  </button>
                ) : null}
                {payment.purpose === 'ORDER_BALANCE' &&
                payment.status !== 'COMPLETED' &&
                !canCollect ? (
                  <p className="mt-3 text-[10px] leading-4 text-black/40">
                    Available for collection once the order is shipped or delivered.
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>

        <dl className="mt-4 space-y-2 border-t border-black/10 pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-black/50">Order total</dt>
            <dd className="font-semibold">{formatPriceKsh(order.totalAmount)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-black/50">Balance due</dt>
            <dd className="font-semibold">{formatPriceKsh(order.balanceDue)}</dd>
          </div>
        </dl>
      </section>

      <Modal
        description={`Record ${formatPriceKsh(collecting?.amount ?? 0)} received when the order was delivered.`}
        isOpen={Boolean(collecting)}
        size="sm"
        title="Collect delivery balance"
        onClose={() => setCollecting(null)}
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold" htmlFor="collection-channel">
              Received through
            </label>
            <select
              className="border-line min-h-12 w-full border px-4 text-sm"
              id="collection-channel"
              value={channel}
              onChange={(event) => setChannel(event.target.value as typeof channel)}
            >
              <option value="CASH">Cash</option>
              <option value="MPESA">M-Pesa</option>
            </select>
          </div>
          {channel === 'MPESA' ? (
            <FormInput
              required
              label="M-Pesa receipt or reference"
              placeholder="e.g. SGB12ABC34"
              value={reference}
              onChange={(event) => setReference(event.target.value)}
            />
          ) : null}
          <div className="rounded-xl bg-[#f2eee7] p-3 text-xs leading-5 text-[#754329]">
            This completes the order, debits{' '}
            {channel === 'MPESA' ? 'M-Pesa clearing' : 'cash on hand'}, credits accounts receivable,
            and emails the final receipt.
          </div>
          <button
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 bg-[#1f1c17] px-4 text-sm font-semibold text-white disabled:opacity-40"
            disabled={collectPayment.isPending || (channel === 'MPESA' && !reference.trim())}
            onClick={recordCollection}
          >
            {collectPayment.isPending ? <Loader2 className="animate-spin" size={16} /> : null}
            Confirm payment received
          </button>
        </div>
      </Modal>
    </>
  );
}

function PaymentIcon({ status }: { status: Payment['status'] }) {
  if (status === 'COMPLETED') {
    return <CheckCircle className="mt-0.5 text-emerald-700" size={17} />;
  }
  if (['FAILED', 'CANCELLED', 'REFUNDED'].includes(status)) {
    return <XCircle className="mt-0.5 text-red-600" size={17} />;
  }
  return <Clock className="mt-0.5 text-[#9a5d3b]" size={17} />;
}
