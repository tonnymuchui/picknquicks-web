import { useQuery } from '@tanstack/react-query';

import { ensureGuestToken, removeGuestToken } from '@/lib/utils/guest-token';


import { bootstrapGuestToken, getCartRequestConfig } from './cart-helpers';
import { publicApiClient } from '../api/client';

import type { Cart } from '@/types/cart';
import type { ApiResponse } from '@/types/common';

export const cartKeys = {
  all: ['cart'] as const,
  current: () => [...cartKeys.all, 'current'] as const,
};

export function useCart() {
  const fetchCart = (guestToken: string) =>
    publicApiClient
      .get<ApiResponse<Cart>>('/cart', getCartRequestConfig(guestToken))
      .then((res) => res.data.data!);

  return useQuery({
    queryKey: cartKeys.current(),
    queryFn: async (): Promise<Cart> => {
      let guestToken = ensureGuestToken();

      try {
        return await fetchCart(guestToken);
      } catch (error: unknown) {
        const err = error as { response?: { status?: number } };
        if (err?.response?.status === 401) {
          removeGuestToken();
          guestToken = await bootstrapGuestToken();
          return fetchCart(guestToken);
        }
        throw error;
      }
    },
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: (failureCount, error) => {
      const err = error as { response?: { status?: number } };
      if (err?.response?.status === 404 || err?.response?.status === 400) {
        return false;
      }
      return failureCount < 1;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
    throwOnError: false,
  });
}
