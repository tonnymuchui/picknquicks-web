'use client';

import { ShoppingCart, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';

import { useAddToCart } from '@/lib/cart/cart.mutations';

interface AddToCartButtonProps {
  productId: string;
  _productName?: string;
  inStock: boolean;
  quantity?: number;
  variant?: 'default' | 'icon';
  className?: string;
}

export function AddToCartButton({
  productId,
  _productName,
  inStock,
  quantity = 1,
  variant = 'default',
  className = '',
}: AddToCartButtonProps) {
  const addToCart = useAddToCart();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await addToCart.mutateAsync({ productId, quantity });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (_error) {}
  };

  if (!inStock) {
    return (
      <button
        disabled
        className={`${
          variant === 'icon' ? 'p-2' : 'px-6 py-3'
        } cursor-not-allowed rounded-lg bg-gray-300 font-semibold text-gray-500 ${className}`}
      >
        {variant === 'icon' ? <ShoppingCart size={20} /> : 'Out of Stock'}
      </button>
    );
  }

  if (showSuccess) {
    return (
      <button
        disabled
        className={`${
          variant === 'icon' ? 'p-2' : 'px-6 py-3'
        } flex items-center justify-center gap-2 rounded-lg bg-green-600 font-semibold text-white ${className}`}
      >
        <Check size={20} />
        {variant === 'default' ? 'Added!' : null}
      </button>
    );
  }

  return (
    <button
      className={`${
        variant === 'icon' ? 'p-2' : 'px-6 py-3'
      } flex items-center justify-center gap-2 rounded-lg bg-blue-600 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50 ${className}`}
      disabled={addToCart.isPending}
      onClick={handleAddToCart}
    >
      {addToCart.isPending ? (
        <Loader2 className="animate-spin" size={20} />
      ) : (
        <>
          <ShoppingCart size={20} />
          {variant === 'default' ? 'Add to Cart' : null}
        </>
      )}
    </button>
  );
}
