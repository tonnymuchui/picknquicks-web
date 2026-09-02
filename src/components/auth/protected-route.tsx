'use client';

import { Loader2 } from 'lucide-react';

import { useRequireAuth } from '@/lib/auth/hooks';

import { AccessDenied } from './access-denied';

import type { UserRole } from '@/types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
}

function LoadingSkeleton() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-3">
      <Loader2 className="text-primary h-10 w-10 animate-spin" />
      <p className="text-sm text-gray-400">Verifying access…</p>
    </div>
  );
}

export function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
  const { status } = useRequireAuth(requiredRoles);

  if (status === 'loading') {
    return <LoadingSkeleton />;
  }

  if (status === 'forbidden') {
    return (
      <AccessDenied
        message={
          requiredRoles
            ? `This page requires one of the following roles: ${requiredRoles.join(', ')}. Contact your administrator if you need access.`
            : 'Your current role does not have permission to view this resource.'
        }
        title="You don't have permission to view this page"
      />
    );
  }

  if (status === 'unauthenticated') {
    return <LoadingSkeleton />;
  }

  return <>{children}</>;
}
