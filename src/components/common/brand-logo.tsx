'use client';

import Image from 'next/image';

import { useStorefrontSettings } from '@/lib/site/storefront-settings-context';

import type { ReactNode } from 'react';

interface BrandLogoProps {
  className?: string;
  inverse?: boolean;
  markClassName?: string;
  subtitle?: ReactNode;
  wordmarkClassName?: string;
}

export function BrandMark({
  className = 'size-10',
  inverse = false,
}: Pick<BrandLogoProps, 'className' | 'inverse'>) {
  const background = inverse ? '#ffffff' : '#1f1c17';
  const foreground = inverse ? '#1f1c17' : '#ffffff';

  return (
    <svg
      aria-hidden="true"
      className={className}
      role="img"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill={background} height="48" width="48" />
      <path
        d="M13 10v28M13 11h10.5C30.3 11 34 14.5 34 20s-3.7 9-10.5 9H13"
        fill="none"
        stroke={foreground}
        strokeLinecap="square"
        strokeWidth="3.5"
      />
      <path d="m26 28 10 10m0 0v-7m0 7h-7" fill="none" stroke="#b87855" strokeWidth="3" />
    </svg>
  );
}

export function BrandLogo({
  className = '',
  inverse = false,
  markClassName = 'size-10',
  subtitle,
  wordmarkClassName = 'text-[25px]',
}: BrandLogoProps) {
  const settings = useStorefrontSettings();
  const name = settings?.siteName || 'PickNQuicks';
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      {settings?.logoUrl ? (
        <span className={`relative block shrink-0 overflow-hidden ${markClassName}`}>
          <Image fill alt="" className="object-contain" sizes="48px" src={settings.logoUrl} />
        </span>
      ) : (
        <BrandMark className={`shrink-0 ${markClassName}`} inverse={inverse} />
      )}
      <span className="min-w-0">
        <span
          className={`block whitespace-nowrap font-sans font-semibold leading-none tracking-[-0.055em] ${inverse ? 'text-white' : 'text-[#1f1c17]'} ${wordmarkClassName}`}
        >
          {name === 'PickNQuicks' ? (
            <>
              PickN<span className={inverse ? 'text-[#d49a77]' : 'text-[#9a5d3b]'}>Quicks</span>
            </>
          ) : (
            name
          )}
        </span>
        {subtitle ? (
          <span
            className={`mt-1.5 block text-[8px] font-semibold uppercase tracking-[0.2em] ${inverse ? 'text-white/65' : 'text-black/48'}`}
          >
            {subtitle}
          </span>
        ) : null}
      </span>
    </span>
  );
}
