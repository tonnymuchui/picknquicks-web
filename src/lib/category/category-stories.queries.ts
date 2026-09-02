import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api/client';

import type { CategoryStoryItem } from '@/types/category';
import type { ApiResponse } from '@/types/common';

export const categoryStoryKeys = {
  all: ['category-stories'] as const,
  category: (categoryId: string, includeInactive = false) =>
    [...categoryStoryKeys.all, categoryId, { includeInactive }] as const,
};

export function useCategoryStory(categoryId: string, includeInactive = false) {
  return useQuery({
    queryKey: categoryStoryKeys.category(categoryId, includeInactive),
    queryFn: async (): Promise<CategoryStoryItem[]> => {
      const { data } = await apiClient.get<ApiResponse<CategoryStoryItem[]>>(
        `/category-stories/${categoryId}`,
        { params: includeInactive ? { includeInactive: true } : undefined }
      );
      return data.data ?? [];
    },
    enabled: Boolean(categoryId),
    staleTime: 5 * 60 * 1000,
  });
}
