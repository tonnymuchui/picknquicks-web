'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Banknote, Loader2, MapPin, ShieldCheck, Smartphone, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';

import { FormInput } from '@/components/ui/form-input';
import { useCart } from '@/lib/cart/cart.queries';
import { useDebouncedValue } from '@/lib/hooks/use-debounced-value';
import { useCreateOrder } from '@/lib/order/order.mutations';
import { useDeliveryDays, useShippingCost } from '@/lib/order/order.queries';
import { type CheckoutFormData, checkoutSchema } from '@/lib/schemas/checkoutSchema';
import { formatPriceKsh } from '@/lib/utils/currency';

import type { CreateOrderInput } from '@/types/order';
import type { ReactNode } from 'react';

function CheckoutSection({
  children,
  description,
  icon,
  title,
}: {
  children: ReactNode;
  description?: string;
  icon?: ReactNode;
  title: string;
}) {
  return (
    <section className="border-line border bg-white">
      <header className="border-line border-b px-5 py-4 sm:px-6">
        <h2 className="flex items-center gap-2 text-base font-semibold">
          {icon}
          {title}
        </h2>
        {description ? <p className="mt-1 text-xs text-black/50">{description}</p> : null}
      </header>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

export function CheckoutForm() {
  const router = useRouter();
  const { data: cart } = useCart();
  const createOrder = useCreateOrder();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: 'MPESA_FULL' },
  });

  const city = useWatch({ control, name: 'city' }) ?? '';
  const paymentMethod = useWatch({ control, name: 'paymentMethod' });
  const settledCity = useDebouncedValue(city.trim(), 400);
  const cartSubtotal = cart?.subtotal ?? 0;
  const cartTotal = cart?.total ?? 0;
  const shipping = useShippingCost(settledCity, cartSubtotal);
  const delivery = useDeliveryDays(settledCity);
  const shippingCost = shipping.data;
  const hasShippingEstimate = shippingCost !== undefined && settledCity.length >= 2;
  const grandTotal = cartTotal + (shippingCost ?? 0);
  const mpesaCharge = paymentMethod === 'MPESA_FULL' ? grandTotal : (shippingCost ?? 0);
  const cashOnDeliveryAmount = paymentMethod === 'CASH_ON_DELIVERY' ? cartTotal : 0;

  const submitOrder = async (data: CheckoutFormData) => {
    if (!cart?.items.length || shippingCost === undefined) {
      return;
    }

    const input: CreateOrderInput = {
      customerName: data.customerName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      paymentMethod: data.paymentMethod,
      notes: data.notes,
      shippingAddress: {
        recipientName: data.recipientName,
        phoneNumber: data.recipientPhone,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city.trim(),
        county: data.county,
        postalCode: data.postalCode,
        notes: data.deliveryNotes,
      },
    };

    try {
      const order = await createOrder.mutateAsync(input);
      router.push(`/orders/${order.id}/payment`);
    } catch {}
  };

  const submitLabel = (() => {
    if (settledCity.length < 2) {
      return 'Enter your delivery city';
    }
    if (shipping.isPending) {
      return 'Calculating delivery';
    }
    if (!hasShippingEstimate) {
      return 'Delivery estimate unavailable';
    }
    if (paymentMethod === 'CASH_ON_DELIVERY' && mpesaCharge === 0) {
      return `Place order · ${formatPriceKsh(cashOnDeliveryAmount)} on delivery`;
    }
    if (paymentMethod === 'CASH_ON_DELIVERY') {
      return `Place order · pay ${formatPriceKsh(mpesaCharge)} now`;
    }
    return `Pay ${formatPriceKsh(mpesaCharge)} with M-Pesa`;
  })();

  return (
    <form className="space-y-6" onSubmit={handleSubmit(submitOrder)}>
      <CheckoutSection
        description="No account is required. Use your real email for receipts and updates; if you create an account later with the same verified email, these orders will appear in My Orders."
        title="Contact information"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FormInput
              required
              error={errors.customerName?.message}
              label="Full name"
              placeholder="Your full name"
              {...register('customerName')}
            />
          </div>
          <FormInput
            required
            error={errors.email?.message}
            label="Email address"
            placeholder="you@example.com"
            type="email"
            {...register('email')}
          />
          <FormInput
            required
            error={errors.phoneNumber?.message}
            hint="Use the number that should receive the STK prompt."
            label="M-Pesa phone"
            placeholder="+254712345678"
            type="tel"
            {...register('phoneNumber')}
          />
        </div>
      </CheckoutSection>

      <CheckoutSection
        icon={<Truck aria-hidden="true" size={18} strokeWidth={1.5} />}
        title="Delivery address"
      >
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormInput
              required
              error={errors.recipientName?.message}
              label="Recipient name"
              placeholder="Name on delivery"
              {...register('recipientName')}
            />
            <FormInput
              required
              error={errors.recipientPhone?.message}
              label="Recipient phone"
              placeholder="+254712345678"
              type="tel"
              {...register('recipientPhone')}
            />
          </div>
          <FormInput
            required
            error={errors.addressLine1?.message}
            label="Address line 1"
            placeholder="Street, building, or estate"
            {...register('addressLine1')}
          />
          <FormInput
            label="Address line 2"
            placeholder="Apartment, floor, or landmark"
            {...register('addressLine2')}
          />

          <div>
            <label className="mb-1.5 block text-xs font-semibold" htmlFor="checkout-city">
              City
            </label>
            <div className="relative">
              <MapPin
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/45"
                size={17}
              />
              <input
                {...register('city')}
                aria-describedby={errors.city ? 'checkout-city-error' : undefined}
                aria-invalid={Boolean(errors.city)}
                className="border-line min-h-12 w-full border bg-white pl-10 pr-4 text-sm outline-none focus:border-black"
                id="checkout-city"
                placeholder="Nairobi"
              />
            </div>
            {errors.city ? (
              <p className="mt-1.5 text-xs text-red-700" id="checkout-city-error" role="alert">
                {errors.city.message}
              </p>
            ) : null}
          </div>

          {settledCity.length >= 2 ? (
            shipping.isPending ? (
              <div className="border-line flex items-center gap-3 border p-4 text-sm text-black/60">
                <Loader2 aria-hidden="true" className="animate-spin" size={17} />
                Calculating delivery to {settledCity}…
              </div>
            ) : shipping.isError ? (
              <div className="border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-800">The delivery estimate could not be loaded.</p>
                <button
                  className="mt-2 min-h-10 text-xs font-semibold underline underline-offset-4"
                  disabled={shipping.isFetching}
                  type="button"
                  onClick={() => shipping.refetch()}
                >
                  Try again
                </button>
              </div>
            ) : hasShippingEstimate ? (
              <div className="border-line flex items-start justify-between gap-5 border bg-[#f7f1e9] p-4">
                <div>
                  <p className="text-sm font-semibold">Delivery to {settledCity}</p>
                  <p className="mt-1 text-xs text-black/55">
                    {delivery.data
                      ? `Estimated in ${delivery.data} ${delivery.data === 1 ? 'day' : 'days'}`
                      : 'The delivery date will be confirmed with your order.'}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-semibold">
                  {shippingCost === 0 ? 'Free' : formatPriceKsh(shippingCost)}
                </p>
              </div>
            ) : null
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <FormInput label="County" placeholder="Optional" {...register('county')} />
            <FormInput label="Postal code" placeholder="Optional" {...register('postalCode')} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold" htmlFor="delivery-notes">
              Delivery notes
            </label>
            <textarea
              {...register('deliveryNotes')}
              className="border-line min-h-24 w-full resize-y border px-4 py-3 text-sm outline-none focus:border-black"
              id="delivery-notes"
              placeholder="Access details or a useful landmark"
            />
          </div>
        </div>
      </CheckoutSection>

      <CheckoutSection
        icon={<ShieldCheck aria-hidden="true" size={18} strokeWidth={1.5} />}
        title="Payment method"
      >
        <div className="space-y-3">
          <label
            className={`block cursor-pointer border p-4 sm:p-5 ${paymentMethod === 'MPESA_FULL' ? 'border-black bg-[#f2eee7]' : 'border-[#d7d0c6]'}`}
          >
            <span className="flex items-start gap-3">
              <input
                {...register('paymentMethod')}
                className="mt-1 accent-black"
                type="radio"
                value="MPESA_FULL"
              />
              <Smartphone aria-hidden="true" className="shrink-0" size={20} strokeWidth={1.5} />
              <span>
                <strong className="block text-sm">Pay in full with M-Pesa</strong>
                <span className="mt-1 block text-xs leading-5 text-black/55">
                  Approve the complete order total from your phone.
                </span>
              </span>
            </span>
          </label>
          <label
            className={`block cursor-pointer border p-4 sm:p-5 ${paymentMethod === 'CASH_ON_DELIVERY' ? 'border-black bg-[#f2eee7]' : 'border-[#d7d0c6]'}`}
          >
            <span className="flex items-start gap-3">
              <input
                {...register('paymentMethod')}
                className="mt-1 accent-black"
                type="radio"
                value="CASH_ON_DELIVERY"
              />
              <Banknote aria-hidden="true" className="shrink-0" size={20} strokeWidth={1.5} />
              <span>
                <strong className="block text-sm">Cash on delivery</strong>
                <span className="mt-1 block text-xs leading-5 text-black/55">
                  Pay delivery by M-Pesa, then pay for the products when they arrive.
                </span>
              </span>
            </span>
          </label>
        </div>
      </CheckoutSection>

      {hasShippingEstimate ? (
        <section aria-label="Order total" className="bg-ink p-5 text-white sm:p-6">
          <div className="space-y-2 text-sm text-white/70">
            <div className="flex justify-between gap-4">
              <span>Products</span>
              <span className="text-white">{formatPriceKsh(cartTotal)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Delivery · {settledCity}</span>
              <span className="text-white">
                {shippingCost === 0 ? 'Free' : formatPriceKsh(shippingCost ?? 0)}
              </span>
            </div>
            <div className="mt-4 flex justify-between gap-4 border-t border-white/25 pt-4 text-lg font-semibold text-white">
              <span>Total</span>
              <span>{formatPriceKsh(grandTotal)}</span>
            </div>
          </div>
          {paymentMethod === 'CASH_ON_DELIVERY' ? (
            <p className="mt-4 text-xs leading-5 text-white/65">
              {mpesaCharge > 0
                ? `${formatPriceKsh(mpesaCharge)} is due now and ${formatPriceKsh(cashOnDeliveryAmount)} is due on delivery.`
                : `${formatPriceKsh(cashOnDeliveryAmount)} is due on delivery. No advance payment is required.`}
            </p>
          ) : null}
        </section>
      ) : null}

      <button
        className="bg-ink flex min-h-14 w-full items-center justify-center gap-3 px-5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
        disabled={
          isSubmitting ||
          createOrder.isPending ||
          !hasShippingEstimate ||
          !cart?.items.length ||
          city.trim() !== settledCity
        }
        type="submit"
      >
        {isSubmitting || createOrder.isPending ? (
          <>
            <Loader2 aria-hidden="true" className="animate-spin" size={19} />
            Placing order…
          </>
        ) : (
          submitLabel
        )}
      </button>
      <p className="text-center text-[11px] leading-5 text-black/50">
        Stock, pricing, tax, and delivery are validated again before your order is created.
      </p>
    </form>
  );
}
