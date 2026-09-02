'use client';

import { Check, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import {
  AuthShell,
  authInputClass,
  authLabelClass,
  authPrimaryButtonClass,
} from '@/components/auth/auth-shell';
import { useForgotPassword } from '@/lib/auth/mutations';

export default function ForgotPasswordPage() {
  const forgotPassword = useForgotPassword();
  const [email, setEmail] = useState('');

  return (
    <AuthShell
      description={
        forgotPassword.isSuccess
          ? `If an account exists for ${email}, a secure reset link is on its way.`
          : 'Enter the email connected to your account. We will send a secure link so you can choose a new password.'
      }
      eyebrow="Account recovery"
      title={forgotPassword.isSuccess ? 'Check your inbox.' : 'Reset your password.'}
    >
      {forgotPassword.isSuccess ? (
        <div>
          <div className="flex items-start gap-4 border-y border-black/15 py-6">
            <span className="bg-warm flex size-10 shrink-0 items-center justify-center rounded-full text-white">
              <Check aria-hidden="true" size={18} />
            </span>
            <p className="text-sm leading-6 text-black/60">
              The link expires for your security. Check spam or promotions if it does not arrive
              shortly.
            </p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              className={authPrimaryButtonClass}
              type="button"
              onClick={() => forgotPassword.reset()}
            >
              Try another email
            </button>
            <Link
              className="flex min-h-14 items-center justify-center border border-black/25 px-5 text-[11px] font-semibold uppercase tracking-[0.13em]"
              href="/auth/login"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      ) : (
        <form
          className="space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            forgotPassword.mutate(email);
          }}
        >
          <div>
            <label className={authLabelClass} htmlFor="recovery-email">
              Email address
            </label>
            <input
              required
              autoComplete="email"
              className={authInputClass}
              id="recovery-email"
              inputMode="email"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <button
            className={authPrimaryButtonClass}
            disabled={forgotPassword.isPending}
            type="submit"
          >
            {forgotPassword.isPending ? (
              <>
                <Loader2 className="animate-spin" size={16} /> Sending secure link…
              </>
            ) : (
              'Send reset link'
            )}
          </button>
          <p className="text-center text-[13px] text-black/55">
            Remembered it?{' '}
            <Link
              className="font-semibold text-black underline underline-offset-4"
              href="/auth/login"
            >
              Return to sign in
            </Link>
          </p>
        </form>
      )}
    </AuthShell>
  );
}
