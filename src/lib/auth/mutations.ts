import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import {
  type ApiResponse,
  type AuthResponse,
  type LoginRequest,
  type RegisterRequest,
  type User,
  UserRole,
} from '@/types/auth';

import { authKeys } from './queries';
import { apiClient } from '../api/client';
import { tokenManager } from '../utils/token';

function normalizeUserPayload(payload: unknown): User {
  const data = payload as Record<string, unknown> | User;
  if (typeof data === 'object' && data !== null && 'data' in data) {
    return (data as Record<string, unknown>).data as User;
  }
  return data as User;
}

function normalizeApiResponse(payload: unknown): ApiResponse {
  const data = payload as Record<string, unknown> | ApiResponse;
  if (typeof data === 'object' && data !== null && 'data' in data) {
    return (data as Record<string, unknown>).data as ApiResponse;
  }
  return data as ApiResponse;
}

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (userData: RegisterRequest): Promise<ApiResponse> => {
      const { data } = await apiClient.post('/auth/register', userData);
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Registration successful Check your email.');
      router.push('/verify-email');
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      const message = err?.response?.data?.message || 'Registration failed';
      toast.error(message);
    },
  });
}

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginRequest): Promise<AuthResponse> => {
      const { data } = await apiClient.post('/auth/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      tokenManager.setTokens(data.accessToken, data.refreshToken);
      queryClient.setQueryData(authKeys.me(), data.user);

      const isAdmin = data.user.roles.includes(UserRole.ADMIN);
      const isStaff = data.user.roles.includes(UserRole.STAFF);
      const isManager = data.user.roles.includes(UserRole.MANAGER);

      if (isAdmin || isStaff || isManager) {
        toast.success(`Welcome back, ${data.user.firstName}!`);
        router.replace('/admin/dashboard');
      } else {
        toast.success('Welcome back!');
        router.replace('/');
      }
    },

    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      const message = err?.response?.data?.message || 'Login failed';
      toast.error(message);
    },
  });
}
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.post('/auth/logout');
    },

    onSettled: () => {
      tokenManager.clearTokens();
      queryClient.clear();
      toast.success('Logged out successfully');
      router.push('/');
    },
  });
}

export function useVerifyEmail() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (token: string): Promise<ApiResponse> => {
      const { data } = await apiClient.get(`/auth/verify-email?token=${token}`);
      return data;
    },

    onSuccess: (data) => {
      toast.success(data.message);
      router.push('/login');
    },

    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      const message = err?.response?.data?.message || 'Verification failed';
      toast.error(message);
    },
  });
}

export function useResendVerification() {
  return useMutation({
    mutationFn: async (email: string): Promise<ApiResponse> => {
      const { data } = await apiClient.post(`/auth/resend-verification?email=${email}`);
      return data;
    },

    onSuccess: (data) => {
      toast.success(data.message);
    },
  });
}

export function useForgotPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (email: string): Promise<ApiResponse> => {
      const { data } = await apiClient.post('/auth/forgot-password', { email });
      return data;
    },

    onSuccess: (data) => {
      toast.success(data.message);
      router.push('/');
    },
  });
}

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: {
      token: string;
      newPassword: string;
      confirmPassword: string;
    }): Promise<ApiResponse> => {
      const { data } = await apiClient.post('/auth/reset-password', payload);
      return data;
    },

    onSuccess: (data) => {
      toast.success(data.message);
      router.push('/');
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: FormData) => {
      const { data } = await apiClient.patch('/auth/profile', userData);
      return normalizeUserPayload(data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.me(), data);
      toast.success('Profile updated successfully');
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      const message = err?.response?.data?.message || 'Failed to update profile';
      toast.error(message);
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async (payload: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) => {
      const { data } = await apiClient.post('/auth/change-password', payload);
      return normalizeApiResponse(data);
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Password changed successfully');
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      const message = err?.response?.data?.message || 'Failed to change password';
      toast.error(message);
    },
  });
}
