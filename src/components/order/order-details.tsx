'use client';

import { format } from 'date-fns';
import { CreditCard, MapPin, Package, User, XCircle } from 'lucide-react';
import { useState } from 'react';

import { formatPriceKsh } from '@/lib/utils/currency';

import { CancelOrderModal } from './cancel-order-modal';
import { OrderItemList } from './order-item-list';
import { OrderStatusBadge } from './order-status-badge';
import { EmailInvoiceButton, PrintableInvoice, PrintInvoiceButton } from './printable-invoice';

import type { Order, OrderStatus, PaymentMethod } from '@/types/order';

interface OrderDetailsProps {
  order: Order;
  showActions?: boolean;
  showEmailAction?: boolean;
}

const cancellableStatuses: readonly OrderStatus[] = ['AWAITING_PAYMENT', 'PAYMENT_FAILED'];

const paymentMethodLabels: Record<PaymentMethod, string> = {
  MPESA_FULL: 'M-Pesa',
  CASH_ON_DELIVERY: 'Cash on Delivery',
};

export function OrderDetails({
  order,
  showActions = true,
  showEmailAction = false,
}: OrderDetailsProps) {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const canCancel = !order.isGuest && cancellableStatuses.includes(order.status);

  return (
    <>
      <PrintableInvoice order={order} />
      <div className="space-y-6 print:hidden">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="mb-2 text-2xl font-bold text-gray-900">Order #{order.orderNumber}</h1>
              <p className="text-gray-600">Placed on {format(new Date(order.createdAt), 'PPP')}</p>
            </div>
            <div className="flex items-center gap-3">
              <OrderStatusBadge status={order.status} />
              <PrintInvoiceButton orderNumber={order.orderNumber} />
              {showEmailAction ? (
                <EmailInvoiceButton email={order.email} orderId={order.id} />
              ) : null}
              {showActions && canCancel ? (
                <button
                  className="flex items-center gap-2 rounded-lg border-2 border-red-300 px-4 py-2 font-semibold text-red-600 hover:bg-red-50"
                  onClick={() => setShowCancelModal(true)}
                >
                  <XCircle size={18} />
                  Cancel Order
                </button>
              ) : null}
            </div>
          </div>

          {order.trackingNumber ? (
            <div className="mt-4 rounded-lg border border-black/15 bg-[#f1f1f1] p-4">
              <p className="text-sm font-medium text-black/65">Tracking Number</p>
              <p className="mt-1 font-mono text-lg font-bold text-black/65">
                {order.trackingNumber}
              </p>
              {order.estimatedDeliveryDate ? (
                <p className="mt-2 text-sm text-black/65">
                  Estimated delivery: {format(new Date(order.estimatedDeliveryDate), 'PPP')}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
            <Package size={20} />
            Order Items
          </h2>
          <OrderItemList items={order.items} />
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
            <MapPin size={20} />
            Shipping Address
          </h2>
          <div className="space-y-1 text-gray-700">
            <p className="font-semibold">{order.shippingAddress.recipientName}</p>
            <p>{order.shippingAddress.phoneNumber}</p>
            <p>{order.shippingAddress.addressLine1}</p>
            {order.shippingAddress.addressLine2 ? (
              <p>{order.shippingAddress.addressLine2}</p>
            ) : null}
            <p>
              {order.shippingAddress.city}
              {order.shippingAddress.county ? `, ${order.shippingAddress.county}` : null}
              {order.shippingAddress.postalCode ? ` ${order.shippingAddress.postalCode}` : null}
            </p>
            <p>{order.shippingAddress.country}</p>
            {order.shippingAddress.notes ? (
              <p className="mt-2 text-sm italic text-gray-600">
                Note: {order.shippingAddress.notes}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
              <CreditCard size={20} />
              Payment Information
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Method</span>
                <span className="font-medium text-gray-900">
                  {paymentMethodLabels[order.paymentMethod]}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span
                  className={`font-medium ${
                    order.paymentStatus === 'COMPLETED'
                      ? 'text-black/65'
                      : order.paymentStatus === 'FAILED'
                        ? 'text-red-600'
                        : 'text-black/65'
                  }`}
                >
                  {order.paymentMethod === 'CASH_ON_DELIVERY' && order.paymentStatus === 'COMPLETED'
                    ? 'DELIVERY FEE PAID'
                    : order.paymentStatus}
                </span>
              </div>
              {order.payment?.mpesaReceiptNumber ? (
                <div className="flex justify-between">
                  <span className="text-gray-600">M-Pesa Receipt</span>
                  <span className="font-mono text-sm font-medium text-gray-900">
                    {order.payment.mpesaReceiptNumber}
                  </span>
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-bold text-gray-900">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span className="font-medium">{formatPriceKsh(order.subtotal)}</span>
              </div>
              {order.taxAmount > 0 ? (
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span className="font-medium">{formatPriceKsh(order.taxAmount)}</span>
                </div>
              ) : null}
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className="font-medium">{formatPriceKsh(order.shippingCost)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-black/65">{formatPriceKsh(order.totalAmount)}</span>
                </div>
                <div className="mt-3 flex justify-between text-sm text-gray-700">
                  <span>Paid</span>
                  <span className="font-medium">{formatPriceKsh(order.paidAmount)}</span>
                </div>
                <div className="mt-2 flex justify-between text-sm text-gray-700">
                  <span>Balance due</span>
                  <span className="font-semibold">{formatPriceKsh(order.balanceDue)}</span>
                </div>
                {order.paymentMethod === 'CASH_ON_DELIVERY' ? (
                  <div className="mt-3 rounded border border-black/15 bg-[#f1f1f1] p-3">
                    <p className="text-sm font-medium text-black/65">Amount to pay on delivery:</p>
                    <p className="text-xl font-bold text-black/65">
                      {formatPriceKsh(order.amountDueOnDelivery)}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
            <User size={20} />
            Customer Information
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium text-gray-900">{order.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{order.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium text-gray-900">{order.phoneNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Account Type</p>
              <p className="font-medium text-gray-900">
                {order.source === 'PHONE'
                  ? 'Phone / WhatsApp order'
                  : order.source === 'IN_STORE'
                    ? 'In-store order'
                    : order.isGuest
                      ? 'Guest checkout'
                      : 'Registered customer'}
              </p>
            </div>
          </div>
        </div>

        <CancelOrderModal
          isOpen={showCancelModal}
          orderId={order.id}
          orderNumber={order.orderNumber}
          onClose={() => setShowCancelModal(false)}
        />
      </div>
    </>
  );
}
