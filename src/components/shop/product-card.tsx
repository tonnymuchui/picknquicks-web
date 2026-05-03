'use client';

import { Star, Package } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { AddToCartButton } from '@/components/cart/add-to-cart-button';
import { formatPriceKsh } from '@/lib/utils/currency';
import { resolveMediaUrl } from '@/lib/utils/media';

import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = product.discountPercentage
    ? Math.round(product.discountPercentage)
    : 0;

  return (
    <div className="group overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-lg">
      <Link className="block" href={`/products/${product.slug}`}>
        <div className="relative aspect-square bg-gray-100">
          {product.primaryImageUrl ? (
            <Image
              fill
              alt={product.name}
              className="object-contain p-4 transition-transform group-hover:scale-105"
              src={resolveMediaUrl(product.primaryImageUrl) || ''}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Package className="text-gray-300" size={64} />
            </div>
          )}

          {discountPercentage > 0 ? (
            <div className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1 text-sm font-bold text-white">
              -{discountPercentage}%
            </div>
          ) : null}

          {product.featured ? (
            <div className="absolute left-2 top-2 flex items-center gap-1 rounded bg-yellow-500 px-2 py-1 text-xs font-medium text-white">
              <Star className="fill-white" size={12} />
              Featured
            </div>
          ) : null}

          {!product.inStock ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="rounded-lg bg-white px-4 py-2 font-semibold text-gray-900">
                Out of Stock
              </span>
            </div>
          ) : null}
        </div>
      </Link>

      <div className="p-4">
        {product.brandName ? (
          <p className="mb-1 text-xs text-gray-500">{product.brandName}</p>
        ) : null}

        <Link href={`/products/${product.slug}`}>
          <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 group-hover:text-blue-600">
            {product.name}
          </h3>
        </Link>

        {product.averageRating && product.averageRating > 0 ? (
          <div className="mb-2 flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={
                    i < Math.round(product.averageRating!)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }
                  size={14}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviewCount})</span>
          </div>
        ) : null}

        <div className="mb-3 flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-gray-900">
              {formatPriceKsh(product.effectivePrice)}
            </div>
            {product.salePrice && product.salePrice < product.price ? (
              <div className="text-sm text-gray-500 line-through">
                {formatPriceKsh(product.price)}
              </div>
            ) : null}
          </div>
        </div>

        <AddToCartButton
          className="w-full"
          inStock={product.inStock}
          productId={product.id}
          variant="default"
        />
      </div>
    </div>
  );
}
