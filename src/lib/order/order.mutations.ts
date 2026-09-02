import { useMutation, useQueryClient, type QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { apiClient } from '@/lib/api/client';
import { getApiErrorMessage } from '@/lib/api/errors';
import { getCurrentCartRequestConfig } from '@/lib/cart/cart-helpers';
import { cartKeys } from '@/lib/cart/cart.queries';
import { getGuestOrderAccess, saveGuestOrderAccess } from '@/lib/order/guest-order-access';

import { orderKeys } from './order.queries';

import type { ApiResponse } from '@/types/common';
import type { CreateManualOrderInput, CreateOrderInput, Order, OrderStatus } from '@/types/order';

function requireOrder(response: ApiResponse<Order>, fallback: string): Order {
  if (!response.data) {
    throw new Error(response.message || fallback);
  }
  return response.data;
}

function syncOrder(queryClient: QueryClient, order: Order) {
  queryClient.setQueryData(orderKeys.detail(order.id), order);
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateOrderInput): Promise<Order> => {
      const { data } = await apiClient.post<ApiResponse<Order>>('/orders', input, {
        ...getCurrentCartRequestConfig(),
        headers: {
          ...getCurrentCartRequestConfig().headers,
          'Idempotency-Key': crypto.randomUUID(),
        },
      });
      return requireOrder(data, 'Created order was not returned');
    },
    onSuccess: (order) => {
      saveGuestOrderAccess(order);
      syncOrder(queryClient, order);
      queryClient.removeQueries({ queryKey: cartKeys.details() });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      if (order.amountDueNow > 0) {
        toast.message(`Order ${order.orderNumber} created. Complete payment to confirm it.`);
      } else {
        toast.success(`Order ${order.orderNumber} placed successfully`);
      }
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, 'Failed to place order. Please try again.'));
    },
  });
}

export function useCreateManualOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateManualOrderInput): Promise<Order> => {
      const { sendPaymentPrompt, ...orderInput } = input;
      const { data } = await apiClient.post<ApiResponse<Order>>('/admin/orders', orderInput, {
        headers: { 'Idempotency-Key': crypto.randomUUID() },
      });
      const order = requireOrder(data, 'Created order was not returned');

      if (sendPaymentPrompt && order.payment && order.payment.amount > 0) {
        try {
          await apiClient.post('/payments/mpesa/initiate', {
            paymentId: order.payment.id,
            phoneNumber: order.phoneNumber,
          });
          toast.success(`Order ${order.orderNumber} created and M-Pesa prompt sent`);
        } catch (error) {
          toast.warning(
            `${order.orderNumber} was created, but the payment prompt was not sent: ${getApiErrorMessage(error, 'M-Pesa unavailable')}`
          );
        }
      } else {
        toast.success(`Order ${order.orderNumber} created`);
      }
      return order;
    },
    onSuccess: (order) => {
      syncOrder(queryClient, order);
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, 'Unable to create the order'));
    },
  });
}

export function useEmailInvoice() {
  return useMutation({
    mutationFn: async ({ orderId, email }: { orderId: string; email: string }) => {
      await apiClient.post(
        `/admin/orders/${orderId}/email-invoice`,
        {},
        { headers: { 'Idempotency-Key': crypto.randomUUID() } }
      );
      return email;
    },
    onSuccess: (email) => toast.success(`Invoice queued for ${email}`),
    onError: (error: unknown) =>
      toast.error(getApiErrorMessage(error, 'Unable to email the invoice')),
  });
}

export function useInitiateAdminPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      orderId,
      paymentId,
      phoneNumber,
    }: {
      orderId: string;
      paymentId: string;
      phoneNumber: string;
    }) => {
      await apiClient.post('/payments/mpesa/initiate', { paymentId, phoneNumber });
      return orderId;
    },
    onSuccess: (orderId) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(orderId) });
      toast.success('M-Pesa prompt sent to the customer');
    },
    onError: (error: unknown) =>
      toast.error(getApiErrorMessage(error, 'Unable to send the M-Pesa prompt')),
  });
}

export function useRecordDeliveryPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      amount,
      channel,
      orderId,
      paymentId,
      reference,
    }: {
      amount: number;
      channel: 'CASH' | 'MPESA';
      orderId: string;
      paymentId: string;
      reference?: string;
    }) => {
      await apiClient.post(
        '/admin/payments/collect',
        { amount, channel, paymentId, reference },
        { headers: { 'Idempotency-Key': `delivery:${paymentId}:${crypto.randomUUID()}` } }
      );
      return orderId;
    },
    onSuccess: (orderId) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(orderId) });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      toast.success('Delivery balance recorded and order completed');
    },
    onError: (error: unknown) =>
      toast.error(getApiErrorMessage(error, 'Unable to record the delivery payment')),
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orderId,
      reason = 'Cancelled by customer',
    }: {
      orderId: string;
      reason?: string;
    }): Promise<Order> => {
      const { data } = await apiClient.delete<ApiResponse<Order>>(`/orders/${orderId}`, {
        params: { reason },
        headers: getGuestOrderAccess(orderId)?.guestToken
          ? { 'X-Guest-Order-Token': getGuestOrderAccess(orderId)?.guestToken }
          : undefined,
      });
      return requireOrder(data, 'Cancelled order was not returned');
    },
    onSuccess: (order) => {
      syncOrder(queryClient, order);
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      toast.success(`Order ${order.orderNumber} cancelled`);
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, 'Failed to cancel order.'));
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orderId,
      status,
      trackingNumber,
    }: {
      orderId: string;
      status: OrderStatus;
      trackingNumber?: string;
    }): Promise<Order> => {
      const { data } = await apiClient.put<ApiResponse<Order>>(`/orders/${orderId}/status`, null, {
        params: { status, ...(trackingNumber ? { trackingNumber } : {}) },
      });
      return requireOrder(data, 'Updated order was not returned');
    },
    onSuccess: (order) => {
      syncOrder(queryClient, order);
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      toast.success(`Status updated to ${order.status.replaceAll('_', ' ')}`);
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, 'Failed to update order status.'));
    },
  });
}
