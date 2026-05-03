'use client';

import { X } from 'lucide-react';

import { useActiveBrands } from '@/lib/brand/brands.queries';
import { useCategories } from '@/lib/category/categories.queries';

interface ProductFiltersProps {
  filters: {
    categoryId?: string;
    brandId?: string;
    minPrice?: number;
    maxPrice?: number;
  };
  onChange: (filters: Partial<ProductFiltersProps['filters']>) => void;
  onReset: () => void;
}

export function ProductFilters({ filters, onChange, onReset }: ProductFiltersProps) {
  const { data: categories } = useCategories();
  const { data: brands } = useActiveBrands();

  const hasActiveFilters = Boolean(
    filters.categoryId || filters.brandId || filters.minPrice || filters.maxPrice
  );

  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters ? (
          <button
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
            onClick={onReset}
          >
            <X size={16} />
            Clear all
          </button>
        ) : null}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
        <select
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.categoryId || ''}
          onChange={(e) => onChange({ ...filters, categoryId: e.target.value || undefined })}
        >
          <option value="">All Categories</option>
          {categories?.content.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Brand</label>
        <select
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <label className="mb-2 block text-sm font-medium text-gray-700">Price Range</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
