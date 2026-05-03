import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { publicApiClient } from '@/lib/api/client';
import { removeGuestToken } from '@/lib/utils/guest-token';

import { executeWithGuestTokenRetry, getCartRequestConfig } from './cart-helpers';
import { cartKeys } from './cart.queries';

import type { Cart, AddToCartInput, UpdateCartItemInput } from '@/types/cart';
import type { ApiResponse } from '@/types/common';

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: AddToCartInput) =>
      executeWithGuestTokenRetry((guestToken) =>
        publicApiClient
          .post<ApiResponse<Cart>>('/cart/items', input, getCartRequestConfig(guestToken))
          .then((res) => res.data.data!)
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
      toast.success('Added to cart');
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || 'Failed to add to cart');
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartItemId, input }: { cartItemId: string; input: UpdateCartItemInput }) =>
      executeWithGuestTokenRetry((guestToken) =>
        publicApiClient
          .put<
            ApiResponse<Cart>
          >(`/cart/items/${cartItemId}`, input, getCartRequestConfig(guestToken))
          .then((res) => res.data.data!)
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
      toast.success('Cart updated');
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || 'Failed to update cart');
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartItemId: string) =>
      executeWithGuestTokenRetry((guestToken) =>
        publicApiClient
          .delete<ApiResponse<Cart>>(`/cart/items/${cartItemId}`, getCartRequestConfig(guestToken))
          .then((res) => res.data.data!)
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
      toast.success('Removed from cart');
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || 'Failed to remove item');
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      executeWithGuestTokenRetry((guestToken) =>
        publicApiClient
          .delete<ApiResponse<Cart>>('/cart', getCartRequestConfig(guestToken))
          .then((res) => res.data.data!)
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
      toast.success('Cart cleared');
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || 'Failed to clear cart');
    },
  });
}

export function useMergeCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) =>
      executeWithGuestTokenRetry((guestToken) =>
        publicApiClient
          .post<ApiResponse<Cart>>('/cart/merge', null, {
            params: { userId, guestToken },
            headers: { 'X-Guest-Token': guestToken },
          })
          .then((res) => res.data.data!)
      ),
    onSuccess: () => {
      removeGuestToken();
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || 'Failed to merge cart');
    },
  });
}
