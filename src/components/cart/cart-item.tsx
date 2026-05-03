'use client';

import { Minus, Plus, Trash2, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';


import { useRemoveFromCart, useUpdateCartItem } from '@/lib/cart/cart.mutations';
import { formatPriceKsh } from '@/lib/utils/currency';
import { resolveMediaUrl } from '@/lib/utils/media';

import type { CartItem as CartItemType } from '@/types/cart';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveFromCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > item.availableStock) {return;}
    updateItem.mutate({ cartItemId: item.id, input: { quantity: newQuantity } });
  };

  const handleRemove = () => {
    removeItem.mutate(item.id);
  };

  return (
    <div className="flex gap-4 border-b border-gray-200 py-4">
      <Link className="flex-shrink-0" href={`/products/${item.productSlug}`}>
        {item.productImageUrl ? (
          <Image
            alt={item.productName}
            className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
            height={80}
            src={resolveMediaUrl(item.productImageUrl) || ''}
            width={80}
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100">
            <span className="text-2xl text-gray-400">{item.productName[0]}</span>
          </div>
        )}
      </Link>

      <div className="min-w-0 flex-1">
        <Link
          className="line-clamp-2 font-semibold text-gray-900 hover:text-blue-600"
          href={`/products/${item.productSlug}`}
        >
          {item.productName}
        </Link>

        <p className="mt-1 text-sm text-gray-600">SKU: {item.productSku}</p>

        {item.priceChanged && item.currentPrice !== undefined ? <div className="mt-2 flex items-center gap-2 text-sm">
            <AlertCircle className="text-orange-500" size={16} />
            <span className="text-orange-700">
              Price changed: {formatPriceKsh(item.currentPrice)}
            </span>
          </div> : null}

        {!item.inStock ? <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
            <AlertCircle size={16} />
            <span>Out of stock</span>
          </div> : null}

        <div className="mt-3 flex items-center gap-4">
          <div className="flex items-center rounded-lg border border-gray-300">
            <button
              className="p-2 hover:bg-gray-100 disabled:opacity-50"
              disabled={updateItem.isPending || item.quantity <= 1}
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              <Minus size={16} />
            </button>
            <span className="min-w-[3rem] px-4 py-2 text-center font-medium">{item.quantity}</span>
            <button
              className="p-2 hover:bg-gray-100 disabled:opacity-50"
              disabled={updateItem.isPending || item.quantity >= item.availableStock}
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            className="rounded-lg p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
            disabled={removeItem.isPending}
            onClick={handleRemove}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="text-right">
        <div className="text-lg font-bold text-gray-900">{formatPriceKsh(item.totalWithTax)}</div>
        {item.quantity > 1 ? <div className="mt-1 text-sm text-gray-600">{formatPriceKsh(item.price)} each</div> : null}
      </div>
    </div>
  );
}
