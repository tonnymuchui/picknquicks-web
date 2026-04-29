import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { apiClient } from '@/lib/api/client';
import { useEntityCrud } from '@/lib/hooks/use-entity-crud';
import { useImageUpload } from '@/lib/hooks/use-image-upload';

import { productKeys } from './products.queries';

import type { ApiResponse } from '@/types/common';
import type {
  CreateProductInput,
  UpdateProductInput,
  Product,
  UpdateStockInput,
} from '@/types/product';

function buildFormData(input: CreateProductInput | UpdateProductInput): FormData | object {
  const hasFiles = 'imageFiles' in input && input.imageFiles && input.imageFiles.length > 0;

  if (hasFiles) {
    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === 'imageFiles' && Array.isArray(value)) {
          value.forEach((file) => formData.append('imageFiles', file));
        } else if (value instanceof File) {
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
  entityName: 'Product',
  endpoint: '/products',
  queryKeys: productKeys,
  toFormData: buildFormData,
};

export function useCreateProduct() {
  const { useCreate } = useEntityCrud<Product, CreateProductInput, UpdateProductInput>(crudConfig);
  return useCreate();
}

export function useUpdateProduct() {
  const { useUpdate } = useEntityCrud<Product, CreateProductInput, UpdateProductInput>(crudConfig);
  return useUpdate();
}

export function useDeleteProduct() {
  const { useDelete } = useEntityCrud<Product, CreateProductInput, UpdateProductInput>(crudConfig);
  return useDelete();
}

const imageConfig = {
  entityName: 'Product',
  queryKeys: productKeys,
};

export function useAddProductImage() {
  const { useUpload } = useImageUpload<Product>(imageConfig);
  return useUpload((id) => `/products/${id}/images`, 'Product Image');
}

export function useRemoveProductImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      imageId,
    }: {
      productId: string;
      imageId: string;
    }): Promise<void> => {
      await apiClient.delete(`/products/${productId}/images/${imageId}`);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.productId) });
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      toast.success('Image removed successfully');
    },
    onError: (error: unknown) => {
      const apiError = error as { response?: { data?: { message?: string } } };
      toast.error(apiError?.response?.data?.message || 'Failed to remove image');
    },
  });
}

export function useUpdateProductStock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      input,
    }: {
      productId: string;
      input: UpdateStockInput;
    }): Promise<Product> => {
      const { data } = await apiClient.patch<ApiResponse<Product>>(
        `/products/${productId}/stock`,
        input
      );
      return data.data!;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.productId) });
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      queryClient.invalidateQueries({ queryKey: productKeys.lowStock() });
      queryClient.invalidateQueries({ queryKey: productKeys.outOfStock() });
      toast.success('Stock updated successfully');
    },
    onError: (error: unknown) => {
      const apiError = error as { response?: { data?: { message?: string } } };
      toast.error(apiError?.response?.data?.message || 'Failed to update stock');
    },
  });
}
