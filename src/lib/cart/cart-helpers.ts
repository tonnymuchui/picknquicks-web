import { publicApiClient } from '@/lib/api/client';
import { ensureGuestToken, removeGuestToken, setGuestToken } from '@/lib/utils/guest-token';

import type { Cart } from '@/types/cart';
import type { ApiResponse } from '@/types/common';

export async function bootstrapGuestToken(): Promise<string> {
  const localToken = ensureGuestToken();

  try {
    const { data } = await publicApiClient.get<ApiResponse<Cart>>('/cart', {
      params: { guestToken: localToken },
      headers: { 'X-Guest-Token': localToken },
    });

    const serverToken = data.data?.guestToken;
    if (serverToken && serverToken !== localToken) {
      setGuestToken(serverToken);
      return serverToken;
    }
  } catch (_error) {}

  return localToken;
}

export async function executeWithGuestTokenRetry<T>(
  request: (guestToken: string) => Promise<T>
): Promise<T> {
  let guestToken = ensureGuestToken();

  try {
    return await request(guestToken);
  } catch (error: unknown) {
    const err = error as { response?: { status?: number } };
    if (err?.response?.status === 401) {
      removeGuestToken();
      guestToken = await bootstrapGuestToken();
      return request(guestToken);
    }
    throw error;
  }
}

export function getCartRequestConfig(guestToken: string) {
  return {
    params: { guestToken },
    headers: { 'X-Guest-Token': guestToken },
  };
}
