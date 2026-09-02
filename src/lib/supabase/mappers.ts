/* eslint-disable @typescript-eslint/no-explicit-any -- Boundary mapper accepts ungenerated Supabase rows. */
type Row = Record<string, any>;
export const productSelect =
  '*,categories(name,slug),brands(name),product_images(*),bundle_components!bundle_components_bundle_product_id_fkey(quantity,component:products!bundle_components_component_product_id_fkey(id,name,slug,price,sale_price,active))';

export function mapProduct(row: Row) {
  const images = (row.product_images ?? []).map((image: Row) => ({
    id: image.id,
    imageUrl: image.image_url,
    altText: image.alt_text,
    isPrimary: image.is_primary,
    displayOrder: image.display_order,
  }));
  const available = Math.max(0, row.stock_quantity - row.reserved_quantity);
  const category = Array.isArray(row.categories) ? row.categories[0] : row.categories;
  const brand = Array.isArray(row.brands) ? row.brands[0] : row.brands;
  const bundleComponents = (row.bundle_components ?? [])
    .filter((entry: Row) => entry.component?.active !== false)
    .map((entry: Row) => {
      const component = entry.component ?? {};
      const quantity = Number(entry.quantity ?? 1);
      const unitPrice = Number(component.sale_price ?? component.price ?? 0);
      return {
        id: component.id,
        name: component.name,
        slug: component.slug,
        quantity,
        unitPrice,
        totalPrice: unitPrice * quantity,
      };
    });
  const bundleOriginalPrice = bundleComponents.reduce(
    (total: number, component: Row) => total + component.totalPrice,
    0
  );
  const effectivePrice = Number(row.sale_price ?? row.price);
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    sku: row.sku,
    description: row.description,
    shortDescription: row.short_description,
    price: Number(row.price),
    salePrice: row.sale_price == null ? undefined : Number(row.sale_price),
    effectivePrice,
    taxRate: Number(row.tax_rate ?? 0),
    discountPercentage: row.sale_price
      ? Math.round((1 - Number(row.sale_price) / Number(row.price)) * 100)
      : undefined,
    categoryId: row.category_id,
    categoryName: category?.name,
    categorySlug: category?.slug,
    brandId: row.brand_id,
    brandName: brand?.name,
    stockQuantity: available,
    inStock: available > 0,
    lowStock: available <= row.low_stock_threshold,
    weightGrams: row.weight_grams,
    dimensions: row.dimensions,
    active: row.active,
    featured: row.featured,
    isBundle: Boolean(row.is_bundle),
    bundleComponents,
    bundleOriginalPrice: bundleOriginalPrice || undefined,
    bundleSavings: bundleOriginalPrice
      ? Math.max(0, bundleOriginalPrice - effectivePrice)
      : undefined,
    isDigital: false,
    requiresShipping: row.requires_shipping,
    averageRating: undefined,
    reviewCount: 0,
    saleCount: 0,
    viewCount: 0,
    primaryImageUrl: images.find((i: Row) => i.isPrimary)?.imageUrl ?? images[0]?.imageUrl,
    images,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
export function mapCategory(row: Row) {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    imageUrl: row.image_url,
    iconUrl: row.icon_url,
    active: row.active,
    displayOrder: row.display_order,
    parentId: row.parent_id,
    parentName: row.parent?.name,
    level: row.parent_id ? 1 : 0,
    fullPath: row.slug,
    hasChildren: false,
    childrenCount: 0,
    children: (row.children ?? []).map(mapCategory),
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
export function mapBrand(row: Row) {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    logoUrl: row.logo_url,
    bannerUrl: row.banner_url,
    websiteUrl: row.website_url,
    countryOfOrigin: row.country_of_origin,
    active: row.active,
    featured: row.featured,
    displayOrder: row.display_order,
    productCount: row.products?.[0]?.count ?? 0,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
export function page<T>(content: T[], pageNumber: number, size: number, total: number) {
  return {
    content,
    page: pageNumber,
    size,
    totalElements: total,
    totalPages: Math.ceil(total / size),
    first: pageNumber === 0,
    last: (pageNumber + 1) * size >= total,
    hasNext: (pageNumber + 1) * size < total,
    hasPrevious: pageNumber > 0,
  };
}
export const apiData = <T>(data: T, message = 'OK') => ({
  success: true,
  message,
  data,
  timestamp: new Date().toISOString(),
});
const paymentStatus = (status: string) =>
  ({
    REQUIRES_ACTION: 'PENDING',
    PROCESSING: 'PROCESSING',
    SUCCEEDED: 'COMPLETED',
    FAILED: 'FAILED',
    CANCELLED: 'CANCELLED',
    EXPIRED: 'FAILED',
    REFUND_PENDING: 'PENDING',
    REFUNDED: 'REFUNDED',
  })[status] ?? 'PENDING';
export function mapOrder(row: Row, guestAccessToken?: string) {
  const obligations = (row.payments ?? []).map((p: Row) => ({
    id: p.id,
    purpose: p.purpose,
    paymentMethod: p.method,
    status: paymentStatus(p.status),
    amount: Number(p.amount),
    transactionId: p.provider_reference,
    phoneNumber: row.phone_number,
    mpesaReceiptNumber: p.provider_reference,
    paidAt: p.succeeded_at,
    failureReason: p.payment_attempts?.[0]?.provider_result_description,
  }));
  const current = (row.payments ?? []).find((p: Row) =>
    ['ORDER_TOTAL', 'DELIVERY_FEE'].includes(p.purpose)
  );
  const outstandingAmount = (purposes: string[]) =>
    (row.payments ?? [])
      .filter(
        (payment: Row) => purposes.includes(payment.purpose) && payment.status !== 'SUCCEEDED'
      )
      .reduce((total: number, payment: Row) => total + Number(payment.amount), 0);
  return {
    id: row.id,
    orderNumber: row.order_number,
    userId: row.user_id,
    email: row.email,
    phoneNumber: row.phone_number,
    customerName: row.customer_name,
    status: row.status,
    source: row.source ?? 'ONLINE',
    paymentMethod: row.payment_method,
    paymentStatus: current
      ? paymentStatus(current.status)
      : row.payment_method === 'CASH_ON_DELIVERY'
        ? 'COMPLETED'
        : 'PENDING',
    items: (row.order_items ?? []).map((i: Row) => ({
      id: i.id,
      productId: i.product_id,
      productName: i.product_name,
      productSku: i.product_sku,
      productImageUrl: i.product_image_url,
      quantity: i.quantity,
      unitPrice: Number(i.unit_price),
      taxRate: Number(i.tax_rate),
      subtotal: Number(i.subtotal),
      taxAmount: Number(i.tax_amount),
      total: Number(i.total),
    })),
    shippingAddress: row.shipping_address,
    payment: current ? obligations.find((p: Row) => p.id === current.id) : undefined,
    payments: obligations,
    subtotal: Number(row.subtotal),
    taxAmount: Number(row.tax_amount),
    shippingCost: Number(row.shipping_cost),
    totalAmount: Number(row.total_amount),
    paidAmount: Number(row.paid_amount),
    balanceDue: Number(row.balance_due),
    amountDueNow: outstandingAmount(['ORDER_TOTAL', 'DELIVERY_FEE']),
    amountDueOnDelivery: outstandingAmount(['ORDER_BALANCE']),
    notes: row.notes,
    trackingNumber: row.tracking_number,
    estimatedDeliveryDate: row.estimated_delivery_date,
    isGuest: !row.user_id,
    guestAccessToken,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
