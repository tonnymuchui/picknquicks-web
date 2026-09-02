import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { apiClient } from '@/lib/api/client';
import { getApiErrorMessage } from '@/lib/api/errors';
import { getCurrentCartRequestConfig } from '@/lib/cart/cart-helpers';
import { cartKeys } from '@/lib/cart/cart.queries';

import type { Cart } from '@/types/cart';
import type { ApiResponse } from '@/types/common';

function requestConfig() {
  return getCurrentCartRequestConfig();
}

function useCartMutationSuccess() {
  const queryClient = useQueryClient();

  return (cart: Cart) => {
    queryClient.setQueriesData({ queryKey: cartKeys.details() }, cart);
  };
}

export function useAddToCart() {
  const syncCart = useCartMutationSuccess();

  return useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      const { data } = await apiClient.post<ApiResponse<Cart>>(
        '/cart/items',
        { productId, quantity },
        requestConfig()
      );

      if (!data.data) {
        throw new Error(data.message || 'Updated cart was not returned');
      }

      return data.data;
    },
    onSuccess: (cart) => {
      syncCart(cart);
      toast.success('Added to cart');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to add item to cart'));
    },
  });
}

export function useUpdateCartItem() {
  const syncCart = useCartMutationSuccess();

  return useMutation({
    mutationFn: async ({ cartItemId, quantity }: { cartItemId: string; quantity: number }) => {
      const { data } = await apiClient.put<ApiResponse<Cart>>(
        `/cart/items/${cartItemId}`,
        { quantity },
        requestConfig()
      );

      if (!data.data) {
        throw new Error(data.message || 'Updated cart was not returned');
      }

      return data.data;
    },
    onSuccess: syncCart,
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to update cart'));
    },
  });
}

export function useRemoveFromCart() {
  const syncCart = useCartMutationSuccess();

  return useMutation({
    mutationFn: async (cartItemId: string) => {
      const { data } = await apiClient.delete<ApiResponse<Cart>>(`/cart/items/${cartItemId}`, {
        ...requestConfig(),
      });

      if (!data.data) {
        throw new Error(data.message || 'Updated cart was not returned');
      }

      return data.data;
    },
    onSuccess: syncCart,
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to remove item'));
    },
  });
}

export function useClearCart() {
  const syncCart = useCartMutationSuccess();

  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.delete<ApiResponse<Cart>>('/cart', {
        ...requestConfig(),
      });

      if (!data.data) {
        throw new Error(data.message || 'Updated cart was not returned');
      }

      return data.data;
    },
    onSuccess: (cart) => {
      syncCart(cart);
      toast.success('Cart cleared');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to clear cart'));
    },
  });
}
