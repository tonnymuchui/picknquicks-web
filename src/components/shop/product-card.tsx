'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Package, ShoppingCart } from 'lucide-react';
import type { Product } from '@/types/product';
import { formatPriceKsh } from '@/lib/utils/currency';
import { resolveMediaUrl } from '@/lib/utils/media';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = product.discountPercentage
    ? Math.round(product.discountPercentage)
    : 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square bg-gray-100">
        {resolveMediaUrl(product.primaryImageUrl) ? (
          <Image
            src={resolveMediaUrl(product.primaryImageUrl) || '/favicon.ico'}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Package size={64} className="text-gray-300" />
          </div>
        )}

        {discountPercentage > 0 && (
          <div className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1 text-sm font-bold text-white">
            -{discountPercentage}%
          </div>
        )}

        {product.featured && (
          <div className="absolute left-2 top-2 flex items-center gap-1 rounded bg-yellow-500 px-2 py-1 text-xs font-medium text-white">
            <Star size={12} className="fill-white" />
            Featured
          </div>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-lg bg-white px-4 py-2 font-semibold text-gray-900">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        {product.brandName && <p className="mb-1 text-xs text-gray-500">{product.brandName}</p>}

        <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 group-hover:text-blue-600">
          {product.name}
        </h3>

        {product.averageRating && product.averageRating > 0 && (
          <div className="mb-2 flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.round(product.averageRating!)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviewCount})</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-gray-900">
              {formatPriceKsh(product.effectivePrice)}
            </div>
            {product.salePrice && product.salePrice < product.price && (
              <div className="text-sm text-gray-500 line-through">
                {formatPriceKsh(product.price)}
              </div>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              // Add to cart logic here
            }}
            disabled={!product.inStock}
            className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </Link>
  );
}
