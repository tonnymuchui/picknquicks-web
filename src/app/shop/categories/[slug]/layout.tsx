import { cache } from 'react';

import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, categoryPath, seoDescription, SITE_NAME, SITE_URL } from '@/lib/seo/site';
import { mapCategory } from '@/lib/supabase/mappers';
import { createAdminClient } from '@/lib/supabase/server';

import type { Category } from '@/types/category';
import type { Metadata } from 'next';

const getCategory = cache(async (slug: string): Promise<Category | null> => {
  const { data, error } = await createAdminClient()
    .from('categories')
    .select('*,parent:categories(name)')
    .eq('slug', slug)
    .eq('active', true)
    .maybeSingle();

  if (error) {
    throw error;
  }
  return data ? (mapCategory(data) as Category) : null;
});

const getCategoryProductLinks = cache(async (categoryId: string) => {
  const { data } = await createAdminClient()
    .from('products')
    .select('name,slug')
    .eq('category_id', categoryId)
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
    const category = await getCategory(slug);
    if (!category) {
      return { title: 'Category unavailable', robots: { index: false, follow: false } };
    }

    const canonical = categoryPath(category.slug);
    const description = seoDescription(
      category.metaDescription || category.description,
      `Shop ${category.name} products from ${SITE_NAME}. Compare current prices, images, details, and live availability.`
    );
    const image = absoluteUrl(category.imageUrl);

    return {
      title: category.metaTitle || category.name,
      description,
      alternates: { canonical },
      robots: { index: true, follow: true },
      openGraph: {
        type: 'website',
        url: canonical,
        title: category.metaTitle || category.name,
        description,
        ...(image ? { images: [{ url: image, alt: category.name }] } : {}),
      },
    };
  } catch {
    return { title: 'Category', robots: { index: false, follow: false } };
  }
}

export default async function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let category: Category | null = null;
  let products: Array<{ name: string; slug: string }> = [];

  try {
    category = await getCategory(slug);
    products = category ? await getCategoryProductLinks(category.id) : [];
  } catch {}

  if (!category) {
    return children;
  }

  const canonicalUrl = `${SITE_URL}${categoryPath(category.slug)}`;
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
              name: category.name,
              description: seoDescription(category.metaDescription || category.description),
              ...(category.imageUrl ? { primaryImageOfPage: absoluteUrl(category.imageUrl) } : {}),
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
                  name: 'Categories',
                  item: `${SITE_URL}/shop/categories`,
                },
                { '@type': 'ListItem', position: 3, name: category.name, item: canonicalUrl },
              ],
            },
          ],
        }}
      />
      {children}
    </>
  );
}
