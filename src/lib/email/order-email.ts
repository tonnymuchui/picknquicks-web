import 'server-only';

const escapeHtml = (value: unknown) =>
  String(value ?? '').replace(
    /[&<>'"]/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]!
  );
const money = (value: unknown) =>
  new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(Number(value));

type OrderRow = {
  order_number: string;
  customer_name: string;
  email: string;
  subtotal: number;
  tax_amount: number;
  shipping_cost: number;
  discount_amount: number;
  total_amount: number;
  paid_amount: number;
  balance_due: number;
  payment_method: string;
  shipping_address: Record<string, unknown>;
  created_at: string;
  order_items: Array<{
    product_name: string;
    product_sku: string;
    quantity: number;
    unit_price: number;
    total: number;
  }>;
};

export function orderDocumentSnapshot(order: OrderRow, type: 'INVOICE' | 'RECEIPT') {
  return { type, generatedAt: new Date().toISOString(), order };
}

export function renderOrderEmail(order: OrderRow, type: 'INVOICE' | 'RECEIPT') {
  const title = type === 'RECEIPT' ? 'Payment receipt' : 'Order invoice';
  const rows = order.order_items
    .map(
      (item) =>
        `<tr><td style="padding:12px 0;border-bottom:1px solid #e7e2da"><strong>${escapeHtml(item.product_name)}</strong><br><small style="color:#777">${escapeHtml(item.product_sku)}</small></td><td style="padding:12px;text-align:center;border-bottom:1px solid #e7e2da">${item.quantity}</td><td style="padding:12px 0;text-align:right;border-bottom:1px solid #e7e2da">${money(item.total)}</td></tr>`
    )
    .join('');
  return `<!doctype html><html><body style="margin:0;background:#f4f0e9;font-family:Arial,sans-serif;color:#171717"><div style="max-width:640px;margin:0 auto;padding:32px 18px"><div style="background:#1f1c17;color:#fff;padding:24px"><table role="presentation" style="border-collapse:collapse"><tr><td style="width:42px;height:42px;background:#fff;color:#1f1c17;text-align:center;font-size:22px;font-weight:800">P<span style="color:#b87855">›</span></td><td style="padding-left:12px;font-size:22px;font-weight:700;letter-spacing:-1px">PickN<span style="color:#d49a77">Quicks</span></td></tr></table><h1 style="margin:18px 0 0;font-size:28px">${title}</h1></div><div style="background:#fff;padding:26px"><p>Hello ${escapeHtml(order.customer_name)},</p><p style="color:#666;line-height:1.6">${type === 'RECEIPT' ? `We received ${money(order.paid_amount)} for your order.` : 'Your order has been received. Keep this invoice for your records.'}</p><table style="width:100%;border-collapse:collapse;margin-top:20px"><tr><td><small style="color:#777">ORDER</small><br><strong>${escapeHtml(order.order_number)}</strong></td><td style="text-align:right"><small style="color:#777">DATE</small><br><strong>${new Date(order.created_at).toLocaleDateString('en-KE')}</strong></td></tr></table><table style="width:100%;border-collapse:collapse;margin-top:22px">${rows}</table><table style="width:100%;margin-top:20px"><tr><td>Products</td><td style="text-align:right">${money(order.subtotal)}</td></tr><tr><td>Delivery</td><td style="text-align:right">${money(order.shipping_cost)}</td></tr><tr><td style="padding-top:12px"><strong>Total</strong></td><td style="padding-top:12px;text-align:right"><strong>${money(order.total_amount)}</strong></td></tr><tr><td style="color:#1f1c17">Paid</td><td style="text-align:right;color:#1f1c17">${money(order.paid_amount)}</td></tr><tr><td>Balance due</td><td style="text-align:right">${money(order.balance_due)}</td></tr></table><div style="margin-top:26px;padding:18px;background:#f7f1e9"><strong>Delivery address</strong><br><span style="color:#666;line-height:1.6">${escapeHtml(order.shipping_address.addressLine1)}<br>${escapeHtml(order.shipping_address.city)}, Kenya</span></div><p style="margin-top:26px;font-size:12px;color:#777">Questions? Reply to this email or contact PickNQuicks support. This document is generated from the immutable order snapshot.</p></div></div></body></html>`;
}
