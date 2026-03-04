import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { tokenManager } from '@/lib/utils/token';
import { User } from '@/app/types/auth';

export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
};

export function useMe() {
  return useQuery({
    queryKey: authKeys.me(),
    
    queryFn: async (): Promise<User> => {
      const { data } = await apiClient.get('/users/me');
      return data;
    },
    
    enabled: tokenManager.hasToken(),
    
    staleTime: 5 * 60 * 1000,
    
    retry: false,
  });
}