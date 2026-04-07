'use client';
/* eslint-disable @next/next/no-img-element */

import { Loader2, ExternalLink, MapPin, ShoppingBag } from 'lucide-react';
import { use } from 'react';

import { useBrandBySlug } from '@/lib/brand/brands.queries';
import { resolveMediaUrl } from '@/lib/utils/media';

export default function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: brand, isLoading } = useBrandBySlug(slug);

  if (isLoading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: 'var(--color-highlight)' }} />
      </div>
    );
  }

  if (!brand) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <p style={{ color: 'var(--muted-foreground)' }}>Brand not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {brand.bannerUrl ? (
        <div
          className="relative h-96 overflow-hidden border-b md:h-[28rem]"
          style={{ borderColor: 'var(--border)' }}
        >
          <img
            alt={brand.name}
            className="h-full w-full object-cover"
            src={resolveMediaUrl(brand.bannerUrl) || brand.bannerUrl}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, transparent, rgba(255,255,255,0.8), var(--background))',
            }}
          />
        </div>
      ) : (
        <div
          className="relative flex h-96 items-end border-b md:h-[28rem]"
          style={{
            borderColor: 'var(--border)',
            background:
              'linear-gradient(135deg, var(--color-primary)/10 0%, var(--color-highlight)/10 100%)',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, var(--color-primary)/5, var(--background)/90)',
            }}
          />
        </div>
      )}

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div
            className="relative z-10 -mt-24 rounded-3xl border-2 p-10 shadow-2xl md:p-16"
            style={{ borderColor: 'var(--color-highlight)', backgroundColor: 'white' }}
          >
            <div className="flex flex-col items-start gap-8 md:flex-row">
              <div className="flex-shrink-0">
                {brand.logoUrl ? (
                  <img
                    alt={brand.name}
                    className="h-32 w-32 rounded-xl border object-contain p-4 md:h-40 md:w-40"
                    src={resolveMediaUrl(brand.logoUrl) || brand.logoUrl}
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
                  />
                ) : (
                  <div
                    className="flex h-32 w-32 items-center justify-center rounded-xl border md:h-40 md:w-40"
                    style={{
                      borderColor: 'var(--border)',
                      backgroundColor: 'var(--background)',
                      color: 'var(--color-primary)',
                    }}
                  >
                    <span className="text-6xl font-bold">{brand.name[0]}</span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h1
                  className="mb-3 text-4xl font-bold md:text-5xl"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {brand.name}
                </h1>

                {brand.countryOfOrigin ? (
                  <div
                    className="mb-6 flex items-center gap-2"
                    style={{ color: 'var(--color-primary-light)' }}
                  >
                    <MapPin size={18} style={{ color: 'var(--color-highlight)' }} />
                    <span className="text-lg">Origin: {brand.countryOfOrigin}</span>
                  </div>
                ) : null}

                {brand.description ? (
                  <p
                    className="mb-8 max-w-2xl text-lg leading-relaxed"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {brand.description}
                  </p>
                ) : null}

                <div className="flex flex-wrap items-center gap-4">
                  {brand.websiteUrl ? (
                    <a
                      className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all duration-300"
                      href={brand.websiteUrl}
                      rel="noopener noreferrer"
                      style={{ backgroundColor: 'var(--color-highlight)', color: 'white' }}
                      target="_blank"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-highlight-light)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-highlight)';
                      }}
                    >
                      <ExternalLink size={18} />
                      Visit Official Website
                    </a>
                  ) : null}
                  <div
                    className="flex items-center gap-2 rounded-lg border px-6 py-3"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
                  >
                    <ShoppingBag size={18} style={{ color: 'var(--color-highlight)' }} />
                    <span style={{ color: 'var(--color-primary)' }}>
                      <span className="font-bold">{brand.productCount}</span> Products
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16 mt-16">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
                Products from <span style={{ color: 'var(--color-highlight)' }}>{brand.name}</span>
              </h2>
              {brand.productCount > 0 ? (
                <span style={{ color: 'var(--muted-foreground)' }}>{brand.productCount} items</span>
              ) : null}
            </div>

            {brand.productCount > 0 ? (
              <div
                className="rounded-2xl border p-12 text-center"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)' }}
              >
                <div className="mb-4 flex justify-center">
                  <ShoppingBag size={48} style={{ color: 'var(--color-highlight)' }} />
                </div>
                <h3
                  className="mb-2 text-xl font-semibold"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Browse {brand.name} Products
                </h3>
                <p className="mb-6" style={{ color: 'var(--muted-foreground)' }}>
                  Discover {brand.productCount} amazing products from {brand.name}
                </p>
                <a
                  className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all duration-300"
                  href={`/shop?brand=${brand.slug}`}
                  style={{ backgroundColor: 'var(--color-highlight)', color: 'white' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-highlight-light)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-highlight)';
                  }}
                >
                  <ShoppingBag size={18} />
                  Shop {brand.name}
                </a>
              </div>
            ) : (
              <div
                className="rounded-2xl border p-12 text-center"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)' }}
              >
                <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
                  No products available from {brand.name} at this time
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
