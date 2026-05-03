'use client';

import { X, ShoppingBag, Loader2 } from 'lucide-react';
import Link from 'next/link';

import { useClearCart } from '@/lib/cart/cart.mutations';
import { useCart } from '@/lib/cart/cart.queries';

import { CartItem } from './cart-item';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { data: cart, isLoading } = useCart();
  const clearCart = useClearCart();

  const handleClearCart = () => {
    if (confirm('Clear all items from cart?')) {
      clearCart.mutate();
    }
  };

  if (!isOpen) {return null;}

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingBag size={24} />
            Shopping Cart
            {cart && cart.totalItems > 0 ? <span className="px-2 py-1 bg-blue-600 text-white text-sm rounded-full">
                {cart.totalItems}
              </span> : null}
          </h2>
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : !cart || cart.items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag className="text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-600 mb-6">
              Add some items to get started
            </p>
            <Link
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              href="/products"
              onClick={onClose}
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700">
                  {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'}
                </h3>
                <button
                  className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
                  disabled={clearCart.isPending}
                  onClick={handleClearCart}
                >
                  Clear cart
                </button>
              </div>

              <div className="space-y-0">
                {cart.items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ${cart.subtotal.toFixed(2)}
                  </span>
                </div>
                {cart.tax > 0 ? <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium text-gray-900">
                      ${cart.tax.toFixed(2)}
                    </span>
                  </div> : null}
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-300">
                  <span>Total</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                className="block w-full px-6 py-4 bg-blue-600 text-white text-center rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                href="/checkout"
                onClick={onClose}
              >
                Proceed to Checkout
              </Link>

              <Link
                className="block w-full px-6 py-3 mt-2 border-2 border-gray-300 text-gray-700 text-center rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                href="/cart"
                onClick={onClose}
              >
                View Cart
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}