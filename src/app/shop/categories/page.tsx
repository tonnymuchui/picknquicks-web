'use client';

import { AlertCircle, ArrowRight, Layers3, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { useRootCategories } from '@/lib/category/categories.queries';
import { resolveMediaUrl } from '@/lib/utils/media';

import type { Category } from '@/types/category';

function CategoryCard({ category, featured }: { category: Category; featured: boolean }) {
  const imageUrl = resolveMediaUrl(category.imageUrl);

  return (
    <Link
      className={`group flex h-full flex-col overflow-hidden border border-black/15 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black ${
        featured ? 'md:col-span-6' : 'md:col-span-4'
      }`}
      href={`/shop/categories/${category.slug}`}
    >
      <div
        className={`relative overflow-hidden bg-[#eee9e1] ${featured ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}
      >
        {imageUrl ? (
          <Image
            fill
            alt={category.name}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none"
            sizes={featured ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 33vw, 100vw'}
            src={imageUrl}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span
              aria-hidden="true"
              className="text-7xl font-light tracking-[-0.08em] text-black/15"
            >
              {category.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent" />
      </div>
      <div className="flex flex-1 items-start justify-between gap-5 p-5 sm:p-6">
        <div>
          <h2
            className={`${featured ? 'text-2xl sm:text-3xl' : 'text-xl'} font-normal tracking-[-0.03em]`}
          >
            {category.name}
          </h2>
          {category.description ? (
            <p className="mt-2 line-clamp-2 max-w-xl text-sm leading-6 text-black/55">
              {category.description}
            </p>
          ) : null}
          {category.hasChildren ? (
            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#9a5d3b]">
              {category.childrenCount} {category.childrenCount === 1 ? 'collection' : 'collections'}
            </p>
          ) : null}
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none">
          <ArrowRight aria-hidden="true" size={16} />
        </span>
      </div>
    </Link>
  );
}

function CategoriesSkeleton() {
  return (
    <div
      aria-label="Loading categories"
      className="grid grid-cols-1 gap-3 md:grid-cols-12"
      role="status"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className={`overflow-hidden border border-black/10 ${index < 2 ? 'md:col-span-6' : 'md:col-span-4'}`}
        >
          <div className="aspect-[4/3] animate-pulse bg-[#eee9e1] motion-reduce:animate-none" />
          <div className="space-y-3 p-5">
            <div className="h-6 w-1/2 animate-pulse bg-black/10 motion-reduce:animate-none" />
            <div className="h-3 w-4/5 animate-pulse bg-black/10 motion-reduce:animate-none" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CategoriesPage() {
  const { data: categories, isError, isFetching, isLoading, refetch } = useRootCategories(true);

  return (
    <main className="min-h-screen bg-white text-black">
      <header className="border-b border-black/15">
        <div className="mx-auto max-w-[1920px] px-6 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9a5d3b]">
            Shop by collection
          </p>
          <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h1 className="max-w-4xl text-4xl font-normal tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Essentials for a considered workspace.
            </h1>
            <p className="max-w-sm text-sm leading-6 text-black/55 md:pb-2">
              Browse every active product category, from foundational furniture to the details that
              complete your setup.
            </p>
          </div>
        </div>
      </header>

      <section
        aria-labelledby="category-grid-title"
        className="mx-auto max-w-[1920px] px-6 py-12 sm:px-10 lg:px-16 lg:py-16"
      >
        <div className="mb-8 flex items-end justify-between gap-5 border-b border-black/15 pb-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/45">
              Browse
            </p>
            <h2
              className="mt-2 text-3xl font-normal tracking-[-0.035em] sm:text-4xl"
              id="category-grid-title"
            >
              Product categories
            </h2>
          </div>
          {categories ? (
            <p className="text-xs text-black/45">
              {categories.length} {categories.length === 1 ? 'category' : 'categories'}
            </p>
          ) : null}
        </div>

        {isLoading ? <CategoriesSkeleton /> : null}

        {!isLoading && isError ? (
          <div className="flex min-h-80 flex-col items-center justify-center border border-black/15 px-6 text-center">
            <AlertCircle aria-hidden="true" className="mb-5 text-black/35" size={38} />
            <h2 className="text-2xl font-normal">Unable to load categories</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-black/55">
              The category service could not be reached. Please try again.
            </p>
            <button
              className="mt-6 inline-flex min-h-11 items-center gap-2 bg-black px-5 text-sm text-white transition-colors hover:bg-[#292621] disabled:opacity-50"
              disabled={isFetching}
              type="button"
              onClick={() => refetch()}
            >
              <RefreshCw
                aria-hidden="true"
                className={isFetching ? 'animate-spin motion-reduce:animate-none' : ''}
                size={15}
              />
              Try again
            </button>
          </div>
        ) : null}

        {!isLoading && !isError && categories?.length === 0 ? (
          <div className="flex min-h-80 flex-col items-center justify-center border border-black/15 px-6 text-center">
            <Layers3
              aria-hidden="true"
              className="mb-5 text-black/30"
              size={42}
              strokeWidth={1.4}
            />
            <h2 className="text-2xl font-normal">No categories available</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-black/55">
              Active product categories will appear here when they are available.
            </p>
          </div>
        ) : null}

        {!isLoading && !isError && categories?.length ? (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} featured={index < 2} />
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}
