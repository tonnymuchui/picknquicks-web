'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const router = useRouter();
  if (!isOpen) {return null;}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 mx-4 w-full max-w-sm animate-float-in">
        <div className="overflow-hidden rounded-xl border border-primary-light/15 bg-primary-dark p-7 shadow-2xl">
          <button
            className="absolute right-3 top-3 rounded-lg p-1.5 text-secondary/35 transition-colors hover:text-secondary"
            onClick={onClose}
          >
            <X size={18} />
          </button>

          <div className="mb-5 flex justify-center">
            <Image priority alt="PickNQuicks" className="h-10 w-auto object-contain" height={40} src="/mylogo.png" width={110} />
          </div>

          <h2 className="mb-1 text-center text-xl font-bold text-secondary">Welcome</h2>
          <p className="mb-6 text-center text-sm text-secondary/40">Sign in or create an account</p>

          <div className="space-y-3">
            <button
              className="w-full rounded-lg bg-secondary py-3 text-sm font-bold text-primary-dark transition-colors hover:bg-secondary-light"
              onClick={() => { onClose(); router.push('/auth/login'); }}
            >
              Sign In
            </button>
            <button
              className="w-full rounded-lg border border-secondary/20 py-3 text-sm font-semibold text-secondary transition-colors hover:bg-primary-light/10"
              onClick={() => { onClose(); router.push('/auth/register'); }}
            >
              Create Account
            </button>
          </div>

          <div className="my-5 flex items-center gap-3 text-secondary/20">
            <div className="h-px flex-1 bg-primary-light/10" />
            <span className="text-[11px]">or</span>
            <div className="h-px flex-1 bg-primary-light/10" />
          </div>

          <button
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-primary-light/12 py-2.5 text-sm text-secondary/60 transition-colors hover:bg-primary-light/8 hover:text-secondary"
            onClick={() => { onClose(); router.push('/auth/login'); }}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <p className="mt-5 text-center text-[10px] text-secondary/25">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
