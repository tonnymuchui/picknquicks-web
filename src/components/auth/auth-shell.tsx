import { ArrowLeft, LockKeyhole, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { BrandLogo } from '@/components/common/brand-logo';

import type { ReactNode } from 'react';

interface AuthShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  wide?: boolean;
}

export const authInputClass =
  'h-14 w-full border border-black/20 bg-transparent px-4 text-[15px] text-black outline-none transition-colors placeholder:text-black/35 hover:border-black/40 focus:border-black focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50';
export const authLabelClass =
  'mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-black/70';
export const authPrimaryButtonClass =
  'flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-warm px-7 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#7f492d] disabled:cursor-not-allowed disabled:opacity-45';
export const authSecondaryButtonClass =
  'flex min-h-14 w-full items-center justify-center gap-3 rounded-full border border-black/25 bg-white px-7 text-[11px] font-semibold uppercase tracking-[0.12em] text-black transition-colors hover:border-black hover:bg-[#f1f1f1] disabled:cursor-not-allowed disabled:opacity-45';

export function GoogleMark() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09A6.5 6.5 0 0 1 5.49 12c0-.73.13-1.43.35-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93l3.66-2.84Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function AuthDivider() {
  return (
    <div aria-hidden="true" className="flex items-center gap-4 py-1">
      <div className="h-px flex-1 bg-black/15" />
      <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/40">
        or use email
      </span>
      <div className="h-px flex-1 bg-black/15" />
    </div>
  );
}

export function AuthShell({ eyebrow, title, description, children, wide = false }: AuthShellProps) {
  return (
    <main className="grid min-h-svh bg-white text-black lg:grid-cols-[minmax(0,1.05fr)_minmax(520px,0.95fr)]">
      <section
        aria-label="A considered workspace"
        className="relative min-h-[300px] overflow-hidden lg:min-h-svh"
      >
        <Image
          fill
          priority
          alt="A calm, complete technology workspace"
          className="object-cover object-center"
          sizes="(min-width: 1024px) 54vw, 100vw"
          src="/images/workspace-after-v2.webp"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/5 to-black/70" />
        <Link className="absolute left-6 top-6 text-white sm:left-10 sm:top-9 lg:left-12" href="/">
          <BrandLogo inverse markClassName="size-10" wordmarkClassName="text-[24px]" />
        </Link>
        <div className="absolute bottom-7 left-6 max-w-xl text-white sm:bottom-10 sm:left-10 lg:bottom-14 lg:left-12 lg:pr-12">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/70">
            Technology, thoughtfully placed
          </p>
          <p className="mt-3 text-[32px] font-light uppercase leading-[1.04] tracking-[-0.04em] sm:text-[42px] lg:text-[52px]">
            Finish the space where your best work happens.
          </p>
          <p className="mt-4 hidden max-w-md text-sm leading-6 text-white/75 sm:block">
            Displays, ergonomic support and dependable tools selected to make everyday work feel
            clearer.
          </p>
        </div>
      </section>

      <section className="flex min-h-[620px] flex-col bg-white px-6 py-8 sm:px-10 lg:min-h-svh lg:px-14 lg:py-10 xl:px-20">
        <div className="flex items-center justify-between border-b border-black/15 pb-5">
          <Link
            className="inline-flex min-h-11 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-black/65 transition-opacity hover:opacity-55"
            href="/"
          >
            <ArrowLeft aria-hidden="true" size={14} />
            Back to shop
          </Link>
          <span className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-black/45">
            <LockKeyhole aria-hidden="true" size={13} /> Secure account
          </span>
        </div>

        <div className={`my-auto w-full py-12 ${wide ? 'max-w-[590px]' : 'max-w-[470px]'} mx-auto`}>
          <p className="text-warm text-[10px] font-semibold uppercase tracking-[0.18em]">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-[40px] font-light uppercase leading-[1.02] tracking-[-0.04em] sm:text-[50px]">
            {title}
          </h1>
          <p className="text-black/58 mt-5 max-w-lg text-[15px] leading-7">{description}</p>
          <div className="mt-9">{children}</div>
        </div>

        <div className="flex items-center gap-2 border-t border-black/15 pt-5 text-[10px] leading-5 text-black/45">
          <ShieldCheck aria-hidden="true" size={15} />
          Your account details are protected and never included in payment messages.
        </div>
      </section>
    </main>
  );
}
