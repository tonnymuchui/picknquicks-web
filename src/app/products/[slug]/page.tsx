import { ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { cache } from 'react';

import { JsonLd } from '@/components/seo/json-ld';
import { StorefrontProductDetail } from '@/components/shop/storefront-product-detail';
import {
  absoluteUrl,
  categoryPath,
  productPath,
  seoDescription,
  SITE_CURRENCY,
  SITE_NAME,
  SITE_URL,
} from '@/lib/seo/site';
import { mapProduct, productSelect } from '@/lib/supabase/mappers';
import { createClient } from '@/lib/supabase/server';

import type { Product } from '@/types/product';
import type { Metadata } from 'next';

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const getProduct = cache(async (identifier: string): Promise<Product | null> => {
  const supabase = await createClient();
  let query = supabase.from('products').select(productSelect).eq('active', true);
  query = uuidPattern.test(identifier) ? query.eq('id', identifier) : query.eq('slug', identifier);
  const { data, error } = await query.maybeSingle();
  if (error) {
    throw error;
  }
  return data ? (mapProduct(data) as Product) : null;
});

const getRelatedProducts = cache(async (product: Product): Promise<Product[]> => {
  const supabase = await createClient();
  const { data: categoryMatches, error: categoryError } = await supabase
    .from('products')
    .select(productSelect)
    .eq('active', true)
    .eq('category_id', product.categoryId)
    .neq('id', product.id)
    .order('featured', { ascending: false })
    .order('display_order', { ascending: true })
    .limit(4);

  if (categoryError) {
    throw categoryError;
  }

  const related = categoryMatches ?? [];
  if (related.length < 4) {
    const excludedIds = [product.id, ...related.map((item) => item.id)];
    const { data: complementaryProducts, error: complementaryError } = await supabase
      .from('products')
      .select(productSelect)
      .eq('active', true)
      .not('id', 'in', `(${excludedIds.join(',')})`)
      .order('featured', { ascending: false })
      .order('display_order', { ascending: true })
      .limit(4 - related.length);

    if (complementaryError) {
      throw complementaryError;
    }

    related.push(...(complementaryProducts ?? []));
  }

  return related.map((item) => mapProduct(item) as Product);
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const product = await getProduct(slug);
    if (!product) {
      return {
        title: 'Product unavailable',
        robots: { index: false, follow: false },
      };
    }

    const canonicalPath = productPath(product.slug);
    const description = seoDescription(
      product.metaDescription || product.shortDescription || product.description,
      `Shop ${product.name} from ${SITE_NAME}. See the current price, images, product details, and live stock availability.`
    );
    const images = product.images
      .map((image) => absoluteUrl(image.imageUrl))
      .filter((url): url is string => Boolean(url));

    return {
      title: product.metaTitle || product.name,
      description,
      alternates: { canonical: canonicalPath },
      robots: { index: true, follow: true },
      openGraph: {
        type: 'website',
        url: canonicalPath,
        title: product.metaTitle || product.name,
        description,
        images: images.map((url, index) => ({
          url,
          alt: product.images[index]?.altText || product.name,
        })),
      },
      twitter: {
        card: 'summary_large_image',
        title: product.metaTitle || product.name,
        description,
        images: images.slice(0, 1),
      },
      other: {
        'product:price:amount': product.effectivePrice.toFixed(2),
        'product:price:currency': SITE_CURRENCY,
        'product:availability': product.inStock ? 'in stock' : 'out of stock',
      },
    };
  } catch {
    return { title: 'Product', robots: { index: false, follow: false } };
  }
}

function ProductStructuredData({ product }: { product: Product }) {
  const canonicalUrl = `${SITE_URL}${productPath(product.slug)}`;
  const images = product.images
    .map((image) => absoluteUrl(image.imageUrl))
    .filter((url): url is string => Boolean(url));
  const description = seoDescription(
    product.metaDescription || product.shortDescription || product.description,
    `${product.name}, available from ${SITE_NAME}.`
  );
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Products', url: `${SITE_URL}/products` },
    ...(product.categoryName && product.categorySlug
      ? [
          {
            name: product.categoryName,
            url: `${SITE_URL}${categoryPath(product.categorySlug)}`,
          },
        ]
      : []),
    { name: product.name, url: canonicalUrl },
  ];

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Product',
            '@id': `${canonicalUrl}#product`,
            name: product.name,
            description,
            sku: product.sku,
            url: canonicalUrl,
            image: images,
            ...(product.brandName
              ? { brand: { '@type': 'Brand', name: product.brandName } }
              : { brand: { '@type': 'Brand', name: SITE_NAME } }),
            ...(product.categoryName ? { category: product.categoryName } : {}),
            offers: {
              '@type': 'Offer',
              url: canonicalUrl,
              price: product.effectivePrice.toFixed(2),
              priceCurrency: SITE_CURRENCY,
              availability: product.inStock
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
              itemCondition: 'https://schema.org/NewCondition',
              seller: { '@id': `${SITE_URL}/#organization` },
              ...(product.salePrice !== undefined && product.salePrice < product.price
                ? {
                    priceSpecification: {
                      '@type': 'UnitPriceSpecification',
                      price: product.price.toFixed(2),
                      priceCurrency: SITE_CURRENCY,
                      priceType: 'https://schema.org/StrikethroughPrice',
                    },
                  }
                : {}),
            },
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${canonicalUrl}#breadcrumb`,
            itemListElement: breadcrumbs.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.name,
              item: item.url,
            })),
          },
        ],
      }}
    />
  );
}

function UnavailableProduct({ slug }: { slug: string }) {
  return (
    <main className="bg-canvas flex min-h-[70vh] items-center justify-center px-4">
      <section className="border-line bg-paper w-full max-w-lg border p-8 text-center sm:p-12">
        <p className="text-warm text-xs font-semibold uppercase tracking-[0.16em]">
          Product unavailable
        </p>
        <h1 className="mt-3 text-3xl font-medium tracking-[-0.03em]">
          We couldn&apos;t load this item.
        </h1>
        <p className="text-muted-foreground mt-3 text-sm leading-6">
          It may no longer be available, or the product service may be temporarily unreachable.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            className="bg-ink inline-flex min-h-12 items-center justify-center gap-2 px-6 text-sm font-semibold text-white"
            href={`/products/${encodeURIComponent(slug)}`}
          >
            <RefreshCw aria-hidden="true" size={16} />
            Try again
          </a>
          <Link
            className="border-ink inline-flex min-h-12 items-center justify-center gap-2 border px-6 text-sm font-semibold"
            href="/products"
          >
            <ArrowLeft aria-hidden="true" size={16} />
            Browse products
          </Link>
        </div>
      </section>
    </main>
  );
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let product: Product | null = null;
  let relatedProducts: Product[] = [];

  try {
    product = await getProduct(slug);
    if (product) {
      relatedProducts = await getRelatedProducts(product);
    }
  } catch {}

  return product ? (
    <>
      <ProductStructuredData product={product} />
      <StorefrontProductDetail product={product} relatedProducts={relatedProducts} />
    </>
  ) : (
    <UnavailableProduct slug={slug} />
  );
}
