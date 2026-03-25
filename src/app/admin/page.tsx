'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/lib/auth/hooks';
import { UserRole } from '@/types/auth';

export default function AdminPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      router.replace('/');
      return;
    }

    const hasAdminRole = user.roles.some((role) =>
      [UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF].includes(role)
    );

    if (hasAdminRole) {
      router.replace('/admin/dashboard');
    } else if (user.roles.includes(UserRole.CUSTOMER)) {
      router.replace('/shop');
    } else {
      router.replace('/');
    }
  }, [user, isLoading, router]);

  return null;
}
