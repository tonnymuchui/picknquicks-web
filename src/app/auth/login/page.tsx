'use client';

import { useState } from 'react';
import { useLogin } from '@/lib/auth/mutations';
import { useAuth } from '@/lib/auth/hooks';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const login = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (isAuthenticated) {
    router.push('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate({ email, password });
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorize/google';
  };

  return (
    <div className="flex min-h-screen">
      <div className="bg-primary relative hidden w-1/2 overflow-hidden lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary-light)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,var(--color-accent)_0%,transparent_50%)] opacity-30" />

        <div className="relative z-10 flex flex-1 flex-col justify-center px-12 xl:px-16">
          <div className="mb-8 flex items-center gap-3">
            <div className="bg-secondary flex h-12 w-12 items-center justify-center rounded-xl">
              <span className="text-primary-dark text-2xl font-black">PQ</span>
            </div>
            <span className="text-2xl font-bold text-white">PickNQuicks</span>
          </div>

          <h1 className="mb-4 text-4xl font-bold leading-tight text-white xl:text-5xl">
            Shop smarter,
            <br />
            <span className="text-secondary">not harder.</span>
          </h1>
          <p className="max-w-md text-lg text-white/70">
            Discover thousands of products at unbeatable prices. Your one-stop destination for
            everything you need.
          </p>

          <div className="mt-12 flex items-center gap-6">
            <div className="text-center">
              <p className="text-secondary text-3xl font-bold">50K+</p>
              <p className="text-sm text-white/60">Products</p>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="text-center">
              <p className="text-secondary text-3xl font-bold">24/7</p>
              <p className="text-sm text-white/60">Support</p>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="text-center">
              <p className="text-secondary text-3xl font-bold">Free</p>
              <p className="text-sm text-white/60">Delivery</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 px-12 pb-8 xl:px-16">
          <p className="text-sm text-white/40">© 2026 PickNQuicks. All rights reserved.</p>
        </div>
      </div>

      <div className="flex w-full flex-col justify-center bg-white px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24">
        <div className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-xl">
            <span className="text-secondary text-lg font-black">PQ</span>
          </div>
          <span className="text-primary text-xl font-bold">PickNQuicks</span>
        </div>

        <div className="mx-auto w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-gray-500">Sign in to your account to continue shopping</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus:border-primary focus:ring-primary/20 block w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-900 transition-all placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:border-primary focus:ring-primary/20 block w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 pr-12 text-gray-900 transition-all placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="text-primary focus:ring-primary/30 h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-highlight hover:text-highlight-dark text-sm font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={login.isPending}
              className="bg-primary shadow-primary/25 hover:bg-primary-light hover:shadow-primary/30 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {login.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                'Sign in'
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-gray-400">or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </button>

            <p className="mt-6 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link
                href="/auth/register"
                className="text-primary hover:text-primary-light font-semibold"
              >
                Create one free
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
