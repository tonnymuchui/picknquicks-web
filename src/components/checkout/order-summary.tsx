'use client';

import { Package } from 'lucide-react';
import Image from 'next/image';

import { useCart } from '@/lib/cart/cart.queries';
import { formatPriceKsh } from '@/lib/utils/currency';
import { resolveMediaUrl } from '@/lib/utils/media';

export function OrderSummary() {
  const { data: cart, isLoading } = useCart();

  if (isLoading) {
    return (
      <div aria-label="Loading order summary" className="border-line border p-6">
        <div className="animate-pulse space-y-4 motion-reduce:animate-none">
          <div className="h-6 w-1/2 bg-black/10" />
          <div className="h-16 bg-black/10" />
          <div className="h-16 bg-black/10" />
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return null;
  }

  return (
    <aside className="border-line border bg-white lg:sticky lg:top-6">
      <header className="border-line border-b p-6">
        <h2 className="text-xl font-medium tracking-[-0.02em]">Order summary</h2>
        <p className="mt-1 text-xs text-black/50">
          {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'}
        </p>
      </header>

      <div className="max-h-[420px] overflow-y-auto p-6">
        <div className="space-y-5">
          {cart.items.map((item) => {
            const imageUrl = resolveMediaUrl(item.productImageUrl);

            return (
              <article key={item.id} className="grid grid-cols-[64px_minmax(0,1fr)] gap-3">
                <div className="bg-sand relative aspect-square overflow-hidden">
                  {imageUrl ? (
                    <Image
                      fill
                      alt={item.productName}
                      className="object-cover"
                      sizes="64px"
                      src={imageUrl}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-black/25">
                      <Package aria-hidden="true" size={26} />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="line-clamp-2 text-xs font-semibold leading-5">
                      {item.productName}
                    </p>
                    <p className="shrink-0 text-xs font-semibold">
                      {formatPriceKsh(item.totalWithTax)}
                    </p>
                  </div>
                  <p className="mt-1 text-[11px] text-black/50">
                    {item.quantity} × {formatPriceKsh(item.price)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="border-line space-y-3 border-t p-6 text-sm">
        <div className="flex justify-between text-black/60">
          <span>Subtotal</span>
          <span className="text-black">{formatPriceKsh(cart.subtotal)}</span>
        </div>
        {cart.tax > 0 ? (
          <div className="flex justify-between text-black/60">
            <span>Tax</span>
            <span className="text-black">{formatPriceKsh(cart.tax)}</span>
          </div>
        ) : null}
        <div className="border-line flex justify-between border-t pt-4 text-lg font-semibold">
          <span>Cart total</span>
          <span>{formatPriceKsh(cart.total)}</span>
        </div>
        <p className="text-[11px] leading-5 text-black/50">
          Delivery is added after you select an available rate.
        </p>
      </div>
    </aside>
  );
}
