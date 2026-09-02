import { Package } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { OrderItem } from '@/types/order';

interface OrderItemListProps {
  items: OrderItem[];
  showLinks?: boolean;
}

export function OrderItemList({ items, showLinks = true }: OrderItemListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex gap-4 border-b border-gray-200 pb-4 last:border-0">
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
            {item.productImageUrl ? (
              <Image
                fill
                alt={item.productName}
                className="object-contain p-2"
                src={item.productImageUrl}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Package className="text-gray-400" size={32} />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            {showLinks ? (
              <Link
                className="line-clamp-2 font-semibold text-gray-900 hover:text-black/65"
                href={`/products/${item.productId}`}
              >
                {item.productName}
              </Link>
            ) : (
              <h3 className="line-clamp-2 font-semibold text-gray-900">{item.productName}</h3>
            )}

            <p className="mt-1 text-sm text-gray-600">SKU: {item.productSku}</p>

            <div className="mt-2 flex items-center gap-4 text-sm">
              <span className="text-gray-600">
                Qty: <span className="font-medium text-gray-900">{item.quantity}</span>
              </span>
              <span className="text-gray-600">
                Price:{' '}
                <span className="font-medium text-gray-900">KES {item.unitPrice.toFixed(2)}</span>
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">KES {item.total.toFixed(2)}</p>
            {item.taxAmount > 0 ? (
              <p className="mt-1 text-xs text-gray-600">
                (incl. tax: KES {item.taxAmount.toFixed(2)})
              </p>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
