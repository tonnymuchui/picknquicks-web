'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface CartDropdownProps {
  cart?: {
    totalItems: number;
    totalPrice: number;
  } | null;
  className?: string;
}

export function CartDropdown({ cart, className }: CartDropdownProps) {
  return (
    <Link
      className={`group relative transition-colors ${className ?? 'text-secondary/80 hover:text-secondary'}`}
      href="/cart"
    >
      <ShoppingCart size={20} />
      {cart && cart.totalItems > 0 ? (
        <span className="bg-secondary text-primary-dark absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold">
          {cart.totalItems}
        </span>
      ) : null}
    </Link>
  );
}
