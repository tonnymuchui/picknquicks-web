import { CheckCircle, ShoppingCart, Truck, XCircle } from 'lucide-react';

import { StatCard } from '@/components/analytics/stat-card';

import type { Order } from '@/types/order';

export function AdminOrderStats({ orders }: { orders: Order[] }) {
  const confirmed = orders.filter((order) => order.status === 'PAYMENT_CONFIRMED').length;
  const shipped = orders.filter((order) => order.status === 'SHIPPED').length;
  const cancelled = orders.filter((order) => order.status === 'CANCELLED').length;

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard icon={ShoppingCart} title="On this page" value={orders.length} />
      <StatCard icon={CheckCircle} title="Confirmed" value={confirmed} />
      <StatCard icon={Truck} title="Shipped" value={shipped} />
      <StatCard critical icon={XCircle} title="Cancelled" value={cancelled} />
    </div>
  );
}
