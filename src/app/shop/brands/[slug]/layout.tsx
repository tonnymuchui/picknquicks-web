import { cache } from 'react';

import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, brandPath, seoDescription, SITE_NAME, SITE_URL } from '@/lib/seo/site';
import { mapBrand } from '@/lib/supabase/mappers';
import { createAdminClient } from '@/lib/supabase/server';

import type { Brand } from '@/types/brand';
import type { Metadata } from 'next';

const getBrand = cache(async (slug: string): Promise<Brand | null> => {
  const { data, error } = await createAdminClient()
    .from('brands')
    .select('*,products(count)')
    .eq('slug', slug)
    .eq('active', true)
    .maybeSingle();

  if (error) {
    throw error;
  }
  return data ? (mapBrand(data) as Brand) : null;
});

const getBrandProductLinks = cache(async (brandId: string) => {
  const { data } = await createAdminClient()
    .from('products')
    .select('name,slug')
    .eq('brand_id', brandId)
    .eq('active', true)
    .order('created_at', { ascending: false })
    .limit(12);
  return data ?? [];
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const brand = await getBrand(slug);
    if (!brand) {
      return { title: 'Brand unavailable', robots: { index: false, follow: false } };
    }

    const canonical = brandPath(brand.slug);
    const description = seoDescription(
      brand.metaDescription || brand.description,
      `Shop ${brand.name} technology and workspace products from ${SITE_NAME}, with current prices, images, and live availability.`
    );
    const image = absoluteUrl(brand.bannerUrl || brand.logoUrl);

    return {
      title: brand.metaTitle || brand.name,
      description,
      alternates: { canonical },
      robots: { index: true, follow: true },
      openGraph: {
        type: 'website',
        url: canonical,
        title: brand.metaTitle || brand.name,
        description,
        ...(image ? { images: [{ url: image, alt: `${brand.name} products` }] } : {}),
      },
    };
  } catch {
    return { title: 'Brand', robots: { index: false, follow: false } };
  }
}

export default async function BrandLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let brand: Brand | null = null;
  let products: Array<{ name: string; slug: string }> = [];

  try {
    brand = await getBrand(slug);
    products = brand ? await getBrandProductLinks(brand.id) : [];
  } catch {}

  if (!brand) {
    return children;
  }

  const canonicalUrl = `${SITE_URL}${brandPath(brand.slug)}`;
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              '@id': `${canonicalUrl}#collection`,
              url: canonicalUrl,
              name: brand.name,
              description: seoDescription(brand.metaDescription || brand.description),
              ...(brand.bannerUrl || brand.logoUrl
                ? { primaryImageOfPage: absoluteUrl(brand.bannerUrl || brand.logoUrl) }
                : {}),
              mainEntity: {
                '@type': 'ItemList',
                numberOfItems: products.length,
                itemListElement: products.map((product, index) => ({
                  '@type': 'ListItem',
                  position: index + 1,
                  name: product.name,
                  url: `${SITE_URL}/products/${encodeURIComponent(product.slug)}`,
                })),
              },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Brands',
                  item: `${SITE_URL}/shop/brands`,
                },
                { '@type': 'ListItem', position: 3, name: brand.name, item: canonicalUrl },
              ],
            },
          ],
        }}
      />
      {children}
    </>
  );
}
