import { apiClient } from '@/lib/api/client';
import { getGuestToken, removeGuestToken } from '@/lib/utils/guest-token';

export async function mergeGuestCart(): Promise<boolean> {
  const guestToken = getGuestToken();
  if (!guestToken) {
    return false;
  }

  const { data } = await apiClient.post<{ data?: { merged: boolean } }>('/cart/merge', null, {
    headers: { 'X-Guest-Token': guestToken },
  });
  removeGuestToken();
  return data.data?.merged ?? false;
}
