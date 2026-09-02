import { ArrowRight, Package } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { formatPriceKsh } from '@/lib/utils/currency';
import { resolveMediaUrl } from '@/lib/utils/media';

import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'editorial';
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const editorial = variant === 'editorial';
  const imageUrl = resolveMediaUrl(product.primaryImageUrl || product.images?.[0]?.imageUrl);
  const stockLabel = !product.inStock
    ? 'Out of stock'
    : product.stockQuantity <= 5
      ? `${product.stockQuantity} left`
      : 'In stock';

  return (
    <article
      className={`group h-full overflow-hidden transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 motion-reduce:transition-none ${editorial ? 'bg-transparent' : 'rounded-lg border border-[#d7d0c6] bg-white hover:border-black/25 hover:shadow-[0_18px_45px_rgba(31,28,23,0.09)]'}`}
    >
      <Link
        aria-label={`View ${product.name}, ${formatPriceKsh(product.effectivePrice)}`}
        className="flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-black"
        href={`/products/${product.slug}`}
      >
        <div className="relative aspect-square overflow-hidden bg-[#f2eee7]">
          {imageUrl ? (
            <Image
              fill
              alt={product.images?.find((image) => image.isPrimary)?.altText || product.name}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
              sizes="(min-width: 1280px) 25vw, 50vw"
              src={imageUrl}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-black/20">
              <Package aria-hidden="true" size={52} strokeWidth={1.25} />
            </div>
          )}

          {!editorial || !product.inStock || product.stockQuantity <= 5 ? (
            <span
              className={`absolute left-2 top-2 bg-black px-2 py-1 text-[10px] text-white sm:px-3 sm:py-1.5 sm:text-xs ${editorial ? '' : 'rounded-full'}`}
            >
              {stockLabel}
            </span>
          ) : null}

          {product.salePrice && product.salePrice < product.price ? (
            <span
              className={`absolute right-2 top-2 bg-white px-2 py-1 text-[10px] font-semibold text-black sm:px-3 sm:py-1.5 sm:text-xs ${editorial ? '' : 'rounded-full'}`}
            >
              Sale
            </span>
          ) : null}
        </div>

        <div className={`flex min-h-[118px] flex-1 flex-col ${editorial ? 'px-0 py-4' : 'p-3'}`}>
          <p
            className={`text-[10px] font-bold uppercase tracking-[0.04em] ${editorial ? 'text-black/45' : 'text-[#9a5d3b]'}`}
          >
            {product.categoryName || product.brandName || 'Workspace essential'}
          </p>
          <div className="mt-2 flex flex-col items-start gap-2 sm:grid sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-3">
            <h3 className="line-clamp-3 text-[13px] font-bold leading-[1.25] text-black">
              {product.name}
            </h3>
            <div className="text-left sm:text-right">
              <p className="whitespace-nowrap text-xs font-semibold text-black">
                {formatPriceKsh(product.effectivePrice)}
              </p>
              {product.salePrice && product.salePrice < product.price ? (
                <p className="mt-1 text-[10px] text-black/45 line-through">
                  {formatPriceKsh(product.price)}
                </p>
              ) : null}
            </div>
          </div>
          <span
            className={`ml-auto mt-auto flex size-7 items-center justify-center transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none ${editorial ? 'border-b border-black bg-transparent text-black' : 'rounded-full bg-black text-white'}`}
          >
            <ArrowRight aria-hidden="true" size={13} />
          </span>
        </div>
      </Link>
    </article>
  );
}
