'use client';

import {
  ChevronDown,
  Grid,
  Heart,
  Home,
  Package,
  Percent,
  Search,
  Shield,
  ShoppingBag,
  User,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useAuth } from '@/lib/auth/hooks';
import { useCategoryTree } from '@/lib/category/categories.queries';
import { resolveAvatarUrl } from '@/lib/utils/media';
import { UserRole } from '@/types/auth';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { user, isAuthenticated } = useAuth();
  const { data: navCategories } = useCategoryTree(true);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const avatarUrl = resolveAvatarUrl(user?.avatarUrl);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/products', label: 'Shop', icon: Package },
    { href: '/deals', label: 'Deals', icon: Percent },
  ];

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setIsVisible(true));
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const isAdminUser = user?.roles.some((r) =>
    [UserRole.ADMIN, UserRole.STAFF, UserRole.MANAGER].includes(r)
  );

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 md:hidden ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        className={`bg-primary-dark border-primary-light/10 duration-250 fixed left-0 top-0 z-50 h-screen w-[80vw] max-w-sm border-r transition-transform ease-out md:hidden ${
          isVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-primary-light/10 flex items-center justify-between border-b px-5 py-4">
            <Link className="flex items-center" href="/" onClick={handleClose}>
              <Image
                priority
                alt="PickNQuicks"
                className="h-8 w-auto object-contain"
                height={32}
                src="/mylogo.png"
                width={80}
              />
            </Link>
            <button
              aria-label="Close menu"
              className="text-secondary/50 hover:text-secondary rounded-lg p-2 transition-colors"
              onClick={handleClose}
            >
              <X size={20} />
            </button>
          </div>

          {/* Search */}
          <div className="border-primary-light/8 border-b px-4 py-3">
            <div className="bg-primary-light/12 flex items-center gap-3 rounded-lg px-3 py-2.5">
              <Search className="text-secondary/30" size={16} />
              <span className="text-secondary/35 text-sm">Search products...</span>
            </div>
          </div>

          {/* Nav items */}
          <nav className="custom-scrollbar flex-1 space-y-0.5 overflow-y-auto px-3 py-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  className="text-secondary/60 hover:bg-primary-light/10 hover:text-secondary flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition-colors"
                  href={item.href}
                  onClick={handleClose}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}

            {/* Categories */}
            <button
              className="text-secondary/60 hover:bg-primary-light/10 hover:text-secondary flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold transition-colors"
              onClick={() => setIsCategoriesExpanded((p) => !p)}
            >
              <span className="flex items-center gap-3">
                <Grid size={18} />
                Categories
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${isCategoriesExpanded ? 'rotate-180' : ''}`}
              />
            </button>

            {isCategoriesExpanded ? (
              <div className="animate-float-in border-primary-light/10 ml-3 space-y-0.5 border-l-2 pl-3">
                <Link
                  className="text-secondary hover:bg-primary-light/10 block rounded-lg px-3 py-2 text-xs font-bold transition-colors"
                  href="/categories"
                  onClick={handleClose}
                >
                  View All Categories →
                </Link>
                {navCategories && navCategories.length > 0 ? (
                  navCategories.slice(0, 8).map((category) => (
                    <div key={category.id}>
                      <Link
                        className="text-secondary/55 hover:bg-primary-light/10 hover:text-secondary block rounded-lg px-3 py-2 text-sm transition-colors"
                        href={`/categories?slug=${encodeURIComponent(category.slug)}`}
                        onClick={handleClose}
                      >
                        {category.name}
                      </Link>
                      {category.children.length > 0 ? (
                        <div className="border-primary-light/8 ml-3 space-y-0.5 border-l pl-2.5">
                          {category.children.slice(0, 3).map((child) => (
                            <Link
                              key={child.id}
                              className="text-secondary/40 hover:text-secondary/65 block rounded-lg px-2 py-1.5 text-xs transition-colors"
                              href={`/categories?slug=${encodeURIComponent(child.slug)}`}
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
                  <p className="text-secondary/30 px-3 py-2 text-xs">Loading...</p>
                )}
              </div>
            ) : null}

            <div className="border-primary-light/8 mx-3 my-2 border-t" />

            <Link
              className="text-secondary/60 hover:bg-primary-light/10 hover:text-secondary flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition-colors"
              href="/wishlist"
              onClick={handleClose}
            >
              <Heart size={18} />
              Wishlist
            </Link>

            <Link
              className="text-secondary/60 hover:bg-primary-light/10 hover:text-secondary flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition-colors"
              href="/cart"
              onClick={handleClose}
            >
              <ShoppingBag size={18} />
              Cart
            </Link>

            {isAuthenticated ? (
              <Link
                className="text-secondary/60 hover:bg-primary-light/10 hover:text-secondary flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition-colors"
                href="/orders"
                onClick={handleClose}
              >
                <Package size={18} />
                My Orders
              </Link>
            ) : null}
          </nav>

          {/* Footer */}
          <div className="border-primary-light/10 space-y-3 border-t p-4">
            {isAuthenticated && isAdminUser ? (
              <Link
                className="border-accent/20 text-accent-light hover:bg-accent/10 flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors"
                href="/admin"
                onClick={handleClose}
              >
                <Shield size={16} />
                Admin Panel
              </Link>
            ) : null}

            {isAuthenticated && user ? (
              <div className="bg-primary-light/10 flex items-center gap-3 rounded-lg px-4 py-3">
                {avatarUrl ? (
                  <Image
                    alt={user.fullName}
                    className="h-8 w-8 rounded-lg object-cover"
                    height={32}
                    src={avatarUrl}
                    width={32}
                  />
                ) : (
                  <div className="bg-primary-light/20 text-secondary flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold">
                    {user.firstName?.[0]}
                    {user.lastName?.[0]}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-secondary truncate text-sm font-semibold">{user.fullName}</p>
                  <p className="text-secondary/40 truncate text-[11px]">{user.email}</p>
                </div>
              </div>
            ) : (
              <div className="bg-primary-light/10 flex items-center gap-3 rounded-lg px-4 py-3">
                <User className="text-secondary/40" size={18} />
                <div>
                  <p className="text-secondary/60 text-sm font-semibold">Guest</p>
                  <p className="text-secondary/35 text-[11px]">Sign in for the best experience</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
