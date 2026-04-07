'use client';
/* eslint-disable @next/next/no-img-element */

import { Loader2, Star } from 'lucide-react';
import Link from 'next/link';

import { useActiveBrands, useFeaturedBrands } from '@/lib/brand/brands.queries';
import { resolveMediaUrl } from '@/lib/utils/media';

export default function BrandsPage() {
  const { data: featuredBrands, isLoading: featuredLoading } = useFeaturedBrands();
  const { data: allBrands, isLoading: allLoading } = useActiveBrands();

  if (featuredLoading || allLoading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: 'var(--color-highlight)' }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <div
        className="border-b"
        style={{
          borderColor: 'var(--border)',
          background:
            'linear-gradient(135deg, var(--color-primary)/5 0%, var(--color-highlight)/5 100%)',
        }}
      >
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1
              className="mb-6 text-6xl font-black md:text-7xl"
              style={{ color: 'var(--color-primary)' }}
            >
              Discover Premium Brands
            </h1>
            <p className="text-xl leading-relaxed" style={{ color: 'var(--color-primary)' }}>
              Browse our exclusive collection of world-class brands and find exactly what
              you&apos;re looking for
            </p>
          </div>
        </div>
      </div>

      {featuredBrands && featuredBrands.length > 0 ? (
        <div className="border-b" style={{ borderBottomColor: 'var(--border)' }}>
          <div className="container mx-auto px-4 py-16">
            <div className="mb-12 flex items-center gap-3">
              <Star
                className="fill-current"
                size={28}
                style={{ color: 'var(--color-highlight)' }}
              />
              <h2 className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
                Featured Brands
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
              {featuredBrands.map((brand) => (
                <Link
                  key={brand.id}
                  className="group relative flex h-full flex-col rounded-2xl border-2 p-8 transition-all duration-300"
                  href={`/shop/brands/${brand.slug}`}
                  style={{
                    borderColor: 'var(--color-highlight)',
                    backgroundColor: 'white',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(255, 112, 6, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                  }}
                >
                  <div className="flex flex-1 flex-col items-center justify-center">
                    {brand.logoUrl ? (
                      <img
                        alt={brand.name}
                        className="mb-4 h-24 w-full object-contain"
                        src={resolveMediaUrl(brand.logoUrl) || brand.logoUrl}
                      />
                    ) : (
                      <div
                        className="mb-4 flex h-24 w-full items-center justify-center rounded-xl border-2"
                        style={{
                          borderColor: 'var(--color-highlight)',
                          backgroundColor: 'var(--muted)',
                        }}
                      >
                        <span
                          className="text-3xl font-bold"
                          style={{ color: 'var(--color-highlight)' }}
                        >
                          {brand.name[0]}
                        </span>
                      </div>
                    )}
                    <h3
                      className="text-center text-sm font-bold transition-colors"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {brand.name}
                    </h3>
                  </div>
                  {brand.productCount > 0 ? (
                    <p
                      className="mt-4 border-t pt-4 text-center text-xs font-medium"
                      style={{ color: 'var(--color-highlight)', borderColor: 'var(--border)' }}
                    >
                      {brand.productCount} products
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
            All Brands
          </h2>
          <span style={{ color: 'var(--muted-foreground)' }}>{allBrands?.length || 0} brands</span>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
          {allBrands?.map((brand) => (
            <Link
              key={brand.id}
              className="group relative flex h-full flex-col rounded-2xl border-2 p-8 transition-all duration-300"
              href={`/shop/brands/${brand.slug}`}
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'white',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-highlight)';
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(255, 112, 6, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              }}
            >
              <div className="flex flex-1 flex-col items-center justify-center">
                {brand.logoUrl ? (
                  <img
                    alt={brand.name}
                    className="mb-4 h-24 w-full object-contain"
                    src={resolveMediaUrl(brand.logoUrl) || brand.logoUrl}
                  />
                ) : (
                  <div
                    className="mb-4 flex h-24 w-full items-center justify-center rounded-xl border-2"
                    style={{
                      borderColor: 'var(--color-highlight)',
                      backgroundColor: 'var(--muted)',
                    }}
                  >
                    <span
                      className="text-3xl font-bold"
                      style={{ color: 'var(--color-highlight)' }}
                    >
                      {brand.name[0]}
                    </span>
                  </div>
                )}
                <h3
                  className="text-center text-sm font-bold transition-colors"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {brand.name}
                </h3>
              </div>
              {brand.productCount > 0 ? (
                <p
                  className="mt-4 border-t pt-4 text-center text-xs font-medium"
                  style={{ color: 'var(--color-highlight)', borderColor: 'var(--border)' }}
                >
                  {brand.productCount} products
                </p>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
