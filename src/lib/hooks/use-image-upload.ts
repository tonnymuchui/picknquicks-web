import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { apiClient } from '../api/client';

import type { ApiResponse } from '@/types/common';
import type { AxiosError } from 'axios';

interface ImageUploadConfig {
  entityName: string;
  queryKeys: {
    all: readonly string[];
    detail: (id: string) => readonly string[];
  };
}

export function useImageUpload<T>(config: ImageUploadConfig) {
  const queryClient = useQueryClient();

  const useUpload = (endpoint: (id: string) => string, imageType: string) =>
    useMutation({
      mutationFn: async ({ id, file }: { id: string; file: File }): Promise<T> => {
        const formData = new FormData();
        formData.append('file', file);

        const { data } = await apiClient.post<ApiResponse<T>>(endpoint(id), formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        return data.data!;
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: config.queryKeys.detail(variables.id) });
        queryClient.invalidateQueries({ queryKey: config.queryKeys.all });
        toast.success(`${imageType} uploaded successfully`);
      },
      onError: (error: AxiosError<ApiResponse>) => {
        const message =
          (error?.response?.data as ApiResponse)?.message ||
          `Failed to upload ${imageType.toLowerCase()}`;
        toast.error(message);
      },
    });

  const useRemove = (endpoint: (id: string) => string, imageType: string) =>
    useMutation({
      mutationFn: async (id: string): Promise<T> => {
        const { data } = await apiClient.delete<ApiResponse<T>>(endpoint(id));
        return data.data!;
      },
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: config.queryKeys.detail(id) });
        queryClient.invalidateQueries({ queryKey: config.queryKeys.all });
        toast.success(`${imageType} removed successfully`);
      },
    });

  return { useUpload, useRemove };
}
