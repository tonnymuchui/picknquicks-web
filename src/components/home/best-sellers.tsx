'use client';

import { ProductCard } from '@/components/shop/product-card';
import { useBestSellers } from '@/lib/product/products.queries';
import { Loader2, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export function BestSellers() {
  const { data: productsData, isLoading } = useBestSellers({ page: 0, size: 8 });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!productsData || productsData.content.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-green-600" size={32} />
            <h2 className="text-3xl font-bold text-gray-900">Best Sellers</h2>
          </div>
          <Link
            href="/products?sort=saleCount-DESC"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsData.content.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}