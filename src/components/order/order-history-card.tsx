import { format } from 'date-fns';
import { ArrowRight, Package } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { OrderStatusBadge } from './order-status-badge';

import type { Order } from '@/types/order';

interface OrderHistoryCardProps {
  order: Order;
}

export function OrderHistoryCard({ order }: OrderHistoryCardProps) {
  return (
    <Link href={`/orders/${order.id}`}>
      <div className="cursor-pointer rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-lg">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Order #{order.orderNumber}</h3>
            <p className="mt-1 text-sm text-gray-600">{format(new Date(order.createdAt), 'PPP')}</p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        <div className="mb-4 flex gap-2 overflow-x-auto">
          {order.items.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100"
            >
              {item.productImageUrl ? (
                <Image
                  fill
                  alt={item.productName}
                  className="object-contain p-1"
                  src={item.productImageUrl}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Package className="text-gray-400" size={24} />
                </div>
              )}
            </div>
          ))}
          {order.items.length > 4 ? (
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
              <span className="text-sm font-medium text-gray-600">+{order.items.length - 4}</span>
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div>
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="text-xl font-bold text-gray-900">KES {order.totalAmount.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-2 font-medium text-black/65">
            View Details
            <ArrowRight size={20} />
          </div>
        </div>
      </div>
    </Link>
  );
}
