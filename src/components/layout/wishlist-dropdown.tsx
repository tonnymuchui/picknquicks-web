'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';

interface WishlistDropdownProps {
  className?: string;
}

export function WishlistDropdown({ className }: WishlistDropdownProps) {
  const wishlistCount = 0;

  return (
    <Link
      className={`group relative transition-colors ${className ?? 'text-secondary/80 hover:text-secondary'}`}
      href="/wishlist"
    >
      <Heart size={20} />
      {wishlistCount > 0 ? (
        <span className="bg-secondary text-primary-dark absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold">
          {wishlistCount}
        </span>
      ) : null}
    </Link>
  );
}
