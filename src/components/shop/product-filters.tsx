'use client';

import { X } from 'lucide-react';

import { useActiveBrands } from '@/lib/brand/brands.queries';
import { useCategoryOptions } from '@/lib/category/categories.queries';

interface ProductFiltersProps {
  filters: {
    categoryId?: string;
    brandId?: string;
    minPrice?: number;
    maxPrice?: number;
  };
  onChange: (filters: Partial<ProductFiltersProps['filters']>) => void;
  onReset: () => void;
  showHeader?: boolean;
}

export function ProductFilters({
  filters,
  onChange,
  onReset,
  showHeader = true,
}: ProductFiltersProps) {
  const { data: categories } = useCategoryOptions(true);
  const { data: brands } = useActiveBrands();

  const hasActiveFilters = Boolean(
    filters.categoryId || filters.brandId || filters.minPrice || filters.maxPrice
  );

  return (
    <div className="border-line space-y-7 border-y py-6 lg:border-y-0 lg:py-0">
      {showHeader ? (
        <div className="flex min-h-8 items-center justify-between gap-3">
          <h2 className="text-ink font-serif text-xl">Filters</h2>
          {hasActiveFilters ? (
            <button
              className="text-primary hover:bg-sand flex min-h-11 items-center gap-1.5 rounded-full px-2 text-xs font-semibold"
              type="button"
              onClick={onReset}
            >
              <X aria-hidden="true" size={14} />
              Clear all
            </button>
          ) : null}
        </div>
      ) : null}

      <div>
        <label className="text-muted-foreground mb-2 block text-[10px] font-bold uppercase tracking-[0.14em]">
          Category
        </label>
        <select
          className="border-line bg-paper text-ink hover:border-ink/40 focus:border-primary min-h-11 w-full rounded-md border px-3 text-sm outline-none transition-colors"
          value={filters.categoryId || ''}
          onChange={(e) => onChange({ ...filters, categoryId: e.target.value || undefined })}
        >
          <option value="">All Categories</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {'— '.repeat(category.level)}
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-muted-foreground mb-2 block text-[10px] font-bold uppercase tracking-[0.14em]">
          Brand
        </label>
        <select
          className="border-line bg-paper text-ink hover:border-ink/40 focus:border-primary min-h-11 w-full rounded-md border px-3 text-sm outline-none transition-colors"
          value={filters.brandId || ''}
          onChange={(e) => onChange({ ...filters, brandId: e.target.value || undefined })}
        >
          <option value="">All Brands</option>
          {brands?.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-muted-foreground mb-2 block text-[10px] font-bold uppercase tracking-[0.14em]">
          Price range (KSh)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            aria-label="Minimum price"
            className="border-line bg-paper text-ink hover:border-ink/40 focus:border-primary min-h-11 min-w-0 rounded-md border px-3 text-sm outline-none transition-colors"
            placeholder="Min"
            type="number"
            value={filters.minPrice || ''}
            onChange={(e) =>
              onChange({
                ...filters,
                minPrice: e.target.value ? Number(e.target.value) : undefined,
              })
            }
          />
          <input
            aria-label="Maximum price"
            className="border-line bg-paper text-ink hover:border-ink/40 focus:border-primary min-h-11 min-w-0 rounded-md border px-3 text-sm outline-none transition-colors"
            placeholder="Max"
            type="number"
            value={filters.maxPrice || ''}
            onChange={(e) =>
              onChange({
                ...filters,
                maxPrice: e.target.value ? Number(e.target.value) : undefined,
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
