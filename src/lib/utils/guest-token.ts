const GUEST_TOKEN_KEY = 'picknquicks_guest_token';

export function getGuestToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem(GUEST_TOKEN_KEY);
}

function setGuestToken(token: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem(GUEST_TOKEN_KEY, token);
}

export function removeGuestToken(): void {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.removeItem(GUEST_TOKEN_KEY);
}

export function ensureGuestToken(): string {
  const existing = getGuestToken();
  if (existing) {
    return existing;
  }

  const newToken = crypto.randomUUID();
  setGuestToken(newToken);
  return newToken;
}
