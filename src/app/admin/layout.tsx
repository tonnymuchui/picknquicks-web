'use client';

import {
  BarChart3,
  Boxes,
  ChevronRight,
  CircleDollarSign,
  Contact,
  ExternalLink,
  FileText,
  LayoutDashboard,
  MapPinned,
  Menu,
  MailCheck,
  PackageSearch,
  PanelLeftClose,
  PanelLeftOpen,
  ReceiptText,
  Settings,
  ShoppingBag,
  Tags,
  Users,
  Warehouse,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useSyncExternalStore, type ReactNode } from 'react';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { UserMenu } from '@/components/auth/user-menu';
import { BrandLogo, BrandMark } from '@/components/common/brand-logo';
import { UserRole } from '@/types/auth';

const groups = [
  {
    label: 'Overview',
    items: [
      { href: '/admin/dashboard', name: 'Overview', icon: LayoutDashboard },
      { href: '/admin/orders', name: 'Orders', icon: ShoppingBag },
      { href: '/admin/payments', name: 'Payments', icon: CircleDollarSign },
    ],
  },
  {
    label: 'Commerce',
    items: [
      { href: '/admin/products', name: 'Products', icon: PackageSearch },
      { href: '/admin/inventory', name: 'Inventory', icon: Warehouse },
      { href: '/admin/shipping', name: 'Delivery zones', icon: MapPinned },
      { href: '/admin/categories', name: 'Categories', icon: Boxes },
      { href: '/admin/brands', name: 'Brands', icon: Tags },
    ],
  },
  {
    label: 'People',
    items: [
      { href: '/admin/customers', name: 'Customers', icon: Contact },
      { href: '/admin/users', name: 'Team', icon: Users },
      { href: '/admin/marketing', name: 'Bundles & offers', icon: BarChart3 },
    ],
  },
  {
    label: 'Store',
    items: [
      { href: '/admin/finance', name: 'Finance & ledger', icon: ReceiptText },
      { href: '/admin/emails', name: 'Email delivery', icon: MailCheck },
      { href: '/admin/settings', name: 'Store settings', icon: Settings },
      { href: '/admin/roles', name: 'Roles & access', icon: FileText },
    ],
  },
];

const sidebarStorageKey = 'admin-sidebar-collapsed';
const sidebarChangeEvent = 'admin-sidebar-change';

function subscribeToSidebar(callback: () => void) {
  window.addEventListener(sidebarChangeEvent, callback);
  return () => window.removeEventListener(sidebarChangeEvent, callback);
}

function getSidebarSnapshot() {
  return window.localStorage.getItem(sidebarStorageKey) === 'true';
}

function getServerSidebarSnapshot() {
  return false;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const collapsed = useSyncExternalStore(
    subscribeToSidebar,
    getSidebarSnapshot,
    getServerSidebarSnapshot
  );

  const toggleCollapsed = () => {
    window.localStorage.setItem(sidebarStorageKey, String(!collapsed));
    window.dispatchEvent(new Event(sidebarChangeEvent));
  };
  const current = groups
    .flatMap((group) => group.items)
    .find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
  return (
    <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF]}>
      <div className="admin-shell min-h-screen bg-[#faf9f7] text-black">
        {open ? (
          <button
            aria-label="Close navigation"
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setOpen(false)}
          />
        ) : null}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-black/10 bg-white text-black transition-[width,transform] duration-200 lg:translate-x-0 ${collapsed ? 'lg:w-[72px]' : 'lg:w-[260px]'} ${open ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div
            className={`flex h-20 items-center border-b border-black/10 ${collapsed ? 'lg:justify-center lg:px-0' : 'justify-between px-5'}`}
          >
            <Link aria-label="Admin overview" href="/admin/dashboard">
              <span className={collapsed ? 'hidden lg:block' : 'hidden'}>
                <BrandMark className="size-9" />
              </span>
              <span className={collapsed ? 'lg:hidden' : ''}>
                <BrandLogo
                  markClassName="size-9"
                  subtitle="Store administration"
                  wordmarkClassName="text-[22px]"
                />
              </span>
            </Link>
            <button className="text-black/60 lg:hidden" onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <button
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="absolute -right-3 top-[66px] z-10 hidden size-7 items-center justify-center rounded-full border border-black/15 bg-white text-black/55 hover:border-[#9a5d3b] hover:text-[#9a5d3b] lg:flex"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={toggleCollapsed}
          >
            {collapsed ? <PanelLeftOpen size={14} /> : <PanelLeftClose size={14} />}
          </button>
          <nav className={`flex-1 overflow-y-auto py-5 ${collapsed ? 'lg:px-2' : 'px-3'}`}>
            {groups.map((group) => (
              <div key={group.label} className={collapsed ? 'mb-4 lg:mb-5' : 'mb-6'}>
                <p
                  className={`px-3 pb-2 text-[9px] font-semibold uppercase tracking-[.18em] text-black/40 ${collapsed ? 'lg:sr-only' : ''}`}
                >
                  {group.label}
                </p>
                <div className="space-y-1">
                  {group.items.map(({ href, name, icon: Icon }) => {
                    const active = pathname === href || pathname.startsWith(`${href}/`);
                    return (
                      <Link
                        key={href}
                        aria-label={collapsed ? name : undefined}
                        className={`group flex min-h-10 items-center gap-3 rounded-lg px-3 text-[13px] transition-colors ${collapsed ? 'lg:justify-center lg:px-0' : ''} ${active ? 'bg-[#f2eee7] font-semibold text-[#754329]' : 'text-black/60 hover:bg-[#f7f5f2] hover:text-black'}`}
                        href={href}
                        title={collapsed ? name : undefined}
                        onClick={() => setOpen(false)}
                      >
                        <Icon size={17} strokeWidth={1.7} />
                        <span className={`flex-1 ${collapsed ? 'lg:hidden' : ''}`}>{name}</span>
                        {active && !collapsed ? <ChevronRight size={14} /> : null}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
          <div className={`border-t border-black/10 ${collapsed ? 'lg:p-2' : 'p-3'}`}>
            <Link
              aria-label="Return to storefront"
              className={`flex min-h-10 items-center gap-3 rounded-lg px-3 text-xs text-black/60 hover:bg-[#f7f5f2] ${collapsed ? 'lg:justify-center lg:px-0' : ''}`}
              href="/"
              title={collapsed ? 'Return to storefront' : undefined}
            >
              <ExternalLink size={15} />
              <span className={collapsed ? 'lg:hidden' : ''}>Return to storefront</span>
            </Link>
          </div>
        </aside>
        <div
          className={`transition-[padding] duration-200 ${collapsed ? 'lg:pl-[72px]' : 'lg:pl-[260px]'}`}
        >
          <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-black/10 bg-white/95 px-4 backdrop-blur sm:px-7">
            <div className="flex items-center gap-3">
              <button
                className="flex size-10 items-center justify-center border border-black/15 bg-white lg:hidden"
                onClick={() => setOpen(true)}
              >
                <Menu size={20} />
              </button>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-black/40">
                  Administration
                </p>
                <h1 className="text-lg font-semibold tracking-[-.02em]">
                  {current?.name ?? 'Admin'}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                className="hidden text-xs text-black/50 underline-offset-4 hover:underline sm:block"
                href="/"
              >
                View storefront
              </Link>
              <UserMenu />
            </div>
          </header>
          <main className="min-h-[calc(100vh-4.5rem)]">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
