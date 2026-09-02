'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Search, Loader2, PackageSearch } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { EmptyState } from '@/components/ui/empty-state';
import { FormInput } from '@/components/ui/form-input';
import { useTrackOrder } from '@/lib/order/order.queries';

import { OrderDetails } from './order-details';

const trackingSchema = z.object({
  orderNumber: z
    .string()
    .min(1, 'Order number is required')
    .regex(/^ORD-\d{8}-\d{4}$/, 'Format: ORD-XXXXXXXX-XXXX'),
  email: z.string().email('Valid email is required'),
});

type TrackingFormData = z.infer<typeof trackingSchema>;

export function GuestOrderTracking() {
  const [submitted, setSubmitted] = useState<TrackingFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TrackingFormData>({
    resolver: zodResolver(trackingSchema),
  });

  const {
    data: order,
    isLoading,
    error,
    isFetched,
  } = useTrackOrder(submitted?.orderNumber ?? '', submitted?.email ?? '');

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Track Your Order</h2>
        <p className="mb-6 text-gray-600">Enter the order number from your confirmation email.</p>

        <form className="space-y-4" onSubmit={handleSubmit((data) => setSubmitted(data))}>
          <FormInput
            required
            error={errors.orderNumber?.message}
            hint="Found in your order confirmation email"
            label="Order Number"
            placeholder="ORD-12345678-1234"
            {...register('orderNumber')}
          />
          <FormInput
            required
            error={errors.email?.message}
            hint="The email you used when placing the order"
            label="Email Address"
            placeholder="email@example.com"
            type="email"
            {...register('email')}
          />

          <button
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#9a5d3b] py-3 font-semibold text-white hover:bg-[#9a5d3b] disabled:opacity-50"
            disabled={isSubmitting || isLoading}
            type="submit"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Searching...
              </>
            ) : (
              <>
                <Search size={18} />
                Track Order
              </>
            )}
          </button>
        </form>
      </div>

      {submitted ? (
        <>
          {isLoading ? (
            <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
              <Loader2 className="mx-auto mb-3 animate-spin text-black/65" size={40} />
              <p className="text-gray-600">Looking up your order...</p>
            </div>
          ) : null}

          {isFetched && !isLoading && (error || !order) ? (
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <EmptyState
                description="We couldn't find an order matching those details. Please check your order number and email, then try again."
                icon={PackageSearch}
                title="Order Not Found"
              />
            </div>
          ) : null}

          {order ? <OrderDetails order={order} showActions={false} /> : null}
        </>
      ) : null}
    </div>
  );
}
