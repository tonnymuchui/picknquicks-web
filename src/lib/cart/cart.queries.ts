import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api/client';
import { getCurrentCartRequestConfig } from '@/lib/cart/cart-helpers';
import { ensureGuestToken } from '@/lib/utils/guest-token';

import type { Cart } from '@/types/cart';
import type { ApiResponse } from '@/types/common';

export const cartKeys = {
  all: ['cart'] as const,
  details: () => [...cartKeys.all, 'detail'] as const,
  detail: (identity?: string) => [...cartKeys.details(), identity ?? 'current'] as const,
};

async function fetchCart(): Promise<Cart> {
  const { data } = await apiClient.get<ApiResponse<Cart>>('/cart', getCurrentCartRequestConfig());

  if (!data.data) {
    throw new Error(data.message || 'Cart data was not returned');
  }

  return data.data;
}

export function useCart(enabled = true) {
  const identity = `session:${ensureGuestToken()}`;

  return useQuery({
    queryKey: cartKeys.detail(identity),
    queryFn: fetchCart,
    enabled,
    staleTime: 0,
    gcTime: 30 * 60_000,
    refetchOnWindowFocus: true,
    retry: 1,
  });
}
