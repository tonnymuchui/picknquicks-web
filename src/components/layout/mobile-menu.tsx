'use client';

import { ChevronDown, Search, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { BrandLogo } from '@/components/common/brand-logo';
import { useAuth } from '@/lib/auth/hooks';
import { useCategoryTree } from '@/lib/category/categories.queries';
import { UserRole } from '@/types/auth';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: () => void;
  onSignIn: () => void;
}

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop all' },
  { href: '/shop/brands', label: 'Brands' },
  { href: '/track-order', label: 'Track order' },
];

const DRAWER_LINK =
  'flex min-h-12 items-center border-b border-black/15 px-1 text-[11px] font-medium uppercase tracking-[0.14em] transition-opacity hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-black';

const isVisibleStorefrontCategory = (category: { slug: string }) =>
  category.slug.toLowerCase() !== 'connectivity';

export function MobileMenu({ isOpen, onClose, onSearch, onSignIn }: MobileMenuProps) {
  const { user, isAuthenticated } = useAuth();
  const { data: navCategories } = useCategoryTree(true);
  const pathname = usePathname();
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    window.setTimeout(onClose, 180);
  }, [onClose]);

  const closeWithAction = (action: () => void) => {
    setIsVisible(false);
    window.setTimeout(() => {
      onClose();
      action();
    }, 180);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const animationFrame = window.requestAnimationFrame(() => setIsVisible(true));
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onEscape);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.removeEventListener('keydown', onEscape);
      document.body.style.overflow = '';
    };
  }, [handleClose, isOpen]);

  if (!isOpen) {
    return null;
  }

  const isAdminUser = user?.roles.some((role) =>
    [UserRole.ADMIN, UserRole.STAFF, UserRole.MANAGER].includes(role)
  );

  return (
    <>
      <button
        aria-label="Close navigation"
        className={[
          'fixed inset-0 z-[60] bg-black/45 transition-opacity duration-200 lg:hidden',
          isVisible ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        type="button"
        onClick={handleClose}
      />

      <aside
        aria-label="Mobile navigation"
        aria-modal="true"
        className={[
          'fixed left-0 top-0 z-[70] h-dvh w-[88vw] max-w-[380px] border-r border-black/20 bg-white transition-transform duration-200 ease-out lg:hidden',
          isVisible ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
        role="dialog"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-[72px] items-center justify-between border-b border-black/15 px-5">
            <Link
              aria-label="PickNQuicks home"
              className="inline-flex min-h-11 items-center text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
              href="/"
              onClick={handleClose}
            >
              <BrandLogo markClassName="size-8" wordmarkClassName="text-[19px]" />
            </Link>
            <button
              aria-label="Close menu"
              className="inline-flex size-11 items-center justify-center text-black transition-opacity hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
              type="button"
              onClick={handleClose}
            >
              <X aria-hidden="true" size={19} strokeWidth={1.5} />
            </button>
          </div>

          <div className="border-b border-black/15 px-5 py-4">
            <button
              className="flex min-h-11 w-full items-center border-b border-black/35 text-left text-[12px] text-black/55 transition-colors hover:border-black hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              type="button"
              onClick={() => closeWithAction(onSearch)}
            >
              <Search aria-hidden="true" className="mr-3" size={17} strokeWidth={1.5} />
              Search products
            </button>
          </div>

          <nav aria-label="Mobile primary navigation" className="flex-1 overflow-y-auto px-5 py-2">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={[DRAWER_LINK, active ? 'bg-black px-4 text-white' : 'text-black'].join(
                    ' '
                  )}
                  href={item.href}
                  onClick={handleClose}
                >
                  {item.label}
                </Link>
              );
            })}

            <button
              aria-expanded={isCategoriesExpanded}
              className={[
                DRAWER_LINK,
                'w-full justify-between text-black',
                pathname.startsWith('/shop/categories') ? 'font-semibold' : '',
              ].join(' ')}
              type="button"
              onClick={() => setIsCategoriesExpanded((previous) => !previous)}
            >
              Categories
              <ChevronDown
                aria-hidden="true"
                className={[
                  'h-4 w-4 transition-transform duration-200',
                  isCategoriesExpanded ? 'rotate-180' : '',
                ].join(' ')}
              />
            </button>

            {isCategoriesExpanded ? (
              <div className="border-b border-black/15 bg-[#f3f3f3] px-4 py-2">
                <Link
                  className="flex min-h-11 items-center border-b border-black/15 text-[10px] font-semibold uppercase tracking-[0.13em] text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
                  href="/shop/categories"
                  onClick={handleClose}
                >
                  View all categories
                </Link>

                {navCategories && navCategories.length > 0 ? (
                  navCategories
                    .filter(isVisibleStorefrontCategory)
                    .slice(0, 8)
                    .map((category) => (
                      <div key={category.id}>
                        <Link
                          className="flex min-h-11 items-center border-b border-black/10 text-[12px] font-medium text-black/75 transition-opacity hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
                          href={'/shop/categories/' + encodeURIComponent(category.slug)}
                          onClick={handleClose}
                        >
                          {category.name}
                        </Link>
                        {(category.children?.length ?? 0) > 0 ? (
                          <div className="border-l border-black/20 pl-4">
                            {(category.children ?? [])
                              .filter(isVisibleStorefrontCategory)
                              .slice(0, 3)
                              .map((child) => (
                                <Link
                                  key={child.id}
                                  className="flex min-h-11 items-center text-[11px] text-black/55 transition-opacity hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
                                  href={'/shop/categories/' + encodeURIComponent(child.slug)}
                                  onClick={handleClose}
                                >
                                  {child.name}
                                </Link>
                              ))}
                          </div>
                        ) : null}
                      </div>
                    ))
                ) : (
                  <p className="flex min-h-11 items-center text-[11px] text-black/45">
                    Loading categories…
                  </p>
                )}
              </div>
            ) : null}

            <Link
              className={[DRAWER_LINK, 'mt-4 text-black'].join(' ')}
              href="/cart"
              onClick={handleClose}
            >
              Cart
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  className={[DRAWER_LINK, 'text-black'].join(' ')}
                  href="/orders"
                  onClick={handleClose}
                >
                  My orders
                </Link>
                <Link
                  className={[DRAWER_LINK, 'text-black'].join(' ')}
                  href="/auth/profile"
                  onClick={handleClose}
                >
                  Account
                </Link>
              </>
            ) : null}

            {isAuthenticated && isAdminUser ? (
              <Link
                className={[DRAWER_LINK, 'text-black'].join(' ')}
                href="/admin"
                onClick={handleClose}
              >
                Admin
              </Link>
            ) : null}
          </nav>

          <div className="border-t border-black/15 bg-[#f3f3f3] p-5">
            {isAuthenticated && user ? (
              <div className="min-h-12">
                <p className="truncate text-[12px] font-semibold uppercase tracking-[0.1em] text-black">
                  {user.fullName}
                </p>
                <p className="mt-1 truncate text-[11px] text-black/50">{user.email}</p>
              </div>
            ) : (
              <button
                className="flex min-h-11 w-full items-center justify-center border border-black bg-black px-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                type="button"
                onClick={() => closeWithAction(onSignIn)}
              >
                Account / Sign in
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
