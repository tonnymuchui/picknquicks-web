'use client';

import { Loader2, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

import { useCategoryBySlug, useChildCategories } from '@/lib/category/categories.queries';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: category, isLoading } = useCategoryBySlug(slug);
  const { data: children } = useChildCategories(category?.id || '', true);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Category not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link className="hover:text-blue-600" href="/categories">Categories</Link>
            {category.fullPath.split(' > ').slice(0, -1).map((part, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <ChevronRight size={16} />
                <span>{part}</span>
              </span>
            ))}
          </div>

          <div className="flex items-start gap-4">
            {category.iconUrl ? <span className="text-5xl">{category.iconUrl}</span> : null}
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{category.name}</h1>
              {category.description ? <p className="text-gray-600 mt-2">{category.description}</p> : null}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {children && children.length > 0 ? <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Subcategories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {children.map((child) => (
                <Link
                  key={child.id}
                  className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 flex items-center gap-3"
                  href={`/categories/${child.slug}`}
                >
                  {child.iconUrl ? <span className="text-2xl">{child.iconUrl}</span> : null}
                  <span className="font-medium text-gray-900">{child.name}</span>
                </Link>
              ))}
            </div>
          </div> : null}

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Products</h2>
          <p className="text-gray-500">Products will be displayed here</p>
        </div>
      </div>
    </div>
  );
}