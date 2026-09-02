'use client';

import { format } from 'date-fns';
import { Eye, Banknote, Smartphone } from 'lucide-react';
import Link from 'next/link';

import { OrderStatusBadge } from '@/components/order/order-status-badge';

import type { Order } from '@/types/order';

interface AdminOrderTableProps {
  orders: Order[];
}

export function AdminOrderTable({ orders }: AdminOrderTableProps) {
  if (orders.length === 0) {
    return (
      <div className=" border border-black/15 bg-white p-16 text-center text-black/45 ">
        No orders match your current filters.
      </div>
    );
  }

  return (
    <div className="overflow-hidden  border border-black/15 bg-white ">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-black/15 bg-gray-50">
            <tr>
              {[
                'Order',
                'Customer',
                'Date',
                'Status',
                'Payment',
                'M-Pesa',
                'COD Due',
                'Actions',
              ].map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-black/45"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="transition-colors hover:bg-[#f1f1f1]">
                <td className="px-4 py-3">
                  <div>
                    <p className="font-mono text-xs font-semibold text-black">
                      {order.orderNumber}
                    </p>
                    <p className="mt-0.5 text-xs text-black/45">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-black">{order.customerName}</p>
                    <p className="text-xs text-black/45">{order.email}</p>
                    <p className="text-xs text-black/45">{order.phoneNumber}</p>
                    {order.isGuest ? (
                      <span className="mt-1 inline-block  bg-gray-100 px-1.5 py-0.5 text-xs text-black/65">
                        Guest
                      </span>
                    ) : null}
                  </div>
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-black/65">
                  {format(new Date(order.createdAt), 'dd MMM yyyy')}
                  <br />
                  <span className="text-xs text-black/45">
                    {format(new Date(order.createdAt), 'HH:mm')}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <OrderStatusBadge status={order.status} />
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {order.paymentMethod === 'MPESA_FULL' ? (
                      <>
                        <Smartphone className="text-black/60" size={14} />
                        <span className="text-xs font-medium text-black/60">M-Pesa Full</span>
                      </>
                    ) : (
                      <>
                        <Banknote className="text-black/60" size={14} />
                        <span className="text-xs font-medium text-black/60">COD</span>
                      </>
                    )}
                  </div>
                  <span
                    className={`mt-1 inline-block  px-1.5 py-0.5 text-xs font-medium ${
                      order.paymentStatus === 'COMPLETED'
                        ? 'bg-[#f1f1f1] text-black/60'
                        : order.paymentStatus === 'FAILED'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-[#f1f1f1] text-black/60'
                    }`}
                  >
                    {order.paymentMethod === 'CASH_ON_DELIVERY' &&
                    order.paymentStatus === 'COMPLETED'
                      ? 'DELIVERY FEE PAID'
                      : order.paymentStatus}
                  </span>
                </td>

                <td className="px-4 py-3 font-semibold text-black">
                  KES {(order.payment?.amount ?? 0).toLocaleString()}
                </td>

                <td className="px-4 py-3">
                  {order.balanceDue > 0 ? (
                    <span className="font-semibold text-black/60">
                      KES {order.balanceDue.toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-xs text-black/45">—</span>
                  )}
                </td>

                <td className="px-4 py-3">
                  <Link
                    className="inline-flex items-center gap-1.5  bg-[#f1f1f1] px-3 py-1.5 text-xs font-medium text-black/60 transition-colors hover:bg-[#f1f1f1]"
                    href={`/admin/orders/${order.id}`}
                  >
                    <Eye size={14} />
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
