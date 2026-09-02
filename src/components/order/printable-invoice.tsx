'use client';

import { Loader2, Mail, Printer } from 'lucide-react';

import { BrandLogo } from '@/components/common/brand-logo';
import { useEmailInvoice } from '@/lib/order/order.mutations';
import { formatPriceKsh } from '@/lib/utils/currency';

import type { Order } from '@/types/order';

export function PrintInvoiceButton({ orderNumber }: { orderNumber: string }) {
  const printInvoice = () => {
    const previousTitle = document.title;
    document.title = `Invoice-${orderNumber}`;
    window.print();
    document.title = previousTitle;
  };

  return (
    <button
      className="inline-flex min-h-11 items-center gap-2 rounded-lg border-2 border-gray-300 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-50 print:hidden"
      type="button"
      onClick={printInvoice}
    >
      <Printer aria-hidden="true" size={18} />
      Print invoice
    </button>
  );
}

export function EmailInvoiceButton({ email, orderId }: { email: string; orderId: string }) {
  const emailInvoice = useEmailInvoice();
  return (
    <button
      className="inline-flex min-h-11 items-center gap-2 rounded-lg border-2 border-gray-300 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-50 print:hidden"
      disabled={emailInvoice.isPending}
      type="button"
      onClick={() => emailInvoice.mutate({ email, orderId })}
    >
      {emailInvoice.isPending ? (
        <Loader2 aria-hidden="true" className="animate-spin" size={18} />
      ) : (
        <Mail aria-hidden="true" size={18} />
      )}
      Email invoice
    </button>
  );
}

export function PrintableInvoice({ order }: { order: Order }) {
  return (
    <article className="invoice-print hidden bg-white text-black print:block">
      <header className="flex items-start justify-between border-b-2 border-black pb-7">
        <div>
          <BrandLogo markClassName="size-9" wordmarkClassName="text-[22px]" />
          <h1 className="mt-2 text-4xl font-semibold">Invoice</h1>
        </div>
        <dl className="text-right text-sm">
          <dt className="text-gray-500">Invoice number</dt>
          <dd className="font-semibold">INV-{order.orderNumber}</dd>
          <dt className="mt-2 text-gray-500">Issued</dt>
          <dd>{new Date(order.createdAt).toLocaleDateString('en-KE')}</dd>
        </dl>
      </header>

      <section className="grid grid-cols-2 gap-12 py-7 text-sm">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">Bill to</h2>
          <p className="mt-2 font-semibold">{order.customerName}</p>
          <p>{order.email}</p>
          <p>{order.phoneNumber}</p>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">Deliver to</h2>
          <p className="mt-2 font-semibold">{order.shippingAddress.recipientName}</p>
          <p>{order.shippingAddress.addressLine1}</p>
          {order.shippingAddress.addressLine2 ? <p>{order.shippingAddress.addressLine2}</p> : null}
          <p>
            {[
              order.shippingAddress.city,
              order.shippingAddress.county,
              order.shippingAddress.postalCode,
            ]
              .filter(Boolean)
              .join(', ')}
          </p>
        </div>
      </section>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-y border-black text-left text-xs uppercase tracking-wider">
            <th className="py-3">Item</th>
            <th className="py-3 text-center">Qty</th>
            <th className="py-3 text-right">Unit price</th>
            <th className="py-3 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item.id} className="border-b border-gray-300">
              <td className="py-4">
                <strong>{item.productName}</strong>
                <span className="block text-xs text-gray-500">{item.productSku}</span>
              </td>
              <td className="py-4 text-center">{item.quantity}</td>
              <td className="py-4 text-right">{formatPriceKsh(item.unitPrice)}</td>
              <td className="py-4 text-right font-semibold">{formatPriceKsh(item.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <dl className="ml-auto mt-7 w-72 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt>Products</dt>
          <dd>{formatPriceKsh(order.subtotal)}</dd>
        </div>
        {order.taxAmount > 0 ? (
          <div className="flex justify-between">
            <dt>Tax</dt>
            <dd>{formatPriceKsh(order.taxAmount)}</dd>
          </div>
        ) : null}
        <div className="flex justify-between">
          <dt>Delivery</dt>
          <dd>{formatPriceKsh(order.shippingCost)}</dd>
        </div>
        <div className="flex justify-between border-t-2 border-black pt-3 text-lg font-bold">
          <dt>Total</dt>
          <dd>{formatPriceKsh(order.totalAmount)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Paid</dt>
          <dd>{formatPriceKsh(order.paidAmount)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Balance due</dt>
          <dd>{formatPriceKsh(order.balanceDue)}</dd>
        </div>
        {order.paymentMethod === 'CASH_ON_DELIVERY' ? (
          <div className="flex justify-between font-semibold">
            <dt>Due on delivery</dt>
            <dd>{formatPriceKsh(order.amountDueOnDelivery)}</dd>
          </div>
        ) : null}
      </dl>

      <footer className="mt-14 border-t border-gray-300 pt-5 text-xs text-gray-500">
        <p>
          Payment method: {order.paymentMethod === 'MPESA_FULL' ? 'M-Pesa' : 'Cash on delivery'}
        </p>
        <p className="mt-1">
          This invoice is generated from the order snapshot. Thank you for shopping with
          PickNQuicks.
        </p>
      </footer>
    </article>
  );
}
