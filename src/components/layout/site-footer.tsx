'use client';

import { PackageSearch, Smartphone, Truck, UserRound } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { BrandLogo } from '@/components/common/brand-logo';

const TRUST_ITEMS = [
  {
    title: 'M-Pesa payments',
    description: 'Pay from your phone at checkout',
    icon: Smartphone,
  },
  {
    title: 'Delivery options',
    description: 'Choose an available option at checkout',
    icon: Truck,
  },
  {
    title: 'Order tracking',
    description: 'Follow the progress of your order',
    href: '/track-order',
    icon: PackageSearch,
  },
  {
    title: 'Account access',
    description: 'Review your orders after signing in',
    href: '/orders',
    icon: UserRound,
  },
] as const;

const FOOTER_GROUPS = [
  {
    title: 'Shop',
    links: [
      { label: 'All products', href: '/products' },
      { label: 'Categories', href: '/shop/categories' },
      { label: 'Brands', href: '/shop/brands' },
    ],
  },
  {
    title: 'Orders',
    links: [
      { label: 'Track an order', href: '/track-order' },
      { label: 'My orders', href: '/orders' },
      { label: 'View cart', href: '/cart' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Profile', href: '/auth/profile' },
      { label: 'Sign in', href: '/auth/login' },
      { label: 'Create account', href: '/auth/register' },
      { label: 'Settings', href: '/settings' },
    ],
  },
] as const;

const FOOTER_LINK =
  'inline-flex min-h-8 items-center text-[12px] tracking-[0.02em] text-black/65 transition-opacity hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black';

export function SiteFooter() {
  const pathname = usePathname();

  if (
    pathname.startsWith('/admin') ||
    (pathname.startsWith('/auth/') && pathname !== '/auth/profile')
  ) {
    return null;
  }

  return (
    <footer className="border-t border-black/15 bg-white text-black" id="site-footer">
      <section
        aria-labelledby="footer-services-heading"
        className="border-b border-black/15 bg-[#f1f1f1]"
      >
        <h2 className="sr-only" id="footer-services-heading">
          Shopping services
        </h2>
        <ul className="mx-auto grid max-w-[1920px] grid-cols-2 gap-x-4 px-6 sm:px-10 lg:grid-cols-4 lg:gap-7 lg:px-16">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            const content = (
              <span className="flex min-h-[82px] items-center gap-3 py-4">
                <Icon
                  aria-hidden="true"
                  className="h-7 w-7 shrink-0 text-black"
                  strokeWidth={1.5}
                />
                <span className="min-w-0">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-black">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-[11px] leading-[1.4] text-black/55">
                    {item.description}
                  </span>
                </span>
              </span>
            );

            return (
              <li key={item.title} className="border-b border-black/10 sm:border-b-0">
                {'href' in item ? (
                  <Link
                    className="block transition-opacity hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-black"
                    href={item.href}
                  >
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <div className="mx-auto grid max-w-[1920px] grid-cols-3 gap-x-3 gap-y-10 px-6 py-10 sm:gap-x-6 sm:px-10 md:grid-cols-4 lg:px-16 lg:py-16 xl:grid-cols-[1.65fr_1fr_1fr_1.1fr] xl:gap-10">
        <section className="col-span-3 md:col-span-1">
          <Link
            aria-label="PickNQuicks home"
            className="inline-flex min-h-8 items-center text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            href="/"
          >
            <BrandLogo markClassName="size-9" wordmarkClassName="text-[22px]" />
          </Link>
          <p className="mt-4 max-w-[270px] text-[12px] leading-[1.65] text-black/60">
            Thoughtfully selected technology and workspace essentials for a more comfortable,
            capable setup.
          </p>
        </section>

        {FOOTER_GROUPS.map((group) => (
          <nav key={group.title} aria-label={group.title + ' links'}>
            <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-black">
              {group.title}
            </h2>
            <ul>
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link className={FOOTER_LINK} href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mx-auto max-w-[1920px] border-t border-black/15 px-6 py-5 sm:px-10 lg:px-16">
        <div className="grid items-center gap-4 md:grid-cols-[1fr_auto]">
          <div className="text-[10px] leading-[1.6] tracking-[0.03em] text-black/55">
            <p>&copy; {new Date().getFullYear()} PickNQuicks. All rights reserved.</p>
            <nav aria-label="Legal links" className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              <Link className="underline-offset-4 hover:text-black hover:underline" href="/terms">
                Terms &amp; Conditions
              </Link>
              <Link className="underline-offset-4 hover:text-black hover:underline" href="/privacy">
                Data Privacy
              </Link>
              <Link
                className="underline-offset-4 hover:text-black hover:underline"
                href="/licenses"
              >
                Licenses
              </Link>
            </nav>
          </div>

          <div
            aria-label="Accepted payment methods"
            className="flex flex-wrap items-center gap-2 md:justify-end"
          >
            <span className="inline-flex min-h-6 items-center border border-black/20 px-2 text-[9px] font-semibold uppercase tracking-[0.06em]">
              M-Pesa
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
