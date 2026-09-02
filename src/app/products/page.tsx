'use client';

import { AlertCircle, RefreshCw, SlidersHorizontal, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import { ProductCard } from '@/components/shop/product-card';
import { ProductFilters } from '@/components/shop/product-filters';
import { useActiveProducts } from '@/lib/product/products.queries';

import type { ProductFilters as Filters } from '@/types/product';

const DEFAULT_FILTERS: Filters = {
  page: 0,
  size: 20,
  sortBy: 'createdAt',
  sortDirection: 'DESC',
};

function CatalogSkeleton() {
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

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search')?.trim() || undefined;
  const [filters, setFilters] = useState<Filters>({ ...DEFAULT_FILTERS, search: initialSearch });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data, isError, isFetching, isLoading, refetch } = useActiveProducts(filters);
  const page = filters.page ?? 0;
  const activeFilterCount = [
    filters.categoryId,
    filters.brandId,
    filters.minPrice,
    filters.maxPrice,
  ].filter((value) => value !== undefined && value !== '').length;

  useEffect(() => {
    if (!isFilterOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFilterOpen(false);
      }
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isFilterOpen]);

  const handleFilterChange = (nextFilters: Partial<Filters>) => {
    setFilters((current) => ({ ...current, ...nextFilters, page: 0 }));
  };

  const handlePageChange = (nextPage: number) => {
    setFilters((current) => ({ ...current, page: nextPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-[1920px] px-3 py-8 sm:px-10 sm:py-12 lg:px-16 lg:py-16">
        <header className="mb-6 flex flex-col justify-between gap-5 border-b border-black/20 pb-6 lg:mb-12 lg:flex-row lg:items-end lg:gap-7 lg:pb-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9a5d3b]">
              The full collection
            </p>
            <h1 className="mt-3 text-3xl font-normal tracking-[-0.04em] sm:text-5xl">
              {filters.search ? `Results for “${filters.search}”` : 'Shop all products'}
            </h1>
            <p className="mt-3 text-sm text-black/55">
              {data
                ? `${data.totalElements} ${data.totalElements === 1 ? 'product' : 'products'} found`
                : 'Browse the current collection'}
            </p>
          </div>

          <label className="hidden flex-col gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-black/55 lg:flex">
            Sort by
            <select
              aria-label="Sort products"
              className="min-h-11 border border-black/25 bg-white px-4 text-sm font-medium normal-case tracking-normal text-black outline-none transition-colors hover:border-black focus:border-black"
              value={`${filters.sortBy}-${filters.sortDirection}`}
              onChange={(event) => {
                const [sortBy, sortDirection] = event.target.value.split('-');
                handleFilterChange({ sortBy, sortDirection: sortDirection as 'ASC' | 'DESC' });
              }}
            >
              <option value="createdAt-DESC">Newest first</option>
              <option value="createdAt-ASC">Oldest first</option>
              <option value="price-ASC">Price: low to high</option>
              <option value="price-DESC">Price: high to low</option>
              <option value="name-ASC">Name: A to Z</option>
              <option value="name-DESC">Name: Z to A</option>
            </select>
          </label>
        </header>

        <div className="mb-6 grid grid-cols-[auto_minmax(0,1fr)] gap-2 lg:hidden">
          <button
            aria-expanded={isFilterOpen}
            aria-haspopup="dialog"
            className="relative inline-flex min-h-12 items-center justify-center gap-2 border border-black bg-black px-4 text-xs font-semibold uppercase tracking-[0.1em] text-white"
            type="button"
            onClick={() => setIsFilterOpen(true)}
          >
            <SlidersHorizontal aria-hidden="true" size={16} />
            Filter
            {activeFilterCount > 0 ? (
              <span className="flex size-5 items-center justify-center rounded-full bg-white text-[10px] text-black">
                {activeFilterCount}
              </span>
            ) : null}
          </button>
          <select
            aria-label="Sort products"
            className="min-h-12 min-w-0 border border-black/25 bg-white px-3 text-sm font-medium text-black outline-none focus:border-black"
            value={`${filters.sortBy}-${filters.sortDirection}`}
            onChange={(event) => {
              const [sortBy, sortDirection] = event.target.value.split('-');
              handleFilterChange({ sortBy, sortDirection: sortDirection as 'ASC' | 'DESC' });
            }}
          >
            <option value="createdAt-DESC">Newest first</option>
            <option value="createdAt-ASC">Oldest first</option>
            <option value="price-ASC">Price: low to high</option>
            <option value="price-DESC">Price: high to low</option>
            <option value="name-ASC">Name: A to Z</option>
            <option value="name-DESC">Name: Z to A</option>
          </select>
        </div>

        <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] xl:gap-14">
          <aside className="hidden lg:block">
            <ProductFilters
              filters={filters}
              onChange={handleFilterChange}
              onReset={() => setFilters(DEFAULT_FILTERS)}
            />
          </aside>

          <section aria-busy={isFetching} aria-label="Products">
            {isLoading ? (
              <div className="grid grid-cols-2 gap-x-2 gap-y-5 xl:grid-cols-3">
                {Array.from({ length: 9 }, (_, index) => (
                  <CatalogSkeleton key={index} />
                ))}
              </div>
            ) : isError ? (
              <div className="flex min-h-96 flex-col items-center justify-center border border-black/15 px-6 text-center">
                <AlertCircle aria-hidden="true" className="mb-5 text-black/35" size={38} />
                <h2 className="text-2xl font-normal">Unable to load the collection</h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-black/55">
                  Check the connection to the product service, then try again.
                </p>
                <button
                  className="mt-6 inline-flex min-h-11 items-center gap-2 bg-black px-5 text-sm text-white disabled:opacity-50"
                  disabled={isFetching}
                  type="button"
                  onClick={() => refetch()}
                >
                  <RefreshCw
                    aria-hidden="true"
                    className={isFetching ? 'animate-spin' : ''}
                    size={15}
                  />
                  Try again
                </button>
              </div>
            ) : data?.content.length === 0 ? (
              <div className="flex min-h-96 flex-col items-center justify-center border border-black/15 px-6 text-center">
                <h2 className="text-2xl font-normal">No products found</h2>
                <button
                  className="mt-5 min-h-11 border border-black px-5 text-sm"
                  type="button"
                  onClick={() => {
                    window.history.replaceState({}, '', '/products');
                    setFilters(DEFAULT_FILTERS);
                  }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-x-2 gap-y-5 xl:grid-cols-3">
                  {data?.content.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {data && data.totalPages > 1 ? (
                  <nav
                    aria-label="Product pages"
                    className="mt-12 flex flex-wrap items-center justify-center gap-2"
                  >
                    <button
                      className="min-h-11 border border-black/25 bg-white px-4 text-sm font-semibold transition-colors hover:border-black disabled:cursor-not-allowed disabled:opacity-40"
                      disabled={page === 0}
                      type="button"
                      onClick={() => handlePageChange(Math.max(0, page - 1))}
                    >
                      Previous
                    </button>

                    {Array.from({ length: Math.min(5, data.totalPages) }, (_, index) => {
                      const pageNumber = page < 3 ? index : page - 2 + index;
                      if (pageNumber >= data.totalPages) {
                        return null;
                      }

                      return (
                        <button
                          key={pageNumber}
                          aria-current={page === pageNumber ? 'page' : undefined}
                          aria-label={`Page ${pageNumber + 1}`}
                          className={`flex size-11 items-center justify-center border text-sm font-semibold ${
                            page === pageNumber
                              ? 'border-black bg-black text-white'
                              : 'border-black/25 bg-white text-black hover:border-black'
                          }`}
                          type="button"
                          onClick={() => handlePageChange(pageNumber)}
                        >
                          {pageNumber + 1}
                        </button>
                      );
                    })}

                    <button
                      className="min-h-11 border border-black/25 bg-white px-4 text-sm font-semibold transition-colors hover:border-black disabled:cursor-not-allowed disabled:opacity-40"
                      disabled={page === data.totalPages - 1}
                      type="button"
                      onClick={() => handlePageChange(Math.min(data.totalPages - 1, page + 1))}
                    >
                      Next
                    </button>
                  </nav>
                ) : null}
              </>
            )}
          </section>
        </div>
      </div>

      {isFilterOpen ? (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            aria-label="Close filters"
            className="absolute inset-0 bg-black/45"
            type="button"
            onClick={() => setIsFilterOpen(false)}
          />
          <section
            aria-labelledby="mobile-filter-title"
            aria-modal="true"
            className="absolute inset-x-0 bottom-0 flex max-h-[88dvh] flex-col rounded-t-2xl bg-white shadow-2xl"
            role="dialog"
          >
            <header className="flex min-h-16 items-center justify-between gap-4 border-b border-black/15 px-5">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold" id="mobile-filter-title">
                  Filter products
                </h2>
                {activeFilterCount > 0 ? (
                  <button
                    className="min-h-11 px-2 text-xs font-semibold underline underline-offset-4"
                    type="button"
                    onClick={() => setFilters(DEFAULT_FILTERS)}
                  >
                    Clear all
                  </button>
                ) : null}
              </div>
              <button
                autoFocus
                aria-label="Close filters"
                className="flex size-11 shrink-0 items-center justify-center rounded-full border border-black/20"
                type="button"
                onClick={() => setIsFilterOpen(false)}
              >
                <X aria-hidden="true" size={20} />
              </button>
            </header>
            <div className="overflow-y-auto px-5 py-1">
              <ProductFilters
                filters={filters}
                showHeader={false}
                onChange={handleFilterChange}
                onReset={() => setFilters(DEFAULT_FILTERS)}
              />
            </div>
            <div className="border-t border-black/15 bg-white p-4">
              <button
                className="flex min-h-12 w-full items-center justify-center bg-black px-5 text-sm font-semibold text-white"
                type="button"
                onClick={() => setIsFilterOpen(false)}
              >
                {isFetching
                  ? 'Updating products…'
                  : `View ${data?.totalElements ?? 0} ${data?.totalElements === 1 ? 'product' : 'products'}`}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}
