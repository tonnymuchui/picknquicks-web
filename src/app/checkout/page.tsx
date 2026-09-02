'use client';

import { ArrowLeft, Loader2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { CheckoutForm } from '@/components/checkout/checkout-form';
import { OrderSummary } from '@/components/checkout/order-summary';
import { useCart } from '@/lib/cart/cart.queries';

export default function CheckoutPage() {
  const router = useRouter();
  const { data: cart, isLoading } = useCart();

  useEffect(() => {
    if (!isLoading && cart && cart.items.length === 0) {
      router.replace('/cart');
    }
  }, [cart, isLoading, router]);

  if (isLoading) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center">
        <Loader2 aria-label="Loading checkout" className="animate-spin" size={28} />
      </main>
    );
  }

  if (!cart || cart.items.length === 0) {
    return null;
  }

  return (
    <main className="bg-canvas min-h-screen">
      <header className="border-line border-b px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <Link
            className="inline-flex min-h-11 items-center gap-2 text-sm hover:underline"
            href="/cart"
          >
            <ArrowLeft aria-hidden="true" size={16} />
            Back to cart
          </Link>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-warm text-xs font-semibold uppercase tracking-[0.16em]">
                Secure order
              </p>
              <h1 className="mt-2 text-4xl font-medium tracking-[-0.045em] sm:text-5xl">
                Checkout
              </h1>
            </div>
            <p className="flex items-center gap-2 text-sm text-black/55">
              <ShoppingBag aria-hidden="true" size={16} />
              {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] items-start gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:px-12 lg:py-16">
        <CheckoutForm />
        <OrderSummary />
      </div>
    </main>
  );
}
