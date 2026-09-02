'use client';

import { AlertCircle, Minus, Plus, Trash2 } from 'lucide-react';
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
  const imageUrl = resolveMediaUrl(item.productImageUrl);
  const isUpdating = updateItem.isPending || removeItem.isPending;

  const updateQuantity = (quantity: number) => {
    if (quantity >= 1 && quantity <= item.availableStock) {
      updateItem.mutate({ cartItemId: item.id, quantity });
    }
  };

  return (
    <article className="border-line grid grid-cols-[84px_minmax(0,1fr)] gap-4 border-b py-5 sm:grid-cols-[104px_minmax(0,1fr)]">
      <Link
        aria-label={`View ${item.productName}`}
        className="bg-sand relative aspect-square overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
        href={`/products/${item.productSlug}`}
      >
        {imageUrl ? (
          <Image
            fill
            alt={item.productName}
            className="object-cover"
            sizes="104px"
            src={imageUrl}
          />
        ) : (
          <span className="flex h-full items-center justify-center text-2xl text-black/30">
            {item.productName.charAt(0)}
          </span>
        )}
      </Link>

      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              className="line-clamp-2 text-sm font-semibold leading-5 text-black hover:underline"
              href={`/products/${item.productSlug}`}
            >
              {item.productName}
            </Link>
            <p className="mt-1 truncate text-[10px] uppercase tracking-[0.08em] text-black/50">
              SKU {item.productSku}
            </p>
          </div>
          <p className="shrink-0 text-sm font-semibold text-black">
            {formatPriceKsh(item.totalWithTax)}
          </p>
        </div>

        {item.priceChanged && item.currentPrice !== undefined ? (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-[#9a5d3b]">
            <AlertCircle aria-hidden="true" size={14} />
            Price is now {formatPriceKsh(item.currentPrice)}
          </p>
        ) : null}

        {!item.inStock ? (
          <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-700">
            <AlertCircle aria-hidden="true" size={14} />
            Out of stock
          </p>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="border-line flex h-10 items-center rounded-full border">
            <button
              aria-label={`Decrease ${item.productName} quantity`}
              className="flex size-10 items-center justify-center disabled:cursor-not-allowed disabled:opacity-30"
              disabled={isUpdating || item.quantity <= 1}
              type="button"
              onClick={() => updateQuantity(item.quantity - 1)}
            >
              <Minus aria-hidden="true" size={14} />
            </button>
            <span aria-live="polite" className="min-w-8 text-center text-xs font-semibold">
              {item.quantity}
            </span>
            <button
              aria-label={`Increase ${item.productName} quantity`}
              className="flex size-10 items-center justify-center disabled:cursor-not-allowed disabled:opacity-30"
              disabled={isUpdating || item.quantity >= item.availableStock || !item.inStock}
              type="button"
              onClick={() => updateQuantity(item.quantity + 1)}
            >
              <Plus aria-hidden="true" size={14} />
            </button>
          </div>

          <button
            aria-label={`Remove ${item.productName} from cart`}
            className="inline-flex min-h-10 items-center gap-1.5 text-xs text-black/60 hover:text-black disabled:opacity-30"
            disabled={isUpdating}
            type="button"
            onClick={() => removeItem.mutate(item.id)}
          >
            <Trash2 aria-hidden="true" size={15} />
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}
