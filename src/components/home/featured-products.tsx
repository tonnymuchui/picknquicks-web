'use client';

import { ProductCard } from '@/components/shop/product-card';
import { useFeaturedProducts } from '@/lib/product/products.queries';
import { Loader2, Star } from 'lucide-react';
import Link from 'next/link';

export function FeaturedProducts() {
  const { data: products, isLoading } = useFeaturedProducts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Star className="text-yellow-500 fill-yellow-500" size={32} />
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          </div>
          <Link
            href="/products?featured=true"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}