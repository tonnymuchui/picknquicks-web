'use client';

import { ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

import { useRootCategories } from '@/lib/category/categories.queries';

export default function CategoriesPage() {
  const { data: categories, isLoading } = useRootCategories(true);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shop by Category</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories?.map((category) => (
            <Link
              key={category.id}
              className="group bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
              href={`/categories/${category.slug}`}
            >
              <div className="flex items-center justify-between mb-4">
                {category.iconUrl ? <span className="text-4xl">{category.iconUrl}</span> : null}
                <ChevronRight className="text-gray-400 group-hover:text-blue-600 transition-colors" size={20} />
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {category.name}
              </h2>

              {category.description ? <p className="text-sm text-gray-600 line-clamp-2">
                  {category.description}
                </p> : null}

              {category.hasChildren ? <p className="text-xs text-blue-600 mt-3">
                  {category.childrenCount} subcategories
                </p> : null}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}