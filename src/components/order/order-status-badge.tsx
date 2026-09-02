import { Clock, CheckCircle, XCircle, Truck, Package, AlertCircle, RotateCcw } from 'lucide-react';

import type { OrderStatus } from '@/types/order';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const statusConfig: Record<
  OrderStatus,
  {
    label: string;
    color: string;
    bg: string;
    icon: React.ElementType;
  }
> = {
  AWAITING_PAYMENT: {
    label: 'Awaiting Payment',
    color: 'text-black/65',
    bg: 'bg-[#f1f1f1]',
    icon: Clock,
  },
  PAYMENT_CONFIRMED: {
    label: 'Payment Confirmed',
    color: 'text-black/65',
    bg: 'bg-[#f1f1f1]',
    icon: CheckCircle,
  },
  PAYMENT_FAILED: {
    label: 'Payment Failed',
    color: 'text-red-800',
    bg: 'bg-red-100',
    icon: XCircle,
  },
  PROCESSING: {
    label: 'Processing',
    color: 'text-black/65',
    bg: 'bg-[#f1f1f1]',
    icon: Package,
  },
  READY_TO_SHIP: {
    label: 'Ready to Ship',
    color: 'text-black/65',
    bg: 'bg-[#f1f1f1]',
    icon: Package,
  },
  SHIPPED: {
    label: 'Shipped',
    color: 'text-black/65',
    bg: 'bg-[#f1f1f1]',
    icon: Truck,
  },
  DELIVERED: {
    label: 'Delivered',
    color: 'text-black/65',
    bg: 'bg-[#f1f1f1]',
    icon: CheckCircle,
  },
  COMPLETED: {
    label: 'Completed',
    color: 'text-black/65',
    bg: 'bg-[#f1f1f1]',
    icon: CheckCircle,
  },
  CANCELLED: {
    label: 'Cancelled',
    color: 'text-red-800',
    bg: 'bg-red-100',
    icon: XCircle,
  },
  REFUND_PENDING: {
    label: 'Refund Pending',
    color: 'text-black/65',
    bg: 'bg-[#f1f1f1]',
    icon: AlertCircle,
  },
  REFUNDED: {
    label: 'Refunded',
    color: 'text-gray-800',
    bg: 'bg-gray-100',
    icon: RotateCcw,
  },
};

export function OrderStatusBadge({ status, className = '' }: OrderStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${config.bg} ${config.color} ${className}`}
    >
      <Icon size={14} />
      {config.label}
    </span>
  );
}
