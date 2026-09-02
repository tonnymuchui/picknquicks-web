'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

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
import { useRegister } from '@/lib/auth/mutations';
import { googleOAuthUrl } from '@/lib/auth/oauth';
import { registerSchema, type RegisterInput } from '@/lib/schemas/auth.schema';

const checks = [
  { label: '8+ characters', test: (value: string) => value.length >= 8 },
  { label: 'Uppercase', test: (value: string) => /[A-Z]/.test(value) },
  { label: 'Lowercase', test: (value: string) => /[a-z]/.test(value) },
  { label: 'Number', test: (value: string) => /[0-9]/.test(value) },
  { label: 'Symbol', test: (value: string) => /[@#$%^&+=]/.test(value) },
];

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const createAccount = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema), mode: 'onChange' });
  const password = useWatch({ control, name: 'password' }) ?? '';

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  const fieldClass = (invalid: boolean) => `${authInputClass} ${invalid ? 'border-red-700' : ''}`;

  return (
    <AuthShell
      wide
      description="Save your details, follow every delivery and keep the tools you are considering in one place."
      eyebrow="Build your workspace"
      title="Create your account."
    >
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

      <form className="space-y-5" onSubmit={handleSubmit((data) => createAccount.mutate(data))}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={authLabelClass} htmlFor="register-first-name">
              First name
            </label>
            <input
              {...register('firstName')}
              autoComplete="given-name"
              className={fieldClass(!!errors.firstName)}
              id="register-first-name"
              placeholder="First name"
            />
            {errors.firstName ? (
              <p className="mt-2 text-xs text-red-700">{errors.firstName.message}</p>
            ) : null}
          </div>
          <div>
            <label className={authLabelClass} htmlFor="register-last-name">
              Last name
            </label>
            <input
              {...register('lastName')}
              autoComplete="family-name"
              className={fieldClass(!!errors.lastName)}
              id="register-last-name"
              placeholder="Last name"
            />
            {errors.lastName ? (
              <p className="mt-2 text-xs text-red-700">{errors.lastName.message}</p>
            ) : null}
          </div>
        </div>

        <div>
          <label className={authLabelClass} htmlFor="register-email">
            Email address
          </label>
          <input
            {...register('email')}
            autoComplete="email"
            className={fieldClass(!!errors.email)}
            id="register-email"
            inputMode="email"
            placeholder="you@example.com"
            type="email"
          />
          {errors.email ? (
            <p className="mt-2 text-xs text-red-700">{errors.email.message}</p>
          ) : null}
        </div>

        <div>
          <label className={authLabelClass} htmlFor="register-phone">
            Phone{' '}
            <span className="font-normal normal-case tracking-normal text-black/40">
              (optional, useful for delivery)
            </span>
          </label>
          <input
            {...register('phone')}
            autoComplete="tel"
            className={fieldClass(!!errors.phone)}
            id="register-phone"
            inputMode="tel"
            placeholder="+254 712 345 678"
            type="tel"
          />
          {errors.phone ? (
            <p className="mt-2 text-xs text-red-700">{errors.phone.message}</p>
          ) : null}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={authLabelClass} htmlFor="register-password">
              Password
            </label>
            <div className="relative">
              <input
                {...register('password')}
                autoComplete="new-password"
                className={`${fieldClass(!!errors.password)} pr-14`}
                id="register-password"
                placeholder="Create password"
                type={showPassword ? 'text' : 'password'}
              />
              <button
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute inset-y-0 right-0 flex w-14 items-center justify-center text-black/45 hover:text-black"
                type="button"
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className={authLabelClass} htmlFor="register-confirm-password">
              Confirm password
            </label>
            <div className="relative">
              <input
                {...register('confirmPassword')}
                autoComplete="new-password"
                className={`${fieldClass(!!errors.confirmPassword)} pr-14`}
                id="register-confirm-password"
                placeholder="Repeat password"
                type={showConfirmation ? 'text' : 'password'}
              />
              <button
                aria-label={showConfirmation ? 'Hide confirmation' : 'Show confirmation'}
                className="absolute inset-y-0 right-0 flex w-14 items-center justify-center text-black/45 hover:text-black"
                type="button"
                onClick={() => setShowConfirmation((value) => !value)}
              >
                {showConfirmation ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>
        {errors.password || errors.confirmPassword ? (
          <p className="text-xs leading-5 text-red-700">
            {errors.password?.message ?? errors.confirmPassword?.message}
          </p>
        ) : null}

        <ul className="border-black/12 grid grid-cols-2 gap-x-4 gap-y-2 border-y py-4 text-[11px] text-black/50 sm:grid-cols-5">
          {checks.map((check) => {
            const passed = check.test(password);
            return (
              <li
                key={check.label}
                className={`flex items-center gap-1.5 ${passed ? 'text-black' : ''}`}
              >
                <Check
                  aria-hidden="true"
                  className={passed ? 'opacity-100' : 'opacity-20'}
                  size={12}
                />
                {check.label}
              </li>
            );
          })}
        </ul>

        <button
          className={authPrimaryButtonClass}
          disabled={createAccount.isPending || !isValid}
          type="submit"
        >
          {createAccount.isPending ? (
            <>
              <Loader2 className="animate-spin" size={16} /> Creating account…
            </>
          ) : (
            'Create account'
          )}
        </button>
        <p className="text-center text-[11px] leading-5 text-black/45">
          By creating an account, you agree to receive essential order and security messages.
        </p>
      </form>

      <p className="mt-6 text-center text-[13px] text-black/55">
        Already have an account?{' '}
        <Link className="font-semibold text-black underline underline-offset-4" href="/auth/login">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
