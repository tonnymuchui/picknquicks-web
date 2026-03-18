'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { tokenManager } from '@/lib/utils/token';
import { authKeys } from '@/lib/auth/queries';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { apiClient } from '@/lib/api/client';
import { UserRole } from '@/types/auth';

export default function OAuth2RedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      toast.error(`Login failed: ${error}`);
      router.push('/auth/login');
      return;
    }

    if (token) {
      tokenManager.setTokens(token, token);

      apiClient
        .get('/users/me')
        .then(({ data }) => {
          queryClient.invalidateQueries({ queryKey: authKeys.me() });
          const isAdmin = data.roles.includes(UserRole.ADMIN);
          const isStaff = data.roles.includes(UserRole.STAFF);
          const isManager = data.roles.includes(UserRole.MANAGER);

          if (isAdmin || isStaff || isManager) {
            toast.success(`Welcome back, ${data.firstName}!`);
            router.push('/admin');
          } else {
            toast.success('Logged in with Google');
            router.push('/');
          }
        })
        .catch(() => {
          router.push('/login');
        });
    } else {
      router.push('/login');
    }
  }, [searchParams, router, queryClient]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
        <p className="mt-4 text-gray-600">Completing login...</p>
      </div>
    </div>
  );
}
