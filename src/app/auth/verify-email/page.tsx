'use client';

import { Check, Loader2, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import {
  AuthShell,
  authInputClass,
  authLabelClass,
  authPrimaryButtonClass,
} from '@/components/auth/auth-shell';
import { useResendVerification } from '@/lib/auth/mutations';

export default function VerifyEmailPage() {
  const resend = useResendVerification();
  const [email, setEmail] = useState('');

  return (
    <AuthShell
      description="Open the confirmation message from PickNQuicks to activate your account. The secure link will bring you back automatically."
      eyebrow="One last step"
      title="Check your inbox."
    >
      <div className="flex items-start gap-4 border-y border-black/15 py-6">
        <span className="bg-warm flex size-11 shrink-0 items-center justify-center rounded-full text-white">
          {resend.isSuccess ? (
            <Check aria-hidden="true" size={18} />
          ) : (
            <Mail aria-hidden="true" size={18} />
          )}
        </span>
        <div>
          <p className="text-sm font-semibold text-black">
            {resend.isSuccess ? 'A fresh link has been sent' : 'Confirmation email sent'}
          </p>
          <p className="mt-1 text-[13px] leading-6 text-black/50">
            Check spam or promotions if it is not in your main inbox. Only the newest confirmation
            link may remain active.
          </p>
        </div>
      </div>

      <form
        className="mt-7 space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          resend.mutate(email);
        }}
      >
        <div>
          <label className={authLabelClass} htmlFor="verification-email">
            Need another link?
          </label>
          <input
            required
            autoComplete="email"
            className={authInputClass}
            id="verification-email"
            inputMode="email"
            placeholder="Enter your account email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <button className={authPrimaryButtonClass} disabled={resend.isPending} type="submit">
          {resend.isPending ? (
            <>
              <Loader2 className="animate-spin" size={16} /> Sending again…
            </>
          ) : (
            'Resend confirmation'
          )}
        </button>
      </form>

      <p className="mt-7 text-center text-[13px] text-black/55">
        Already confirmed?{' '}
        <Link className="font-semibold text-black underline underline-offset-4" href="/auth/login">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
