import { AlertCircle, PackageSearch, RefreshCw } from 'lucide-react';
import Link from 'next/link';

import { ProductCard } from '@/components/shop/product-card';
import { getActiveProducts } from '@/lib/catalog/server';

import type { Product, ProductFilters } from '@/types/product';

interface EndpointProductCollectionProps {
  mode: 'grid' | 'rail';
  filters: ProductFilters;
  source?: 'active' | 'best-sellers' | 'new-arrivals';
  emptyMessage?: string;
}

function layoutClass(mode: EndpointProductCollectionProps['mode']) {
  return mode === 'grid'
    ? 'motion-stagger-items grid grid-cols-2 gap-x-2 gap-y-6 lg:grid-cols-4'
    : 'motion-stagger-items no-scrollbar grid snap-x grid-flow-col auto-cols-[82vw] gap-2 overflow-x-auto pb-3 sm:auto-cols-[46vw] lg:auto-cols-[calc((100vw_-_9.5rem)/4)] 2xl:auto-cols-[430px]';
}

function ProductSkeleton() {
  return (
    <div aria-hidden="true" className="border-line overflow-hidden rounded-lg border bg-white">
      <div className="bg-sand aspect-square animate-pulse motion-reduce:animate-none" />
      <div className="space-y-3 p-3">
        <div className="h-2.5 w-20 animate-pulse bg-black/10 motion-reduce:animate-none" />
        <div className="h-4 w-4/5 animate-pulse bg-black/10 motion-reduce:animate-none" />
        <div className="ml-auto size-7 animate-pulse rounded-full bg-black/10 motion-reduce:animate-none" />
      </div>
    </div>
  );
}

export function ProductCollectionFallback({ mode }: { mode: 'grid' | 'rail' }) {
  return (
    <div aria-label="Loading products" className={layoutClass(mode)}>
      {Array.from({ length: mode === 'grid' ? 8 : 5 }, (_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
}

async function fetchProducts(
  filters: ProductFilters,
  source: NonNullable<EndpointProductCollectionProps['source']>
) {
  return getActiveProducts(filters, source);
}

export async function EndpointProductCollection({
  mode,
  filters,
  source = 'active',
  emptyMessage = 'No products are available in this collection yet.',
}: EndpointProductCollectionProps) {
  let products: Product[];

  try {
    products = await fetchProducts(filters, source);
  } catch {
    return (
      <div className="flex min-h-56 flex-col items-center justify-center border border-black/15 px-6 text-center">
        <AlertCircle aria-hidden="true" className="mb-4 text-black/40" size={30} />
        <p className="text-lg text-black">Products could not be loaded.</p>
        <Link
          className="mt-5 inline-flex min-h-11 items-center gap-2 bg-black px-5 text-sm text-white"
          href="/products"
        >
          <RefreshCw aria-hidden="true" size={15} />
          Browse products
        </Link>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex min-h-56 flex-col items-center justify-center border border-black/15 px-6 text-center">
        <PackageSearch aria-hidden="true" className="mb-4 text-black/30" size={34} />
        <p className="text-sm text-black/60">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={layoutClass(mode)}>
      {products.map((product) => (
        <div key={product.id} className={mode === 'rail' ? 'snap-start' : undefined}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
