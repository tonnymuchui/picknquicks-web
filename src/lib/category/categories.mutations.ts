import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useEntityCrud } from '@/lib/hooks/use-entity-crud';
import { useImageUpload } from '@/lib/hooks/use-image-upload';
import { apiClient } from '@/lib/api/client';
import { categoryKeys } from './categories.queries';

import type { CreateCategoryInput, UpdateCategoryInput, Category } from '@/types/category';
import type { ApiResponse } from '@/types/common';
import type { AxiosError } from 'axios';

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

const crudConfig = {
  entityName: 'Category',
  endpoint: '/categories',
  queryKeys: categoryKeys,
  toFormData: buildFormData,
};

export function useCreateCategory() {
  const { useCreate } = useEntityCrud<Category, CreateCategoryInput, UpdateCategoryInput>(
    crudConfig
  );
  return useCreate();
}

export function useUpdateCategory() {
  const { useUpdate } = useEntityCrud<Category, CreateCategoryInput, UpdateCategoryInput>(
    crudConfig
  );
  return useUpdate();
}

export function useDeleteCategory() {
  const { useDelete } = useEntityCrud<Category, CreateCategoryInput, UpdateCategoryInput>(
    crudConfig
  );
  return useDelete();
}

const imageConfig = {
  entityName: 'Category',
  queryKeys: categoryKeys,
};

export function useUploadCategoryImage() {
  const { useUpload } = useImageUpload<Category>(imageConfig);
  return useUpload((id) => `/categories/${id}/image`, 'Image');
}

export function useUploadCategoryIcon() {
  const { useUpload } = useImageUpload<Category>(imageConfig);
  return useUpload((id) => `/categories/${id}/icon`, 'Icon');
}

export function useRemoveCategoryImage() {
  const { useRemove } = useImageUpload<Category>(imageConfig);
  return useRemove((id) => `/categories/${id}/image`, 'Image');
}

export function useRemoveCategoryIcon() {
  const { useRemove } = useImageUpload<Category>(imageConfig);
  return useRemove((id) => `/categories/${id}/icon`, 'Icon');
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
    onError: (error: AxiosError<ApiResponse>) => {
      const message = error?.response?.data?.message || 'Failed to move category';
      toast.error(message);
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
    onError: (error: AxiosError<ApiResponse>) => {
      const message = error?.response?.data?.message || 'Failed to reorder categories';
      toast.error(message);
    },
  });
}
