'use client';

import { useQueryClient } from '@tanstack/react-query';
import { Loader2, Menu, Minus, Plus, Search, ShoppingBag, Trash2, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { AuthModal } from '@/components/auth/auth-modal';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { BrandLogo } from '@/components/common/brand-logo';
import { useAuth } from '@/lib/auth/hooks';
import { useRemoveFromCart, useUpdateCartItem } from '@/lib/cart/cart.mutations';
import { cartKeys, useCart } from '@/lib/cart/cart.queries';
import { mergeGuestCart } from '@/lib/cart/merge-guest-cart';
import { useCategoryTree } from '@/lib/category/categories.queries';
import { claimGuestOrders } from '@/lib/order/claim-guest-orders';
import { formatPriceKsh } from '@/lib/utils/currency';
import { resolveMediaUrl } from '@/lib/utils/media';
import { UserRole } from '@/types/auth';

import { MobileMenu } from './mobile-menu';
import { SearchModal } from './search-modal';

const MPESA_TILL_NUMBER = process.env.NEXT_PUBLIC_MPESA_TILL_NUMBER?.trim();

const ANNOUNCEMENT_ITEMS = [
  { label: '0717502292', href: 'tel:+254717502292' },
  { label: MPESA_TILL_NUMBER ? `Till number: ${MPESA_TILL_NUMBER}` : 'Till number' },
  { label: 'Order tracking', href: '/track-order' },
] as const;

const FALLBACK_LINKS = [
  { href: '/products', label: 'Shop all' },
  { href: '/shop/categories', label: 'Categories' },
  { href: '/shop/brands', label: 'Brands' },
  { href: '/track-order', label: 'Track order' },
] as const;

const CATEGORY_FALLBACK_LINKS = [
  { href: '/shop/categories/displays', label: 'Displays' },
  { href: '/shop/categories/workspace', label: 'Workspace' },
  { href: '/shop/categories/accessories', label: 'Accessories' },
  { href: '/shop/categories/complete-setups', label: 'Complete setups' },
] as const;

const DESKTOP_ACTION =
  'inline-flex min-h-11 items-center justify-center px-2 text-[11px] font-medium uppercase tracking-[0.14em] text-black transition-opacity hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black';

const MOBILE_ACTION =
  'relative inline-flex size-11 items-center justify-center text-black transition-opacity hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black';

function CartQuantity({ count }: { count?: number }) {
  if (!count || count < 1) {
    return null;
  }

  return (
    <span className="absolute right-0 top-0 text-[9px] font-semibold leading-none text-black">
      {count > 99 ? '99+' : count}
    </span>
  );
}

export function Navbar() {
  const queryClient = useQueryClient();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { data: cart, error: _cartError } = useCart();
  const updateCartItem = useUpdateCartItem();
  const removeCartItem = useRemoveFromCart();
  const { data: categoryTree } = useCategoryTree(true);
  const pathname = usePathname();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartPreviewOpen, setIsCartPreviewOpen] = useState(false);
  const cartPreviewTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    void Promise.allSettled([claimGuestOrders(), mergeGuestCart()]).then((results) => {
      const claimed = results[0].status === 'fulfilled' ? results[0].value : 0;
      const merged = results[1].status === 'fulfilled' ? results[1].value : false;

      if (claimed > 0) {
        void queryClient.invalidateQueries({ queryKey: ['orders'] });
      }
      if (merged) {
        void queryClient.invalidateQueries({ queryKey: cartKeys.all });
      }
    });
  }, [isAuthenticated, queryClient]);

  const showCartPreview = () => {
    if (cartPreviewTimer.current) {
      clearTimeout(cartPreviewTimer.current);
    }
    setIsCartPreviewOpen(true);
  };

  const hideCartPreview = () => {
    cartPreviewTimer.current = setTimeout(() => setIsCartPreviewOpen(false), 160);
  };

  const openCart = () => {
    setIsCartPreviewOpen(false);
    setIsCartOpen(true);
  };

  const isAdminUser =
    isAuthenticated &&
    user?.roles.some((role) => [UserRole.ADMIN, UserRole.STAFF, UserRole.MANAGER].includes(role));
  const loadedCategoryLinks = (categoryTree ?? []).slice(0, 6).map((category) => ({
    href: `/shop/categories/${encodeURIComponent(category.slug)}`,
    label: category.name,
  }));
  const categoryLinks = loadedCategoryLinks.length ? loadedCategoryLinks : CATEGORY_FALLBACK_LINKS;
  const primaryLinks =
    categoryLinks.length > 0 ? [...categoryLinks, ...FALLBACK_LINKS] : FALLBACK_LINKS;

  if (
    pathname.startsWith('/admin') ||
    (pathname.startsWith('/auth/') && pathname !== '/auth/profile')
  ) {
    return null;
  }

  return (
    <>
      <header className="relative z-40 bg-white text-black">
        <div className="h-10 bg-[#1b1b1b] text-white lg:h-[52px]">
          <div className="mx-auto grid h-full max-w-[1920px] grid-cols-3 items-stretch px-2 text-center text-[8px] font-semibold uppercase tracking-[0.08em] sm:px-6 sm:text-[9px] sm:tracking-[0.12em] lg:px-16 lg:text-[11px] lg:tracking-[0.17em]">
            {ANNOUNCEMENT_ITEMS.map((item, index) => {
              const className = `flex min-w-0 items-center justify-center px-1.5 transition-colors hover:text-white/70 sm:px-3 ${index > 0 ? 'border-l border-white/15' : ''}`;

              if ('href' in item && item.href.startsWith('/')) {
                return (
                  <Link key={item.label} className={className} href={item.href}>
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              }

              if ('href' in item) {
                return (
                  <a key={item.label} className={className} href={item.href}>
                    <span className="truncate">{item.label}</span>
                  </a>
                );
              }

              return (
                <span key={item.label} className={className}>
                  <span className="truncate">{item.label}</span>
                </span>
              );
            })}
          </div>
        </div>

        <div className="border-b border-black/15 bg-white">
          <div className="mx-auto hidden h-[98px] max-w-[1920px] grid-cols-[minmax(300px,1fr)_minmax(300px,1.15fr)_auto] items-center gap-12 px-16 lg:grid">
            <Link
              aria-label="PickNQuicks home"
              className="inline-flex min-h-11 w-fit flex-col justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              href="/"
            >
              <BrandLogo
                markClassName="size-11"
                subtitle="Tech & Workspace Essentials"
                wordmarkClassName="text-[29px]"
              />
            </Link>

            <button
              aria-expanded={isSearchOpen}
              aria-haspopup="dialog"
              className="flex min-h-12 w-full max-w-[460px] items-center border border-black/20 px-4 text-left text-[13px] font-normal tracking-[0.01em] text-black/45 transition-colors hover:border-black hover:text-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              type="button"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search aria-hidden="true" className="mr-3 text-black" size={17} strokeWidth={1.5} />
              Search monitors, desks and workspace tools
            </button>

            <nav aria-label="Shopping actions" className="flex items-center gap-5">
              {isLoading ? (
                <span className={DESKTOP_ACTION}>Account</span>
              ) : isAuthenticated ? (
                <Link className={DESKTOP_ACTION} href="/auth/profile">
                  Account
                </Link>
              ) : (
                <button
                  className={DESKTOP_ACTION}
                  type="button"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Account
                </button>
              )}

              <div
                className="relative"
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    hideCartPreview();
                  }
                }}
                onFocus={showCartPreview}
                onMouseEnter={showCartPreview}
                onMouseLeave={hideCartPreview}
              >
                <button
                  aria-expanded={isCartOpen || isCartPreviewOpen}
                  aria-haspopup="dialog"
                  aria-label={`Open cart${cart?.totalItems ? `, ${cart.totalItems} items` : ''}`}
                  className={[DESKTOP_ACTION, 'relative gap-2'].join(' ')}
                  type="button"
                  onClick={openCart}
                >
                  <ShoppingBag aria-hidden="true" size={18} strokeWidth={1.5} />
                  <span>Cart{cart?.totalItems ? ` (${cart.totalItems})` : ''}</span>
                </button>

                {isCartPreviewOpen ? (
                  <div className="absolute right-0 top-full z-50 w-[390px] pt-3">
                    <div className="border border-black/15 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.14)]">
                      <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em]">
                          Your cart
                        </p>
                        <span className="text-xs text-black/50">
                          {cart?.totalItems ?? 0} {(cart?.totalItems ?? 0) === 1 ? 'item' : 'items'}
                        </span>
                      </div>

                      {!cart || cart.items.length === 0 ? (
                        <div className="px-6 py-10 text-center">
                          <ShoppingBag
                            aria-hidden="true"
                            className="mx-auto text-black/20"
                            size={32}
                            strokeWidth={1.25}
                          />
                          <p className="mt-4 text-sm font-medium">Your cart is empty</p>
                          <p className="mt-1 text-xs leading-5 text-black/50">
                            Add workspace essentials to see them here.
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="px-5">
                            {cart.items.slice(0, 3).map((item) => {
                              const imageUrl = resolveMediaUrl(item.productImageUrl);

                              const isUpdating =
                                updateCartItem.isPending &&
                                updateCartItem.variables?.cartItemId === item.id;
                              const isRemoving =
                                removeCartItem.isPending && removeCartItem.variables === item.id;
                              const isCartMutating =
                                updateCartItem.isPending || removeCartItem.isPending;

                              return (
                                <article
                                  key={item.id}
                                  className="grid grid-cols-[64px_minmax(0,1fr)] gap-3 border-b border-black/10 py-4 last:border-b-0"
                                >
                                  <Link
                                    aria-label={`View ${item.productName}`}
                                    className="relative aspect-square overflow-hidden bg-[#f2f1ee]"
                                    href={`/products/${item.productSlug}`}
                                    onClick={() => setIsCartPreviewOpen(false)}
                                  >
                                    {imageUrl ? (
                                      <Image
                                        fill
                                        alt=""
                                        className="object-cover"
                                        sizes="64px"
                                        src={imageUrl}
                                      />
                                    ) : null}
                                  </Link>

                                  <div className="min-w-0">
                                    <div className="flex items-start justify-between gap-4">
                                      <Link
                                        className="line-clamp-2 text-xs font-medium leading-5 hover:underline"
                                        href={`/products/${item.productSlug}`}
                                        onClick={() => setIsCartPreviewOpen(false)}
                                      >
                                        {item.productName}
                                      </Link>
                                      <span className="shrink-0 text-xs font-semibold">
                                        {formatPriceKsh(item.totalWithTax)}
                                      </span>
                                    </div>

                                    <div className="mt-2.5 flex items-center justify-between gap-3">
                                      <div className="flex h-8 items-center rounded-full border border-black/20">
                                        <button
                                          aria-label={`Decrease ${item.productName} quantity`}
                                          className="flex size-8 items-center justify-center rounded-l-full transition-colors hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:bg-transparent"
                                          disabled={isCartMutating || item.quantity <= 1}
                                          type="button"
                                          onClick={() =>
                                            updateCartItem.mutate({
                                              cartItemId: item.id,
                                              quantity: item.quantity - 1,
                                            })
                                          }
                                        >
                                          <Minus aria-hidden="true" size={12} strokeWidth={1.75} />
                                        </button>
                                        <span
                                          aria-live="polite"
                                          className="flex min-w-7 items-center justify-center text-[11px] font-semibold"
                                        >
                                          {isUpdating ? (
                                            <Loader2
                                              aria-label="Updating quantity"
                                              className="animate-spin"
                                              size={12}
                                            />
                                          ) : (
                                            item.quantity
                                          )}
                                        </span>
                                        <button
                                          aria-label={`Increase ${item.productName} quantity`}
                                          className="flex size-8 items-center justify-center rounded-r-full transition-colors hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:bg-transparent"
                                          disabled={
                                            isCartMutating ||
                                            !item.inStock ||
                                            item.quantity >= item.availableStock
                                          }
                                          type="button"
                                          onClick={() =>
                                            updateCartItem.mutate({
                                              cartItemId: item.id,
                                              quantity: item.quantity + 1,
                                            })
                                          }
                                        >
                                          <Plus aria-hidden="true" size={12} strokeWidth={1.75} />
                                        </button>
                                      </div>
                                      <button
                                        aria-label={`Remove ${item.productName} from cart`}
                                        className="inline-flex min-h-8 items-center gap-1.5 text-[11px] text-black/50 transition-colors hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
                                        disabled={isCartMutating}
                                        type="button"
                                        onClick={() => removeCartItem.mutate(item.id)}
                                      >
                                        {isRemoving ? (
                                          <Loader2
                                            aria-hidden="true"
                                            className="animate-spin"
                                            size={13}
                                          />
                                        ) : (
                                          <Trash2 aria-hidden="true" size={13} strokeWidth={1.5} />
                                        )}
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </article>
                              );
                            })}
                          </div>

                          {cart.items.length > 3 ? (
                            <p className="border-t border-black/10 px-5 py-3 text-center text-[11px] text-black/50">
                              +{cart.items.length - 3} more{' '}
                              {cart.items.length - 3 === 1 ? 'item' : 'items'}
                            </p>
                          ) : null}

                          <div className="border-t border-black/10 p-5">
                            <div className="mb-4 flex items-center justify-between text-sm">
                              <span className="text-black/55">Subtotal</span>
                              <span className="font-semibold">{formatPriceKsh(cart.subtotal)}</span>
                            </div>
                            <Link
                              className="flex min-h-12 items-center justify-center bg-black text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#292621]"
                              href="/cart"
                              onClick={() => setIsCartPreviewOpen(false)}
                            >
                              View cart
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            </nav>
          </div>

          <div className="grid h-16 grid-cols-[44px_minmax(0,1fr)_auto] items-center px-3 lg:hidden">
            <button
              aria-expanded={isMobileMenuOpen}
              aria-label="Open menu"
              className={MOBILE_ACTION}
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu aria-hidden="true" size={21} strokeWidth={1.5} />
            </button>

            <Link
              aria-label="PickNQuicks home"
              className="mx-auto inline-flex min-h-11 items-center px-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
              href="/"
            >
              <BrandLogo markClassName="size-8" wordmarkClassName="text-[20px]" />
            </Link>

            <div className="flex items-center">
              <button
                aria-expanded={isSearchOpen}
                aria-haspopup="dialog"
                aria-label="Search"
                className={MOBILE_ACTION}
                type="button"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search aria-hidden="true" size={19} strokeWidth={1.5} />
              </button>
              <button
                aria-label="Open cart"
                className={MOBILE_ACTION}
                type="button"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag aria-hidden="true" size={19} strokeWidth={1.5} />
                <CartQuantity count={cart?.totalItems} />
              </button>
              {isAuthenticated ? (
                <Link aria-label="Account" className={MOBILE_ACTION} href="/auth/profile">
                  <User aria-hidden="true" size={19} strokeWidth={1.5} />
                </Link>
              ) : (
                <button
                  aria-label="Account"
                  className={MOBILE_ACTION}
                  type="button"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  <User aria-hidden="true" size={19} strokeWidth={1.5} />
                </button>
              )}
            </div>
          </div>
        </div>

        <nav
          aria-label="Product categories"
          className="no-scrollbar flex h-12 snap-x items-stretch gap-1 overflow-x-auto border-b border-black/15 bg-white px-3 lg:hidden"
        >
          <Link
            aria-current={pathname === '/products' ? 'page' : undefined}
            className={`flex min-w-max snap-start items-center border-b-2 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors ${pathname === '/products' ? 'border-black text-black' : 'border-transparent text-black/50 hover:text-black'}`}
            href="/products"
          >
            Shop all
          </Link>
          {categoryLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={`mobile-${link.href}`}
                aria-current={active ? 'page' : undefined}
                className={`flex min-w-max snap-start items-center border-b-2 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors ${active ? 'border-black text-black' : 'border-transparent text-black/50 hover:text-black'}`}
                href={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden h-[68px] border-b border-black/15 bg-white lg:block">
          <nav
            aria-label="Primary navigation"
            className="mx-auto grid h-full max-w-[1920px] auto-cols-[minmax(112px,1fr)] grid-flow-col items-stretch overflow-x-auto px-16"
          >
            {primaryLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.label + link.href}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'flex min-h-11 items-center justify-center border-b px-3 text-center text-[10px] font-medium uppercase tracking-[0.13em] text-black transition-opacity hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-black',
                    active ? 'border-black' : 'border-transparent',
                  ].join(' ')}
                  href={link.href}
                >
                  <span className="truncate">{link.label}</span>
                </Link>
              );
            })}

            {isAdminUser ? (
              <Link
                className="flex min-h-11 items-center justify-center border-b border-transparent px-3 text-[10px] font-medium uppercase tracking-[0.13em] text-black transition-opacity hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-black"
                href="/admin"
              >
                Admin
              </Link>
            ) : null}
          </nav>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onSearch={() => setIsSearchOpen(true)}
        onSignIn={() => setIsAuthModalOpen(true)}
      />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
