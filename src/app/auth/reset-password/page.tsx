'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import {
  AuthShell,
  authInputClass,
  authLabelClass,
  authPrimaryButtonClass,
} from '@/components/auth/auth-shell';
import { useResetPassword } from '@/lib/auth/mutations';
import { resetPasswordSchema, type ResetPasswordInput } from '@/lib/schemas/auth.schema';
import { createClient } from '@/lib/supabase/client';

type RecoveryState = 'checking' | 'ready' | 'invalid';

export default function ResetPasswordPage() {
  const resetPassword = useResetPassword();
  const [recoveryState, setRecoveryState] = useState<RecoveryState>('checking');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<ResetPasswordInput>({ resolver: zodResolver(resetPasswordSchema), mode: 'onChange' });
  const password = useWatch({ control, name: 'newPassword' }) ?? '';

  useEffect(() => {
    void createClient()
      .auth.getSession()
      .then(({ data }) => {
        setRecoveryState(data.session ? 'ready' : 'invalid');
      });
  }, []);

  if (recoveryState === 'checking') {
    return (
      <AuthShell
        description="Please wait while we verify this password recovery request."
        eyebrow="Account recovery"
        title="Securing your link…"
      >
        <div className="flex items-center gap-3 border-y border-black/15 py-6 text-sm text-black/55">
          <Loader2 className="animate-spin" size={18} /> Verifying secure session
        </div>
      </AuthShell>
    );
  }

  if (recoveryState === 'invalid') {
    return (
      <AuthShell
        description="For your security, password links can only be used for a limited time and from the browser that opened them."
        eyebrow="Link unavailable"
        title="This link has expired."
      >
        <Link className={authPrimaryButtonClass} href="/auth/forgot-password">
          Request a new link
        </Link>
        <p className="mt-6 text-center text-[13px] text-black/55">
          <Link className="underline underline-offset-4" href="/auth/login">
            Back to sign in
          </Link>
        </p>
      </AuthShell>
    );
  }

  if (resetPassword.isSuccess) {
    return (
      <AuthShell
        description="Your new password is active. You can now continue with the workspace pieces you were considering."
        eyebrow="Password updated"
        title="Your account is secure."
      >
        <div className="mb-6 flex items-center gap-4 border-y border-black/15 py-6 text-sm text-black/60">
          <span className="bg-warm flex size-10 items-center justify-center rounded-full text-white">
            <Check size={18} />
          </span>
          Password changed successfully.
        </div>
        <Link className={authPrimaryButtonClass} href="/">
          Continue shopping
        </Link>
      </AuthShell>
    );
  }

  const fieldClass = (invalid: boolean) =>
    `${authInputClass} pr-14 ${invalid ? 'border-red-700' : ''}`;
  const strength = [
    password.length >= 8,
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[@#$%^&+=]/.test(password),
  ].filter(Boolean).length;

  return (
    <AuthShell
      description="Use a password unique to PickNQuicks. A strong password keeps your profile and order history protected."
      eyebrow="Account recovery"
      title="Choose a new password."
    >
      <form className="space-y-5" onSubmit={handleSubmit((data) => resetPassword.mutate(data))}>
        <div>
          <label className={authLabelClass} htmlFor="new-password">
            New password
          </label>
          <div className="relative">
            <input
              {...register('newPassword')}
              autoComplete="new-password"
              className={fieldClass(!!errors.newPassword)}
              id="new-password"
              placeholder="Create a strong password"
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
          {password ? (
            <div
              aria-label={`Password strength ${strength} out of 5`}
              className="mt-3 grid grid-cols-5 gap-1"
            >
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className={`h-1 ${index < strength ? 'bg-warm' : 'bg-black/12'}`}
                />
              ))}
            </div>
          ) : null}
          {errors.newPassword ? (
            <p className="mt-2 text-xs leading-5 text-red-700">{errors.newPassword.message}</p>
          ) : null}
        </div>
        <div>
          <label className={authLabelClass} htmlFor="confirm-new-password">
            Confirm new password
          </label>
          <div className="relative">
            <input
              {...register('confirmPassword')}
              autoComplete="new-password"
              className={fieldClass(!!errors.confirmPassword)}
              id="confirm-new-password"
              placeholder="Repeat your new password"
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
          {errors.confirmPassword ? (
            <p className="mt-2 text-xs text-red-700">{errors.confirmPassword.message}</p>
          ) : null}
        </div>
        <button
          className={authPrimaryButtonClass}
          disabled={!isValid || resetPassword.isPending}
          type="submit"
        >
          {resetPassword.isPending ? (
            <>
              <Loader2 className="animate-spin" size={16} /> Updating password…
            </>
          ) : (
            'Update password'
          )}
        </button>
      </form>
    </AuthShell>
  );
}
