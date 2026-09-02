import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { apiClient } from '@/lib/api/client';

import type { Category, CategoryTree } from '@/types/category';
import type { ApiResponse } from '@/types/common';

export const categoryKeys = {
  all: ['categories'] as const,
  trees: () => [...categoryKeys.all, 'tree'] as const,
  tree: (active?: boolean) => [...categoryKeys.trees(), { active }] as const,
  details: () => [...categoryKeys.all, 'detail'] as const,
  detail: (id: string) => [...categoryKeys.details(), id] as const,
  bySlug: (slug: string) => [...categoryKeys.all, 'slug', slug] as const,
  roots: () => [...categoryKeys.all, 'roots'] as const,
  children: (parentId: string) => [...categoryKeys.all, 'children', parentId] as const,
};

export function useCategoryTree(activeOnly = false) {
  return useQuery({
    queryKey: categoryKeys.tree(activeOnly),
    queryFn: async (): Promise<CategoryTree[]> => {
      const endpoint = activeOnly ? '/categories/tree/active' : '/categories/tree';
      const { data } = await apiClient.get<ApiResponse<CategoryTree[]>>(endpoint);
      return data.data!;
    },
    staleTime: 10 * 60 * 1000,
  });
}

export function useCategoryOptions(activeOnly = false) {
  const query = useCategoryTree(activeOnly);
  const data = useMemo(() => {
    const flatten = (nodes: CategoryTree[]): CategoryTree[] =>
      nodes.flatMap((node) => [node, ...flatten(node.children)]);
    return query.data ? flatten(query.data) : undefined;
  }, [query.data]);

  return { ...query, data };
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: async (): Promise<Category> => {
      const { data } = await apiClient.get<ApiResponse<Category>>(`/categories/${id}`);
      return data.data!;
    },
    enabled: !!id,
  });
}

export function useCategoryBySlug(slug: string) {
  return useQuery({
    queryKey: categoryKeys.bySlug(slug),
    queryFn: async (): Promise<Category> => {
      const { data } = await apiClient.get<ApiResponse<Category>>(`/categories/slug/${slug}`);
      return data.data!;
    },
    enabled: !!slug,
  });
}

export function useRootCategories(activeOnly = false) {
  return useQuery({
    queryKey: [...categoryKeys.roots(), { activeOnly }],
    queryFn: async (): Promise<Category[]> => {
      const endpoint = activeOnly ? '/categories/roots/active' : '/categories/roots';
      const { data } = await apiClient.get<ApiResponse<Category[]>>(endpoint);
      return data.data!;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useChildCategories(parentId: string, activeOnly = false) {
  return useQuery({
    queryKey: [...categoryKeys.children(parentId), { activeOnly }],
    queryFn: async (): Promise<Category[]> => {
      const endpoint = activeOnly
        ? `/categories/${parentId}/children/active`
        : `/categories/${parentId}/children`;
      const { data } = await apiClient.get<ApiResponse<Category[]>>(endpoint);
      return data.data!;
    },
    enabled: !!parentId,
  });
}
