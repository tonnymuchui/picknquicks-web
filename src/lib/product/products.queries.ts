import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api/client';

import type { ApiResponse, PaginatedResponse } from '@/types/common';
import type { Product, ProductFilters } from '@/types/product';

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: ProductFilters) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  bySlug: (slug: string) => [...productKeys.all, 'slug', slug] as const,
  active: () => [...productKeys.all, 'active'] as const,
  featured: () => [...productKeys.all, 'featured'] as const,
  onSale: () => [...productKeys.all, 'on-sale'] as const,
  bestSellers: () => [...productKeys.all, 'best-sellers'] as const,
  newArrivals: () => [...productKeys.all, 'new-arrivals'] as const,
  topRated: () => [...productKeys.all, 'top-rated'] as const,
  byCategory: (categoryId: string) => [...productKeys.all, 'category', categoryId] as const,
  byBrand: (brandId: string) => [...productKeys.all, 'brand', brandId] as const,
  search: (query: string) => [...productKeys.all, 'search', query] as const,
  lowStock: () => [...productKeys.all, 'low-stock'] as const,
  outOfStock: () => [...productKeys.all, 'out-of-stock'] as const,
};

export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: async (): Promise<PaginatedResponse<Product>> => {
      const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>('/products', {
        params: filters,
      });
      return data.data!;
    },
    staleTime: 3 * 60 * 1000,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: async (): Promise<Product> => {
      const { data } = await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
      return data.data!;
    },
    enabled: !!id,
    staleTime: 30 * 1000, // 30 seconds - shorter than list to catch updates
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
  });
}

export function useProductBySlug(slug: string) {
  return useQuery({
    queryKey: productKeys.bySlug(slug),
    queryFn: async (): Promise<Product> => {
      const { data } = await apiClient.get<ApiResponse<Product>>(`/products/slug/${slug}`);
      return data.data!;
    },
    enabled: !!slug,
  });
}

export function useActiveProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: [...productKeys.active(), filters],
    queryFn: async (): Promise<PaginatedResponse<Product>> => {
      const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
        '/products/active',
        {
          params: filters,
        }
      );
      return data.data!;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: productKeys.featured(),
    queryFn: async (): Promise<Product[]> => {
      const { data } = await apiClient.get<ApiResponse<Product[]>>('/products/featured');
      return data.data!;
    },
    staleTime: 10 * 60 * 1000,
  });
}

export function useOnSaleProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: [...productKeys.onSale(), filters],
    queryFn: async (): Promise<PaginatedResponse<Product>> => {
      const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
        '/products/on-sale',
        {
          params: filters,
        }
      );
      return data.data!;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useBestSellers(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: [...productKeys.bestSellers(), filters],
    queryFn: async (): Promise<PaginatedResponse<Product>> => {
      const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
        '/products/best-sellers',
        {
          params: filters,
        }
      );
      return data.data!;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useNewArrivals(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: [...productKeys.newArrivals(), filters],
    queryFn: async (): Promise<PaginatedResponse<Product>> => {
      const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
        '/products/new-arrivals',
        {
          params: filters,
        }
      );
      return data.data!;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useTopRated(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: [...productKeys.topRated(), filters],
    queryFn: async (): Promise<PaginatedResponse<Product>> => {
      const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
        '/products/top-rated',
        {
          params: filters,
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
      const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
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
      const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
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
      const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
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

export function useFilterProducts(filters: ProductFilters) {
  return useQuery({
    queryKey: [...productKeys.all, 'filter', filters],
    queryFn: async (): Promise<PaginatedResponse<Product>> => {
      const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
        '/products/filter',
        {
          params: filters,
        }
      );
      return data.data!;
    },
  });
}

export function useLowStockProducts() {
  return useQuery({
    queryKey: productKeys.lowStock(),
    queryFn: async (): Promise<Product[]> => {
      const { data } = await apiClient.get<ApiResponse<Product[]>>('/products/inventory/low-stock');
      return data.data!;
    },
  });
}

export function useOutOfStockProducts() {
  return useQuery({
    queryKey: productKeys.outOfStock(),
    queryFn: async (): Promise<Product[]> => {
      const { data } = await apiClient.get<ApiResponse<Product[]>>(
        '/products/inventory/out-of-stock'
      );
      return data.data!;
    },
  });
}
