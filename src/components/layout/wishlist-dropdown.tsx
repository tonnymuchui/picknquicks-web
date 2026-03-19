'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';

export function WishlistDropdown() {
  const wishlistCount = 0;

  return (
    <Link
      className="group relative hover:text-white transition-colors"
      href="/wishlist"
    >
      <Heart size={20} />
      {wishlistCount > 0 ? <span className="absolute -top-1 -right-1 bg-red-600 text-white h-4 w-4 rounded-full text-xs font-semibold flex items-center justify-center">
          {wishlistCount}
        </span> : null}
    </Link>
  );
}