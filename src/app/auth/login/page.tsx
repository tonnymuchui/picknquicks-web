'use client';

import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import {
  AuthDivider,
  AuthShell,
  GoogleMark,
  authInputClass,
  authLabelClass,
  authPrimaryButtonClass,
  authSecondaryButtonClass,
} from '@/components/auth/auth-shell';
import { useAuth } from '@/lib/auth/hooks';
import { useLogin } from '@/lib/auth/mutations';
import { googleOAuthUrl } from '@/lib/auth/oauth';
import { UserRole } from '@/types/auth';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, user } = useAuth();
  const login = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      return;
    }
    if (user.roles.includes(UserRole.ADMIN)) {
      router.replace('/admin/dashboard');
    } else if (user.roles.some((role) => [UserRole.MANAGER, UserRole.STAFF].includes(role))) {
      router.replace('/admin/products');
    } else {
      router.replace('/');
    }
  }, [isAuthenticated, router, user]);

  if (isAuthenticated && user) {
    return null;
  }

  return (
    <AuthShell
      description="Sign in to continue your workspace, review orders and move through checkout faster."
      eyebrow="Your PickNQuicks account"
      title="Welcome back."
    >
      {searchParams.get('error') ? (
        <p
          className="mb-5 border-l-2 border-red-700 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800"
          role="alert"
        >
          We could not complete that sign-in. Please try again.
        </p>
      ) : null}

      <button
        className={authSecondaryButtonClass}
        type="button"
        onClick={() => window.location.assign(googleOAuthUrl)}
      >
        <GoogleMark /> Continue with Google
      </button>
      <div className="my-6">
        <AuthDivider />
      </div>

      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          login.mutate({ email, password });
        }}
      >
        <div>
          <label className={authLabelClass} htmlFor="login-email">
            Email address
          </label>
          <input
            required
            autoComplete="email"
            className={authInputClass}
            id="login-email"
            inputMode="email"
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <label
              className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/70"
              htmlFor="login-password"
            >
              Password
            </label>
            <Link
              className="text-[11px] text-black/55 underline-offset-4 hover:text-black hover:underline"
              href="/auth/forgot-password"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              required
              autoComplete="current-password"
              className={`${authInputClass} pr-14`}
              id="login-password"
              placeholder="Enter your password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute inset-y-0 right-0 flex w-14 items-center justify-center text-black/45 hover:text-black"
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <button className={authPrimaryButtonClass} disabled={login.isPending} type="submit">
          {login.isPending ? (
            <>
              <Loader2 className="animate-spin" size={16} /> Signing in…
            </>
          ) : (
            'Sign in'
          )}
        </button>
      </form>

      <p className="mt-7 text-center text-[13px] text-black/55">
        New to PickNQuicks?{' '}
        <Link
          className="font-semibold text-black underline underline-offset-4"
          href="/auth/register"
        >
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-svh bg-white" />}>
      <LoginContent />
    </Suspense>
  );
}
