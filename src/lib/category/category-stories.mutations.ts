import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { apiClient } from '@/lib/api/client';

import { categoryStoryKeys } from './category-stories.queries';

import type { CategoryStoryInput, CategoryStoryItem } from '@/types/category';
import type { ApiResponse } from '@/types/common';
import type { AxiosError } from 'axios';

function payload(input: Partial<CategoryStoryInput>) {
  const formData = new FormData();
  Object.entries(input).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value instanceof File ? value : String(value));
    }
  });
  return formData;
}

function message(error: AxiosError<ApiResponse>, fallback: string) {
  return error.response?.data?.message || fallback;
}

export function useCreateCategoryStoryItem(categoryId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CategoryStoryInput) => {
      const { data } = await apiClient.post<ApiResponse<CategoryStoryItem>>(
        `/category-stories/${categoryId}`,
        payload(input),
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      return data.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryStoryKeys.all });
      toast.success('Story section added');
    },
    onError: (error: AxiosError<ApiResponse>) =>
      toast.error(message(error, 'Unable to add section')),
  });
}

export function useUpdateCategoryStoryItem(categoryId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: Partial<CategoryStoryInput> }) => {
      const { data } = await apiClient.patch<ApiResponse<CategoryStoryItem>>(
        `/category-stories/${categoryId}/${id}`,
        payload(input),
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      return data.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryStoryKeys.all });
      toast.success('Story section saved');
    },
    onError: (error: AxiosError<ApiResponse>) =>
      toast.error(message(error, 'Unable to save section')),
  });
}

export function useDeleteCategoryStoryItem(categoryId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/category-stories/${categoryId}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryStoryKeys.all });
      toast.success('Story section removed');
    },
    onError: (error: AxiosError<ApiResponse>) =>
      toast.error(message(error, 'Unable to remove section')),
  });
}
