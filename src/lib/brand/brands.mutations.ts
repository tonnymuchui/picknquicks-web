import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { apiClient } from '@/lib/api/client';
import { useEntityCrud } from '@/lib/hooks/use-entity-crud';
import { useImageUpload } from '@/lib/hooks/use-image-upload';

import { brandKeys } from './brands.queries';

import type { CreateBrandInput, UpdateBrandInput, Brand } from '@/types/brand';

function buildFormData(input: CreateBrandInput | UpdateBrandInput): FormData | object {
  const hasFiles = ('logoFile' in input && input.logoFile) || ('bannerFile' in input && input.bannerFile);

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
  entityName: 'Brand',
  endpoint: '/brands',
  queryKeys: brandKeys,
  toFormData: buildFormData,
};

export function useCreateBrand() {
  const { useCreate } = useEntityCrud<Brand, CreateBrandInput, UpdateBrandInput>(crudConfig);
  return useCreate();
}

export function useUpdateBrand() {
  const { useUpdate } = useEntityCrud<Brand, CreateBrandInput, UpdateBrandInput>(crudConfig);
  return useUpdate();
}

export function useDeleteBrand() {
  const { useDelete } = useEntityCrud<Brand, CreateBrandInput, UpdateBrandInput>(crudConfig);
  return useDelete();
}

const imageConfig = {
  entityName: 'Brand',
  queryKeys: brandKeys,
};

export function useUploadBrandLogo() {
  const { useUpload } = useImageUpload<Brand>(imageConfig);
  return useUpload((id) => `/brands/${id}/logo`, 'Logo');
}

export function useUploadBrandBanner() {
  const { useUpload } = useImageUpload<Brand>(imageConfig);
  return useUpload((id) => `/brands/${id}/banner`, 'Banner');
}

export function useRemoveBrandLogo() {
  const { useRemove } = useImageUpload<Brand>(imageConfig);
  return useRemove((id) => `/brands/${id}/logo`, 'Logo');
}

export function useRemoveBrandBanner() {
  const { useRemove } = useImageUpload<Brand>(imageConfig);
  return useRemove((id) => `/brands/${id}/banner`, 'Banner');
}

export function useReorderBrands() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (brandIds: string[]): Promise<void> => {
      await apiClient.patch('/brands/reorder', brandIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brandKeys.all });
      toast.success('Brands reordered successfully');
    },
  });
}