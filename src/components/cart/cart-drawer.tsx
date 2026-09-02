'use client';

import { Loader2, ShoppingBag, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

import { useClearCart } from '@/lib/cart/cart.mutations';
import { useCart } from '@/lib/cart/cart.queries';
import { formatPriceKsh } from '@/lib/utils/currency';

import { CartItem } from './cart-item';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { data: cart, isLoading } = useCart(isOpen);
  const clearCart = useClearCart();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const clearAll = () => {
    if (window.confirm('Clear every item from your cart?')) {
      clearCart.mutate();
    }
  };

  return (
    <div
      aria-label="Shopping cart"
      aria-modal="true"
      className="fixed inset-0 z-[80]"
      role="dialog"
    >
      <button
        aria-label="Close cart"
        className="absolute inset-0 bg-black/45"
        type="button"
        onClick={onClose}
      />

      <aside className="absolute right-0 top-0 flex h-dvh w-full max-w-[470px] flex-col bg-white shadow-2xl">
        <header className="border-line flex min-h-[76px] items-center justify-between border-b px-5 sm:px-7">
          <div className="flex items-center gap-3">
            <ShoppingBag aria-hidden="true" size={20} strokeWidth={1.5} />
            <h2 className="text-base font-semibold uppercase tracking-[0.12em]">Cart</h2>
            {cart?.totalItems ? (
              <span className="bg-ink rounded-full px-2 py-0.5 text-[10px] text-white">
                {cart.totalItems}
              </span>
            ) : null}
          </div>
          <button
            aria-label="Close cart"
            className="flex size-11 items-center justify-center"
            type="button"
            onClick={onClose}
          >
            <X aria-hidden="true" size={20} strokeWidth={1.5} />
          </button>
        </header>

        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <Loader2 aria-label="Loading cart" className="animate-spin" size={26} />
          </div>
        ) : !cart || cart.items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <ShoppingBag aria-hidden="true" className="text-black/20" size={54} strokeWidth={1} />
            <h3 className="mt-6 text-2xl font-medium tracking-[-0.03em]">Your cart is empty</h3>
            <p className="mt-2 max-w-xs text-sm leading-6 text-black/55">
              Explore the collection and add the pieces that fit your setup.
            </p>
            <Link
              className="bg-ink mt-7 inline-flex min-h-12 items-center justify-center px-7 text-sm font-semibold text-white"
              href="/products"
              onClick={onClose}
            >
              Browse products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 sm:px-7">
              <div className="flex min-h-14 items-center justify-between">
                <p className="text-xs text-black/55">
                  {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'}
                </p>
                <button
                  className="min-h-11 text-xs text-black/55 underline-offset-4 hover:underline disabled:opacity-40"
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
            </div>

            <footer className="border-line bg-sand/45 border-t p-5 sm:p-7">
              <div className="space-y-2 text-sm">
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
                <div className="border-line flex justify-between border-t pt-3 text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPriceKsh(cart.total)}</span>
                </div>
              </div>
              <p className="mt-2 text-[11px] text-black/50">Delivery is calculated at checkout.</p>
              <Link
                className="bg-ink mt-5 flex min-h-14 w-full items-center justify-center text-sm font-semibold text-white"
                href="/checkout"
                onClick={onClose}
              >
                Checkout
              </Link>
              <Link
                className="border-ink mt-2 flex min-h-12 w-full items-center justify-center border text-sm font-semibold"
                href="/cart"
                onClick={onClose}
              >
                View cart
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
