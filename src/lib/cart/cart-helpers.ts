import { ensureGuestToken } from '@/lib/utils/guest-token';

function getCartRequestConfig(guestToken?: string | null) {
  return guestToken ? { headers: { 'X-Guest-Token': guestToken } } : {};
}

export function getCurrentCartRequestConfig() {
  return getCartRequestConfig(ensureGuestToken());
}
