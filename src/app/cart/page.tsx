'use client';

import { AlertCircle, ArrowLeft, Loader2, LockKeyhole, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

import { CartItem } from '@/components/cart/cart-item';
import { useClearCart } from '@/lib/cart/cart.mutations';
import { useCart } from '@/lib/cart/cart.queries';
import { formatPriceKsh } from '@/lib/utils/currency';

export default function CartPage() {
  const { data: cart, error, isLoading, refetch } = useCart();
  const clearCart = useClearCart();

  if (isLoading) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center">
        <Loader2 aria-label="Loading cart" className="animate-spin" size={28} />
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center px-5 text-center">
        <div className="max-w-md">
          <AlertCircle aria-hidden="true" className="mx-auto text-black/25" size={48} />
          <h1 className="mt-5 text-3xl font-medium tracking-[-0.035em]">
            Your cart could not load
          </h1>
          <p className="mt-3 text-sm leading-6 text-black/55">
            Try again before continuing to checkout.
          </p>
          <button
            className="bg-ink mt-6 min-h-12 px-7 text-sm font-semibold text-white"
            type="button"
            onClick={() => refetch()}
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center px-5 text-center">
        <div className="max-w-md">
          <ShoppingBag
            aria-hidden="true"
            className="mx-auto text-black/20"
            size={58}
            strokeWidth={1}
          />
          <h1 className="mt-5 text-3xl font-medium tracking-[-0.035em]">Your cart is empty</h1>
          <p className="mt-3 text-sm leading-6 text-black/55">
            Add a product to start building your order.
          </p>
          <Link
            className="bg-ink mt-7 inline-flex min-h-12 items-center gap-2 px-7 text-sm font-semibold text-white"
            href="/products"
          >
            <ArrowLeft aria-hidden="true" size={16} />
            Browse products
          </Link>
        </div>
      </main>
    );
  }

  const clearAll = () => {
    if (window.confirm('Clear every item from your cart?')) {
      clearCart.mutate();
    }
  };

  return (
    <main className="bg-canvas min-h-screen">
      <header className="border-line border-b px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-warm text-xs font-semibold uppercase tracking-[0.16em]">Your order</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-medium tracking-[-0.045em] sm:text-5xl">Shopping cart</h1>
            <p className="text-sm text-black/55">
              {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-12 lg:py-16">
        <section aria-labelledby="cart-items-heading">
          <div className="border-line flex min-h-14 items-center justify-between border-b">
            <h2
              className="text-sm font-semibold uppercase tracking-[0.12em]"
              id="cart-items-heading"
            >
              Items
            </h2>
            <button
              className="min-h-11 text-xs text-black/55 hover:underline disabled:opacity-40"
              disabled={clearCart.isPending}
              type="button"
              onClick={clearAll}
            >
              Clear cart
            </button>
          </div>
          {cart.items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <Link
            className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold hover:underline"
            href="/products"
          >
            <ArrowLeft aria-hidden="true" size={16} />
            Continue shopping
          </Link>
        </section>

        <aside className="border-line h-fit border p-6 sm:p-8 lg:sticky lg:top-6">
          <h2 className="text-xl font-medium tracking-[-0.02em]">Order summary</h2>
          <div className="mt-6 space-y-3 text-sm">
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
              <span>Total</span>
              <span>{formatPriceKsh(cart.total)}</span>
            </div>
          </div>
          <p className="mt-3 text-xs leading-5 text-black/50">
            Delivery options and their exact cost are confirmed in checkout.
          </p>
          <Link
            className="bg-ink mt-6 flex min-h-14 w-full items-center justify-center text-sm font-semibold text-white"
            href="/checkout"
          >
            Proceed to checkout
          </Link>
          <p className="mt-4 flex items-center justify-center gap-2 text-[11px] text-black/50">
            <LockKeyhole aria-hidden="true" size={13} /> Secure checkout
          </p>
        </aside>
      </div>
    </main>
  );
}
