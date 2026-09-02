'use client';

import { AlertCircle, ArrowRight, ChevronRight, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { use, useState } from 'react';

import {
  CatalogPagination,
  CatalogProductGrid,
  CatalogSortSelect,
} from '@/components/shop/catalog-product-grid';
import {
  CategoryStoryExperience,
  displaysStoryFallback,
} from '@/components/shop/category-story-experience';
import { CompleteSetupsExperience } from '@/components/shop/complete-setups-experience';
import { useCategoryBySlug, useChildCategories } from '@/lib/category/categories.queries';
import { useCategoryStory } from '@/lib/category/category-stories.queries';
import { useProductsByCategory } from '@/lib/product/products.queries';
import { resolveMediaUrl } from '@/lib/utils/media';

import type { Category } from '@/types/category';
import type { ProductFilters } from '@/types/product';

const DEFAULT_FILTERS: ProductFilters = {
  page: 0,
  size: 12,
  sortBy: 'createdAt',
  sortDirection: 'DESC',
};

function SubcategoryCard({ category }: { category: Category }) {
  const imageUrl = resolveMediaUrl(category.imageUrl);

  return (
    <Link
      className="group grid min-h-32 grid-cols-[7rem_minmax(0,1fr)_auto] items-center border border-black/15 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
      href={`/shop/categories/${category.slug}`}
    >
      <div className="relative h-full min-h-32 overflow-hidden bg-[#eee9e1]">
        {imageUrl ? (
          <Image
            fill
            alt=""
            className="object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none"
            sizes="112px"
            src={imageUrl}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-3xl font-light text-black/20">
            {category.name.slice(0, 1).toUpperCase()}
          </div>
        )}
      </div>
      <div className="min-w-0 px-4">
        <h3 className="text-lg font-normal tracking-[-0.02em]">{category.name}</h3>
        {category.hasChildren ? (
          <p className="mt-1 text-xs text-black/45">
            {category.childrenCount} {category.childrenCount === 1 ? 'collection' : 'collections'}
          </p>
        ) : null}
      </div>
      <ArrowRight
        aria-hidden="true"
        className="mr-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
        size={18}
      />
    </Link>
  );
}

function CategoryLoading() {
  return (
    <main aria-label="Loading category" className="min-h-screen bg-white px-6 py-14" role="status">
      <div className="mx-auto max-w-[1920px]">
        <div className="h-3 w-36 animate-pulse bg-black/10 motion-reduce:animate-none" />
        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <div className="h-14 w-3/4 animate-pulse bg-black/10 motion-reduce:animate-none" />
            <div className="h-4 w-full max-w-xl animate-pulse bg-black/10 motion-reduce:animate-none" />
            <div className="h-4 w-4/5 max-w-xl animate-pulse bg-black/10 motion-reduce:animate-none" />
          </div>
          <div className="aspect-[16/10] animate-pulse bg-[#eee9e1] motion-reduce:animate-none" />
        </div>
      </div>
    </main>
  );
}

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [filters, setFilters] = useState<ProductFilters>(DEFAULT_FILTERS);
  const categoryQuery = useCategoryBySlug(slug);
  const category = categoryQuery.data;
  const storyQuery = useCategoryStory(category?.id ?? '');
  const childrenQuery = useChildCategories(category?.id ?? '', true);
  const productsQuery = useProductsByCategory(category?.id ?? '', filters);
  const imageUrl = resolveMediaUrl(category?.imageUrl);
  const page = filters.page ?? 0;
  const storyItems = storyQuery.data?.length
    ? storyQuery.data
    : slug === 'displays'
      ? displaysStoryFallback
      : [];
  const hasStory = storyItems.length > 0;

  const handlePageChange = (nextPage: number) => {
    setFilters((current) => ({ ...current, page: nextPage }));
    document.getElementById('category-products')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (categoryQuery.isLoading) {
    return <CategoryLoading />;
  }

  if (categoryQuery.isError || !category) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-white px-6 text-center text-black">
        <div>
          <AlertCircle aria-hidden="true" className="mx-auto text-black/35" size={42} />
          <h1 className="mt-5 text-3xl font-normal tracking-[-0.035em]">
            {categoryQuery.isError ? 'Unable to load this category' : 'Category not found'}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-black/55">
            {categoryQuery.isError
              ? 'The category service could not be reached. Please try again.'
              : 'The category may have moved or is no longer active.'}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {categoryQuery.isError ? (
              <button
                className="inline-flex min-h-11 items-center gap-2 bg-black px-5 text-sm text-white disabled:opacity-50"
                disabled={categoryQuery.isFetching}
                type="button"
                onClick={() => categoryQuery.refetch()}
              >
                <RefreshCw
                  aria-hidden="true"
                  className={
                    categoryQuery.isFetching ? 'animate-spin motion-reduce:animate-none' : ''
                  }
                  size={15}
                />
                Try again
              </button>
            ) : null}
            <Link
              className="inline-flex min-h-11 items-center border border-black px-5 text-sm"
              href="/shop/categories"
            >
              Browse categories
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const pathParts = category.fullPath
    .split('>')
    .map((part) => part.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-white text-black">
      {slug === 'complete-setups' ? (
        <CompleteSetupsExperience
          category={category}
          isLoading={productsQuery.isLoading}
          products={productsQuery.data?.content ?? []}
        />
      ) : null}
      {hasStory ? <CategoryStoryExperience category={category} items={storyItems} /> : null}
      <header
        className={`border-b border-black/15 ${slug === 'complete-setups' || hasStory ? 'hidden' : ''}`}
      >
        <div className="mx-auto max-w-[1920px] px-6 py-8 sm:px-10 lg:px-16">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs text-black/50"
          >
            <Link className="transition-colors hover:text-black" href="/shop/categories">
              Categories
            </Link>
            {pathParts.map((part) => (
              <span key={part} className="flex items-center gap-2">
                <ChevronRight aria-hidden="true" size={13} />
                <span aria-current={part === pathParts.at(-1) ? 'page' : undefined}>{part}</span>
              </span>
            ))}
          </nav>

          <div
            className={`mt-8 grid gap-8 ${imageUrl ? 'lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center' : ''}`}
          >
            <div className="py-6 lg:py-12">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9a5d3b]">
                Product collection
              </p>
              <h1 className="mt-4 text-5xl font-normal tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                {category.name}
              </h1>
              {category.description ? (
                <p className="mt-5 max-w-2xl text-base leading-7 text-black/55 sm:text-lg">
                  {category.description}
                </p>
              ) : null}
            </div>
            {imageUrl ? (
              <div className="relative aspect-[16/10] overflow-hidden bg-[#eee9e1]">
                <Image
                  fill
                  priority
                  alt={category.name}
                  className="object-cover"
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  src={imageUrl}
                />
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {childrenQuery.isLoading || childrenQuery.data?.length ? (
        <section aria-labelledby="subcategory-title" className="border-b border-black/15">
          <div className="mx-auto max-w-[1920px] px-6 py-12 sm:px-10 lg:px-16">
            <div className="mb-7 flex items-end justify-between gap-5">
              <h2 className="text-3xl font-normal tracking-[-0.035em]" id="subcategory-title">
                Explore the collection
              </h2>
              {childrenQuery.data ? (
                <p className="text-xs text-black/45">{childrenQuery.data.length} subcategories</p>
              ) : null}
            </div>
            {childrenQuery.isLoading ? (
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 3 }, (_, index) => (
                  <div
                    key={index}
                    className="h-32 animate-pulse bg-[#eee9e1] motion-reduce:animate-none"
                  />
                ))}
              </div>
            ) : (
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {childrenQuery.data?.map((child) => (
                  <SubcategoryCard key={child.id} category={child} />
                ))}
              </div>
            )}
          </div>
        </section>
      ) : null}

      <section
        aria-labelledby="category-products-title"
        className="mx-auto max-w-[1920px] scroll-mt-32 bg-white px-3 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-20"
        id="category-products"
      >
        <div className="mb-8 flex flex-col justify-between gap-6 border-b border-black/15 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/45">Shop</p>
            <h2
              className="mt-2 text-3xl font-normal tracking-[-0.035em] sm:text-4xl"
              id="category-products-title"
            >
              {slug === 'complete-setups'
                ? 'Complete setups'
                : slug === 'displays'
                  ? 'Choose your display'
                  : `${category.name} products`}
            </h2>
            {slug === 'complete-setups' ? (
              <p className="mt-3 max-w-xl text-sm leading-6 text-black/50">
                Each recipe is one purchasable bundle. Component stock is checked again at checkout.
              </p>
            ) : null}
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
          emptyDescription={`There are currently no active products in ${category.name}.`}
          emptyTitle={`No ${category.name} products available`}
          isError={productsQuery.isError}
          isFetching={productsQuery.isFetching}
          isLoading={productsQuery.isLoading}
          products={productsQuery.data?.content}
          variant={hasStory ? 'editorial' : 'default'}
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
