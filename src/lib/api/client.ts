import axios from 'axios';

import { tokenManager } from '../utils/token';

import type { ApiResponse } from '@/types/common';


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = tokenManager.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          tokenManager.clearTokens();
          window.location.href = '/auth/login';
          return Promise.reject(error);
        }

        const { data } = await axios.post<ApiResponse<{ accessToken: string; refreshToken: string }>>(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/auth/refresh-token`,
          null,
          { params: { refreshToken } }
        );

        if (data.success && data.data) {
          tokenManager.setTokens(data.data.accessToken, data.data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        tokenManager.clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);