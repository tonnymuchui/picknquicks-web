'use client';

import {
  Users,
  ShoppingBag,
  DollarSign,
  Package,
  AlertCircle,
  Shield,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { useAdminStats } from '@/lib/admin/queries';
import { UserRole } from '@/types/auth';

export default function AdminPage() {
  const { data: stats, isLoading } = useAdminStats();

  return (
    <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF]}>
      <div className="to-primary/5 bg-linear-to-br min-h-screen from-gray-50 via-white">
        <div className="border-b border-gray-100 bg-white/60 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back. Here's what's happening today.</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 animate-pulse rounded-2xl bg-white shadow-sm" />
              ))}
            </div>
          ) : (
            <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                change="+12%"
                icon={<Users className="h-5 w-5" />}
                iconBg="bg-primary/10"
                iconColor="text-primary"
                title="Total Users"
                value={stats?.totalUsers || 0}
              />
              <StatCard
                change="+8%"
                icon={<ShoppingBag className="h-5 w-5" />}
                iconBg="bg-secondary/20"
                iconColor="text-secondary-dark"
                title="Total Orders"
                value={stats?.totalOrders || 0}
              />
              <StatCard
                change="+23%"
                icon={<DollarSign className="h-5 w-5" />}
                iconBg="bg-highlight/10"
                iconColor="text-highlight"
                title="Revenue"
                value={`$${(stats?.totalRevenue || 0).toLocaleString()}`}
              />
              <StatCard
                isAlert
                icon={<AlertCircle className="h-5 w-5" />}
                iconBg="bg-accent/10"
                iconColor="text-accent"
                title="Low Stock"
                value={stats?.lowStockProducts || 0}
              />
            </div>
          )}

          <div className="mb-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <QuickActionCard
                color="primary"
                description="View and manage all users and staff"
                href="/admin/users"
                icon={<Users className="h-6 w-6" />}
                title="Manage Users"
              />
              <QuickActionCard
                color="accent"
                description="Create and configure roles"
                href="/admin/roles"
                icon={<Shield className="h-6 w-6" />}
                title="Manage Roles"
              />
              <QuickActionCard
                color="secondary"
                description="Manage products and inventory"
                href="/admin/products"
                icon={<Package className="h-6 w-6" />}
                title="Products"
              />
              <QuickActionCard
                color="highlight"
                description="View and process orders"
                href="/admin/orders"
                icon={<ShoppingBag className="h-6 w-6" />}
                title="Orders"
              />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  change?: string;
  isAlert?: boolean;
}

function StatCard({ title, value, icon, iconBg, iconColor, change, isAlert }: StatCardProps) {
  const isPositive = change?.startsWith('+');

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
          {change ? <div
              className={`mt-2 flex items-center gap-1 text-xs font-medium ${isAlert ? 'text-accent' : isPositive ? 'text-secondary-dark' : 'text-highlight'}`}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {change} from last month
            </div> : null}
        </div>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

interface QuickActionCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: 'primary' | 'accent' | 'secondary' | 'highlight';
}

const colorMap = {
  primary: {
    bg: 'bg-primary/10',
    text: 'text-primary',
    hover: 'group-hover:bg-primary group-hover:text-white',
  },
  accent: {
    bg: 'bg-accent/10',
    text: 'text-accent',
    hover: 'group-hover:bg-accent group-hover:text-white',
  },
  secondary: {
    bg: 'bg-secondary/20',
    text: 'text-secondary-dark',
    hover: 'group-hover:bg-secondary-dark group-hover:text-white',
  },
  highlight: {
    bg: 'bg-highlight/10',
    text: 'text-highlight',
    hover: 'group-hover:bg-highlight group-hover:text-white',
  },
};

function QuickActionCard({ title, description, href, icon, color }: QuickActionCardProps) {
  const c = colorMap[color];
  return (
    <Link
      className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-gray-200 hover:shadow-md"
      href={href}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${c.bg} ${c.text} ${c.hover} transition-all`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <p className="mt-0.5 truncate text-xs text-gray-500">{description}</p>
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-gray-500" />
    </Link>
  );
}
