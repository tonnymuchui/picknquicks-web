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

    if (user.roles.includes(UserRole.ADMIN)) {
      router.replace('/admin/dashboard');
    } else if (user.roles.includes(UserRole.MANAGER) || user.roles.includes(UserRole.STAFF)) {
      router.replace('/admin/products');
    } else if (user.roles.includes(UserRole.CUSTOMER)) {
      router.replace('/products');
    } else {
      router.replace('/');
    }
  }, [user, isLoading, router]);

  return null;
}
