'use client';

import { Loader2 } from 'lucide-react';
import { useState } from 'react';

import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { FormInput } from '@/components/ui/form-input';
import { useCancelOrder, useUpdateOrderStatus } from '@/lib/order/order.mutations';

import type { Order, OrderStatus } from '@/types/order';
const statusLabels: Record<OrderStatus, { label: string; description: string }> = {
  AWAITING_PAYMENT: { label: 'Awaiting Payment', description: 'Order placed, waiting for M-Pesa' },
  PAYMENT_CONFIRMED: {
    label: 'Payment Confirmed',
    description: 'M-Pesa received, ready to process',
  },
  PAYMENT_FAILED: { label: 'Payment Failed', description: 'M-Pesa not received' },
  PROCESSING: { label: 'Processing', description: 'Picking & packing order' },
  READY_TO_SHIP: { label: 'Ready to Ship', description: 'Packed, awaiting courier' },
  SHIPPED: { label: 'Shipped', description: 'Out for delivery' },
  DELIVERED: { label: 'Delivered', description: 'Delivered to customer' },
  COMPLETED: { label: 'Completed', description: 'Order closed' },
  CANCELLED: { label: 'Cancelled', description: 'Order cancelled' },
  REFUND_PENDING: { label: 'Refund Pending', description: 'Refund being processed' },
  REFUNDED: { label: 'Refunded', description: 'Refund sent' },
};

const adminStatuses: OrderStatus[] = [
  'PAYMENT_CONFIRMED',
  'PROCESSING',
  'READY_TO_SHIP',
  'SHIPPED',
  'DELIVERED',
  'COMPLETED',
  'CANCELLED',
];

interface AdminStatusPanelProps {
  order: Order;
}

export function AdminStatusPanel({ order }: AdminStatusPanelProps) {
  const updateStatus = useUpdateOrderStatus();
  const cancelOrder = useCancelOrder();

  const [selected, setSelected] = useState<OrderStatus>(order.status);
  const [tracking, setTracking] = useState(order.trackingNumber ?? '');
  const [showCancel, setShowCancel] = useState(false);

  const hasChanged = selected !== order.status;
  const canCancel = [
    'AWAITING_PAYMENT',
    'PAYMENT_FAILED',
    'PAYMENT_CONFIRMED',
    'PROCESSING',
  ].includes(order.status);

  const handleUpdate = () => {
    updateStatus.mutate({
      orderId: order.id,
      status: selected,
      trackingNumber: tracking || undefined,
    });
  };

  const handleCancel = () => {
    cancelOrder.mutate({ orderId: order.id, reason: 'Cancelled by admin' });
    setShowCancel(false);
  };

  return (
    <>
      <div className=" border border-black/15 bg-white p-5 ">
        <h3 className="mb-4 font-semibold text-black">Update Order Status</h3>

        <div className="mb-4 space-y-2">
          {adminStatuses.map((status) => {
            const config = statusLabels[status];
            return (
              <label
                key={status}
                className={`flex cursor-pointer items-start gap-3  border-2 p-3 transition-all ${
                  selected === status
                    ? 'border-[#9a5d3b] bg-[#f1f1f1]'
                    : 'border-black/15 hover:border-black/20'
                }`}
              >
                <input
                  checked={selected === status}
                  className="mt-0.5 accent-[#9a5d3b]"
                  name="status"
                  type="radio"
                  value={status}
                  onChange={() => setSelected(status)}
                />
                <div>
                  <p className="text-sm font-semibold text-black">{config.label}</p>
                  <p className="text-xs text-black/45">{config.description}</p>
                </div>
              </label>
            );
          })}
        </div>

        {['READY_TO_SHIP', 'SHIPPED'].includes(selected) ? (
          <div className="mb-4">
            <FormInput
              hint="Will be shown to customer in order details"
              label="Tracking Number"
              placeholder="Enter courier tracking number"
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
            />
          </div>
        ) : null}

        <button
          className="flex w-full items-center justify-center gap-2  bg-[#9a5d3b] py-2.5 text-sm font-semibold text-white hover:bg-[#754329] disabled:cursor-not-allowed disabled:opacity-40"
          disabled={!hasChanged || updateStatus.isPending}
          onClick={handleUpdate}
        >
          {updateStatus.isPending ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              Updating...
            </>
          ) : (
            'Update Status'
          )}
        </button>

        {canCancel ? (
          <button
            className="mt-2 w-full  border-2 border-red-200 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
            onClick={() => setShowCancel(true)}
          >
            Cancel Order
          </button>
        ) : null}
      </div>

      <ConfirmDialog
        confirmLabel="Cancel Order"
        isLoading={cancelOrder.isPending}
        isOpen={showCancel}
        message={`Cancel order ${order.orderNumber}? Stock will be restored and the customer will be notified.`}
        title="Cancel Order"
        onClose={() => setShowCancel(false)}
        onConfirm={handleCancel}
      />
    </>
  );
}
