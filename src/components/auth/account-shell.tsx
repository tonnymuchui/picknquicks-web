'use client';

import { LockKeyhole, Package, UserRound } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { ReactNode } from 'react';

const accountLinks = [
  { href: '/auth/profile', label: 'Profile', icon: UserRound },
  { href: '/orders', label: 'Orders', icon: Package },
  { href: '/settings', label: 'Security', icon: LockKeyhole },
] as const;

export function AccountShell({
  action,
  children,
  description,
  title,
}: {
  action?: ReactNode;
  children: ReactNode;
  description: string;
  title: string;
}) {
  const pathname = usePathname();

  return (
    <main className="min-h-[70vh] bg-white px-5 py-10 text-[#1f1c17] sm:px-8 sm:py-14 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1440px]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/45">
          Your account
        </p>
        <header className="mt-3 flex flex-col justify-between gap-6 border-b border-black/20 pb-8 md:flex-row md:items-end">
          <div>
            <h1 className="max-w-4xl text-[2.6rem] font-light uppercase leading-[0.98] tracking-[-0.045em] sm:text-[3.8rem] lg:text-[4.4rem]">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-black/55">{description}</p>
          </div>
          {action}
        </header>

        <nav
          aria-label="Account sections"
          className="no-scrollbar flex overflow-x-auto border-b border-black/15"
        >
          {accountLinks.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                aria-current={active ? 'page' : undefined}
                className={`flex min-h-14 shrink-0 items-center gap-2 border-b-2 px-5 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${active ? 'border-black text-black' : 'border-transparent text-black/45 hover:text-black'}`}
                href={href}
              >
                <Icon aria-hidden="true" size={15} strokeWidth={1.6} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="pt-8 lg:pt-10">{children}</div>
      </div>
    </main>
  );
}
