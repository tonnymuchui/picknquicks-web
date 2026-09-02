import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

import { UserRole } from '@/types/auth';

import { useMe } from './queries';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated' | 'forbidden' | 'error';

export function useAuth() {
  const { data: user, isLoading, error } = useMe();

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.roles.includes(UserRole.ADMIN),
    isCustomer: user?.roles.includes(UserRole.CUSTOMER),
    isStaff: user?.roles.includes(UserRole.STAFF),
    isManager: user?.roles.includes(UserRole.MANAGER),

    hasRole: (role: UserRole) => user?.roles.includes(role) ?? false,

    hasAnyRole: (...roles: UserRole[]) => roles.some((role) => user?.roles.includes(role)) ?? false,
  };
}

export function useRequireAuth(requiredRoles?: UserRole[]) {
  const router = useRouter();
  const { user, isLoading, error } = useAuth();
  const hasRedirected = useRef(false);

  let status: AuthStatus = 'loading';

  if (!isLoading) {
    if (error && !user) {
      const responseStatus = (error as { response?: { status?: number } }).response?.status;
      status = responseStatus === 403 ? 'forbidden' : 'unauthenticated';
    } else if (!user) {
      status = 'unauthenticated';
    } else if (
      requiredRoles &&
      requiredRoles.length > 0 &&
      !requiredRoles.some((role) => user.roles.includes(role))
    ) {
      status = 'forbidden';
    } else {
      status = 'authenticated';
    }
  }

  useEffect(() => {
    if (isLoading || hasRedirected.current) {
      return;
    }

    if (status === 'unauthenticated') {
      hasRedirected.current = true;
      toast.error('Please sign in to access this page');
      router.replace('/auth/login');
    }
  }, [status, isLoading, router]);

  return { user, isLoading, status };
}
