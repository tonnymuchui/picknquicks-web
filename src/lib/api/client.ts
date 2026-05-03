import axios from 'axios';

import { tokenManager } from '../utils/token';

import type { ApiResponse } from '@/types/common';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const publicApiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const cartApiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const requestUrl = String(config.url ?? '');
    const requestHeaders = config.headers ?? {};
    const hasGuestTokenHeader = Boolean(
      requestHeaders['X-Guest-Token'] || requestHeaders['x-guest-token']
    );
    const isCartRequest = /(^|\/)cart(\/|$)/.test(requestUrl);
    const shouldUseGuestCartAuth = hasGuestTokenHeader || isCartRequest;

    const token = tokenManager.getAccessToken();
    if (token && !shouldUseGuestCartAuth) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (config.headers?.Authorization) {
      delete config.headers.Authorization;
    }

    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const requestUrl = String(originalRequest?.url ?? '');
    const requestHeaders = originalRequest?.headers ?? {};
    const hasGuestTokenHeader = Boolean(
      requestHeaders['X-Guest-Token'] || requestHeaders['x-guest-token']
    );
    const isCartRequest = /(^|\/)cart(\/|$)/.test(requestUrl);
    const isGuestCartRequest = hasGuestTokenHeader || isCartRequest;

    if (error.code === 'ECONNABORTED') {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && isGuestCartRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          tokenManager.clearTokens();
          if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/cart')) {
            window.location.href = '/auth/login';
          }
          return Promise.reject(error);
        }

        const { data } = await axios.post<
          ApiResponse<{ accessToken: string; refreshToken: string }>
        >(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/'}/auth/refresh-token`,
          null,
          { params: { refreshToken }, timeout: 5000 }
        );

        if (data.success && data.data) {
          tokenManager.setTokens(data.data.accessToken, data.data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        tokenManager.clearTokens();
        if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/cart')) {
          window.location.href = '/auth/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
