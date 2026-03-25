import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { apiClient } from '@/lib/api/client';

import { categoryKeys } from './categories.queries';

import type { CreateCategoryInput, UpdateCategoryInput, Category } from '@/types/category';
import type { ApiResponse } from '@/types/common';

function getErrorMessage(error: unknown, fallback: string): string {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as { response?: unknown }).response === 'object' &&
    (error as { response?: unknown }).response !== null
  ) {
    const response = (error as { response?: { data?: { message?: unknown } } }).response;
    const message = response?.data?.message;
    if (typeof message === 'string' && message.length > 0) {
      return message;
    }
  }

  return fallback;
}

function buildFormData(input: CreateCategoryInput | UpdateCategoryInput): FormData | object {
  const hasFiles =
    ('imageFile' in input && input.imageFile) || ('iconFile' in input && input.iconFile);

  if (hasFiles) {
    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });
    return formData;
  }

  return input;
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateCategoryInput): Promise<Category> => {
      const payload = buildFormData(input);
      const isFormData = payload instanceof FormData;

      const { data } = await apiClient.post<ApiResponse<Category>>('/categories', payload, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
      });

      return data.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      toast.success('Category created successfully');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Failed to create category'));
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: string;
      input: UpdateCategoryInput;
    }): Promise<Category> => {
      const payload = buildFormData(input);
      const isFormData = payload instanceof FormData;

      const { data } = await apiClient.put<ApiResponse<Category>>(`/categories/${id}`, payload, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
      });

      return data.data!;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      queryClient.invalidateQueries({ queryKey: categoryKeys.detail(variables.id) });
      toast.success('Category updated successfully');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Failed to update category'));
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await apiClient.delete(`/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      toast.success('Category deleted successfully');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Failed to delete category'));
    },
  });
}

export function useUploadCategoryImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, file }: { id: string; file: File }): Promise<Category> => {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await apiClient.post<ApiResponse<Category>>(
        `/categories/${id}/image`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      return data.data!;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      toast.success('Image uploaded successfully');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Failed to upload image'));
    },
  });
}

export function useUploadCategoryIcon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, file }: { id: string; file: File }): Promise<Category> => {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await apiClient.post<ApiResponse<Category>>(
        `/categories/${id}/icon`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      return data.data!;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      toast.success('Icon uploaded successfully');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Failed to upload icon'));
    },
  });
}

export function useRemoveCategoryImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<Category> => {
      const { data } = await apiClient.delete<ApiResponse<Category>>(`/categories/${id}/image`);
      return data.data!;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      toast.success('Image removed successfully');
    },
  });
}

export function useRemoveCategoryIcon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<Category> => {
      const { data } = await apiClient.delete<ApiResponse<Category>>(`/categories/${id}/icon`);
      return data.data!;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      toast.success('Icon removed successfully');
    },
  });
}

export function useMoveCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      newParentId,
    }: {
      id: string;
      newParentId?: string;
    }): Promise<Category> => {
      const { data } = await apiClient.patch<ApiResponse<Category>>(
        `/categories/${id}/move`,
        null,
        {
          params: { newParentId },
        }
      );

      return data.data!;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      queryClient.invalidateQueries({ queryKey: categoryKeys.detail(variables.id) });
      toast.success('Category moved successfully');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Failed to move category'));
    },
  });
}

export function useReorderCategories() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryIds: string[]): Promise<void> => {
      await apiClient.patch('/categories/reorder', categoryIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      toast.success('Categories reordered successfully');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Failed to reorder categories'));
    },
  });
}
