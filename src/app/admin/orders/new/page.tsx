'use client';

import { ArrowLeft, Loader2, Minus, PackagePlus, Plus, Search, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState, type FormEvent } from 'react';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { FormInput } from '@/components/ui/form-input';
import { useCreateManualOrder } from '@/lib/order/order.mutations';
import { useDeliveryDays, useShippingCost } from '@/lib/order/order.queries';
import { useActiveProducts } from '@/lib/product/products.queries';
import { formatPriceKsh } from '@/lib/utils/currency';
import { UserRole } from '@/types/auth';

import type { PaymentMethod } from '@/types/order';
import type { Product } from '@/types/product';

type SelectedItem = { product: Product; quantity: number };

const initialDetails = {
  customerName: '',
  email: '',
  phoneNumber: '',
  recipientName: '',
  recipientPhone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  county: '',
  postalCode: '',
  deliveryNotes: '',
  notes: '',
};

export default function NewAdminOrderPage() {
  return (
    <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
      <NewAdminOrderContent />
    </ProtectedRoute>
  );
}

function NewAdminOrderContent() {
  const router = useRouter();
  const products = useActiveProducts({ page: 0, size: 100 });
  const createOrder = useCreateManualOrder();
  const [details, setDetails] = useState(initialDetails);
  const [items, setItems] = useState<SelectedItem[]>([]);
  const [search, setSearch] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('MPESA_FULL');
  const [source, setSource] = useState<'PHONE' | 'IN_STORE'>('PHONE');
  const [sendPrompt, setSendPrompt] = useState(true);
  const shipping = useShippingCost(details.city.trim(), 0);
  const deliveryDays = useDeliveryDays(details.city.trim());
  const shippingCost = shipping.data;

  const availableProducts = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return (products.data?.content ?? []).filter(
      (product) =>
        !items.some((item) => item.product.id === product.id) &&
        (!needle ||
          product.name.toLowerCase().includes(needle) ||
          product.sku.toLowerCase().includes(needle))
    );
  }, [items, products.data?.content, search]);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.effectivePrice * item.quantity,
    0
  );
  const tax = items.reduce(
    (sum, item) => sum + item.product.effectivePrice * item.quantity * item.product.taxRate,
    0
  );
  const total = subtotal + tax + (shippingCost ?? 0);
  const advance = paymentMethod === 'MPESA_FULL' ? total : (shippingCost ?? 0);
  const deliveryBalance = paymentMethod === 'CASH_ON_DELIVERY' ? subtotal + tax : 0;

  const setField = (field: keyof typeof initialDetails, value: string) => {
    setDetails((current) => ({ ...current, [field]: value }));
  };
  const addItem = (product: Product) => {
    setItems((current) => [...current, { product, quantity: 1 }]);
    setSearch('');
  };
  const setQuantity = (productId: string, quantity: number) => {
    setItems((current) =>
      current.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, Math.min(quantity, item.product.stockQuantity, 20)) }
          : item
      )
    );
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!items.length || shippingCost === undefined) {
      return;
    }
    createOrder.mutate(
      {
        customerName: details.customerName,
        email: details.email,
        phoneNumber: details.phoneNumber,
        paymentMethod,
        source,
        sendPaymentPrompt: sendPrompt && advance > 0,
        shippingAddress: {
          recipientName: details.recipientName,
          phoneNumber: details.recipientPhone,
          addressLine1: details.addressLine1,
          addressLine2: details.addressLine2 || undefined,
          city: details.city,
          county: details.county || undefined,
          postalCode: details.postalCode || undefined,
          notes: details.deliveryNotes || undefined,
        },
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        notes: details.notes || undefined,
      },
      { onSuccess: (order) => router.push(`/admin/orders/${order.id}`) }
    );
  };

  return (
    <form className="min-h-screen bg-[#f7f5f2] p-4 sm:p-7 xl:p-9" onSubmit={submit}>
      <header className="border-b border-black/10 pb-7">
        <Link
          className="mb-3 inline-flex items-center gap-2 text-sm text-black/55 hover:text-black"
          href="/admin/orders"
        >
          <ArrowLeft size={16} /> Back to orders
        </Link>
        <p className="text-xs font-bold uppercase tracking-[.18em] text-[#9a5d3b]">Sales desk</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">
          Create customer order
        </h1>
        <p className="mt-2 text-sm text-black/50">
          For phone, WhatsApp, and in-store requests that still require normal stock, payment, and
          accounting records.
        </p>
      </header>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(340px,.65fr)]">
        <div className="space-y-6">
          <Section title="Customer and order source">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormInput
                required
                label="Customer name"
                value={details.customerName}
                onChange={(event) => setField('customerName', event.target.value)}
              />
              <FormInput
                required
                label="Customer email"
                type="email"
                value={details.email}
                onChange={(event) => setField('email', event.target.value)}
              />
              <FormInput
                required
                label="Payment phone"
                placeholder="+254712345678"
                type="tel"
                value={details.phoneNumber}
                onChange={(event) => setField('phoneNumber', event.target.value)}
              />
              <div>
                <label className="mb-1.5 block text-xs font-semibold" htmlFor="order-source">
                  Order source
                </label>
                <select
                  className="border-line min-h-12 w-full border bg-white px-4 text-sm"
                  id="order-source"
                  value={source}
                  onChange={(event) => setSource(event.target.value as typeof source)}
                >
                  <option value="PHONE">Phone or WhatsApp</option>
                  <option value="IN_STORE">In-store request</option>
                </select>
              </div>
            </div>
          </Section>

          <Section title="Products">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-black/35"
                size={17}
              />
              <input
                className="border-line min-h-12 w-full border pl-10 pr-4 text-sm outline-none focus:border-black"
                placeholder="Search product name or SKU"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            {search.trim() ? (
              <div className="mt-2 max-h-60 overflow-y-auto border border-black/10 bg-white">
                {availableProducts.slice(0, 10).map((product) => (
                  <button
                    key={product.id}
                    className="flex w-full items-center justify-between border-b border-black/[.06] px-4 py-3 text-left hover:bg-[#f7f5f2] disabled:opacity-40"
                    disabled={!product.inStock}
                    type="button"
                    onClick={() => addItem(product)}
                  >
                    <span>
                      <span className="block text-sm font-semibold">{product.name}</span>
                      <span className="font-mono text-[10px] text-black/40">
                        {product.sku} · {product.stockQuantity} available
                      </span>
                    </span>
                    <span className="text-sm font-semibold">
                      {formatPriceKsh(product.effectivePrice)}
                    </span>
                  </button>
                ))}
                {!availableProducts.length ? (
                  <p className="p-4 text-sm text-black/45">No available product matches.</p>
                ) : null}
              </div>
            ) : null}

            <div className="mt-4 space-y-2">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex flex-wrap items-center gap-3 border border-black/10 bg-white p-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{item.product.name}</p>
                    <p className="font-mono text-[10px] text-black/40">{item.product.sku}</p>
                  </div>
                  <div className="flex items-center border border-black/10">
                    <button
                      aria-label="Reduce quantity"
                      className="p-2"
                      type="button"
                      onClick={() => setQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      aria-label="Increase quantity"
                      className="p-2"
                      type="button"
                      onClick={() => setQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="w-28 text-right text-sm font-semibold">
                    {formatPriceKsh(item.product.effectivePrice * item.quantity)}
                  </p>
                  <button
                    aria-label={`Remove ${item.product.name}`}
                    className="p-2 text-red-600"
                    type="button"
                    onClick={() =>
                      setItems((current) =>
                        current.filter((entry) => entry.product.id !== item.product.id)
                      )
                    }
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {!items.length ? (
                <div className="border border-dashed border-black/15 p-8 text-center text-sm text-black/45">
                  <PackagePlus className="mx-auto mb-2" size={24} /> Search and add at least one
                  product.
                </div>
              ) : null}
            </div>
          </Section>

          <Section title="Delivery address">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormInput
                required
                label="Recipient name"
                value={details.recipientName}
                onChange={(event) => setField('recipientName', event.target.value)}
              />
              <FormInput
                required
                label="Recipient phone"
                type="tel"
                value={details.recipientPhone}
                onChange={(event) => setField('recipientPhone', event.target.value)}
              />
              <div className="sm:col-span-2">
                <FormInput
                  required
                  label="Street, building, or estate"
                  value={details.addressLine1}
                  onChange={(event) => setField('addressLine1', event.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <FormInput
                  label="Apartment, floor, or landmark"
                  value={details.addressLine2}
                  onChange={(event) => setField('addressLine2', event.target.value)}
                />
              </div>
              <FormInput
                required
                label="City or town"
                value={details.city}
                onChange={(event) => setField('city', event.target.value)}
              />
              <FormInput
                label="County"
                value={details.county}
                onChange={(event) => setField('county', event.target.value)}
              />
              <FormInput
                label="Postal code"
                value={details.postalCode}
                onChange={(event) => setField('postalCode', event.target.value)}
              />
            </div>
            {details.city.trim().length >= 2 ? (
              <div className="mt-4 rounded-xl bg-[#f2eee7] p-4 text-sm">
                {shipping.isPending
                  ? 'Calculating delivery…'
                  : shipping.isError
                    ? 'Delivery pricing is unavailable for this location.'
                    : `${shippingCost === 0 ? 'Free delivery' : formatPriceKsh(shippingCost ?? 0)} · approximately ${deliveryDays.data ?? '—'} day${deliveryDays.data === 1 ? '' : 's'}`}
              </div>
            ) : null}
          </Section>

          <Section title="Internal notes">
            <textarea
              className="border-line min-h-28 w-full border p-4 text-sm outline-none focus:border-black"
              placeholder="Customer request, delivery instructions, or sales notes"
              value={details.notes}
              onChange={(event) => setField('notes', event.target.value)}
            />
          </Section>
        </div>

        <aside className="h-fit rounded-2xl border border-black/[.08] bg-white p-5 xl:sticky xl:top-24">
          <h2 className="text-lg font-semibold">Payment arrangement</h2>
          <div className="mt-4 space-y-2">
            <PaymentOption
              checked={paymentMethod === 'MPESA_FULL'}
              description="Customer pays products and delivery now."
              label="Pay full amount upfront"
              onChange={() => setPaymentMethod('MPESA_FULL')}
            />
            <PaymentOption
              checked={paymentMethod === 'CASH_ON_DELIVERY'}
              description="Customer pays delivery now and the product balance after delivery."
              label="Delivery fee first"
              onChange={() => setPaymentMethod('CASH_ON_DELIVERY')}
            />
          </div>
          <label className="mt-4 flex items-start gap-3 border border-black/10 p-3.5">
            <input
              checked={sendPrompt}
              className="mt-0.5 accent-[#9a5d3b]"
              type="checkbox"
              onChange={(event) => setSendPrompt(event.target.checked)}
            />
            <span>
              <span className="block text-sm font-semibold">Send M-Pesa prompt now</span>
              <span className="block text-[11px] text-black/45">
                Uses the customer payment phone after the order is saved.
              </span>
            </span>
          </label>

          <dl className="mt-5 space-y-2 border-t border-black/10 pt-5 text-sm">
            <Row label="Products" value={formatPriceKsh(subtotal)} />
            {tax > 0 ? <Row label="Tax" value={formatPriceKsh(tax)} /> : null}
            <Row
              label="Delivery"
              value={shippingCost === undefined ? '—' : formatPriceKsh(shippingCost)}
            />
            <div className="flex justify-between border-t border-black/10 pt-3 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatPriceKsh(total)}</dd>
            </div>
            <Row label="Due now" value={formatPriceKsh(advance)} />
            {deliveryBalance > 0 ? (
              <Row label="Due on delivery" value={formatPriceKsh(deliveryBalance)} />
            ) : null}
          </dl>

          <button
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[#9a5d3b] px-5 text-sm font-semibold text-white disabled:opacity-40"
            disabled={createOrder.isPending || !items.length || shippingCost === undefined}
            type="submit"
          >
            {createOrder.isPending ? <Loader2 className="animate-spin" size={17} /> : null}
            Create order
          </button>
          <p className="mt-3 text-center text-[10px] leading-4 text-black/40">
            Creating the order reserves stock and posts the sale to the ledger. Stock is committed
            after the required advance payment succeeds.
          </p>
        </aside>
      </div>
    </form>
  );
}

function Section({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section className="rounded-2xl border border-black/[.08] bg-white p-5 sm:p-6">
      <h2 className="mb-5 text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}
function PaymentOption({
  checked,
  description,
  label,
  onChange,
}: {
  checked: boolean;
  description: string;
  label: string;
  onChange: () => void;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 border p-3.5 ${checked ? 'border-[#9a5d3b] bg-[#f2eee7]' : 'border-black/10'}`}
    >
      <input
        checked={checked}
        className="mt-0.5 accent-[#9a5d3b]"
        name="payment-method"
        type="radio"
        onChange={onChange}
      />
      <span>
        <span className="block text-sm font-semibold">{label}</span>
        <span className="block text-[11px] leading-5 text-black/45">{description}</span>
      </span>
    </label>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-black/50">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
