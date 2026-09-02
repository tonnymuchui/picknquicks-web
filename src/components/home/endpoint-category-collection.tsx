import { ArrowRight, Boxes, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { getActiveRootCategories } from '@/lib/catalog/server';
import { resolveMediaUrl } from '@/lib/utils/media';

import type { Category } from '@/types/category';

const FALLBACK_IMAGES = [
  '/images/monitor.webp',
  '/images/monitor-arm.webp',
  '/images/office-chair.webp',
  '/images/gaming-chair.webp',
  '/images/keyboard.webp',
] as const;
const collectionLayout =
  'motion-stagger-items no-scrollbar grid snap-x auto-cols-[78vw] grid-flow-col gap-3 overflow-x-auto pb-2 sm:auto-cols-[43vw] lg:auto-cols-[calc((100%_-_36px)/4)]';

function CategorySkeleton() {
  return (
    <div aria-hidden="true" className="snap-start">
      <div className="aspect-square animate-pulse bg-[#eee9e1] motion-reduce:animate-none" />
      <div className="mx-auto mt-4 h-4 w-2/3 animate-pulse bg-black/10 motion-reduce:animate-none" />
    </div>
  );
}

export function CategoryCollectionFallback() {
  return (
    <div aria-label="Loading categories" className={collectionLayout}>
      {Array.from({ length: 4 }, (_, index) => (
        <CategorySkeleton key={index} />
      ))}
    </div>
  );
}

async function fetchCategories() {
  return getActiveRootCategories(4);
}

export async function EndpointCategoryCollection() {
  let categories: Category[];

  try {
    categories = await fetchCategories();
  } catch {
    return (
      <div className="border-line flex min-h-52 flex-col items-center justify-center border px-6 text-center">
        <Boxes aria-hidden="true" className="text-black/25" size={34} />
        <p className="mt-4 text-sm text-black/60">Categories could not be loaded.</p>
        <Link
          className="mt-4 inline-flex min-h-11 items-center gap-2 bg-black px-5 text-sm text-white"
          href="/shop/categories"
        >
          <RefreshCw aria-hidden="true" size={15} />
          Browse categories
        </Link>
      </div>
    );
  }

  const visibleCategories = categories.slice(0, 4);

  if (visibleCategories.length === 0) {
    return (
      <Link
        className="border-line flex min-h-52 items-center justify-center gap-3 border text-sm font-semibold"
        href="/products"
      >
        Browse the full collection
        <ArrowRight aria-hidden="true" size={16} />
      </Link>
    );
  }

  return (
    <div className={collectionLayout}>
      {visibleCategories.map((category, index) => {
        const imageUrl =
          resolveMediaUrl(category.imageUrl || category.iconUrl) || FALLBACK_IMAGES[index];

        return (
          <Link
            key={category.id}
            className="group block snap-start"
            href={`/shop/categories/${category.slug}`}
          >
            <div className="relative aspect-square overflow-hidden bg-[#f2eee7]">
              <Image
                fill
                alt={category.name}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 43vw, 78vw"
                src={imageUrl}
              />
            </div>
            <p className="pt-4 text-center text-base text-black sm:text-lg">{category.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
