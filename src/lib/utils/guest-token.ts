const GUEST_TOKEN_KEY = 'guest-cart-token';

export function getGuestToken(): string | null {
  if (typeof window === 'undefined') {return null;}
  return localStorage.getItem(GUEST_TOKEN_KEY);
}

export function setGuestToken(token: string): void {
  if (typeof window === 'undefined') {return;}
  localStorage.setItem(GUEST_TOKEN_KEY, token);
}

export function removeGuestToken(): void {
  if (typeof window === 'undefined') {return;}
  localStorage.removeItem(GUEST_TOKEN_KEY);
}

export function generateGuestToken(): string {
  const token = crypto.randomUUID();
  setGuestToken(token);
  return token;
}

export function ensureGuestToken(): string {
  let token = getGuestToken();
  if (!token) {
    token = generateGuestToken();
  }
  return token;
}