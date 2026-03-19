'use client';

import { ShieldAlert, ArrowLeft, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/lib/auth/hooks';

interface AccessDeniedProps {
  title?: string;
  message?: string;
}

export function AccessDenied({
  title = "You don't have access to this page",
  message = 'Your current role does not have permission to view this resource. If you believe this is a mistake, please contact your administrator.',
}: AccessDeniedProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-highlight/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <ShieldAlert className="text-highlight h-10 w-10" />
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-900">Access Denied</h1>
        <p className="mb-1 text-lg font-medium text-gray-700">{title}</p>
        <p className="mb-8 text-sm text-gray-500">{message}</p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 sm:w-auto"
            onClick={() => router.back()}
          >
            <ArrowLeft size={16} />
            Go Back
          </button>

          {isAuthenticated ? (
            <button
              className="bg-primary shadow-primary/25 hover:bg-primary-light flex w-full items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all sm:w-auto"
              onClick={() => router.push('/')}
            >
              Go to Homepage
            </button>
          ) : (
            <button
              className="bg-primary shadow-primary/25 hover:bg-primary-light flex w-full items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all sm:w-auto"
              onClick={() => router.push('/auth/login')}
            >
              <LogIn size={16} />
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
