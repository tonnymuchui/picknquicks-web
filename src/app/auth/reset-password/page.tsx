'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams, useRouter } from 'next/navigation';
import { useResetPassword } from '@/lib/auth/mutations';
import { resetPasswordSchema, type ResetPasswordInput } from '@/lib/schemas/auth.schema';
import { Loader2, Eye, EyeOff, CheckCircle2, XCircle, Key } from 'lucide-react';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const resetPassword = useResetPassword();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token || '',
    },
  });

  const password = watch('newPassword');

  useEffect(() => {
    if (token) {
      setValue('token', token);
    }
  }, [token, setValue]);

  if (!token) {
    return (
      <div className="to-primary/5 bg-linear-to-br flex min-h-screen items-center justify-center from-gray-50 via-white px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xl shadow-gray-200/50">
          <div className="bg-highlight/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
            <XCircle className="text-highlight h-10 w-10" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Invalid Reset Link</h2>
          <p className="mt-2 text-gray-600">
            This password reset link is invalid or has expired. Please request a new one.
          </p>
          <Link
            href="/auth/forgot-password"
            className="bg-primary shadow-primary/25 hover:bg-primary-light mt-6 inline-block w-full rounded-xl border border-transparent px-4 py-3 text-sm font-medium text-white shadow-lg"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  const onSubmit = (data: ResetPasswordInput) => {
    resetPassword.mutate(data);
  };

  const getPasswordStrength = (pwd: string): number => {
    if (!pwd) return 0;
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[@#$%^&+=]/.test(pwd)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="to-primary/5 bg-linear-to-br flex min-h-screen items-center justify-center from-gray-50 via-white px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/50">
        <div className="text-center">
          <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
            <Key className="text-primary h-10 w-10" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Reset Password</h2>
          <p className="mt-2 text-gray-600">Enter your new password below.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New password
            </label>
            <div className="relative mt-1">
              <input
                {...register('newPassword')}
                type={showPassword ? 'text' : 'password'}
                className={`focus:border-primary focus:ring-primary/20 block w-full rounded-xl border bg-gray-50/50 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 ${
                  errors.newPassword ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>

            {password && (
              <div className="mt-2">
                <div className="flex items-center space-x-2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`h-full transition-all ${
                        passwordStrength <= 2
                          ? 'bg-red-500'
                          : passwordStrength <= 3
                            ? 'bg-highlight'
                            : passwordStrength <= 4
                              ? 'bg-secondary'
                              : 'bg-primary'
                      }`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm new password
            </label>
            <div className="relative mt-1">
              <input
                {...register('confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                className={`focus:border-primary focus:ring-primary/20 block w-full rounded-xl border bg-gray-50/50 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={resetPassword.isPending}
            className="bg-primary shadow-primary/25 hover:bg-primary-light focus:ring-primary/20 flex w-full justify-center rounded-xl border border-transparent px-4 py-3 text-sm font-medium text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
          >
            {resetPassword.isPending ? (
              <>
                <Loader2 className="-ml-1 mr-2 h-5 w-5 animate-spin" />
                Resetting...
              </>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
