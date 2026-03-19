'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface CartDropdownProps {
  cart?: {
    totalItems: number;
    totalPrice: number;
  } | null;
}

export function CartDropdown({ cart }: CartDropdownProps) {
  return (
    <Link
      className="group relative hover:text-white transition-colors"
      href="/cart"
    >
      <ShoppingCart size={20} />
      {cart && cart.totalItems > 0 ? <span className="absolute -top-1 -right-1 bg-green-600 text-white h-4 w-4 rounded-full text-xs font-semibold flex items-center justify-center">
          {cart.totalItems}
        </span> : null}
    </Link>
  );
}