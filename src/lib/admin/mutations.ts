import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { apiClient } from '@/lib/api/client';

import { adminKeys } from './queries';

import type {
  UpdateUserRolesRequest,
  CreateStaffRequest,
  CreateRoleRequest,
  UpdateRoleRequest,
} from '@/types/admin';

export function useUpdateUserRoles() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, roles }: UpdateUserRolesRequest) => {
      const { data } = await apiClient.put(`/admin/users/${userId}/roles`, { roles });
      return data;
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });

      queryClient.invalidateQueries({ queryKey: adminKeys.userDetail(variables.userId) });

      toast.success('User roles updated successfully');
    },

    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || 'Failed to update roles');
    },
  });
}

export function useCreateStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (staffData: CreateStaffRequest) => {
      const { data } = await apiClient.post('/admin/users/staff', staffData);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });

      toast.success('Staff member created successfully');
    },

    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || 'Failed to create staff');
    },
  });
}

export function useToggleUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, enabled }: { userId: string; enabled: boolean }) => {
      const { data } = await apiClient.patch(`/admin/users/${userId}/status`, { enabled });
      return data;
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
      queryClient.invalidateQueries({ queryKey: adminKeys.userDetail(variables.userId) });

      toast.success(`User ${variables.enabled ? 'enabled' : 'disabled'} successfully`);
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      await apiClient.delete(`/admin/users/${userId}`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
      toast.success('User deleted successfully');
    },
  });
}

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (roleData: CreateRoleRequest) => {
      const { data } = await apiClient.post('/admin/roles', roleData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.roles() });
      toast.success('Role created successfully');
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || 'Failed to create role');
    },
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ roleId, ...roleData }: UpdateRoleRequest & { roleId: string }) => {
      const { data } = await apiClient.put(`/admin/roles/${roleId}`, roleData);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.roles() });
      queryClient.invalidateQueries({ queryKey: adminKeys.roleDetail(variables.roleId) });
      toast.success('Role updated successfully');
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || 'Failed to update role');
    },
  });
}

export function useDeleteRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (roleId: string) => {
      const { data } = await apiClient.delete(`/admin/roles/${roleId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.roles() });
      toast.success('Role deleted successfully');
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || 'Failed to delete role');
    },
  });
}
