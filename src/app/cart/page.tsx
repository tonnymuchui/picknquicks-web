'use client';

import { Loader2, ShoppingBag, ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';

import { CartItem } from '@/components/cart/cart-item';
import { useClearCart } from '@/lib/cart/cart.mutations';
import { useCart } from '@/lib/cart/cart.queries';
import { formatPriceKsh } from '@/lib/utils/currency';

export default function CartPage() {
  const { data: cart, isLoading, error } = useCart();
  const clearCart = useClearCart();

  const handleClearCart = () => {
    if (confirm('Clear all items from cart?')) {
      clearCart.mutate();
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <AlertCircle className="mx-auto mb-6 text-red-300" size={80} />
            <h1 className="mb-4 text-3xl font-bold text-gray-900">Unable to Load Cart</h1>
            <p className="mb-8 text-gray-600">
              We encountered an error while loading your cart. Please try again later.
            </p>
            <Link
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white transition-colors hover:bg-blue-700"
              href="/products"
            >
              <ArrowLeft size={20} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <ShoppingBag className="mx-auto mb-6 text-gray-300" size={80} />
            <h1 className="mb-4 text-3xl font-bold text-gray-900">Your cart is empty</h1>
            <p className="mb-8 text-gray-600">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Link
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white transition-colors hover:bg-blue-700"
              href="/products"
            >
              <ArrowLeft size={20} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="mt-1 text-gray-600">
            {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white shadow">
              <div className="flex items-center justify-between border-b border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900">Cart Items</h2>
                <button
                  className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
                  disabled={clearCart.isPending}
                  onClick={handleClearCart}
                >
                  Clear cart
                </button>
              </div>

              <div className="divide-y divide-gray-200 p-6">
                {cart.items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            <Link
              className="mt-6 inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700"
              href="/products"
            >
              <ArrowLeft size={20} />
              Continue Shopping
            </Link>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Order Summary</h2>

              <div className="mb-6 space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({cart.totalItems} items)</span>
                  <span className="font-medium">{formatPriceKsh(cart.subtotal)}</span>
                </div>

                {cart.tax > 0 ? (
                  <div className="flex justify-between text-gray-700">
                    <span>Tax</span>
                    <span className="font-medium">{formatPriceKsh(cart.tax)}</span>
                  </div>
                ) : null}

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>{formatPriceKsh(cart.total)}</span>
                  </div>
                </div>
              </div>

              <Link
                className="mb-3 block w-full rounded-lg bg-blue-600 px-6 py-4 text-center font-semibold text-white transition-colors hover:bg-blue-700"
                href="/checkout"
              >
                Proceed to Checkout
              </Link>

              <div className="text-center text-sm text-gray-500">
                Secure checkout with SSL encryption
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
