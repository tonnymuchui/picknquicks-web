import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';

import { fetchOrder, orderKeys } from '@/lib/order/order.queries';

import type { Order, PaymentStatus } from '@/types/order';

type PollStatus = 'polling' | 'success' | 'failed' | 'timeout';

interface UseOrderPaymentStatusResult {
  pollStatus: PollStatus;
  order: Order | null;
  secondsRemaining: number;
  retry: () => void;
}

const POLL_INTERVAL_MS = 3_000;
const TIMEOUT_SECONDS = 90;
const SUCCESS_STATUSES: PaymentStatus[] = ['COMPLETED'];
const FAILURE_STATUSES: PaymentStatus[] = ['FAILED', 'CANCELLED'];

export function useOrderPaymentStatus(orderId: string): UseOrderPaymentStatusResult {
  const queryClient = useQueryClient();
  const [order, setOrder] = useState<Order | null>(null);
  const [pollStatus, setPollStatus] = useState<PollStatus>('polling');
  const [secondsRemaining, setSecondsRemaining] = useState(TIMEOUT_SECONDS);
  const [runId, setRunId] = useState(0);
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = useCallback(() => {
    if (pollRef.current) {
      clearTimeout(pollRef.current);
      pollRef.current = null;
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  }, []);

  const checkStatus = useCallback(async (): Promise<boolean> => {
    if (!orderId) {
      return true;
    }

    try {
      const latestOrder = await fetchOrder(orderId);

      setOrder(latestOrder);
      queryClient.setQueryData(orderKeys.detail(orderId), latestOrder);

      if (SUCCESS_STATUSES.includes(latestOrder.paymentStatus)) {
        setPollStatus('success');
        return true;
      }

      if (FAILURE_STATUSES.includes(latestOrder.paymentStatus)) {
        setPollStatus('failed');
        return true;
      }
    } catch {}

    return false;
  }, [orderId, queryClient]);

  useEffect(() => {
    let cancelled = false;

    const poll = async () => {
      const terminal = await checkStatus();
      if (!cancelled && !terminal) {
        pollRef.current = setTimeout(poll, POLL_INTERVAL_MS);
      }
    };

    const startTimer = setTimeout(() => {
      setPollStatus('polling');
      setSecondsRemaining(TIMEOUT_SECONDS);
      void poll();
      countdownRef.current = setInterval(() => {
        setSecondsRemaining((current) => {
          if (current <= 1) {
            if (pollRef.current) {
              clearTimeout(pollRef.current);
              pollRef.current = null;
            }
            setPollStatus((status) => (status === 'polling' ? 'timeout' : status));
            return 0;
          }
          return current - 1;
        });
      }, 1_000);
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(startTimer);
      clearTimers();
    };
  }, [checkStatus, clearTimers, runId]);

  return {
    pollStatus,
    order,
    secondsRemaining,
    retry: () => setRunId((current) => current + 1),
  };
}
