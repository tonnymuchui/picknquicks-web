import { useQuery } from '@tanstack/react-query';

import { createClient } from '@/lib/supabase/client';
import { AuthProvider, type User, UserRole } from '@/types/auth';

export const authKeys = { all: ['auth'] as const, me: () => ['auth', 'me'] as const };

export function useMe() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: async (): Promise<User | null> => {
      const supabase = createClient();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error || !user) {
        return null;
      }
      const [{ data: profile }, { data: roleRows }] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('user_roles').select('role').eq('user_id', user.id),
      ]);
      const firstName = profile?.first_name ?? user.user_metadata.first_name ?? '';
      const lastName = profile?.last_name ?? user.user_metadata.last_name ?? '';
      return {
        id: user.id,
        email: user.email ?? '',
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`.trim() || user.email?.split('@')[0] || 'Customer',
        phone: profile?.phone ?? user.phone ?? undefined,
        avatarUrl: profile?.avatar_url ?? undefined,
        enabled: profile?.enabled ?? true,
        emailVerified: Boolean(user.email_confirmed_at),
        provider:
          user.app_metadata.provider === 'google' ? AuthProvider.GOOGLE : AuthProvider.DATABASE,
        roles: roleRows?.map((row) => row.role as UserRole) ?? [UserRole.CUSTOMER],
        createdAt: user.created_at,
        lastLogin: user.last_sign_in_at,
      };
    },
    staleTime: 5 * 60_000,
    retry: 1,
  });
}
