'use client';

import { MoreVertical } from 'lucide-react';
import Image from 'next/image';

import type { RecentOrderItem } from '@/types/admin';

interface OrdersTableProps {
  orders: RecentOrderItem[];
}

const statusConfig: Record<RecentOrderItem['status'], { bg: string; text: string }> = {
  Pending: { bg: 'bg-yellow-900/20', text: 'text-yellow-400' },
  Processing: { bg: 'bg-blue-900/20', text: 'text-blue-400' },
  Shipped: { bg: 'bg-purple-900/20', text: 'text-purple-400' },
  Delivered: { bg: 'bg-emerald-900/20', text: 'text-emerald-400' },
  Cancelled: { bg: 'bg-red-900/20', text: 'text-red-400' },
};

function StatusBadge({ status }: { status: RecentOrderItem['status'] }) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex rounded-full px-2 md:px-3 py-1 text-xs font-semibold ${config.bg} ${config.text}`}
    >
      {status}
    </span>
  );
}

function CustomerCell({
  customerName,
  email,
  image,
}: {
  customerName: string;
  email: string;
  image?: string;
}) {
  return (
    <div className="flex items-center gap-2 md:gap-3">
      {image ? (
        <Image
          alt={customerName}
          className="h-7 w-7 md:h-9 md:w-9 rounded-full object-cover"
          height={36}
          src={image}
          width={36}
        />
      ) : (
        <div className="flex h-7 w-7 md:h-9 md:w-9 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-gray-950">
          {customerName.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="flex flex-col">
        <p className="text-xs md:text-sm font-medium text-white">{customerName}</p>
        <p className="hidden md:block text-xs text-gray-500">{email}</p>
      </div>
    </div>
  );
}

export function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="rounded-xl md:rounded-2xl border border-gray-800 bg-gray-900 shadow-sm">
      <div className="border-b border-gray-800 px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base md:text-lg font-semibold text-white">Recent Orders</h3>
            <p className="mt-1 text-xs md:text-sm text-gray-500">Latest transactions</p>
          </div>
          <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-800 hover:text-gray-400">
            <MoreVertical className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm md:text-base">
          <thead>
            <tr className="border-b border-gray-800 bg-gray-800/50">
              <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                Customer
              </th>
              <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                Order ID
              </th>
              <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                Email
              </th>
              <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                Date
              </th>
              <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                Items
              </th>
              <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                Total
              </th>
              <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {orders.map((order) => (
              <tr key={order.id} className="transition-colors hover:bg-gray-800/50">
                <td className="px-3 md:px-6 py-3 md:py-4">
                  <CustomerCell
                    customerName={order.customerName}
                    email={order.email}
                    image={order.customerImage}
                  />
                </td>
                <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm font-medium text-white">{order.orderId}</td>
                <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-400">{order.email}</td>
                <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-400">{order.date}</td>
                <td className="px-3 md:px-6 py-3 md:py-4 text-center text-xs md:text-sm font-medium text-white">
                  {order.itemCount}
                </td>
                <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm font-semibold text-white">
                  KSH {order.total.toLocaleString()}
                </td>
                <td className="px-3 md:px-6 py-3 md:py-4">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
