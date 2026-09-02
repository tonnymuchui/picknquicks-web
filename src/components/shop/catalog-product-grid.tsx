'use client';

import { AlertCircle, PackageOpen, RefreshCw } from 'lucide-react';

import { ProductCard } from '@/components/shop/product-card';

import type { Product } from '@/types/product';

interface CatalogProductGridProps {
  products?: Product[];
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  emptyTitle: string;
  emptyDescription: string;
  onRetry: () => void;
  variant?: 'default' | 'editorial';
}

interface CatalogPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface CatalogSortSelectProps {
  sortBy: string;
  sortDirection: 'ASC' | 'DESC';
  onChange: (sortBy: string, sortDirection: 'ASC' | 'DESC') => void;
}

function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-[#d7d0c6] bg-white">
      <div className="aspect-square animate-pulse bg-[#eee9e1] motion-reduce:animate-none" />
      <div className="space-y-3 p-3">
        <div className="h-2.5 w-20 animate-pulse bg-black/10 motion-reduce:animate-none" />
        <div className="h-4 w-3/4 animate-pulse bg-black/10 motion-reduce:animate-none" />
        <div className="ml-auto size-7 animate-pulse rounded-full bg-black/10 motion-reduce:animate-none" />
      </div>
    </div>
  );
}

export function CatalogProductGrid({
  products,
  isLoading,
  isError,
  isFetching,
  emptyTitle,
  emptyDescription,
  onRetry,
  variant = 'default',
}: CatalogProductGridProps) {
  if (isLoading) {
    return (
      <div
        aria-label="Loading products"
        className="grid grid-cols-2 gap-x-2 gap-y-5 xl:grid-cols-4"
        role="status"
      >
        {Array.from({ length: 6 }, (_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center border border-black/15 px-6 text-center">
        <AlertCircle aria-hidden="true" className="mb-5 text-black/35" size={38} />
        <h2 className="text-2xl font-normal">Unable to load products</h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-black/55">
          The product service could not be reached. Please try again.
        </p>
        <button
          className="mt-6 inline-flex min-h-11 items-center gap-2 bg-black px-5 text-sm text-white transition-colors hover:bg-[#292621] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isFetching}
          type="button"
          onClick={onRetry}
        >
          <RefreshCw
            aria-hidden="true"
            className={isFetching ? 'animate-spin motion-reduce:animate-none' : ''}
            size={15}
          />
          Try again
        </button>
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center border border-black/15 px-6 text-center">
        <PackageOpen
          aria-hidden="true"
          className="mb-5 text-black/30"
          size={42}
          strokeWidth={1.4}
        />
        <h2 className="text-2xl font-normal">{emptyTitle}</h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-black/55">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div
      aria-busy={isFetching}
      className={`grid grid-cols-2 gap-x-2 gap-y-5 xl:grid-cols-4 ${
        isFetching ? 'opacity-60' : ''
      }`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant={variant} />
      ))}
    </div>
  );
}

export function CatalogPagination({ page, totalPages, onPageChange }: CatalogPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const firstPage = Math.min(Math.max(page - 2, 0), Math.max(totalPages - 5, 0));
  const visiblePages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => firstPage + index
  );

  return (
    <nav
      aria-label="Product pages"
      className="mt-12 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        className="min-h-11 border border-black/25 bg-white px-4 text-sm font-semibold transition-colors hover:border-black disabled:cursor-not-allowed disabled:opacity-40"
        disabled={page === 0}
        type="button"
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </button>
      {visiblePages.map((pageNumber) => (
        <button
          key={pageNumber}
          aria-current={page === pageNumber ? 'page' : undefined}
          aria-label={`Page ${pageNumber + 1}`}
          className={`flex size-11 items-center justify-center border text-sm font-semibold transition-colors ${
            page === pageNumber
              ? 'border-black bg-black text-white'
              : 'border-black/25 bg-white text-black hover:border-black'
          }`}
          type="button"
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber + 1}
        </button>
      ))}
      <button
        className="min-h-11 border border-black/25 bg-white px-4 text-sm font-semibold transition-colors hover:border-black disabled:cursor-not-allowed disabled:opacity-40"
        disabled={page === totalPages - 1}
        type="button"
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </nav>
  );
}

export function CatalogSortSelect({ sortBy, sortDirection, onChange }: CatalogSortSelectProps) {
  return (
    <label className="flex w-full flex-col gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-black/55 sm:w-auto">
      Sort by
      <select
        aria-label="Sort products"
        className="min-h-11 w-full border border-black/25 bg-white px-4 text-sm font-medium normal-case tracking-normal text-black outline-none transition-colors hover:border-black focus:border-black sm:min-w-52"
        value={`${sortBy}-${sortDirection}`}
        onChange={(event) => {
          const [nextSortBy, nextSortDirection] = event.target.value.split('-');
          onChange(nextSortBy, nextSortDirection as 'ASC' | 'DESC');
        }}
      >
        <option value="createdAt-DESC">Newest first</option>
        <option value="price-ASC">Price: low to high</option>
        <option value="price-DESC">Price: high to low</option>
        <option value="name-ASC">Name: A to Z</option>
        <option value="name-DESC">Name: Z to A</option>
      </select>
    </label>
  );
}
