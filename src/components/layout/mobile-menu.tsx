'use client';

import { X, Home, Package, Grid, Percent, Shield, ChevronDown, Heart } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { useAuth } from '@/lib/auth/hooks';
import { useCategoryTree } from '@/lib/category/categories.queries';
import { UserRole } from '@/types/auth';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { user, isAuthenticated } = useAuth();
  const { data: navCategories } = useCategoryTree(true);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/products', label: 'Shop', icon: Package },
    { href: '/deals', label: 'Deals', icon: Percent },
  ];

  if (!isOpen) {
    return null;
  }

  const isAdminUser = user?.roles.some((role) =>
    [UserRole.ADMIN, UserRole.STAFF, UserRole.MANAGER].includes(role)
  );

  return (
    <>
      <div
        className="animate-in fade-in fixed inset-0 z-40 bg-black/40 duration-200 md:hidden"
        onClick={onClose}
      />

      <div className="animate-in slide-in-from-left border-primary-light/20 bg-primary-dark fixed left-0 top-0 z-50 h-screen w-[85vw] max-w-sm border-r duration-300 md:hidden">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-primary-light/20 flex items-center justify-between border-b px-5 py-4">
            <Link className="flex items-center gap-2.5" href="/" onClick={onClose}>
              <div className="border-secondary/40 from-secondary/20 to-secondary/5 flex h-10 w-10 items-center justify-center rounded-lg border bg-gradient-to-br transition-transform duration-300">
                <span className="text-secondary text-lg font-bold">PQ</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-secondary text-sm font-bold">PickNQuicks</span>
                <span className="text-secondary/50 text-[10px]">Shop Smart</span>
              </div>
            </Link>
            <button
              aria-label="Close navigation menu"
              className="text-secondary/70 hover:bg-secondary/10 hover:text-secondary group rounded-full p-2 transition-all duration-300"
              onClick={onClose}
            >
              <X className="transition-transform duration-300 group-hover:scale-110" size={24} />
            </button>
          </div>

          {/* Navigation Content */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  className="text-secondary/70 hover:bg-secondary/10 hover:text-secondary group flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition-all duration-300"
                  href={item.href}
                  onClick={onClose}
                >
                  <Icon
                    className="transition-transform duration-300 group-hover:scale-110"
                    size={20}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Categories Section */}
            <div className="my-2">
              <button
                className="text-secondary/70 hover:bg-secondary/10 hover:text-secondary flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold transition-all duration-300"
                type="button"
                onClick={() => setIsCategoriesExpanded((prev) => !prev)}
              >
                <span className="inline-flex items-center gap-3">
                  <Grid size={20} />
                  Categories
                </span>
                <ChevronDown
                  className={`transition-transform duration-300 ${isCategoriesExpanded ? 'rotate-180' : ''}`}
                  size={20}
                />
              </button>

              {isCategoriesExpanded ? <div className="animate-in fade-in slide-in-from-top-2 border-secondary/20 mt-2 space-y-1 border-l-2 pl-3">
                  <Link
                    className="text-secondary hover:text-secondary-light block rounded-lg px-3 py-2.5 text-xs font-bold transition-colors duration-300"
                    href="/categories"
                    onClick={onClose}
                  >
                    View All Categories →
                  </Link>

                  {navCategories && navCategories.length > 0 ? (
                    navCategories.slice(0, 8).map((category) => (
                      <div key={category.id}>
                        <Link
                          className="text-secondary/70 hover:text-secondary block rounded-lg px-3 py-2.5 text-sm transition-colors duration-300"
                          href={`/categories?slug=${encodeURIComponent(category.slug)}`}
                          onClick={onClose}
                        >
                          {category.name}
                        </Link>
                        {category.children.length > 0 ? <div className="border-secondary/20 mt-1.5 space-y-1 border-l pl-2.5">
                            {category.children.slice(0, 3).map((child) => (
                              <Link
                                key={child.id}
                                className="text-secondary/60 hover:text-secondary/80 block rounded-lg px-2 py-1.5 text-xs transition-colors duration-300"
                                href={`/categories?slug=${encodeURIComponent(child.slug)}`}
                                onClick={onClose}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div> : null}
                      </div>
                    ))
                  ) : (
                    <p className="text-secondary/50 px-3 py-2 text-xs">Loading categories...</p>
                  )}
                </div> : null}
            </div>

            {/* Other Links */}
            <div className="border-primary-light/20 my-2 border-t" />

            <Link
              className="text-secondary/70 hover:bg-secondary/10 hover:text-secondary group flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition-all duration-300"
              href="/wishlist"
              onClick={onClose}
            >
              <Heart
                className="transition-transform duration-300 group-hover:scale-110"
                size={20}
              />
              <span>Wishlist</span>
            </Link>

            {isAuthenticated ? <Link
                className="text-secondary/70 hover:bg-secondary/10 hover:text-secondary group flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition-all duration-300"
                href="/orders"
                onClick={onClose}
              >
                <Package
                  className="transition-transform duration-300 group-hover:scale-110"
                  size={20}
                />
                <span>My Orders</span>
              </Link> : null}
          </nav>

          {/* Footer Actions */}
          <div className="border-primary-light/20 border-t px-3 py-4">
            {isAuthenticated && isAdminUser ? <Link
                className="border-secondary/30 text-secondary hover:border-secondary hover:bg-secondary/10 group flex items-center justify-center gap-2 rounded-lg border px-3 py-3 text-sm font-semibold transition-all duration-300"
                href="/admin"
                onClick={onClose}
              >
                <Shield
                  className="transition-transform duration-300 group-hover:scale-110"
                  size={18}
                />
                <span>Admin Panel</span>
              </Link> : null}
          </div>
        </div>
      </div>
    </>
  );
}
