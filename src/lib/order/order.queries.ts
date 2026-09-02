import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api/client';
import { getGuestOrderAccess } from '@/lib/order/guest-order-access';

import type { ApiResponse, PaginatedResponse } from '@/types/common';
import type { Order, OrderFilters } from '@/types/order';

export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: (filters: OrderFilters) => [...orderKeys.lists(), filters] as const,
  details: () => [...orderKeys.all, 'detail'] as const,
  detail: (orderId: string) => [...orderKeys.details(), orderId] as const,
  mine: (page: number, size: number) => [...orderKeys.all, 'mine', page, size] as const,
  track: (orderNumber: string, email: string) =>
    [...orderKeys.all, 'track', orderNumber, email] as const,
  shipping: {
    cost: (city: string, orderAmount: number) => ['shipping', 'cost', city, orderAmount] as const,
    deliveryDays: (city: string) => ['shipping', 'delivery-days', city] as const,
  },
} as const;

function requireData<T>(response: ApiResponse<T>, fallbackMessage: string): T {
  if (response.data == null) {
    throw new Error(response.message || fallbackMessage);
  }

  return response.data;
}

export async function fetchOrder(orderId: string): Promise<Order> {
  const access = getGuestOrderAccess(orderId);
  const { data } = await apiClient.get<ApiResponse<Order>>(`/orders/${orderId}`, {
    headers: access?.guestToken ? { 'X-Guest-Order-Token': access.guestToken } : undefined,
  });
  return requireData(data, 'Order was not returned');
}

export function useOrder(orderId: string) {
  return useQuery({
    queryKey: orderKeys.detail(orderId),
    queryFn: () => fetchOrder(orderId),
    enabled: Boolean(orderId),
    staleTime: 5_000,
    gcTime: 60_000,
    retry: 2,
    retryDelay: (attempt) => Math.min(1_000 * 2 ** attempt, 5_000),
  });
}

export function useTrackOrder(orderNumber: string, email: string) {
  return useQuery({
    queryKey: orderKeys.track(orderNumber, email),
    queryFn: async (): Promise<Order> => {
      const { data } = await apiClient.get<ApiResponse<Order>>('/orders/track', {
        params: { orderNumber, email },
      });
      return requireData(data, 'Order was not returned');
    },
    enabled:
      Boolean(orderNumber) &&
      Boolean(email) &&
      orderNumber.startsWith('ORD-') &&
      email.includes('@'),
    staleTime: 60_000,
    retry: false,
  });
}

export function useMyOrders(page = 0, size = 10) {
  return useQuery({
    queryKey: orderKeys.mine(page, size),
    queryFn: async (): Promise<PaginatedResponse<Order>> => {
      const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Order>>>(
        '/orders/my-orders',
        { params: { page, size } }
      );
      return requireData(data, 'Orders were not returned');
    },
    staleTime: 60_000,
    placeholderData: (previousData) => previousData,
  });
}

export function useAdminOrders(filters: OrderFilters = {}) {
  const requestFilters = { page: filters.page, size: filters.size };

  return useQuery({
    queryKey: orderKeys.list(requestFilters),
    queryFn: async (): Promise<PaginatedResponse<Order>> => {
      const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Order>>>('/orders', {
        params: requestFilters,
      });
      return requireData(data, 'Orders were not returned');
    },
    staleTime: 30_000,
    placeholderData: (previousData) => previousData,
  });
}

export function useShippingCost(city: string, orderAmount: number) {
  return useQuery({
    queryKey: orderKeys.shipping.cost(city, orderAmount),
    queryFn: async (): Promise<number> => {
      const { data } = await apiClient.get<ApiResponse<number>>('/shipping/cost', {
        params: { city, orderAmount },
      });
      return requireData(data, 'Shipping cost was not returned');
    },
    enabled: city.trim().length >= 2 && orderAmount >= 0,
    staleTime: 5 * 60_000,
    retry: 1,
  });
}

export function useDeliveryDays(city: string) {
  return useQuery({
    queryKey: orderKeys.shipping.deliveryDays(city),
    queryFn: async (): Promise<number> => {
      const { data } = await apiClient.get<ApiResponse<number>>('/shipping/delivery-days', {
        params: { city },
      });
      return requireData(data, 'Delivery estimate was not returned');
    },
    enabled: city.trim().length >= 2,
    staleTime: 5 * 60_000,
    retry: 1,
  });
}
