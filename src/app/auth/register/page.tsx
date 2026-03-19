'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/lib/auth/hooks';
import { useRegister } from '@/lib/auth/mutations';
import { registerSchema, type RegisterInput } from '@/lib/schemas/auth.schema';

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const register = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const password = watch('password');

  if (isAuthenticated) {
    router.push('/');
    return null;
  }

  const onSubmit = (data: RegisterInput) => {
    register.mutate(data);
  };

  const getPasswordStrength = (pwd: string): number => {
    if (!pwd) {
      return 0;
    }
    let strength = 0;
    if (pwd.length >= 8) {
      strength++;
    }
    if (/[a-z]/.test(pwd)) {
      strength++;
    }
    if (/[A-Z]/.test(pwd)) {
      strength++;
    }
    if (/[0-9]/.test(pwd)) {
      strength++;
    }
    if (/[@#$%^&+=]/.test(pwd)) {
      strength++;
    }
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);

  const getStrengthColor = (strength: number): string => {
    if (strength <= 2) {
      return 'bg-red-500';
    }
    if (strength <= 3) {
      return 'bg-highlight';
    }
    if (strength <= 4) {
      return 'bg-secondary';
    }
    return 'bg-primary';
  };

  const getStrengthText = (strength: number): string => {
    if (strength <= 2) {
      return 'Weak';
    }
    if (strength <= 3) {
      return 'Fair';
    }
    if (strength <= 4) {
      return 'Good';
    }
    return 'Strong';
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
            Join the smart
            <br />
            <span className="text-secondary">shopping revolution.</span>
          </h1>
          <p className="max-w-md text-lg text-white/70">
            Create your account and discover thousands of products at unbeatable prices. Your
            journey starts here.
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
          <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-gray-500">Join PickNQuicks and start shopping today</p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                  htmlFor="firstName"
                >
                  First name
                </label>
                <input
                  {...registerField('firstName')}
                  className={`focus:border-primary focus:ring-primary/20 block w-full rounded-xl border bg-gray-50/50 px-4 py-3 text-gray-900 transition-all placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="John"
                  type="text"
                />
                {errors.firstName ? (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                ) : null}
              </div>

              <div>
                <label
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                  htmlFor="lastName"
                >
                  Last name
                </label>
                <input
                  {...registerField('lastName')}
                  className={`focus:border-primary focus:ring-primary/20 block w-full rounded-xl border bg-gray-50/50 px-4 py-3 text-gray-900 transition-all placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Doe"
                  type="text"
                />
                {errors.lastName ? (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                ) : null}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700" htmlFor="email">
                Email address
              </label>
              <input
                {...registerField('email')}
                autoComplete="email"
                className={`focus:border-primary focus:ring-primary/20 block w-full rounded-xl border bg-gray-50/50 px-4 py-3 text-gray-900 transition-all placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="john@example.com"
                type="email"
              />
              {errors.email ? (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              ) : null}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700" htmlFor="phone">
                Phone number <span className="text-gray-400">(optional)</span>
              </label>
              <input
                {...registerField('phone')}
                autoComplete="tel"
                className={`focus:border-primary focus:ring-primary/20 block w-full rounded-xl border bg-gray-50/50 px-4 py-3 text-gray-900 transition-all placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 ${
                  errors.phone ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="+254712345678"
                type="tel"
              />
              {errors.phone ? (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              ) : null}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  {...registerField('password')}
                  autoComplete="new-password"
                  className={`focus:border-primary focus:ring-primary/20 block w-full rounded-xl border bg-gray-50/50 px-4 py-3 pr-12 text-gray-900 transition-all placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 ${
                    errors.password ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {password ? (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className={`h-full transition-all duration-300 ${getStrengthColor(
                          passwordStrength
                        )}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-500">
                      {getStrengthText(passwordStrength)}
                    </span>
                  </div>
                </div>
              ) : null}

              {errors.password ? (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              ) : null}

              <div className="mt-2 space-y-1 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  {password?.length >= 8 ? (
                    <CheckCircle2 className="text-secondary h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3 text-gray-300" />
                  )}
                  <span>At least 8 characters</span>
                </div>
                <div className="flex items-center space-x-1">
                  {/[A-Z]/.test(password) ? (
                    <CheckCircle2 className="text-secondary h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3 text-gray-300" />
                  )}
                  <span>One uppercase letter</span>
                </div>
                <div className="flex items-center space-x-1">
                  {/[a-z]/.test(password) ? (
                    <CheckCircle2 className="text-secondary h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3 text-gray-300" />
                  )}
                  <span>One lowercase letter</span>
                </div>
                <div className="flex items-center space-x-1">
                  {/[0-9]/.test(password) ? (
                    <CheckCircle2 className="text-secondary h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3 text-gray-300" />
                  )}
                  <span>One number</span>
                </div>
                <div className="flex items-center space-x-1">
                  {/[@#$%^&+=]/.test(password) ? (
                    <CheckCircle2 className="text-secondary h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3 text-gray-300" />
                  )}
                  <span>One special character (@#$%^&+=)</span>
                </div>
              </div>
            </div>

            <div>
              <label
                className="mb-1.5 block text-sm font-medium text-gray-700"
                htmlFor="confirmPassword"
              >
                Confirm password
              </label>
              <div className="relative">
                <input
                  {...registerField('confirmPassword')}
                  autoComplete="new-password"
                  className={`focus:border-primary focus:ring-primary/20 block w-full rounded-xl border bg-gray-50/50 px-4 py-3 pr-12 text-gray-900 transition-all placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="••••••••"
                  type={showConfirmPassword ? 'text' : 'password'}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword ? (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              ) : null}
            </div>

            <button
              className="bg-primary shadow-primary/25 hover:bg-primary-light hover:shadow-primary/30 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              disabled={register.isPending || !isValid}
              type="submit"
            >
              {register.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account…
                </>
              ) : (
                'Create account'
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
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm"
              type="button"
              onClick={() => {
                window.location.href = 'http://localhost:8080/oauth2/authorize/google';
              }}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign up with Google
            </button>

            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link
                className="text-primary hover:text-primary-light font-semibold"
                href="/auth/login"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
