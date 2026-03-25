'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { UserMenu } from '@/components/auth/user-menu';
import { UserRole } from '@/types/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navigation = [
    { href: '/admin/dashboard', name: 'Overview' },
    { href: '/admin/products', name: 'Products' },
    { href: '/admin/orders', name: 'Orders' },
    { href: '/admin/users', name: 'Users' },
    { href: '/admin/categories', name: 'Categories' },
  ];

  return (
    <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF]}>
      <div className="min-h-screen bg-gray-950">
        <nav className="border-b border-gray-800 bg-gray-900 px-4 md:px-6 lg:px-8 py-3 md:py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between gap-4">
            <div className="text-base md:text-lg font-bold text-white whitespace-nowrap">PickNQuicks</div>
            <div className="flex items-center gap-2 md:gap-4 lg:gap-8 overflow-x-auto">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    className={`text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive
                        ? 'rounded bg-yellow-400 px-2 md:px-3 py-1 text-gray-900'
                        : 'text-gray-400 hover:text-white'
                    }`}
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
            <div className="shrink-0">
              <UserMenu />
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </div>
    </ProtectedRoute>
  );
}
