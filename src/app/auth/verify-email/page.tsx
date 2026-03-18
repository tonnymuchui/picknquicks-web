'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useVerifyEmail, useResendVerification } from '@/lib/auth/mutations';
import { Loader2, CheckCircle2, XCircle, Mail } from 'lucide-react';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const verifyEmail = useVerifyEmail();
  const resendVerification = useResendVerification();

  const [email, setEmail] = useState('');
  const [showResendForm, setShowResendForm] = useState(!token);

  useEffect(() => {
    if (token) {
      verifyEmail.mutate(token);
    }
  }, [token]);

  const handleResend = (e: React.FormEvent) => {
    e.preventDefault();
    resendVerification.mutate(email);
  };

  if (verifyEmail.isSuccess) {
    return (
      <div className="to-primary/5 bg-linear-to-br flex min-h-screen items-center justify-center from-gray-50 via-white px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xl shadow-gray-200/50">
          <div className="bg-secondary/20 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
            <CheckCircle2 className="text-secondary-dark h-10 w-10" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Email Verified</h2>
          <p className="mt-2 text-gray-600">
            Your email has been successfully verified. You can now log in to your account.
          </p>
          <Link
            href="/auth/login"
            className="bg-primary shadow-primary/25 hover:bg-primary-light focus:ring-primary/20 mt-6 inline-block w-full rounded-xl border border-transparent px-4 py-3 text-sm font-medium text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (verifyEmail.isError) {
    return (
      <div className="to-primary/5 bg-linear-to-br flex min-h-screen items-center justify-center from-gray-50 via-white px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xl shadow-gray-200/50">
          <div className="bg-highlight/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
            <XCircle className="text-highlight h-10 w-10" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Verification Failed</h2>
          <p className="mt-2 text-gray-600">
            The verification link is invalid or has expired. Please request a new verification
            email.
          </p>
          <button
            onClick={() => setShowResendForm(true)}
            className="bg-primary shadow-primary/25 hover:bg-primary-light focus:ring-primary/20 mt-6 inline-block w-full rounded-xl border border-transparent px-4 py-3 text-sm font-medium text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Resend Verification Email
          </button>
        </div>
      </div>
    );
  }

  if (verifyEmail.isPending) {
    return (
      <div className="to-primary/5 bg-linear-to-br flex min-h-screen items-center justify-center from-gray-50 via-white">
        <div className="text-center">
          <Loader2 className="text-primary mx-auto h-12 w-12 animate-spin" />
          <p className="mt-4 text-gray-600">Verifying your email...</p>
        </div>
      </div>
    );
  }

  if (showResendForm) {
    return (
      <div className="to-primary/5 bg-linear-to-br flex min-h-screen items-center justify-center from-gray-50 via-white px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/50">
          <div className="text-center">
            <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
              <Mail className="text-primary h-10 w-10" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-900">Verify Your Email</h2>
            <p className="mt-2 text-gray-600">
              Enter your email address to receive a new verification link.
            </p>
          </div>

          <form onSubmit={handleResend} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus:border-primary focus:ring-primary/20 mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2 shadow-sm focus:outline-none focus:ring-2"
                placeholder="john@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={resendVerification.isPending}
              className="bg-primary shadow-primary/25 hover:bg-primary-light focus:ring-primary/20 flex w-full justify-center rounded-xl border border-transparent px-4 py-3 text-sm font-medium text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
            >
              {resendVerification.isPending ? (
                <>
                  <Loader2 className="-ml-1 mr-2 h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Verification Email'
              )}
            </button>

            <p className="text-center text-sm text-gray-600">
              <Link
                href="/auth/login"
                className="text-primary hover:text-primary-light font-medium"
              >
                Back to login
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="to-primary/5 bg-linear-to-br flex min-h-screen items-center justify-center from-gray-50 via-white px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xl shadow-gray-200/50">
        <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
          <Mail className="text-primary h-10 w-10" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-gray-900">Check Your Email</h2>
        <p className="mt-2 text-gray-600">
          We've sent a verification email to your inbox. Please click the link in the email to
          verify your account.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          Didn't receive the email? Check your spam folder or request a new one.
        </p>
        <button
          onClick={() => setShowResendForm(true)}
          className="text-primary hover:text-primary-light mt-6 inline-block text-sm font-medium"
        >
          Resend verification email
        </button>
      </div>
    </div>
  );
}
