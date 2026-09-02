import 'server-only';

import { unstable_cache } from 'next/cache';

import { mapCategory, mapProduct, productSelect } from '@/lib/supabase/mappers';
import { createAdminClient } from '@/lib/supabase/server';

import type { Category } from '@/types/category';
import type { Product, ProductFilters } from '@/types/product';

const getCachedActiveRootCategories = unstable_cache(
  async (limit: number): Promise<Category[]> => {
    const { data, error } = await createAdminClient()
      .from('categories')
      .select('*,parent:categories(name)')
      .eq('active', true)
      .is('parent_id', null)
      .order('display_order', { ascending: true })
      .limit(limit);

    if (error) {
      throw new Error(`Unable to load categories: ${error.message}`);
    }

    return (data ?? []).map(mapCategory);
  },
  ['active-root-categories'],
  {
    revalidate: 300,
    tags: ['catalog-categories'],
  }
);

export async function getActiveRootCategories(limit = 5): Promise<Category[]> {
  return getCachedActiveRootCategories(limit);
}

const getCachedActiveProducts = unstable_cache(
  async (
    filters: ProductFilters,
    source: 'active' | 'best-sellers' | 'new-arrivals'
  ): Promise<Product[]> => {
    const page = Math.max(0, filters.page ?? 0);
    const size = Math.min(100, Math.max(1, filters.size ?? 20));
    let query = createAdminClient().from('products').select(productSelect).eq('active', true);

    if (filters.categoryId) {
      query = query.eq('category_id', filters.categoryId);
    }
    if (filters.brandId) {
      query = query.eq('brand_id', filters.brandId);
    }
    if (filters.minPrice !== undefined) {
      query = query.gte('price', filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      query = query.lte('price', filters.maxPrice);
    }

    if (source === 'new-arrivals') {
      query = query.order('created_at', { ascending: false });
    } else if (source === 'best-sellers') {
      query = query
        .order('featured', { ascending: false })
        .order('display_order', { ascending: true });
    } else {
      const sortColumn =
        filters.sortBy === 'price'
          ? 'price'
          : filters.sortBy === 'name'
            ? 'name'
            : filters.sortBy === 'createdAt'
              ? 'created_at'
              : 'display_order';
      query = query.order(sortColumn, { ascending: filters.sortDirection !== 'DESC' });
    }

    const from = page * size;
    const { data, error } = await query.range(from, from + size - 1);

    if (error) {
      throw new Error(`Unable to load products: ${error.message}`);
    }

    return (data ?? []).map(mapProduct);
  },
  ['active-products'],
  {
    revalidate: 60,
    tags: ['catalog-products'],
  }
);

export async function getActiveProducts(
  filters: ProductFilters,
  source: 'active' | 'best-sellers' | 'new-arrivals'
): Promise<Product[]> {
  return getCachedActiveProducts(filters, source);
}

const getCachedActiveProductsByCategorySlug = unstable_cache(
  async (slug: string, limit: number): Promise<Product[]> => {
    const admin = createAdminClient();
    const { data: category, error: categoryError } = await admin
      .from('categories')
      .select('id')
      .eq('slug', slug)
      .eq('active', true)
      .single();

    if (categoryError) {
      throw new Error(`Unable to load category: ${categoryError.message}`);
    }

    const { data, error } = await admin
      .from('products')
      .select(productSelect)
      .eq('category_id', category.id)
      .eq('active', true)
      .order('display_order', { ascending: true })
      .limit(limit);

    if (error) {
      throw new Error(`Unable to load category products: ${error.message}`);
    }

    return (data ?? []).map(mapProduct);
  },
  ['active-products-by-category-slug'],
  {
    revalidate: 60,
    tags: ['catalog-products'],
  }
);

export async function getActiveProductsByCategorySlug(slug: string, limit = 8): Promise<Product[]> {
  return getCachedActiveProductsByCategorySlug(slug, limit);
}
