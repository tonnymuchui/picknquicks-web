import { OrderConfirmation } from '@/components/order/order-confirmation';

import type { Metadata } from 'next';

interface ConfirmationPageProps {
  params: Promise<{ orderId: string }>;
}

export const metadata: Metadata = {
  title: 'Order status | PickNQuicks',
  description: 'Review your PickNQuicks order status and payment confirmation.',
};

export default async function ConfirmationPage({ params }: ConfirmationPageProps) {
  const { orderId } = await params;
  return <OrderConfirmation orderId={orderId} />;
}
