'use client';

import { Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { useRootCategories } from '@/lib/category/categories.queries';

export default function CategoriesPage() {
  const { data: categories, isLoading } = useRootCategories(true);

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

  const featured = categories?.slice(0, 2);
  const rest = categories?.slice(2);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <div className="border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="container mx-auto px-4 py-24">
          <h1 className="text-6xl font-black" style={{ color: 'var(--color-primary)' }}>
            Categories
          </h1>
          <p className="mt-3 max-w-2xl text-lg" style={{ color: 'var(--muted-foreground)' }}>
            Find everything you need across our carefully organized categories
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        {featured && featured.length > 0 ? <div className="mb-20">
            <div className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-2">
              {featured.map((category) => (
                <Link
                  key={category.id}
                  className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-3xl transition-all duration-300"
                  href={`/shop/categories/${category.slug}`}
                  style={{
                    backgroundColor: 'var(--muted)',
                  }}
                  onMouseEnter={(e) => {
                    const img = e.currentTarget.querySelector('div:first-child');
                    if (img) {(img as HTMLElement).style.transform = 'scale(1.05)';}
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget.querySelector('div:first-child');
                    if (img) {(img as HTMLElement).style.transform = 'scale(1)';}
                  }}
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center text-7xl transition-transform duration-300"
                    style={{ opacity: 0.1 }}
                  >
                    {category.iconUrl || '📦'}
                  </div>
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}
                  />
                  <div className="relative p-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="mb-2 text-4xl font-black text-white">{category.name}</h2>
                        {category.description ? <p className="max-w-sm text-sm text-white/80">{category.description}</p> : null}
                      </div>
                      <ArrowRight className="text-white" size={28} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div> : null}

        <div>
          <h2 className="mb-8 text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
            All Categories
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rest?.map((category) => (
              <Link
                key={category.id}
                className="group flex items-center gap-4 rounded-2xl p-5 transition-all duration-300"
                href={`/shop/categories/${category.slug}`}
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
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center text-4xl">
                  {category.iconUrl || '📦'}
                </div>
                <div className="min-w-0 flex-1">
                  <h3
                    className="truncate text-base font-bold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {category.name}
                  </h3>
                  {category.hasChildren ? <p className="mt-1 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                      {category.childrenCount} subcategories
                    </p> : null}
                </div>
                <ArrowRight
                  className="flex-shrink-0 transition-all"
                  size={20}
                  style={{ color: 'var(--color-highlight)' }}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
