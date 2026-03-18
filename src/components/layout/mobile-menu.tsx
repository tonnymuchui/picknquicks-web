'use client';

import { useAuth } from '@/lib/auth/hooks';
import { UserRole } from '@/types/auth';
import Link from 'next/link';
import { X, Home, Package, Grid, Percent, Shield } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isOpen) return null;

  const isAdminUser = user?.roles.some((role) =>
    [UserRole.ADMIN, UserRole.STAFF, UserRole.MANAGER].includes(role)
  );

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={onClose} />

      <div className="fixed left-0 top-0 z-50 h-full w-80 transform bg-[#1a1a1a] transition-transform md:hidden">
        <div className="p-6">
          <div className="mb-8 flex items-center justify-between">
            <Link href="/" onClick={onClose} className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <span className="text-xl font-bold text-white">PQ</span>
              </div>
              <span className="text-xl font-bold text-white">PickNQuicks</span>
            </Link>
            <button onClick={onClose} className="text-gray-400 transition-colors hover:text-white">
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-4">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-3 py-2 text-gray-300 transition-colors hover:text-white"
            >
              <Home size={20} />
              <span>Home</span>
            </Link>

            <Link
              href="/products"
              onClick={onClose}
              className="flex items-center gap-3 py-2 text-gray-300 transition-colors hover:text-white"
            >
              <Package size={20} />
              <span>Products</span>
            </Link>

            <Link
              href="/categories"
              onClick={onClose}
              className="flex items-center gap-3 py-2 text-gray-300 transition-colors hover:text-white"
            >
              <Grid size={20} />
              <span>Categories</span>
            </Link>

            <Link
              href="/deals"
              onClick={onClose}
              className="flex items-center gap-3 py-2 text-gray-300 transition-colors hover:text-white"
            >
              <Percent size={20} />
              <span>Deals</span>
            </Link>

            {isAuthenticated && isAdminUser && (
              <>
                <div className="my-4 border-t border-gray-700" />
                <Link
                  href="/admin"
                  onClick={onClose}
                  className="flex items-center gap-3 py-2 text-yellow-400 transition-colors hover:text-yellow-300"
                >
                  <Shield size={20} />
                  <span>Admin Dashboard</span>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
