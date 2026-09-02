'use client';

import { ArrowRight, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      aria-labelledby="auth-modal-title"
      aria-modal="true"
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      role="dialog"
    >
      <button
        aria-label="Close account dialog"
        className="absolute inset-0 bg-black/50"
        type="button"
        onClick={onClose}
      />
      <section className="relative z-10 grid w-full max-w-3xl overflow-hidden bg-white sm:grid-cols-[0.9fr_1.1fr]">
        <div className="relative hidden min-h-[520px] sm:block">
          <Image
            fill
            alt="A complete technology workspace"
            className="object-cover"
            sizes="320px"
            src="/images/workspace-after-v2.webp"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-black/5" />
          <p className="absolute bottom-7 left-7 right-7 text-3xl font-light uppercase leading-tight tracking-[-0.035em] text-white">
            Keep building the space where your best work happens.
          </p>
        </div>
        <div className="relative p-7 sm:p-10">
          <button
            aria-label="Close account dialog"
            className="absolute right-3 top-3 flex size-11 items-center justify-center"
            type="button"
            onClick={onClose}
          >
            <X aria-hidden="true" size={19} strokeWidth={1.5} />
          </button>

          <p className="text-warm text-[10px] font-semibold uppercase tracking-[0.18em]">
            Your workspace account
          </p>
          <h2
            className="mt-4 pr-10 text-4xl font-light uppercase tracking-[-0.04em]"
            id="auth-modal-title"
          >
            Make it yours.
          </h2>
          <p className="mt-4 text-sm leading-7 text-black/55">
            Save your details, follow deliveries and return to the workspace pieces you are
            considering.
          </p>

          <div className="mt-8 space-y-3">
            <Link
              className="bg-warm flex min-h-14 items-center justify-between rounded-full px-7 text-[11px] font-semibold uppercase tracking-[0.13em] text-white transition-colors hover:bg-[#7f492d]"
              href="/auth/login"
              onClick={onClose}
            >
              Sign in
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
            <Link
              className="border-ink flex min-h-14 items-center justify-between rounded-full border px-7 text-[11px] font-semibold uppercase tracking-[0.13em] transition-colors hover:bg-[#f1f1f1]"
              href="/auth/register"
              onClick={onClose}
            >
              Create account
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
          <p className="mt-7 border-t border-black/15 pt-5 text-[11px] leading-5 text-black/45">
            Secure account access powered by Supabase.
          </p>
        </div>
      </section>
    </div>
  );
}
