'use client';

import { AlertCircle, ArrowRight, RefreshCw, Tags } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { useActiveBrands, useFeaturedBrands } from '@/lib/brand/brands.queries';
import { resolveMediaUrl } from '@/lib/utils/media';

import type { Brand } from '@/types/brand';

function BrandCard({ brand, featured = false }: { brand: Brand; featured?: boolean }) {
  const logoUrl = resolveMediaUrl(brand.logoUrl);

  return (
    <Link
      className={`group flex min-h-64 flex-col rounded-lg border bg-white p-5 text-black transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black sm:p-6 ${
        featured
          ? 'border-[#9a5d3b]/45 hover:border-[#9a5d3b]'
          : 'border-[#d7d0c6] hover:border-[#9a5d3b]'
      }`}
      href={`/shop/brands/${brand.slug}`}
    >
      <div className="flex min-h-32 flex-1 items-center justify-center rounded-md bg-[#f2eee7] p-5">
        {logoUrl ? (
          <Image
            alt={`${brand.name} logo`}
            className="h-20 w-full object-contain"
            height={160}
            sizes="(min-width: 1280px) 20vw, (min-width: 640px) 33vw, 50vw"
            src={logoUrl}
            width={320}
          />
        ) : (
          <span className="text-5xl font-light tracking-[-0.08em] text-black/25">
            {brand.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      <div className="mt-5 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-normal tracking-[-0.02em]">{brand.name}</h2>
          <p className="mt-1 text-xs text-black/45">
            {brand.productCount} {brand.productCount === 1 ? 'product' : 'products'}
          </p>
        </div>
        <span
          className={`flex size-8 shrink-0 items-center justify-center rounded-full text-white transition-transform group-hover:translate-x-1 motion-reduce:transition-none ${featured ? 'bg-[#9a5d3b]' : 'bg-black'}`}
        >
          <ArrowRight aria-hidden="true" size={14} />
        </span>
      </div>
    </Link>
  );
}

function BrandsSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div
      aria-label="Loading brands"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      role="status"
    >
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="min-h-64 animate-pulse rounded-lg border border-[#d7d0c6] bg-[#eee9e1] motion-reduce:animate-none"
        />
      ))}
    </div>
  );
}

export default function BrandsPage() {
  const featuredQuery = useFeaturedBrands();
  const brandsQuery = useActiveBrands();

  return (
    <main className="min-h-screen bg-[#fbfaf8] text-[#1f1c17]">
      <header className="border-b border-black/15">
        <div className="mx-auto max-w-[1920px] px-6 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9a5d3b]">
            Our makers
          </p>
          <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h1 className="max-w-4xl text-4xl font-normal tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Technology selected for better work.
            </h1>
            <p className="max-w-sm text-sm leading-6 text-black/55 md:pb-2">
              Discover every active brand represented in the current PickNQuicks collection.
            </p>
          </div>
        </div>
      </header>

      {featuredQuery.isLoading || featuredQuery.data?.length ? (
        <section
          aria-labelledby="featured-brands-title"
          className="border-b border-[#d7d0c6] bg-[#f2eee7]"
        >
          <div className="mx-auto max-w-[1920px] px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
            <div className="mb-8 flex items-end justify-between gap-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a5d3b]">
                  Selected
                </p>
                <h2
                  className="mt-2 text-3xl font-normal tracking-[-0.035em] sm:text-4xl"
                  id="featured-brands-title"
                >
                  Featured brands
                </h2>
              </div>
              {featuredQuery.data ? (
                <p className="text-xs text-black/45">{featuredQuery.data.length} featured</p>
              ) : null}
            </div>
            {featuredQuery.isLoading ? (
              <BrandsSkeleton />
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {featuredQuery.data?.map((brand) => (
                  <BrandCard key={brand.id} featured brand={brand} />
                ))}
              </div>
            )}
          </div>
        </section>
      ) : null}

      <section
        aria-labelledby="all-brands-title"
        className="mx-auto max-w-[1920px] px-6 py-12 sm:px-10 lg:px-16 lg:py-16"
      >
        <div className="mb-8 flex items-end justify-between gap-5 border-b border-black/15 pb-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/45">
              Directory
            </p>
            <h2
              className="mt-2 text-3xl font-normal tracking-[-0.035em] sm:text-4xl"
              id="all-brands-title"
            >
              All brands
            </h2>
          </div>
          {brandsQuery.data ? (
            <p className="text-xs text-black/45">
              {brandsQuery.data.length} {brandsQuery.data.length === 1 ? 'brand' : 'brands'}
            </p>
          ) : null}
        </div>

        {brandsQuery.isLoading ? <BrandsSkeleton /> : null}

        {!brandsQuery.isLoading && brandsQuery.isError ? (
          <div className="flex min-h-80 flex-col items-center justify-center rounded-lg border border-[#d7d0c6] bg-white px-6 text-center">
            <AlertCircle aria-hidden="true" className="mb-5 text-black/35" size={38} />
            <h2 className="text-2xl font-normal">Unable to load brands</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-black/55">
              The brand service could not be reached. Please try again.
            </p>
            <button
              className="mt-6 inline-flex min-h-11 items-center gap-2 bg-black px-5 text-sm text-white transition-colors hover:bg-[#292621] disabled:opacity-50"
              disabled={brandsQuery.isFetching}
              type="button"
              onClick={() => brandsQuery.refetch()}
            >
              <RefreshCw
                aria-hidden="true"
                className={brandsQuery.isFetching ? 'animate-spin motion-reduce:animate-none' : ''}
                size={15}
              />
              Try again
            </button>
          </div>
        ) : null}

        {!brandsQuery.isLoading && !brandsQuery.isError && brandsQuery.data?.length === 0 ? (
          <div className="flex min-h-80 flex-col items-center justify-center rounded-lg border border-[#d7d0c6] bg-white px-6 text-center">
            <Tags aria-hidden="true" className="mb-5 text-black/30" size={42} strokeWidth={1.4} />
            <h2 className="text-2xl font-normal">No brands available</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-black/55">
              Active brands will appear here when they are available.
            </p>
          </div>
        ) : null}

        {!brandsQuery.isLoading && !brandsQuery.isError && brandsQuery.data?.length ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {brandsQuery.data.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}
