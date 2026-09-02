import type { Order } from '@/types/order';

interface GuestOrderAccess {
  email: string;
  orderNumber: string;
  guestToken?: string;
}

const KEY_PREFIX = 'picknquicks_guest_order_';

export function saveGuestOrderAccess(order: Order): void {
  if (typeof window === 'undefined' || !order.isGuest) {
    return;
  }

  const access: GuestOrderAccess = {
    email: order.email,
    orderNumber: order.orderNumber,
    guestToken: order.guestAccessToken,
  };
  sessionStorage.setItem(`${KEY_PREFIX}${order.id}`, JSON.stringify(access));
}

export function getGuestOrderAccess(orderId: string): GuestOrderAccess | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const value = sessionStorage.getItem(`${KEY_PREFIX}${orderId}`);
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as Partial<GuestOrderAccess>;
    if (typeof parsed.email === 'string' && typeof parsed.orderNumber === 'string') {
      return {
        email: parsed.email,
        orderNumber: parsed.orderNumber,
        guestToken: parsed.guestToken,
      };
    }
  } catch {
    sessionStorage.removeItem(`${KEY_PREFIX}${orderId}`);
  }

  return null;
}
