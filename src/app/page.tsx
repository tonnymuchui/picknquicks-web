import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { BestSellers } from '@/components/home/best-sellers';
import { FeaturedProducts } from '@/components/home/featured-products';
import { NewArrivals } from '@/components/home/new-arrivals';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Welcome to PicknQuicks
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100">
              Discover amazing products at unbeatable prices. Fast delivery, quality guaranteed.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2 text-lg"
                href="/products"
              >
                Shop Now
                <ArrowRight size={20} />
              </Link>
              <Link
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg"
                href="/brands"
              >
                Explore Brands
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FeaturedProducts />
      <NewArrivals />
      <BestSellers />

      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start shopping?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of happy customers today
          </p>
          <Link
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2 text-lg"
            href="/products"
          >
            Browse All Products
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}