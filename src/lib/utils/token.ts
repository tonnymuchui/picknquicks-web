const TOKEN_key = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const tokenManager = {
  setTokens: (accessToken: string, refreshToken: string) => {
    if (typeof window === 'undefined') return null;
    localStorage.setItem(TOKEN_key, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },
  getAccessToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_key);
  },

  getRefreshToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  clearTokens: () => {
    if (typeof window === 'undefined') return null;
    localStorage.removeItem(TOKEN_key);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
  hasToken: (): boolean => {
    return !!tokenManager.getAccessToken();
  },
};
