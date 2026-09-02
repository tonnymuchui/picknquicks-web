import {
  absoluteUrl,
  plainText,
  productPath,
  SITE_CURRENCY,
  SITE_NAME,
  SITE_URL,
} from '@/lib/seo/site';
import { mapProduct, productSelect } from '@/lib/supabase/mappers';
import { createAdminClient } from '@/lib/supabase/server';

import type { Product } from '@/types/product';

export const dynamic = 'force-dynamic';

function xml(value: string | number | boolean): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function productItem(product: Product): string {
  const link = `${SITE_URL}${productPath(product.slug)}`;
  const images = product.images
    .map((image) => absoluteUrl(image.imageUrl))
    .filter((url): url is string => Boolean(url));
  const primaryImage = absoluteUrl(product.primaryImageUrl) || images[0];
  const description =
    plainText(product.shortDescription || product.description) ||
    `${product.name} available from ${SITE_NAME}.`;
  const hasSale = product.salePrice !== undefined && product.salePrice < product.price;

  return [
    '<item>',
    `<g:id>${xml(product.sku || product.id)}</g:id>`,
    `<title>${xml(product.name)}</title>`,
    `<description>${xml(description)}</description>`,
    `<link>${xml(link)}</link>`,
    primaryImage ? `<g:image_link>${xml(primaryImage)}</g:image_link>` : '',
    ...images
      .filter((image) => image !== primaryImage)
      .slice(0, 10)
      .map((image) => `<g:additional_image_link>${xml(image)}</g:additional_image_link>`),
    `<g:availability>${product.inStock ? 'in_stock' : 'out_of_stock'}</g:availability>`,
    `<g:price>${xml(`${product.price.toFixed(2)} ${SITE_CURRENCY}`)}</g:price>`,
    hasSale
      ? `<g:sale_price>${xml(`${product.effectivePrice.toFixed(2)} ${SITE_CURRENCY}`)}</g:sale_price>`
      : '',
    '<g:condition>new</g:condition>',
    `<g:brand>${xml(product.brandName || SITE_NAME)}</g:brand>`,
    product.categoryName ? `<g:product_type>${xml(product.categoryName)}</g:product_type>` : '',
    '</item>',
  ].join('');
}

export async function GET() {
  try {
    const { data, error } = await createAdminClient()
      .from('products')
      .select(productSelect)
      .eq('active', true)
      .order('display_order', { ascending: true })
      .limit(5000);

    if (error) {
      throw error;
    }

    const products = (data ?? []).map((row) => mapProduct(row) as Product);
    const body = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">',
      '<channel>',
      `<title>${xml(`${SITE_NAME} product catalog`)}</title>`,
      `<link>${xml(SITE_URL)}</link>`,
      '<description>Current PickNQuicks products, images, prices, and stock availability.</description>',
      ...products.map(productItem),
      '</channel>',
      '</rss>',
    ].join('');

    return new Response(body, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=3600',
      },
    });
  } catch {
    return new Response('Product feed is temporarily unavailable.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Retry-After': '300' },
    });
  }
}
