import { absoluteUrl, brandPath, categoryPath, productPath, SITE_URL } from '@/lib/seo/site';
import { createAdminClient } from '@/lib/supabase/server';

import type { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

interface ProductSitemapRow {
  slug: string;
  updated_at: string;
  product_images: Array<{ image_url: string }> | null;
}

interface CategorySitemapRow {
  slug: string;
  updated_at: string;
  image_url: string | null;
}

interface BrandSitemapRow {
  slug: string;
  updated_at: string;
  logo_url: string | null;
  banner_url: string | null;
}

async function getProductRows(): Promise<ProductSitemapRow[]> {
  const { data, error } = await createAdminClient()
    .from('products')
    .select('slug,updated_at,product_images(image_url)')
    .eq('active', true)
    .order('updated_at', { ascending: false })
    .limit(5000);

  if (error) {
    throw error;
  }
  return data ?? [];
}

async function getCategoryRows(): Promise<CategorySitemapRow[]> {
  const { data, error } = await createAdminClient()
    .from('categories')
    .select('slug,updated_at,image_url')
    .eq('active', true)
    .order('updated_at', { ascending: false })
    .limit(5000);

  if (error) {
    throw error;
  }
  return data ?? [];
}

async function getBrandRows(): Promise<BrandSitemapRow[]> {
  const { data, error } = await createAdminClient()
    .from('brands')
    .select('slug,updated_at,logo_url,banner_url')
    .eq('active', true)
    .order('updated_at', { ascending: false })
    .limit(5000);

  if (error) {
    throw error;
  }
  return data ?? [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/products`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/shop/categories`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/shop/brands`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/terms`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/licenses`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  try {
    const [productResult, categoryResult, brandResult] = await Promise.allSettled([
      getProductRows(),
      getCategoryRows(),
      getBrandRows(),
    ]);
    const products = productResult.status === 'fulfilled' ? productResult.value : [];
    const categories = categoryResult.status === 'fulfilled' ? categoryResult.value : [];
    const brands = brandResult.status === 'fulfilled' ? brandResult.value : [];

    return [
      ...staticEntries,
      ...products.map((product) => ({
        url: `${SITE_URL}${productPath(product.slug)}`,
        lastModified: product.updated_at,
        changeFrequency: 'daily' as const,
        priority: 0.8,
        images: (product.product_images ?? [])
          .map((image) => absoluteUrl(image.image_url))
          .filter((url): url is string => Boolean(url)),
      })),
      ...categories.map((category) => ({
        url: `${SITE_URL}${categoryPath(category.slug)}`,
        lastModified: category.updated_at,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
        images: [absoluteUrl(category.image_url)].filter((url): url is string => Boolean(url)),
      })),
      ...brands.map((brand) => ({
        url: `${SITE_URL}${brandPath(brand.slug)}`,
        lastModified: brand.updated_at,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
        images: [absoluteUrl(brand.banner_url), absoluteUrl(brand.logo_url)].filter(
          (url): url is string => Boolean(url)
        ),
      })),
    ];
  } catch {
    return staticEntries;
  }
}
