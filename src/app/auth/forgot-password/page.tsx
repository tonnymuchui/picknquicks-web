'use client';

import { useState } from 'react';
import { useForgotPassword } from '@/lib/auth/mutations';
import { Loader2, Mail, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const forgotPassword = useForgotPassword();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    forgotPassword.mutate(email);
  };

  if (forgotPassword.isSuccess) {
    return (
      <div className="to-primary/5 bg-linear-to-br flex min-h-screen items-center justify-center from-gray-50 via-white px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xl shadow-gray-200/50">
          <div className="bg-secondary/20 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
            <CheckCircle2 className="text-secondary-dark h-10 w-10" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Check Your Email</h2>
          <p className="mt-2 text-gray-600">
            We've sent password reset instructions to <strong>{email}</strong>
          </p>
          <p className="mt-4 text-sm text-gray-500">
            The link will expire in 1 hour. If you don't see the email, check your spam folder.
          </p>
          <Link
            href="/"
            className="bg-primary shadow-primary/25 hover:bg-primary-light focus:ring-primary/20 mt-6 inline-block w-full rounded-xl border border-transparent px-4 py-3 text-sm font-medium text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="to-primary/5 bg-linear-to-br flex min-h-screen items-center justify-center from-gray-50 via-white px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/50">
        <div className="text-center">
          <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
            <Mail className="text-primary h-10 w-10" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Forgot Password?</h2>
          <p className="mt-2 text-gray-600">
            No worries! Enter your email and we'll send you reset instructions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
            disabled={forgotPassword.isPending}
            className="bg-primary shadow-primary/25 hover:bg-primary-light focus:ring-primary/20 flex w-full justify-center rounded-xl border border-transparent px-4 py-3 text-sm font-medium text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
          >
            {forgotPassword.isPending ? (
              <>
                <Loader2 className="-ml-1 mr-2 h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>

          <p className="text-center text-sm text-gray-600">
            Remember your password?{' '}
            <Link href="/auth/login" className="text-primary hover:text-primary-light font-medium">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
