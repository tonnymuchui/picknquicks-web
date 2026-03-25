'use client';

import { DollarSign, ShoppingBag, ShoppingCart, Users } from 'lucide-react';

import { CategoryChart, MetricCard, OrdersTable, SalesChart } from '@/components/admin/dashboard';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { useAdminDashboard } from '@/lib/admin/queries';
import { UserRole } from '@/types/auth';

export default function AdminDashboard() {
  const { data: dashboardData } = useAdminDashboard();

  if (!dashboardData) {
    return (
      <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF]}>
        <div className="flex min-h-screen items-center justify-center bg-gray-950">
          <p className="text-gray-400">Failed to load dashboard data</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF]}>
      <div className="min-h-screen bg-gray-950 p-4 md:p-8">
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
            <MetricCard
              color="emerald"
              icon={<ShoppingCart className="h-5 w-5" />}
              metric={dashboardData.metrics.revenue}
            />
            <MetricCard
              color="red"
              icon={<Users className="h-5 w-5" />}
              metric={dashboardData.metrics.customers}
            />
            <MetricCard
              color="amber"
              icon={<ShoppingBag className="h-5 w-5" />}
              metric={dashboardData.metrics.totalOrders}
            />
            <MetricCard
              color="purple"
              icon={<DollarSign className="h-5 w-5" />}
              metric={dashboardData.metrics.averageValue}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-6">
            <div className="md:col-span-2">
              <SalesChart data={dashboardData.salesPerformance} />
            </div>
            <div>
              <CategoryChart data={dashboardData.categorySales} />
            </div>
          </div>

          <OrdersTable orders={dashboardData.recentOrders} />
        </div>
      </div>
    </ProtectedRoute>
  );
}
