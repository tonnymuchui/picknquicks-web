'use client';

import { Search, FileText, User, Menu } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import { UserMenu } from '@/components/auth/user-menu';
import { useAuth } from '@/lib/auth/hooks';
import { useCategoryTree } from '@/lib/category/categories.queries';
import { UserRole } from '@/types/auth';

import { CartDropdown } from './cart-dropdown';
import { MobileMenu } from './mobile-menu';
import { SearchModal } from './search-modal';
import { WishlistDropdown } from './wishlist-dropdown';
import { AuthModal } from '../auth/auth-modal';

export function Navbar() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { data: navCategories } = useCategoryTree(true);
  const cart = null;

  const [mounted, setMounted] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
                className="transition-colors hover:text-white md:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>

              <Link className="flex items-center gap-2" href="/">
                <div className="bg-linear-to-br flex h-10 w-10 items-center justify-center rounded-lg from-blue-500 to-purple-600">
                  <span className="text-xl font-bold text-white">PQ</span>
                </div>
                <span className="hidden text-xl font-bold text-white md:block">PickNQuicks</span>
              </Link>
            </div>

            <nav className="hidden items-center gap-8 md:flex">
              <Link className="font-medium transition-colors hover:text-white" href="/">
                Home
              </Link>
              <Link className="font-medium transition-colors hover:text-white" href="/products">
                Products
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => setIsCategoriesOpen(false)}
              >
                <button className="font-medium transition-colors hover:text-white" type="button">
                  Categories
                </button>

                {isCategoriesOpen ? (
                  <div className="absolute left-0 top-full mt-3 w-80 rounded-xl border border-[#2f2f2f] bg-[#151515] p-3 shadow-xl">
                    <div className="mb-2 flex items-center justify-between px-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-[#9b9b9b]">
                        Shop by category
                      </span>
                      <Link
                        className="text-xs text-blue-400 transition-colors hover:text-blue-300"
                        href="/categories"
                      >
                        View all
                      </Link>
                    </div>

                    {navCategories && navCategories.length > 0 ? (
                      <div className="space-y-1">
                        {navCategories.slice(0, 10).map((category) => (
                          <Link
                            key={category.id}
                            className="flex items-center justify-between rounded-lg px-2.5 py-2 text-sm text-white transition hover:bg-[#262626]"
                            href={`/categories?slug=${encodeURIComponent(category.slug)}`}
                          >
                            <span className="truncate">{category.name}</span>
                            <span className="text-xs text-[#8d8d8d]">
                              {category.children.length > 0
                                ? `${category.children.length} sub`
                                : ''}
                            </span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="px-2 py-1 text-sm text-[#9b9b9b]">No categories available</p>
                    )}
                  </div>
                ) : null}
              </div>
              <Link className="font-medium transition-colors hover:text-white" href="/deals">
                Deals
              </Link>

              {mounted &&
              isAuthenticated &&
              user?.roles.some((role) =>
                [UserRole.ADMIN, UserRole.STAFF, UserRole.MANAGER].includes(role)
              ) ? (
                <Link
                  className="flex items-center gap-1 font-medium transition-colors hover:text-yellow-400"
                  href="/admin"
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
              ) : null}
            </nav>

            <div className="flex w-auto items-center justify-end gap-5 md:w-1/3">
              <button
                aria-label="Search"
                className="rounded-full p-2 transition-colors hover:bg-[#2a2a2a] hover:text-white"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search size={20} />
              </button>

              <CartDropdown cart={cart} />

              <WishlistDropdown />

              {mounted && isAuthenticated && user ? (
                <Link className="group relative transition-colors hover:text-white" href="/orders">
                  <FileText size={20} />
                </Link>
              ) : null}

              {!mounted || isLoading ? (
                <button
                  aria-label="Sign in"
                  className="rounded-full p-2 transition-colors hover:bg-[#2a2a2a] hover:text-white"
                >
                  <User size={20} />
                </button>
              ) : isAuthenticated && user ? (
                <UserMenu />
              ) : (
                <button
                  aria-label="Sign in"
                  className="rounded-full p-2 transition-colors hover:bg-[#2a2a2a] hover:text-white"
                  onClick={handleAuthClick}
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
