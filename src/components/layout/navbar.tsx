'use client';

import { Search, FileText, User, Menu, ChevronDown, ShoppingBag, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

import { UserMenu } from '@/components/auth/user-menu';
import { useAuth } from '@/lib/auth/hooks';
import { useCategories } from '@/lib/category/categories.queries';
import { resolveMediaUrl } from '@/lib/utils/media';
import { UserRole } from '@/types/auth';

import { MobileMenu } from './mobile-menu';
import { SearchModal } from './search-modal';
import { AuthModal } from '../auth/auth-modal';

import type { Category } from '@/types/category';

export function Navbar() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { data: categoriesData } = useCategories({});
  const navCategories = (categoriesData?.content ?? []).filter(
    (cat: Category) => cat.active && cat.level === 0
  );
  const pathname = usePathname();
  const cart = null as unknown as { totalItems?: number } | null;

  const [mounted, setMounted] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setIsMegaMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMegaMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleMegaMenuEnter = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    setIsMegaMenuOpen(true);
  };

  const handleMegaMenuLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => setIsMegaMenuOpen(false), 150);
  };

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const isActive = (href: string) => pathname === href;

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <header className="border-primary-light/20 bg-primary-dark/98 sticky top-0 z-50 border-b backdrop-blur-sm transition-all duration-300">
        <div className="container mx-auto px-4">
          {/* Desktop Navigation */}
          <div className="hidden items-center justify-between py-4 md:flex">
            {/* Logo */}
            <Link
              className="group flex items-center gap-2 transition-transform duration-300 hover:scale-105"
              href="/"
            >
              <div className="border-secondary/40 from-secondary/20 to-secondary/5 group-hover:border-secondary/60 bg-linear-to-br flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300">
                <span className="text-secondary text-lg font-bold">PQ</span>
              </div>
              <div className="flex flex-col">
                <span className="text-secondary text-sm font-bold leading-none">PickNQuicks</span>
                <span className="text-secondary/50 text-[10px]">Shop Smart</span>
              </div>
            </Link>

            {/* Main Navigation */}
            <nav className="flex items-center gap-1">
              <Link
                className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  isActive('/') ? 'text-secondary' : 'text-secondary/70 hover:text-secondary'
                }`}
                href="/"
              >
                Home
                {isActive('/') ? (
                  <div className="from-secondary/0 via-secondary to-secondary/0 bg-linear-to-r absolute bottom-0 left-4 right-4 h-0.5" />
                ) : null}
              </Link>

              <Link
                className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  isActive('/products')
                    ? 'text-secondary'
                    : 'text-secondary/70 hover:text-secondary'
                }`}
                href="/products"
              >
                Shop
                {isActive('/products') ? (
                  <div className="from-secondary/0 via-secondary to-secondary/0 bg-linear-to-r absolute bottom-0 left-4 right-4 h-0.5" />
                ) : null}
              </Link>

              {/* Categories Megamenu */}
              <div
                ref={megaMenuRef}
                className="relative"
                onMouseEnter={handleMegaMenuEnter}
                onMouseLeave={handleMegaMenuLeave}
              >
                <button
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    isMegaMenuOpen || pathname.startsWith('/categories')
                      ? 'text-secondary'
                      : 'text-secondary/70 hover:text-secondary'
                  }`}
                  onClick={() => setIsMegaMenuOpen((prev) => !prev)}
                >
                  Categories
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isMegaMenuOpen && navCategories && navCategories.length > 0 ? (
                  <div className="w-200 animate-in fade-in slide-in-from-top-2 absolute -left-4 top-full z-50 duration-200">
                    <div className="h-4" />
                    <div className="min-h-100 border-primary-light/20 bg-primary-dark/98 flex overflow-hidden rounded-xl border shadow-2xl backdrop-blur-md">
                      {/* Left Pane - Root Categories */}
                      <div className="border-primary-light/10 bg-primary-dark/50 w-1/3 shrink-0 border-r py-4">
                        {navCategories.slice(0, 10).map((category: Category) => {
                          const currentCategoryId = activeCategoryId || navCategories[0]?.id;
                          const isActiveCat = currentCategoryId === category.id;
                          return (
                            <Link
                              key={category.id}
                              className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                                isActiveCat
                                  ? 'bg-primary-light/10 text-secondary'
                                  : 'text-secondary/70 hover:bg-primary-light/5 hover:text-secondary'
                              }`}
                              href={`/categories?slug=${encodeURIComponent(category.slug)}`}
                              onClick={() => setIsMegaMenuOpen(false)}
                              onMouseEnter={() => setActiveCategoryId(category.id)}
                            >
                              {category.iconUrl ? (
                                <Image
                                  alt={category.name}
                                  className={`h-5 w-5 object-contain transition-opacity ${isActiveCat ? 'opacity-100' : 'opacity-60'}`}
                                  height={20}
                                  src={resolveMediaUrl(category.iconUrl) || category.iconUrl}
                                  width={20}
                                />
                              ) : null}
                              <span className="text-sm font-semibold">{category.name}</span>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Right Pane - Subcategories */}
                      <div className="flex-1 p-8">
                        {(() => {
                          const currentCategoryId = activeCategoryId || navCategories[0]?.id;
                          const currentCategory = navCategories.find(
                            (c: Category) => c.id === currentCategoryId
                          );

                          if (!currentCategory) {
                            return null;
                          }

                          return (
                            <div className="flex h-full flex-col">
                              <div className="border-primary-light/10 mb-6 flex items-center justify-between border-b pb-4">
                                <h3 className="text-secondary text-lg font-bold">
                                  {currentCategory.name}
                                </h3>
                                <Link
                                  className="text-secondary/70 hover:text-secondary text-sm font-semibold transition-colors"
                                  href={`/categories?slug=${encodeURIComponent(currentCategory.slug)}`}
                                  onClick={() => setIsMegaMenuOpen(false)}
                                >
                                  View All
                                </Link>
                              </div>

                              {currentCategory.children && currentCategory.children.length > 0 ? (
                                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                  {currentCategory.children.map((child: Category) => (
                                    <Link
                                      key={child.id}
                                      className="text-secondary/70 hover:text-secondary group flex items-center gap-2 text-sm transition-colors"
                                      href={`/categories?slug=${encodeURIComponent(child.slug)}`}
                                      onClick={() => setIsMegaMenuOpen(false)}
                                    >
                                      <span className="bg-secondary/30 group-hover:bg-secondary h-1.5 w-1.5 rounded-full transition-colors" />
                                      {child.name}
                                    </Link>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-secondary/40 text-sm">
                                  No subcategories available.
                                </p>
                              )}

                              {/* Featured Box */}
                              <div className="mt-auto pt-8">
                                <div className="border-secondary/10 bg-primary-light/5 rounded-lg border p-4">
                                  <p className="text-secondary mb-1 text-xs font-semibold uppercase tracking-wider">
                                    Featured in {currentCategory.name}
                                  </p>
                                  <p className="text-secondary/80 text-sm">
                                    Explore the latest deals and top rated products.
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              <Link
                className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  isActive('/deals') ? 'text-secondary' : 'text-secondary/70 hover:text-secondary'
                }`}
                href="/deals"
              >
                Deals
                {isActive('/deals') ? (
                  <div className="from-secondary/0 via-secondary to-secondary/0 bg-linear-to-r absolute bottom-0 left-4 right-4 h-0.5" />
                ) : null}
              </Link>

              {mounted &&
              isAuthenticated &&
              user?.roles.some((role) =>
                [UserRole.ADMIN, UserRole.STAFF, UserRole.MANAGER].includes(role)
              ) ? (
                <Link
                  className="text-secondary/70 hover:text-secondary relative flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all duration-300"
                  href="/admin"
                >
                  <span>Admin</span>
                  <span className="bg-secondary/20 text-secondary inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold">
                    {user.roles.includes(UserRole.ADMIN)
                      ? '●'
                      : user.roles.includes(UserRole.MANAGER)
                        ? 'M'
                        : 'S'}
                  </span>
                </Link>
              ) : null}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              <button
                aria-label="Search"
                className="text-secondary/70 hover:bg-secondary/10 hover:text-secondary group rounded-full p-2 transition-all duration-300"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search
                  className="transition-transform duration-300 group-hover:scale-110"
                  size={20}
                />
              </button>

              <Link
                className="text-secondary/70 hover:bg-secondary/10 hover:text-secondary group relative rounded-full p-2 transition-all duration-300"
                href="/cart"
              >
                <ShoppingBag
                  className="transition-transform duration-300 group-hover:scale-110"
                  size={20}
                />
                {cart?.totalItems && cart.totalItems > 0 ? (
                  <span className="bg-secondary text-primary-dark absolute -right-1 -top-1 inline-flex h-5 w-5 animate-pulse items-center justify-center rounded-full text-[10px] font-bold">
                    {cart.totalItems > 99 ? '99+' : cart.totalItems}
                  </span>
                ) : null}
              </Link>

              <Link
                className="text-secondary/70 hover:bg-secondary/10 hover:text-secondary group relative rounded-full p-2 transition-all duration-300"
                href="/wishlist"
              >
                <Heart
                  className="transition-transform duration-300 group-hover:scale-110"
                  size={20}
                />
              </Link>

              {mounted && isAuthenticated && user ? (
                <Link
                  className="text-secondary/70 hover:bg-secondary/10 hover:text-secondary group rounded-full p-2 transition-all duration-300"
                  href="/orders"
                >
                  <FileText
                    className="transition-transform duration-300 group-hover:scale-110"
                    size={20}
                  />
                </Link>
              ) : null}

              {!mounted || isLoading ? (
                <button aria-label="Loading" className="text-secondary/70 rounded-full p-2">
                  <User className="animate-pulse" size={20} />
                </button>
              ) : isAuthenticated && user ? (
                <UserMenu />
              ) : (
                <button
                  aria-label="Sign in"
                  className="text-secondary/70 hover:bg-secondary/10 hover:text-secondary group rounded-full p-2 transition-all duration-300"
                  onClick={handleAuthClick}
                >
                  <User
                    className="transition-transform duration-300 group-hover:scale-110"
                    size={20}
                  />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex h-16 items-center justify-between md:hidden">
            <button
              aria-label="Open navigation menu"
              className="text-secondary/70 hover:bg-secondary/10 hover:text-secondary group rounded-full p-2 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="transition-transform duration-300 group-hover:scale-110" size={24} />
            </button>

            <Link className="flex items-center gap-2" href="/">
              <div className="border-secondary/40 bg-primary text-secondary flex h-10 w-10 items-center justify-center rounded-lg border transition-transform duration-300 hover:scale-110">
                <span className="text-xl font-bold">PQ</span>
              </div>
            </Link>

            <div className="flex items-center gap-1">
              <button
                aria-label="Search"
                className="text-secondary/70 hover:bg-secondary/10 hover:text-secondary group rounded-full p-2 transition-all duration-300"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search
                  className="transition-transform duration-300 group-hover:scale-110"
                  size={20}
                />
              </button>

              <Link
                className="text-secondary/70 hover:bg-secondary/10 hover:text-secondary group relative rounded-full p-2 transition-all duration-300"
                href="/cart"
              >
                <ShoppingBag
                  className="transition-transform duration-300 group-hover:scale-110"
                  size={20}
                />
                {cart?.totalItems && cart.totalItems > 0 ? (
                  <span className="bg-secondary text-primary-dark absolute -right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold">
                    {cart.totalItems > 99 ? '99+' : cart.totalItems}
                  </span>
                ) : null}
              </Link>

              {mounted && isAuthenticated && user ? (
                <Link
                  className="text-secondary/70 hover:bg-secondary/10 hover:text-secondary group rounded-full p-2 transition-all duration-300"
                  href="/orders"
                >
                  <FileText
                    className="transition-transform duration-300 group-hover:scale-110"
                    size={20}
                  />
                </Link>
              ) : null}

              {!mounted || isLoading ? (
                <button aria-label="Loading" className="text-secondary/70 rounded-full p-2">
                  <User className="animate-pulse" size={20} />
                </button>
              ) : isAuthenticated && user ? (
                <UserMenu />
              ) : (
                <button
                  aria-label="Sign in"
                  className="text-secondary/70 hover:bg-secondary/10 hover:text-secondary group rounded-full p-2 transition-all duration-300"
                  onClick={handleAuthClick}
                >
                  <User
                    className="transition-transform duration-300 group-hover:scale-110"
                    size={20}
                  />
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
