'use client';

import { Loader2, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

import { useCategoryBySlug, useChildCategories } from '@/lib/category/categories.queries';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data: category, isLoading } = useCategoryBySlug(slug);
  const { data: children } = useChildCategories(category?.id || '', true);

  if (isLoading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: 'var(--color-highlight)' }} />
      </div>
    );
  }

  if (!category) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <p style={{ color: 'var(--muted-foreground)' }}>Category not found</p>
      </div>
    );
  }

  const breadcrumbs = category.fullPath.split(' > ');

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <div className="border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <Link
              className="text-sm font-medium transition-colors"
              href="/shop/categories"
              style={{ color: 'var(--color-primary)' }}
            >
              Categories
            </Link>
            {breadcrumbs.slice(0, -1).map((part, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <ChevronRight size={16} style={{ color: 'var(--muted-foreground)' }} />
                <span className="text-sm" style={{ color: 'var(--color-primary)' }}>
                  {part}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-6">
            {category.iconUrl ? <div className="flex-shrink-0 text-6xl">{category.iconUrl}</div> : null}
            <div>
              <h1 className="text-5xl font-black" style={{ color: 'var(--color-primary)' }}>
                {category.name}
              </h1>
              {category.description ? <p className="mt-4 max-w-2xl text-lg" style={{ color: 'var(--muted-foreground)' }}>
                  {category.description}
                </p> : null}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        {children && children.length > 0 ? <div className="mb-20">
            <h2 className="mb-8 text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
              Subcategories
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {children.map((child) => (
                <Link
                  key={child.id}
                  className="group flex items-center gap-3 rounded-2xl p-5 transition-all duration-300"
                  href={`/shop/categories/${child.slug}`}
                  style={{
                    backgroundColor: 'var(--muted)',
                    border: '1px solid',
                    borderColor: 'var(--border)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-highlight)';
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.backgroundColor = 'var(--muted)';
                  }}
                >
                  <div className="flex-shrink-0 text-3xl">{child.iconUrl || '📦'}</div>
                  <div className="flex-1">
                    <span className="font-bold" style={{ color: 'var(--color-primary)' }}>
                      {child.name}
                    </span>
                  </div>
                  <ArrowRight
                    className="flex-shrink-0"
                    size={20}
                    style={{ color: 'var(--color-highlight)' }}
                  />
                </Link>
              ))}
            </div>
          </div> : null}

        <div>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
              Products
            </h2>
            <span className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
              Coming soon
            </span>
          </div>
          <div
            className="rounded-2xl border-2 border-dashed p-12 text-center"
            style={{
              borderColor: 'var(--border)',
              backgroundColor: 'var(--muted)',
            }}
          >
            <div className="mb-4 text-6xl">📦</div>
            <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
              Explore {category.name} products coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
