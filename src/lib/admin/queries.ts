import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import type { UserFilters, UserListResponse, RoleResponse } from '@/types/admin';

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
