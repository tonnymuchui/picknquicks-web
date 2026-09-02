import { useQuery } from '@tanstack/react-query';

import { publicApiClient } from '@/lib/api/client';

import type { ApiResponse, PaginatedResponse } from '@/types/common';
import type { Product, ProductFilters } from '@/types/product';

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: ProductFilters) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  active: () => [...productKeys.all, 'active'] as const,
  byCategory: (categoryId: string) => [...productKeys.all, 'category', categoryId] as const,
  byBrand: (brandId: string) => [...productKeys.all, 'brand', brandId] as const,
  search: (query: string) => [...productKeys.all, 'search', query] as const,
};

export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: async (): Promise<PaginatedResponse<Product>> => {
      const { data } = await publicApiClient.get<ApiResponse<PaginatedResponse<Product>>>(
        '/products',
        {
          params: filters,
        }
      );
      return data.data!;
    },
    staleTime: 3 * 60 * 1000,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: async (): Promise<Product> => {
      const { data } = await publicApiClient.get<ApiResponse<Product>>(`/products/${id}`);
      return data.data!;
    },
    enabled: !!id,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}

export function useActiveProducts(filters: ProductFilters = {}) {
  const hasCatalogFilters = Boolean(
    filters.categoryId ||
    filters.brandId ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined
  );

  return useQuery({
    queryKey: [...productKeys.active(), filters],
    queryFn: async (): Promise<PaginatedResponse<Product>> => {
      const { data } = await publicApiClient.get<ApiResponse<PaginatedResponse<Product>>>(
        filters.search
          ? '/products/search'
          : hasCatalogFilters
            ? '/products/filter'
            : '/products/active',
        {
          params: { ...filters, query: filters.search },
        }
      );
      return data.data!;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useProductsByCategory(categoryId: string, filters: ProductFilters = {}) {
  return useQuery({
    queryKey: [...productKeys.byCategory(categoryId), filters],
    queryFn: async (): Promise<PaginatedResponse<Product>> => {
      const { data } = await publicApiClient.get<ApiResponse<PaginatedResponse<Product>>>(
        `/products/category/${categoryId}`,
        { params: filters }
      );
      return data.data!;
    },
    enabled: !!categoryId,
  });
}

export function useProductsByBrand(brandId: string, filters: ProductFilters = {}) {
  return useQuery({
    queryKey: [...productKeys.byBrand(brandId), filters],
    queryFn: async (): Promise<PaginatedResponse<Product>> => {
      const { data } = await publicApiClient.get<ApiResponse<PaginatedResponse<Product>>>(
        `/products/brand/${brandId}`,
        { params: filters }
      );
      return data.data!;
    },
    enabled: !!brandId,
  });
}

export function useSearchProducts(query: string, filters: ProductFilters = {}) {
  return useQuery({
    queryKey: [...productKeys.search(query), filters],
    queryFn: async (): Promise<PaginatedResponse<Product>> => {
      const { data } = await publicApiClient.get<ApiResponse<PaginatedResponse<Product>>>(
        '/products/search',
        {
          params: { query, ...filters },
        }
      );
      return data.data!;
    },
    enabled: query.length > 0,
  });
}
