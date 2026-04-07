import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api/client';

import type { Brand, BrandFilters } from '@/types/brand';
import type { ApiResponse, PaginatedResponse } from '@/types/common';

export const brandKeys = {
  all: ['brands'] as const,
  lists: () => [...brandKeys.all, 'list'] as const,
  list: (filters: BrandFilters) => [...brandKeys.lists(), filters] as const,
  details: () => [...brandKeys.all, 'detail'] as const,
  detail: (id: string) => [...brandKeys.details(), id] as const,
  bySlug: (slug: string) => [...brandKeys.all, 'slug', slug] as const,
  active: () => [...brandKeys.all, 'active'] as const,
  featured: () => [...brandKeys.all, 'featured'] as const,
  byCountry: (country: string) => [...brandKeys.all, 'country', country] as const,
  countries: () => [...brandKeys.all, 'countries'] as const,
};

export function useBrands(filters: BrandFilters = {}) {
  return useQuery({
    queryKey: brandKeys.list(filters),
    queryFn: async (): Promise<PaginatedResponse<Brand>> => {
      const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Brand>>>('/brands', {
        params: filters,
      });
      return data.data!;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useBrand(id: string) {
  return useQuery({
    queryKey: brandKeys.detail(id),
    queryFn: async (): Promise<Brand> => {
      const { data } = await apiClient.get<ApiResponse<Brand>>(`/brands/${id}`);
      return data.data!;
    },
    enabled: !!id,
  });
}

export function useBrandBySlug(slug: string) {
  return useQuery({
    queryKey: brandKeys.bySlug(slug),
    queryFn: async (): Promise<Brand> => {
      const { data } = await apiClient.get<ApiResponse<Brand>>(`/brands/slug/${slug}`);
      return data.data!;
    },
    enabled: !!slug,
  });
}

export function useActiveBrands() {
  return useQuery({
    queryKey: brandKeys.active(),
    queryFn: async (): Promise<Brand[]> => {
      const { data } = await apiClient.get<ApiResponse<Brand[]>>('/brands/active');
      return data.data!;
    },
    staleTime: 10 * 60 * 1000,
  });
}

export function useFeaturedBrands() {
  return useQuery({
    queryKey: brandKeys.featured(),
    queryFn: async (): Promise<Brand[]> => {
      const { data } = await apiClient.get<ApiResponse<Brand[]>>('/brands/featured');
      return data.data!;
    },
    staleTime: 10 * 60 * 1000,
  });
}

export function useSearchBrands(query: string, filters: BrandFilters = {}) {
  return useQuery({
    queryKey: [...brandKeys.all, 'search', query, filters],
    queryFn: async (): Promise<PaginatedResponse<Brand>> => {
      const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Brand>>>('/brands/search', {
        params: { query, ...filters },
      });
      return data.data!;
    },
    enabled: !!query,
  });
}

export function useBrandsByCountry(country: string) {
  return useQuery({
    queryKey: brandKeys.byCountry(country),
    queryFn: async (): Promise<Brand[]> => {
      const { data } = await apiClient.get<ApiResponse<Brand[]>>(`/brands/country/${country}`);
      return data.data!;
    },
    enabled: !!country,
  });
}

export function useBrandCountries() {
  return useQuery({
    queryKey: brandKeys.countries(),
    queryFn: async (): Promise<string[]> => {
      const { data } = await apiClient.get<ApiResponse<string[]>>('/brands/countries');
      return data.data!;
    },
    staleTime: 30 * 60 * 1000,
  });
}