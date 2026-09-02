'use client';

import { Check, Loader2, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

import { useAddToCart } from '@/lib/cart/cart.mutations';

interface AddToCartButtonProps {
  productId: string;
  inStock: boolean;
  quantity?: number;
  variant?: 'default' | 'icon';
  className?: string;
}

export function AddToCartButton({
  productId,
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
    } catch {}
  };

  if (!inStock) {
    return (
      <button
        disabled
        className={`${variant === 'icon' ? 'h-11 w-11' : 'min-h-11 px-5 py-2.5'} border-line bg-sand text-muted-foreground flex cursor-not-allowed items-center justify-center rounded-full border text-sm font-semibold ${className}`}
        type="button"
      >
        {variant === 'icon' ? <ShoppingBag size={18} /> : 'Out of stock'}
      </button>
    );
  }

  if (showSuccess) {
    return (
      <button
        disabled
        aria-live="polite"
        className={`${variant === 'icon' ? 'h-11 w-11' : 'min-h-11 px-5 py-2.5'} flex items-center justify-center gap-2 rounded-full bg-black text-sm font-semibold text-white transition-colors hover:bg-[#292621] ${className}`}
        type="button"
      >
        <Check size={18} />
        {variant === 'default' ? 'Added!' : null}
      </button>
    );
  }

  return (
    <button
      className={`${variant === 'icon' ? 'h-11 w-11' : 'min-h-11 px-5 py-2.5'} bg-primary hover:bg-primary-light flex items-center justify-center gap-2 rounded-full text-sm font-semibold text-white transition-colors disabled:cursor-wait disabled:opacity-60 ${className}`}
      disabled={addToCart.isPending}
      type="button"
      onClick={handleAddToCart}
    >
      {addToCart.isPending ? (
        <Loader2 aria-hidden="true" className="animate-spin" size={18} />
      ) : (
        <>
          <ShoppingBag aria-hidden="true" size={18} />
          {variant === 'default' ? 'Add to Cart' : null}
        </>
      )}
    </button>
  );
}
