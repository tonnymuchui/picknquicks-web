import { apiClient } from '@/lib/api/client';

export async function claimGuestOrders(): Promise<number> {
  const { data } = await apiClient.post<{ data?: { claimed: number } }>(
    '/orders/claim-guest',
    null
  );
  return data.data?.claimed ?? 0;
}
