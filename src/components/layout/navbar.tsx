'use client';

import { useAuth } from '@/lib/auth/hooks';
import { useCart } from '@/lib/queries/cart.queries';
import { UserRole } from '@/types/auth';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Heart, FileText, User, Menu } from 'lucide-react';
import { UserMenu } from '@/components/auth/user-menu';
import { CartDropdown } from './cart-dropdown';
import { WishlistDropdown } from './wishlist-dropdown';
import { MobileMenu } from './mobile-menu';
import { SearchModal } from './search-modal';
import { AuthModal } from '../auth/auth-modal';

export function Navbar() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { data: cart } = '';

  const [mounted, setMounted] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#444444] bg-[#121212]/90 py-5 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-[#B0B0B0]">
            <div className="flex w-auto items-center justify-start gap-2.5 md:w-1/3 md:gap-0">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="transition-colors hover:text-white md:hidden"
              >
                <Menu size={24} />
              </button>

              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                  <span className="text-xl font-bold text-white">PQ</span>
                </div>
                <span className="hidden text-xl font-bold text-white md:block">PickNQuicks</span>
              </Link>
            </div>

            <nav className="hidden items-center gap-8 md:flex">
              <Link href="/" className="font-medium transition-colors hover:text-white">
                Home
              </Link>
              <Link href="/products" className="font-medium transition-colors hover:text-white">
                Products
              </Link>
              <Link href="/categories" className="font-medium transition-colors hover:text-white">
                Categories
              </Link>
              <Link href="/deals" className="font-medium transition-colors hover:text-white">
                Deals
              </Link>

              {mounted &&
                isAuthenticated &&
                user?.roles.some((role) =>
                  [UserRole.ADMIN, UserRole.STAFF, UserRole.MANAGER].includes(role)
                ) && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1 font-medium transition-colors hover:text-yellow-400"
                  >
                    <span>Admin</span>
                    <span className="rounded bg-yellow-500 px-1.5 py-0.5 text-xs text-black">
                      {user.roles.includes(UserRole.ADMIN)
                        ? 'ADMIN'
                        : user.roles.includes(UserRole.MANAGER)
                          ? 'MGR'
                          : 'STAFF'}
                    </span>
                  </Link>
                )}
            </nav>

            <div className="flex w-auto items-center justify-end gap-5 md:w-1/3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="rounded-full p-2 transition-colors hover:bg-[#2a2a2a] hover:text-white"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <CartDropdown cart={cart} />

              <WishlistDropdown />

              {mounted && isAuthenticated && user && (
                <Link href="/orders" className="group relative transition-colors hover:text-white">
                  <FileText size={20} />
                  {cart?.totalItems > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                      {cart.totalItems}
                    </span>
                  )}
                </Link>
              )}

              {!mounted || isLoading ? (
                <button
                  className="rounded-full p-2 transition-colors hover:bg-[#2a2a2a] hover:text-white"
                  aria-label="Sign in"
                >
                  <User size={20} />
                </button>
              ) : isAuthenticated && user ? (
                <UserMenu />
              ) : (
                <button
                  onClick={handleAuthClick}
                  className="rounded-full p-2 transition-colors hover:bg-[#2a2a2a] hover:text-white"
                  aria-label="Sign in"
                >
                  <User size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </>
  );
}
