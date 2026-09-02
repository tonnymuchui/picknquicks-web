'use client';

import { AlertCircle, ExternalLink, MapPin, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { use, useState } from 'react';

import {
  CatalogPagination,
  CatalogProductGrid,
  CatalogSortSelect,
} from '@/components/shop/catalog-product-grid';
import { useBrandBySlug } from '@/lib/brand/brands.queries';
import { useProductsByBrand } from '@/lib/product/products.queries';
import { resolveMediaUrl } from '@/lib/utils/media';

import type { ProductFilters } from '@/types/product';

const DEFAULT_FILTERS: ProductFilters = {
  page: 0,
  size: 12,
  sortBy: 'createdAt',
  sortDirection: 'DESC',
};

function BrandLoading() {
  return (
    <main aria-label="Loading brand" className="min-h-screen bg-white text-black" role="status">
      <div className="h-[42vh] min-h-80 animate-pulse bg-[#eee9e1] motion-reduce:animate-none" />
      <div className="mx-auto max-w-[1920px] px-6 py-12 sm:px-10 lg:px-16">
        <div className="h-12 w-1/2 animate-pulse bg-black/10 motion-reduce:animate-none" />
        <div className="mt-5 h-4 w-full max-w-xl animate-pulse bg-black/10 motion-reduce:animate-none" />
      </div>
    </main>
  );
}

export default function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [filters, setFilters] = useState<ProductFilters>(DEFAULT_FILTERS);
  const brandQuery = useBrandBySlug(slug);
  const brand = brandQuery.data;
  const productsQuery = useProductsByBrand(brand?.id ?? '', filters);
  const bannerUrl = resolveMediaUrl(brand?.bannerUrl);
  const logoUrl = resolveMediaUrl(brand?.logoUrl);
  const websiteUrl = brand?.websiteUrl?.match(/^https?:\/\//i) ? brand.websiteUrl : undefined;
  const page = filters.page ?? 0;

  const handlePageChange = (nextPage: number) => {
    setFilters((current) => ({ ...current, page: nextPage }));
    document.getElementById('brand-products')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (brandQuery.isLoading) {
    return <BrandLoading />;
  }

  if (brandQuery.isError || !brand) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-white px-6 text-center text-black">
        <div>
          <AlertCircle aria-hidden="true" className="mx-auto text-black/35" size={42} />
          <h1 className="mt-5 text-3xl font-normal tracking-[-0.035em]">
            {brandQuery.isError ? 'Unable to load this brand' : 'Brand not found'}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-black/55">
            {brandQuery.isError
              ? 'The brand service could not be reached. Please try again.'
              : 'The brand may have moved or is no longer active.'}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {brandQuery.isError ? (
              <button
                className="inline-flex min-h-11 items-center gap-2 bg-black px-5 text-sm text-white disabled:opacity-50"
                disabled={brandQuery.isFetching}
                type="button"
                onClick={() => brandQuery.refetch()}
              >
                <RefreshCw
                  aria-hidden="true"
                  className={brandQuery.isFetching ? 'animate-spin motion-reduce:animate-none' : ''}
                  size={15}
                />
                Try again
              </button>
            ) : null}
            <Link
              className="inline-flex min-h-11 items-center border border-black px-5 text-sm"
              href="/shop/brands"
            >
              Browse brands
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <header className="border-b border-black/15">
        <div className="relative h-[42vh] min-h-80 overflow-hidden bg-[#eee9e1] sm:h-[52vh]">
          {bannerUrl ? (
            <Image
              fill
              priority
              alt={`${brand.name} collection`}
              className="object-cover"
              sizes="100vw"
              src={bannerUrl}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[#1f1c17] text-white">
              <span
                aria-hidden="true"
                className="text-[clamp(5rem,16vw,15rem)] font-light tracking-[-0.08em] text-white/10"
              >
                {brand.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
          {bannerUrl ? (
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
          ) : null}
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1920px] px-6 pb-8 text-white sm:px-10 sm:pb-12 lg:px-16">
            <Link
              className="text-xs text-white/70 transition-colors hover:text-white"
              href="/shop/brands"
            >
              All brands
            </Link>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1920px] gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[13rem_minmax(0,1fr)_auto] lg:items-center lg:px-16 lg:py-14">
          <div className="flex aspect-[4/3] max-w-52 items-center justify-center border border-black/15 bg-white p-5">
            {logoUrl ? (
              <Image
                alt={`${brand.name} logo`}
                className="h-full w-full object-contain"
                height={160}
                sizes="208px"
                src={logoUrl}
                width={240}
              />
            ) : (
              <span className="text-5xl font-light tracking-[-0.08em] text-black/20">
                {brand.name.slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9a5d3b]">
              Brand
            </p>
            <h1 className="mt-3 text-5xl font-normal tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              {brand.name}
            </h1>
            {brand.description ? (
              <p className="mt-5 max-w-3xl text-base leading-7 text-black/55">
                {brand.description}
              </p>
            ) : null}
            {brand.countryOfOrigin ? (
              <p className="mt-5 flex items-center gap-2 text-sm text-black/55">
                <MapPin aria-hidden="true" size={16} />
                {brand.countryOfOrigin}
              </p>
            ) : null}
          </div>

          {websiteUrl ? (
            <a
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-black px-5 text-sm font-semibold transition-colors hover:bg-black hover:text-white lg:self-end"
              href={websiteUrl}
              rel="noreferrer"
              target="_blank"
            >
              Official website
              <ExternalLink aria-hidden="true" size={14} />
            </a>
          ) : null}
        </div>
      </header>

      <section
        aria-labelledby="brand-products-title"
        className="mx-auto max-w-[1920px] scroll-mt-32 px-6 py-12 sm:px-10 lg:px-16 lg:py-16"
        id="brand-products"
      >
        <div className="mb-8 flex flex-col justify-between gap-6 border-b border-black/15 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/45">
              Collection
            </p>
            <h2
              className="mt-2 text-3xl font-normal tracking-[-0.035em] sm:text-4xl"
              id="brand-products-title"
            >
              Products by {brand.name}
            </h2>
            {productsQuery.data ? (
              <p className="mt-2 text-sm text-black/45">
                {productsQuery.data.totalElements}{' '}
                {productsQuery.data.totalElements === 1 ? 'product' : 'products'}
              </p>
            ) : null}
          </div>
          <CatalogSortSelect
            sortBy={filters.sortBy ?? 'createdAt'}
            sortDirection={filters.sortDirection ?? 'DESC'}
            onChange={(sortBy, sortDirection) =>
              setFilters((current) => ({ ...current, page: 0, sortBy, sortDirection }))
            }
          />
        </div>

        <CatalogProductGrid
          emptyDescription={`There are currently no active products from ${brand.name}.`}
          emptyTitle={`No ${brand.name} products available`}
          isError={productsQuery.isError}
          isFetching={productsQuery.isFetching}
          isLoading={productsQuery.isLoading}
          products={productsQuery.data?.content}
          onRetry={() => productsQuery.refetch()}
        />
        <CatalogPagination
          page={page}
          totalPages={productsQuery.data?.totalPages ?? 0}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  );
}
