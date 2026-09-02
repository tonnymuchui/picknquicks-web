import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { GuestOrderTracking } from '@/components/order/guest-order-tracking';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Track Order | PicknQuicks',
  description: 'Track your order status',
  robots: { index: false, follow: false, noarchive: true },
};

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <Link
            className="mb-4 inline-flex items-center gap-2 font-medium text-black/65 hover:text-black/65"
            href="/"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Track Your Order</h1>
          <p className="mt-1 text-gray-600">Enter your order details to check the status</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <GuestOrderTracking />
        </div>
      </div>
    </div>
  );
}
