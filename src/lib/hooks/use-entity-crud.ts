import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { apiClient } from '../api/client';

import type { ApiResponse } from '@/types/common';
import type { AxiosError } from 'axios';

interface EntityCrudConfig<TCreate, TUpdate> {
  entityName: string;
  endpoint: string;
  queryKeys: {
    all: readonly string[];
    detail: (id: string) => readonly string[];
  };
  toFormData?: (input: TCreate | TUpdate) => FormData | object;
}

export function useEntityCrud<T, TCreate, TUpdate>(config: EntityCrudConfig<TCreate, TUpdate>) {
  const queryClient = useQueryClient();

  const useCreate = () =>
    useMutation({
      mutationFn: async (input: TCreate): Promise<T> => {
        const payload = config.toFormData ? config.toFormData(input) : input;
        const isFormData = payload instanceof FormData;

        const { data } = await apiClient.post<ApiResponse<T>>(config.endpoint, payload, {
          headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
        });

        return data.data!;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: config.queryKeys.all });
        toast.success(`${config.entityName} created successfully`);
      },
      onError: (error: AxiosError<ApiResponse>) => {
        const message =
          (error?.response?.data as ApiResponse)?.message ||
          `Failed to create ${config.entityName.toLowerCase()}`;
        toast.error(message);
      },
    });

  const useUpdate = () =>
    useMutation({
      mutationFn: async ({ id, input }: { id: string; input: TUpdate }): Promise<T> => {
        const payload = config.toFormData ? config.toFormData(input) : input;
        const isFormData = payload instanceof FormData;

        const { data } = await apiClient.put<ApiResponse<T>>(`${config.endpoint}/${id}`, payload, {
          headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
        });

        return data.data!;
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: config.queryKeys.all });
        queryClient.invalidateQueries({ queryKey: config.queryKeys.detail(variables.id) });
        toast.success(`${config.entityName} updated successfully`);
      },
      onError: (error: AxiosError<ApiResponse>) => {
        const message =
          (error?.response?.data as ApiResponse)?.message ||
          `Failed to update ${config.entityName.toLowerCase()}`;
        toast.error(message);
      },
    });

  const useDelete = () =>
    useMutation({
      mutationFn: async (id: string): Promise<void> => {
        await apiClient.delete(`${config.endpoint}/${id}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: config.queryKeys.all });
        toast.success(`${config.entityName} deleted successfully`);
      },
      onError: (error: AxiosError<ApiResponse>) => {
        const message =
          (error?.response?.data as ApiResponse)?.message ||
          `Failed to delete ${config.entityName.toLowerCase()}`;
        toast.error(message);
      },
    });

  return { useCreate, useUpdate, useDelete };
}
