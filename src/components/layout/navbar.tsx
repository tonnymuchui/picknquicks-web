'use client';

import {
  ChevronDown,
  FileText,
  Grid,
  Heart,
  Headphones,
  Menu,
  Search,
  Shield,
  ShoppingBag,
  Sparkles,
  Truck,
  User,
  X,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { UserMenu } from '@/components/auth/user-menu';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { useAuth } from '@/lib/auth/hooks';
import { useCart } from '@/lib/cart/cart.queries';
import { useCategories } from '@/lib/category/categories.queries';
import { resolveMediaUrl } from '@/lib/utils/media';
import { UserRole } from '@/types/auth';

import { MobileMenu } from './mobile-menu';
import { SearchModal } from './search-modal';
import { AuthModal } from '../auth/auth-modal';

import type { Category } from '@/types/category';

const PROMO_MESSAGES = [
  { icon: Truck, text: 'Free Shipping on Orders Over KSh 50' },
  { icon: Sparkles, text: 'New Arrivals Added Daily' },
  { icon: Headphones, text: '24/7 Customer Support' },
  { icon: Zap, text: 'Flash Deals — Up to 60% Off' },
];

export function Navbar() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { data: categoriesData } = useCategories({});
  const { data: cart, error: _cartError } = useCart();
  const navCategories = (categoriesData?.content ?? []).filter(
    (cat: Category) => cat.active && cat.level === 0
  );
  const pathname = usePathname();

  const mounted = true;
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPromoVisible, setIsPromoVisible] = useState(true);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setIsMegaMenuOpen(false);
      }
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEscape);
    };
  }, []);

  const handleMegaMenuEnter = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    setIsMegaMenuOpen(true);
  };
  const handleMegaMenuLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => setIsMegaMenuOpen(false), 200);
  };

  const isActive = (href: string) => pathname === href;

  const isAdminUser =
    mounted &&
    isAuthenticated &&
    user?.roles.some((r) => [UserRole.ADMIN, UserRole.STAFF, UserRole.MANAGER].includes(r));

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : ''}`}
      >
        {/* ── TIER 1 — Promo Ticker ── */}
        <div
          className={`bg-accent duration-400 overflow-hidden transition-all ${
            isPromoVisible ? 'max-h-9 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <button
              aria-label="Dismiss"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-white/50 transition-colors hover:text-white"
              onClick={() => setIsPromoVisible(false)}
            >
              <X size={13} />
            </button>
            <div className="animate-ticker flex whitespace-nowrap py-2">
              {[...PROMO_MESSAGES, ...PROMO_MESSAGES].map((promo, i) => {
                const Icon = promo.icon;
                return (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 px-8 text-[11px] font-medium tracking-wide text-white/90"
                  >
                    <Icon className="text-secondary" size={12} />
                    {promo.text}
                    <span className="ml-6 text-white/20">•</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── TIER 2 — Main Bar ── */}
        <div
          className={`border-primary-light/15 bg-primary-dark border-b transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}
        >
          <div className="container mx-auto px-4">
            {/* Desktop */}
            <div className="hidden items-center gap-6 md:flex">
              {/* Logo */}
              <Link
                className="shrink-0 transition-transform duration-200 hover:scale-[1.02]"
                href="/"
              >
                <Image
                  priority
                  alt="PickNQuicks"
                  className={`object-contain transition-all duration-300 ${isScrolled ? 'h-8 w-auto' : 'h-10 w-auto'}`}
                  height={40}
                  src="/mylogo.png"
                  width={120}
                />
              </Link>

              {/* Search */}
              <button
                className="border-secondary/15 bg-primary-light/20 text-secondary/45 hover:border-secondary/30 hover:text-secondary/60 flex max-w-xl flex-1 items-center gap-3 rounded-lg border px-4 py-2 text-sm transition-colors"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search size={16} />
                <span className="flex-1 text-left">Search products, brands...</span>
                <kbd className="text-secondary/25 hidden text-[10px] lg:inline">⌘K</kbd>
              </button>

              {/* Action icons */}
              <div className="flex shrink-0 items-center gap-1">
                <Link
                  aria-label="Wishlist"
                  className="text-secondary/50 hover:bg-primary-light/20 hover:text-secondary rounded-lg p-2 transition-colors"
                  href="/wishlist"
                >
                  <Heart size={20} />
                </Link>

                <button
                  aria-label="Cart"
                  className="text-secondary/50 hover:bg-primary-light/20 hover:text-secondary relative rounded-lg p-2 transition-colors"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingBag size={20} />
                  {cart?.totalItems && cart.totalItems > 0 ? (
                    <span className="h-4.5 w-4.5 bg-highlight animate-badge-bounce absolute -right-0.5 -top-0.5 flex items-center justify-center rounded-full text-[10px] font-bold text-white">
                      {cart.totalItems > 99 ? '99+' : cart.totalItems}
                    </span>
                  ) : null}
                </button>

                {mounted && isAuthenticated && user ? (
                  <Link
                    aria-label="Orders"
                    className="text-secondary/50 hover:bg-primary-light/20 hover:text-secondary rounded-lg p-2 transition-colors"
                    href="/orders"
                  >
                    <FileText size={20} />
                  </Link>
                ) : null}

                <div className="bg-secondary/10 mx-1.5 h-5 w-px" />

                {!mounted || isLoading ? (
                  <div className="text-secondary/50 rounded-lg p-2">
                    <User className="animate-pulse" size={20} />
                  </div>
                ) : isAuthenticated && user ? (
                  <UserMenu />
                ) : (
                  <button
                    className="border-secondary/20 text-secondary hover:bg-secondary hover:text-primary-dark flex items-center gap-2 rounded-lg border px-3.5 py-1.5 text-sm font-semibold transition-colors"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    <User size={15} />
                    Sign In
                  </button>
                )}
              </div>
            </div>

            {/* Mobile */}
            <div className="flex h-12 items-center justify-between md:hidden">
              <button
                aria-label="Menu"
                className="text-secondary/60 hover:text-secondary rounded-lg p-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={22} />
              </button>
              <Link href="/">
                <Image
                  priority
                  alt="PickNQuicks"
                  className="h-8 w-auto object-contain"
                  height={32}
                  src="/mylogo.png"
                  width={80}
                />
              </Link>
              <div className="flex items-center gap-0.5">
                <button
                  aria-label="Search"
                  className="text-secondary/60 hover:text-secondary rounded-lg p-2 transition-colors"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search size={20} />
                </button>
                <button
                  aria-label="Cart"
                  className="text-secondary/60 hover:text-secondary relative rounded-lg p-2"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingBag size={20} />
                  {cart?.totalItems && cart.totalItems > 0 ? (
                    <span className="bg-highlight absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white">
                      {cart.totalItems > 99 ? '99+' : cart.totalItems}
                    </span>
                  ) : null}
                </button>
                {!mounted || isLoading ? (
                  <div className="text-secondary/60 rounded-lg p-2">
                    <User className="animate-pulse" size={20} />
                  </div>
                ) : isAuthenticated && user ? (
                  <UserMenu />
                ) : (
                  <button
                    aria-label="Sign in"
                    className="text-secondary/60 hover:text-secondary rounded-lg p-2 transition-colors"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    <User size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── TIER 3 — Nav Row ── */}
        <div
          className={`border-primary-light/10 bg-primary-dark/95 hidden border-b backdrop-blur-sm md:block`}
        >
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-between">
              <div className="flex items-center">
                <Link
                  className={`nav-underline px-4 py-2.5 text-sm font-semibold transition-colors ${
                    isActive('/')
                      ? 'text-secondary active'
                      : 'text-secondary/55 hover:text-secondary'
                  }`}
                  href="/"
                >
                  Home
                </Link>
                <Link
                  className={`nav-underline px-4 py-2.5 text-sm font-semibold transition-colors ${
                    isActive('/products')
                      ? 'text-secondary active'
                      : 'text-secondary/55 hover:text-secondary'
                  }`}
                  href="/products"
                >
                  Shop
                </Link>

                {/* Categories */}
                <div
                  ref={megaMenuRef}
                  className="relative"
                  onMouseEnter={handleMegaMenuEnter}
                  onMouseLeave={handleMegaMenuLeave}
                >
                  <button
                    className={`nav-underline flex items-center gap-1 px-4 py-2.5 text-sm font-semibold transition-colors ${
                      isMegaMenuOpen || pathname.startsWith('/categories')
                        ? 'text-secondary active'
                        : 'text-secondary/55 hover:text-secondary'
                    }`}
                    onClick={() => setIsMegaMenuOpen((p) => !p)}
                  >
                    Categories
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* ── MEGA MENU ── */}
                  {isMegaMenuOpen && navCategories && navCategories.length > 0 ? (
                    <div className="absolute -left-2 top-full z-50 pt-1">
                      <div className="animate-float-in border-primary-light/15 bg-primary-dark w-[640px] rounded-xl border shadow-2xl">
                        {/* Header */}
                        <div className="border-primary-light/10 flex items-center justify-between border-b px-5 py-3">
                          <span className="text-secondary text-sm font-bold">Categories</span>
                          <Link
                            className="text-secondary/40 hover:text-secondary text-xs font-medium transition-colors"
                            href="/categories"
                            onClick={() => setIsMegaMenuOpen(false)}
                          >
                            View all →
                          </Link>
                        </div>

                        {/* Two-column layout */}
                        <div className="flex">
                          {/* Left: category list */}
                          <div className="border-primary-light/10 custom-scrollbar max-h-[380px] w-[200px] shrink-0 overflow-y-auto border-r py-2">
                            {navCategories.slice(0, 10).map((category: Category) => {
                              const currentId = activeCategoryId || navCategories[0]?.id;
                              const isActiveCat = currentId === category.id;
                              return (
                                <button
                                  key={category.id}
                                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                                    isActiveCat
                                      ? 'bg-primary-light/15 text-secondary'
                                      : 'text-secondary/55 hover:bg-primary-light/8 hover:text-secondary/80'
                                  }`}
                                  onClick={() => {
                                    setIsMegaMenuOpen(false);
                                    window.location.href = `/categories?slug=${encodeURIComponent(category.slug)}`;
                                  }}
                                  onMouseEnter={() => setActiveCategoryId(category.id)}
                                >
                                  {category.iconUrl ? (
                                    <Image
                                      alt={category.name}
                                      className={`h-4 w-4 object-contain ${isActiveCat ? 'opacity-100' : 'opacity-40'}`}
                                      height={16}
                                      src={resolveMediaUrl(category.iconUrl) || category.iconUrl}
                                      width={16}
                                    />
                                  ) : (
                                    <Grid
                                      className={`${isActiveCat ? 'text-secondary' : 'text-secondary/30'}`}
                                      size={14}
                                    />
                                  )}
                                  <span className="font-medium">{category.name}</span>
                                  {isActiveCat ? (
                                    <ChevronDown className="text-secondary/40 ml-auto h-3 w-3 -rotate-90" />
                                  ) : null}
                                </button>
                              );
                            })}
                          </div>

                          {/* Right: subcategories */}
                          <div className="flex-1 p-5">
                            {(() => {
                              const currentId = activeCategoryId || navCategories[0]?.id;
                              const current = navCategories.find(
                                (c: Category) => c.id === currentId
                              );
                              if (!current) {
                                return null;
                              }

                              return (
                                <div>
                                  <div className="mb-4 flex items-center justify-between">
                                    <h4 className="text-secondary text-sm font-bold">
                                      {current.name}
                                    </h4>
                                    <Link
                                      className="bg-primary-light/15 text-secondary/60 hover:bg-primary-light/25 hover:text-secondary rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors"
                                      href={`/categories?slug=${encodeURIComponent(current.slug)}`}
                                      onClick={() => setIsMegaMenuOpen(false)}
                                    >
                                      Shop {current.name}
                                    </Link>
                                  </div>

                                  {current.children && current.children.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-1">
                                      {current.children.map((child: Category) => (
                                        <Link
                                          key={child.id}
                                          className="text-secondary/55 hover:bg-primary-light/10 hover:text-secondary group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors"
                                          href={`/categories?slug=${encodeURIComponent(child.slug)}`}
                                          onClick={() => setIsMegaMenuOpen(false)}
                                        >
                                          <span className="bg-secondary/20 group-hover:bg-highlight h-1 w-1 rounded-full transition-colors" />
                                          {child.name}
                                        </Link>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-secondary/30 text-sm">
                                      No subcategories yet.
                                    </p>
                                  )}
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Deals */}
                <Link
                  className={`nav-underline flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold transition-colors ${
                    isActive('/deals')
                      ? 'text-secondary active'
                      : 'text-secondary/55 hover:text-secondary'
                  }`}
                  href="/deals"
                >
                  Deals
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-dot-pulse bg-highlight absolute inline-flex h-full w-full rounded-full" />
                    <span className="bg-highlight relative inline-flex h-1.5 w-1.5 rounded-full" />
                  </span>
                </Link>

                {/* Admin */}
                {isAdminUser ? (
                  <Link
                    className="bg-accent/15 text-accent-light hover:bg-accent/25 ml-1 flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-semibold transition-colors"
                    href="/admin"
                  >
                    <Shield size={12} />
                    Admin
                  </Link>
                ) : null}
              </div>

              <span className="text-secondary/20 text-[11px] font-medium tracking-wide">
                Premium Tech Solutions
              </span>
            </nav>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
