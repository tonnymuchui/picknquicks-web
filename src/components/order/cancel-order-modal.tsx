'use client';

import { X, AlertTriangle, Loader2 } from 'lucide-react';
import { useState } from 'react';

import { useCancelOrder } from '@/lib/order/order.mutations';

interface CancelOrderModalProps {
  orderId: string;
  orderNumber: string;
  isOpen: boolean;
  onClose: () => void;
}

const cancellationReasons = [
  'Changed my mind',
  'Found a better price elsewhere',
  'Ordered by mistake',
  'Need to change shipping address',
  'Taking too long to process',
  'Other',
];

export function CancelOrderModal({ orderId, orderNumber, isOpen, onClose }: CancelOrderModalProps) {
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const cancelOrder = useCancelOrder();

  if (!isOpen) {
    return null;
  }

  const handleCancel = async () => {
    const reason = selectedReason === 'Other' ? customReason : selectedReason;

    if (!reason) {
      return;
    }

    try {
      await cancelOrder.mutateAsync({ orderId, reason });
      onClose();
    } catch {
      return;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900">Cancel Order</h2>
          <button className="rounded-lg p-2 transition-colors hover:bg-gray-100" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-black/15 bg-[#f1f1f1] p-4">
            <AlertTriangle className="mt-0.5 flex-shrink-0 text-black/65" size={20} />
            <div className="text-sm text-black/65">
              <p className="mb-1 font-medium">Are you sure?</p>
              <p>
                Cancelling order <strong>#{orderNumber}</strong> cannot be undone. Any payments will
                be refunded within 5-7 business days.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Reason for cancellation
              </label>
              <div className="space-y-2">
                {cancellationReasons.map((reason) => (
                  <label
                    key={reason}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 p-3 hover:bg-gray-50 has-[:checked]:border-black/15 has-[:checked]:bg-[#f1f1f1]"
                  >
                    <input
                      checked={selectedReason === reason}
                      className="text-black/65"
                      name="reason"
                      type="radio"
                      value={reason}
                      onChange={(e) => setSelectedReason(e.target.value)}
                    />
                    <span className="text-sm text-gray-900">{reason}</span>
                  </label>
                ))}
              </div>
            </div>

            {selectedReason === 'Other' ? (
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Please specify
                </label>
                <textarea
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 ring-[#9a5d3b] focus:border-transparent focus:ring-2"
                  placeholder="Tell us why you're cancelling..."
                  rows={3}
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                />
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex gap-3 border-t border-gray-200 p-6">
          <button
            className="flex-1 rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            onClick={onClose}
          >
            Keep Order
          </button>
          <button
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={
              !selectedReason ||
              (selectedReason === 'Other' && !customReason.trim()) ||
              cancelOrder.isPending
            }
            onClick={handleCancel}
          >
            {cancelOrder.isPending ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Cancelling...
              </>
            ) : (
              'Cancel Order'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
