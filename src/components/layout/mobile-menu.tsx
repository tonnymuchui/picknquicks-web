'use client';

import { X, Home, Package, Grid, Percent, Shield } from 'lucide-react';
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

  if (!isOpen) {
    return null;
  }

  const isAdminUser = user?.roles.some((role) =>
    [UserRole.ADMIN, UserRole.STAFF, UserRole.MANAGER].includes(role)
  );

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={onClose} />

      <div className="fixed left-0 top-0 z-50 h-full w-80 transform bg-[#1a1a1a] transition-transform md:hidden">
        <div className="p-6">
          <div className="mb-8 flex items-center justify-between">
            <Link className="flex items-center gap-2" href="/" onClick={onClose}>
              <div className="bg-linear-to-br flex h-10 w-10 items-center justify-center rounded-lg from-blue-500 to-purple-600">
                <span className="text-xl font-bold text-white">PQ</span>
              </div>
              <span className="text-xl font-bold text-white">PickNQuicks</span>
            </Link>
            <button className="text-gray-400 transition-colors hover:text-white" onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-4">
            <Link
              className="flex items-center gap-3 py-2 text-gray-300 transition-colors hover:text-white"
              href="/"
              onClick={onClose}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>

            <Link
              className="flex items-center gap-3 py-2 text-gray-300 transition-colors hover:text-white"
              href="/products"
              onClick={onClose}
            >
              <Package size={20} />
              <span>Products</span>
            </Link>

            <div className="rounded-lg border border-gray-800 bg-[#151515] p-3">
              <button
                className="flex w-full items-center justify-between text-sm font-medium text-gray-200"
                type="button"
                onClick={() => setIsCategoriesExpanded((prev) => !prev)}
              >
                <span className="inline-flex items-center gap-2">
                  <Grid size={16} />
                  Categories
                </span>
                <span className="text-xs text-gray-400">
                  {isCategoriesExpanded ? 'Hide' : 'Show'}
                </span>
              </button>

              {isCategoriesExpanded ? (
                <div className="mt-3 space-y-2">
                  <Link
                    className="block rounded-md px-2 py-1.5 text-sm font-medium text-blue-300 transition hover:bg-gray-800 hover:text-blue-200"
                    href="/categories"
                    onClick={onClose}
                  >
                    View all categories
                  </Link>

                  {navCategories && navCategories.length > 0 ? (
                    navCategories.slice(0, 8).map((category) => (
                      <div key={category.id}>
                        <Link
                          className="block rounded-md px-2 py-1.5 text-sm text-gray-200 transition hover:bg-gray-800 hover:text-white"
                          href={`/categories?slug=${encodeURIComponent(category.slug)}`}
                          onClick={onClose}
                        >
                          {category.name}
                        </Link>

                        {category.children.length > 0 ? (
                          <div className="space-y-1 pl-4">
                            {category.children.slice(0, 3).map((child) => (
                              <Link
                                key={child.id}
                                className="block rounded-md px-2 py-1 text-xs text-gray-400 transition hover:bg-gray-800 hover:text-gray-200"
                                href={`/categories?slug=${encodeURIComponent(child.slug)}`}
                                onClick={onClose}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500">No categories available</p>
                  )}
                </div>
              ) : null}
            </div>

            <Link
              className="flex items-center gap-3 py-2 text-gray-300 transition-colors hover:text-white"
              href="/deals"
              onClick={onClose}
            >
              <Percent size={20} />
              <span>Deals</span>
            </Link>

            {isAuthenticated && isAdminUser ? (
              <>
                <div className="my-4 border-t border-gray-700" />
                <Link
                  className="flex items-center gap-3 py-2 text-yellow-400 transition-colors hover:text-yellow-300"
                  href="/admin"
                  onClick={onClose}
                >
                  <Shield size={20} />
                  <span>Admin Dashboard</span>
                </Link>
              </>
            ) : null}
          </nav>
        </div>
      </div>
    </>
  );
}
