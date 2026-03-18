import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { tokenManager } from '@/lib/utils/token';
import { User } from '@/types/auth';

export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
};

export function useMe() {
  return useQuery({
    queryKey: authKeys.me(),

    queryFn: async (): Promise<User> => {
      try {
        const { data } = await apiClient.get('/auth/me');
        return (data?.data ?? data) as User;
      } catch (error: any) {
        const status = error?.response?.status;
        if (status !== 404 && status !== 405) {
          throw error;
        }

        const { data } = await apiClient.get('/users/me');
        return (data?.data ?? data) as User;
      }
    },

    enabled: tokenManager.hasToken(),

    staleTime: 5 * 60 * 1000,

    retry: (failureCount, error: any) => {
      const status = error?.response?.status;
      if (status === 401 || status === 403) return false;
      return failureCount < 2;
    },
    retryDelay: 1000,
  });
}
