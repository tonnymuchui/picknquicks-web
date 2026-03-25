import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api/client';

import type {
  UserFilters,
  UserListResponse,
  RoleResponse,
  AdminDashboardData,
} from '@/types/admin';

export const adminKeys = {
  all: ['admin'] as const,
  users: () => [...adminKeys.all, 'users'] as const,
  usersList: (filters: UserFilters) => [...adminKeys.users(), 'list', filters] as const,
  userDetail: (id: string) => [...adminKeys.users(), 'detail', id] as const,
  stats: () => [...adminKeys.all, 'stats'] as const,
  roles: () => [...adminKeys.all, 'roles'] as const,
  roleDetail: (id: string) => [...adminKeys.roles(), 'detail', id] as const,
};

export function useUsers(filters: UserFilters = {}) {
  return useQuery({
    queryKey: adminKeys.usersList(filters),
    queryFn: async (): Promise<UserListResponse> => {
      const { data } = await apiClient.get('/admin/users', {
        params: filters,
      });
      return data;
    },
    staleTime: 60 * 1000,
  });
}

export function useUser(userId: string) {
  return useQuery({
    queryKey: adminKeys.userDetail(userId),
    queryFn: async () => {
      const { data } = await apiClient.get(`/admin/users/${userId}`);
      return data;
    },
    enabled: !!userId,
  });
}

export function useAdminStats() {
  return useQuery({
    queryKey: adminKeys.stats(),
    queryFn: async () => {
      const { data } = await apiClient.get('/admin/dashboard');
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useRoles() {
  return useQuery({
    queryKey: adminKeys.roles(),
    queryFn: async (): Promise<RoleResponse[]> => {
      const { data } = await apiClient.get('/admin/roles');
      return data.data ?? data;
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useRole(roleId: string) {
  return useQuery({
    queryKey: adminKeys.roleDetail(roleId),
    queryFn: async (): Promise<RoleResponse> => {
      const { data } = await apiClient.get(`/admin/roles/${roleId}`);
      return data.data ?? data;
    },
    enabled: !!roleId,
  });
}

export function useAdminDashboard() {
  return useQuery({
    queryKey: adminKeys.all,
    queryFn: async (): Promise<AdminDashboardData> => {
      const dummyData: AdminDashboardData = {
        metrics: {
          revenue: {
            value: 'KSH 45,892.50',
            label: 'Total Revenue',
            change: 8.2,
            isPositive: true,
          },
          customers: {
            value: '2,543',
            label: 'Total Customers',
            change: -3.1,
            isPositive: false,
          },
          totalOrders: {
            value: '1,204',
            label: 'Total Orders',
            change: 5.8,
            isPositive: true,
          },
          averageValue: {
            value: 'KSH 38.12',
            label: 'Average Order Value',
            change: 5.8,
            isPositive: true,
          },
        },
        salesPerformance: {
          months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
          sales: [32000, 35500, 28900, 41200, 38700, 45300, 52100, 48600],
          currentMonthIncrease: 18.6,
        },
        categorySales: [
          { category: 'Electronics', sales: 28500, percentage: 42 },
          { category: 'Clothing', sales: 19200, percentage: 28 },
          { category: 'Home & Garden', sales: 20892, percentage: 30 },
        ],
        recentOrders: [
          {
            id: 'ORD-001',
            orderId: '#ORD-001',
            customerName: 'John Mwangi',
            email: 'john.mwangi@email.com',
            customerImage: undefined,
            status: 'Delivered',
            total: 2505,
            date: '2026-03-24',
            itemCount: 3,
          },
          {
            id: 'ORD-002',
            orderId: '#ORD-002',
            customerName: 'Sarah Kipchoge',
            email: 'sarah.k@email.com',
            customerImage: undefined,
            status: 'Processing',
            total: 1852,
            date: '2026-03-23',
            itemCount: 2,
          },
          {
            id: 'ORD-003',
            orderId: '#ORD-003',
            customerName: 'Michael Kimani',
            email: 'm.kimani@email.com',
            customerImage: undefined,
            status: 'Shipped',
            total: 4208,
            date: '2026-03-22',
            itemCount: 5,
          },
          {
            id: 'ORD-004',
            orderId: '#ORD-004',
            customerName: 'Grace Mutua',
            email: 'grace.m@email.com',
            customerImage: undefined,
            status: 'Pending',
            total: 955,
            date: '2026-03-21',
            itemCount: 1,
          },
          {
            id: 'ORD-005',
            orderId: '#ORD-005',
            customerName: 'David Ochieng',
            email: 'david.o@email.com',
            customerImage: undefined,
            status: 'Delivered',
            total: 6150,
            date: '2026-03-20',
            itemCount: 7,
          },
        ],
      };
      return dummyData;
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
}
