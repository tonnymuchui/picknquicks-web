/* eslint-disable @typescript-eslint/no-explicit-any -- Compatibility mapper is removed after legacy client hooks are retired. */
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import {
  apiData,
  mapBrand,
  mapCategory,
  mapOrder,
  mapProduct,
  page,
  productSelect,
} from '@/lib/supabase/mappers';
import { createAdminClient, createClient } from '@/lib/supabase/server';

type Context = { params: Promise<{ path: string[] }> };
const response = (data: unknown, status = 200) => NextResponse.json(apiData(data), { status });
const error = (message: string, status = 400) =>
  NextResponse.json({ success: false, message }, { status });
const number = (value: string | null, fallback: number) =>
  value == null ? fallback : Number(value);

async function requireStaff() {
  const scoped = await createClient();
  const {
    data: { user },
  } = await scoped.auth.getUser();
  if (!user) {
    return null;
  }
  const admin = createAdminClient();
  const { data } = await admin
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .in('role', ['ADMIN', 'MANAGER', 'STAFF']);
  return data?.length ? { user, admin } : null;
}
function productPatch(input: Record<string, any>) {
  return {
    name: input.name,
    slug: input.slug,
    sku: input.sku,
    description: input.description,
    short_description: input.shortDescription,
    price: input.price,
    sale_price: input.salePrice ?? null,
    cost_price: input.costPrice,
    category_id: input.categoryId,
    brand_id: input.brandId ?? null,
    stock_quantity: input.stockQuantity,
    low_stock_threshold: input.lowStockThreshold,
    weight_grams: input.weightGrams,
    dimensions: input.dimensions,
    active: input.active,
    featured: input.featured,
    requires_shipping: input.requiresShipping,
    display_order: input.displayOrder,
    meta_title: input.metaTitle,
    meta_description: input.metaDescription,
  };
}
function categoryPatch(i: Record<string, any>) {
  return {
    name: i.name,
    slug: i.slug,
    description: i.description,
    image_url: i.imageUrl,
    icon_url: i.iconUrl,
    parent_id: i.parentId ?? null,
    display_order: i.displayOrder,
    active: i.active,
    meta_title: i.metaTitle,
    meta_description: i.metaDescription,
  };
}
function brandPatch(i: Record<string, any>) {
  return {
    name: i.name,
    slug: i.slug,
    description: i.description,
    logo_url: i.logoUrl,
    banner_url: i.bannerUrl,
    website_url: i.websiteUrl,
    country_of_origin: i.countryOfOrigin,
    display_order: i.displayOrder,
    active: i.active,
    featured: i.featured,
    meta_title: i.metaTitle,
    meta_description: i.metaDescription,
  };
}
function clean(value: Record<string, any>) {
  return Object.fromEntries(Object.entries(value).filter(([, v]) => v !== undefined));
}
function buildCategoryTree(rows: Record<string, any>[]) {
  const nodes = new Map(
    rows.map((row) => {
      const category = { ...mapCategory(row), children: [] as any[] };
      return [category.id, category];
    })
  );
  const roots: any[] = [];

  for (const node of nodes.values()) {
    const parent = node.parentId ? nodes.get(node.parentId) : undefined;
    if (parent) {
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  }

  const setMetadata = (node: any, level: number) => {
    node.level = level;
    node.hasChildren = node.children.length > 0;
    node.childrenCount = node.children.length;
    node.children.forEach((child: any) => setMetadata(child, level + 1));
  };
  roots.forEach((root) => setMetadata(root, 0));
  return roots;
}
async function parseInput(request: Request) {
  if (!request.headers.get('content-type')?.includes('multipart/form-data')) {
    return { fields: await request.json(), files: {} as Record<string, File[]> };
  }
  const form = await request.formData();
  const fields: Record<string, string> = {};
  const files: Record<string, File[]> = {};
  for (const [key, value] of form.entries()) {
    if (value instanceof File) {
      files[key] = [...(files[key] ?? []), value];
    } else {
      fields[key] = value;
    }
  }
  return { fields, files };
}
async function uploadMedia(admin: any, bucket: string, folder: string, file: File) {
  if (
    !['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml'].includes(file.type) ||
    file.size > 5_242_880
  ) {
    throw new Error('Use a JPG, PNG, WebP, AVIF, or SVG image smaller than 5 MB');
  }
  const extension =
    file.name
      .split('.')
      .pop()
      ?.replace(/[^a-z0-9]/gi, '') || 'bin';
  const path = `${folder}/${crypto.randomUUID()}.${extension}`;
  const { error: uploadError } = await admin.storage
    .from(bucket)
    .upload(path, file, { contentType: file.type });
  if (uploadError) {
    throw uploadError;
  }
  return admin.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
async function uploadSiteMedia(admin: any, folder: string, file: File) {
  const allowed = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/avif',
    'image/svg+xml',
    'video/mp4',
    'video/webm',
  ];
  if (!allowed.includes(file.type) || file.size > 26_214_400) {
    throw new Error('Use a supported image or MP4/WebM file smaller than 25 MB');
  }
  const extension =
    file.name
      .split('.')
      .pop()
      ?.replace(/[^a-z0-9]/gi, '') || 'bin';
  const path = `${folder}/${crypto.randomUUID()}.${extension}`;
  const { error: uploadError } = await admin.storage
    .from('site-media')
    .upload(path, file, { contentType: file.type });
  if (uploadError) {
    throw uploadError;
  }
  return admin.storage.from('site-media').getPublicUrl(path).data.publicUrl;
}
function mapStorefrontSettings(row: Record<string, any>) {
  return {
    siteName: row.site_name,
    tagline: row.tagline,
    logoUrl: row.logo_url,
    heroImageUrl: row.hero_image_url,
    heroAltText: row.hero_alt_text,
    beforeImageUrl: row.before_image_url,
    afterImageUrl: row.after_image_url,
    motionVideoUrl: row.motion_video_url,
    motionVideoPosterUrl: row.motion_video_poster_url,
    updatedAt: row.updated_at,
  };
}
function mapStorefrontMedia(row: Record<string, any>) {
  return {
    id: row.id,
    placement: row.placement,
    mediaUrl: row.media_url,
    altText: row.alt_text,
    eyebrow: row.eyebrow,
    title: row.title,
    body: row.body,
    displayOrder: row.display_order,
    active: row.active,
  };
}
function mapCategoryStory(row: Record<string, any>) {
  return {
    id: row.id,
    categoryId: row.category_id,
    kind: row.kind,
    eyebrow: row.eyebrow ?? undefined,
    title: row.title,
    body: row.body ?? undefined,
    mediaUrl: row.media_url ?? undefined,
    altText: row.alt_text ?? undefined,
    displayOrder: row.display_order,
    active: row.active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
async function cartIdentity(request: Request) {
  const scoped = await createClient();
  const {
    data: { user },
  } = await scoped.auth.getUser();
  const guest = request.headers.get('x-guest-token');
  if (!user && !guest) {
    return null;
  }
  return user ? { userId: user.id, guestToken: null } : { userId: null, guestToken: guest };
}
async function loadCart(request: Request, create = true) {
  const identity = await cartIdentity(request);
  if (!identity) {
    return null;
  }
  const admin = createAdminClient();
  let q = admin
    .from('carts')
    .select('*,cart_items(*,products(*,categories(name),brands(name),product_images(*)))')
    .eq('status', 'ACTIVE');
  q = identity.userId
    ? q.eq('user_id', identity.userId)
    : q.eq('guest_token', identity.guestToken!);
  let { data } = await q.maybeSingle();
  if (!data && create) {
    const inserted = await admin
      .from('carts')
      .insert({ user_id: identity.userId, guest_token: identity.guestToken, status: 'ACTIVE' })
      .select('*,cart_items(*,products(*,categories(name),brands(name),product_images(*)))')
      .single();
    data = inserted.data;
  }
  return data;
}
function mapCart(row: any) {
  const items = (row?.cart_items ?? []).map((item: any) => {
    const p = mapProduct(item.products);
    const subtotal = p.effectivePrice * item.quantity;
    const tax = subtotal * Number(item.products.tax_rate ?? 0);
    return {
      id: item.id,
      productId: p.id,
      productName: p.name,
      productSku: p.sku,
      productSlug: p.slug,
      productImageUrl: p.primaryImageUrl,
      price: p.effectivePrice,
      quantity: item.quantity,
      taxRate: Number(item.products.tax_rate ?? 0),
      itemTotal: subtotal,
      taxAmount: tax,
      totalWithTax: subtotal + tax,
      inStock: p.inStock,
      availableStock: p.stockQuantity,
      priceChanged: false,
    };
  });
  const subtotal = items.reduce((s: number, i: any) => s + i.itemTotal, 0),
    tax = items.reduce((s: number, i: any) => s + i.taxAmount, 0);
  return {
    id: row.id,
    userId: row.user_id,
    guestToken: row.guest_token,
    status: row.status,
    items,
    totalItems: items.reduce((s: number, i: any) => s + i.quantity, 0),
    subtotal,
    tax,
    total: subtotal + tax,
    isGuest: !row.user_id,
    expiresAt: row.expires_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function GET(request: Request, { params }: Context) {
  const path = (await params).path;
  const url = new URL(request.url);
  const admin = createAdminClient();
  if (path[0] === 'cart') {
    const cart = await loadCart(request);
    return cart ? response(mapCart(cart)) : error('Guest token required', 400);
  }
  if (path[0] === 'storefront-settings') {
    const { data, error: settingsError } = await admin
      .from('storefront_settings')
      .select('*')
      .eq('id', 1)
      .single();
    return settingsError ? error(settingsError.message) : response(mapStorefrontSettings(data));
  }
  if (path[0] === 'storefront-media') {
    let mediaQuery = admin
      .from('storefront_media_items')
      .select('*')
      .eq('active', true)
      .order('display_order');
    const placement = url.searchParams.get('placement');
    if (placement) {
      mediaQuery = mediaQuery.eq('placement', placement);
    }
    const { data, error: mediaError } = await mediaQuery;
    return mediaError ? error(mediaError.message) : response((data ?? []).map(mapStorefrontMedia));
  }
  if (path[0] === 'category-stories' && path[1]) {
    const staff = await requireStaff();
    let storyQuery = admin
      .from('category_story_items')
      .select('*')
      .eq('category_id', path[1])
      .order('display_order');
    if (!staff || url.searchParams.get('includeInactive') !== 'true') {
      storyQuery = storyQuery.eq('active', true);
    }
    const { data, error: storyError } = await storyQuery;
    return storyError ? error(storyError.message) : response((data ?? []).map(mapCategoryStory));
  }
  if (path[0] === 'orders') {
    let q = admin
      .from('orders')
      .select('*,order_items(*),payments(*,payment_attempts(*))', { count: 'exact' })
      .order('created_at', { ascending: false });
    const scoped = await createClient();
    const {
      data: { user },
    } = await scoped.auth.getUser();
    if (path[1] === 'track') {
      q = q
        .eq('order_number', url.searchParams.get('orderNumber') ?? '')
        .eq('email', (url.searchParams.get('email') ?? '').toLowerCase());
      const { data } = await q.maybeSingle();
      return data ? response(mapOrder(data)) : error('Order not found', 404);
    }
    if (path[1] === 'my-orders') {
      if (!user) {
        return error('Sign in required', 401);
      }
      q = q.eq('user_id', user.id);
    } else if (path[1]) {
      if (user) {
        const staff = await requireStaff();
        q = q.eq('id', path[1]);
        if (!staff) {
          q = q.eq('user_id', user.id);
        }
      } else {
        const guestToken = request.headers.get('x-guest-order-token');
        if (!guestToken) {
          return error('Order access is required', 403);
        }
        q = q.eq('id', path[1]);
      }
      const { data } = await q.maybeSingle();
      if (!user && data) {
        const guestToken = request.headers.get('x-guest-order-token')!;
        const guestHash = await crypto.subtle
          .digest('SHA-256', new TextEncoder().encode(guestToken))
          .then((value) => Buffer.from(value).toString('hex'));
        if (guestHash !== data.guest_access_token_hash) {
          return error('Order access is required', 403);
        }
      }
      return data ? response(mapOrder(data)) : error('Order not found', 404);
    } else {
      const staff = await requireStaff();
      if (!staff) {
        return error('Forbidden', 403);
      }
    }
    const p = number(url.searchParams.get('page'), 0),
      size = number(url.searchParams.get('size'), 20);
    const { data, count, error: e } = await q.range(p * size, p * size + size - 1);
    return e
      ? error(e.message)
      : response(
          page(
            (data ?? []).map((row) => mapOrder(row)),
            p,
            size,
            count ?? 0
          )
        );
  }
  if (path[0] === 'products') {
    const staff = await requireStaff();
    const p = number(url.searchParams.get('page'), 0),
      size = number(url.searchParams.get('size'), 20);
    let q = admin.from('products').select(productSelect, { count: 'exact' });
    if (!staff) {
      q = q.eq('active', true);
    }
    if (['active', 'filter'].includes(path[1])) {
      q = q.eq('active', true);
    }
    if (path[1] === 'category') {
      q = q.eq('category_id', path[2]);
    }
    if (path[1] === 'brand') {
      q = q.eq('brand_id', path[2]);
    }
    if (path[1] === 'search') {
      const search = (url.searchParams.get('query') ?? '').trim();
      if (search) {
        q = q.or(
          `name.ilike.%${search}%,sku.ilike.%${search}%,short_description.ilike.%${search}%`
        );
      }
    }
    if (url.searchParams.get('categoryId')) {
      q = q.eq('category_id', url.searchParams.get('categoryId')!);
    }
    if (url.searchParams.get('brandId')) {
      q = q.eq('brand_id', url.searchParams.get('brandId')!);
    }
    if (url.searchParams.get('minPrice')) {
      q = q.gte('price', url.searchParams.get('minPrice')!);
    }
    if (url.searchParams.get('maxPrice')) {
      q = q.lte('price', url.searchParams.get('maxPrice')!);
    }
    if (path.length === 2 && !['active', 'filter', 'search'].includes(path[1])) {
      const { data } = await q.or(`id.eq.${path[1]},slug.eq.${path[1]}`).maybeSingle();
      return data ? response(mapProduct(data)) : error('Product not found', 404);
    }
    const {
      data,
      count,
      error: e,
    } = await q.order('display_order').range(p * size, p * size + size - 1);
    return e ? error(e.message) : response(page((data ?? []).map(mapProduct), p, size, count ?? 0));
  }
  if (path[0] === 'categories') {
    const staff = await requireStaff();
    const childCollection = path[2] === 'children';
    let q = admin.from('categories').select('*,parent:categories(name)').order('display_order');
    if (!staff) {
      q = q.eq('active', true);
    }
    if (['active', 'tree', 'roots'].includes(path[1])) {
      q = q.eq('active', true);
    }
    if (path[1] === 'roots') {
      q = q.is('parent_id', null);
    }
    if (childCollection) {
      q = q.eq('parent_id', path[1]);
      if (path[3] === 'active') {
        q = q.eq('active', true);
      }
    }
    if (path[1] === 'slug') {
      q = q.eq('slug', path[2]);
    } else if (path.length === 2 && !['active', 'tree', 'roots', 'children'].includes(path[1])) {
      q = q.eq('id', path[1]);
    }
    const { data, error: e } = await q;
    const mapped = (data ?? []).map(mapCategory);
    return e
      ? error(e.message)
      : response(
          path[1] === 'tree'
            ? buildCategoryTree(data ?? [])
            : path[1] === 'slug' ||
                (path.length === 2 && !['active', 'tree', 'roots'].includes(path[1]))
              ? mapped[0]
              : mapped
        );
  }
  if (path[0] === 'brands') {
    const staff = await requireStaff();
    if (path[1] === 'countries') {
      const { data } = await admin
        .from('brands')
        .select('country_of_origin')
        .not('country_of_origin', 'is', null);
      return response([...new Set(data?.map((x) => x.country_of_origin))]);
    }
    let q = admin
      .from('brands')
      .select('*,products(count)', { count: 'exact' })
      .order('display_order');
    if (!staff) {
      q = q.eq('active', true);
    }
    if (path[1] === 'active') {
      q = q.eq('active', true);
    }
    if (path[1] === 'featured') {
      q = q.eq('featured', true);
    }
    if (path[1] === 'slug') {
      q = q.eq('slug', path[2]);
    }
    const p = number(url.searchParams.get('page'), 0),
      size = number(url.searchParams.get('size'), 20);
    const { data, count, error: e } = await q.range(p * size, p * size + size - 1);
    const mapped = (data ?? []).map(mapBrand);
    return e
      ? error(e.message)
      : response(
          path[1] === 'slug' ? mapped[0] : path[1] ? mapped : page(mapped, p, size, count ?? 0)
        );
  }
  if (path[0] === 'shipping') {
    const city = (url.searchParams.get('city') ?? '').trim().toLowerCase();
    const { data, error: shippingError } = await admin
      .from('shipping_zones')
      .select('*')
      .eq('active', true);
    if (shippingError) {
      return error('Unable to load delivery pricing', 500);
    }
    const zone =
      data?.find((z) => z.cities.includes(city)) ?? data?.find((z) => z.cities.length === 0);
    if (!zone) {
      return error('Delivery is not currently available for this location', 404);
    }
    return response(path[1] === 'delivery-days' ? zone.estimated_days : Number(zone.fee));
  }
  return error('Endpoint not found', 404);
}

export async function POST(request: Request, { params }: Context) {
  const path = (await params).path;
  if (path[0] === 'orders' && path[1] === 'claim-guest') {
    const scoped = await createClient();
    const {
      data: { user },
    } = await scoped.auth.getUser();
    if (!user) {
      return error('Sign in required', 401);
    }

    const admin = createAdminClient();
    const { data: claimed, error: claimError } = await admin.rpc('claim_guest_orders_for_user', {
      p_user_id: user.id,
    });
    return claimError
      ? error('Unable to link previous guest orders', 500)
      : response({ claimed: Number(claimed ?? 0) });
  }
  if (path[0] === 'cart' && path[1] === 'merge') {
    const scoped = await createClient();
    const {
      data: { user },
    } = await scoped.auth.getUser();
    if (!user) {
      return error('Sign in required', 401);
    }

    const guestToken = request.headers.get('x-guest-token');
    if (
      !guestToken ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(guestToken)
    ) {
      return error('A valid guest cart is required', 400);
    }

    const admin = createAdminClient();
    const { data: merged, error: mergeError } = await admin.rpc('merge_guest_cart', {
      p_guest_token: guestToken,
      p_user_id: user.id,
    });
    return mergeError
      ? error('Unable to merge the guest cart', 500)
      : response({ merged: Boolean(merged) });
  }
  if (path[0] === 'cart' && path[1] === 'items') {
    const body = await request.json();
    const cart = await loadCart(request);
    if (!cart) {
      return error('Cart unavailable');
    }
    const admin = createAdminClient();
    const { data: product } = await admin
      .from('products')
      .select('stock_quantity,reserved_quantity,active')
      .eq('id', body.productId)
      .single();
    if (!product?.active || product.stock_quantity - product.reserved_quantity < body.quantity) {
      return error('Requested quantity is unavailable', 409);
    }
    const current = cart.cart_items?.find((i: any) => i.product_id === body.productId);
    const quantity = (current?.quantity ?? 0) + Number(body.quantity);
    await admin
      .from('cart_items')
      .upsert(
        { cart_id: cart.id, product_id: body.productId, quantity },
        { onConflict: 'cart_id,product_id' }
      );
    const updated = await loadCart(request, false);
    return response(mapCart(updated));
  }
  if (path[0] === 'orders') {
    const body = await request.json();
    const cart = await loadCart(request, false);
    if (!cart?.cart_items?.length) {
      return error('Cart is empty', 409);
    }
    const identity = await cartIdentity(request);
    const key = request.headers.get('idempotency-key') ?? crypto.randomUUID();
    const admin = createAdminClient();
    const { data: created, error: e } = await admin.rpc('create_checkout', {
      p_idempotency_key: key,
      p_user_id: identity?.userId ?? null,
      p_email: body.email,
      p_phone: body.phoneNumber,
      p_customer_name: body.customerName,
      p_payment_method: body.paymentMethod,
      p_shipping_address: body.shippingAddress,
      p_items: cart.cart_items.map((i: any) => ({ productId: i.product_id, quantity: i.quantity })),
      p_notes: body.notes ?? null,
    });
    if (e) {
      return error(e.message, 409);
    }
    await admin.from('carts').update({ status: 'CONVERTED' }).eq('id', cart.id);
    const { data: order } = await admin
      .from('orders')
      .select('*,order_items(*),payments(*,payment_attempts(*))')
      .eq('id', created.orderId)
      .single();
    return response(mapOrder(order, created.guestToken), 201);
  }
  const staff = await requireStaff();
  if (!staff) {
    return error('Forbidden', 403);
  }
  if (path[0] === 'storefront-media') {
    try {
      const { fields, files } = await parseInput(request);
      const file = files.file?.[0];
      if (!file || !['JOURNAL', 'GALLERY'].includes(fields.placement)) {
        return error('An image and valid placement are required');
      }
      const mediaUrl = await uploadSiteMedia(
        staff.admin,
        `home/${fields.placement.toLowerCase()}`,
        file
      );
      const { data, error: mediaError } = await staff.admin
        .from('storefront_media_items')
        .insert({
          placement: fields.placement,
          media_url: mediaUrl,
          alt_text: fields.altText || fields.title || file.name,
          eyebrow: fields.eyebrow || null,
          title: fields.title || null,
          body: fields.body || null,
          display_order: Number(fields.displayOrder || 0),
        })
        .select('*')
        .single();
      revalidatePath('/', 'layout');
      return mediaError ? error(mediaError.message) : response(mapStorefrontMedia(data), 201);
    } catch (mediaError) {
      return error(mediaError instanceof Error ? mediaError.message : 'Unable to upload media');
    }
  }
  if (path[0] === 'category-stories' && path[1]) {
    try {
      const { fields, files } = await parseInput(request);
      if (!['HERO', 'SCENE', 'GUIDE'].includes(fields.kind) || !fields.title?.trim()) {
        return error('A valid section type and title are required');
      }
      const file = files.file?.[0];
      const mediaUrl = file
        ? await uploadMedia(staff.admin, 'product-media', `categories/${path[1]}/story`, file)
        : fields.mediaUrl || null;
      const { data, error: storyError } = await staff.admin
        .from('category_story_items')
        .insert({
          category_id: path[1],
          kind: fields.kind,
          eyebrow: fields.eyebrow || null,
          title: fields.title.trim(),
          body: fields.body || null,
          media_url: mediaUrl,
          alt_text: fields.altText || fields.title.trim(),
          display_order: Number(fields.displayOrder || 0),
          active: fields.active !== 'false',
        })
        .select('*')
        .single();
      revalidatePath('/shop/categories', 'layout');
      return storyError ? error(storyError.message) : response(mapCategoryStory(data), 201);
    } catch (storyError) {
      return error(storyError instanceof Error ? storyError.message : 'Unable to add story');
    }
  }
  if (path[0] === 'products' && path[1] && path[2] === 'images') {
    const { files } = await parseInput(request);
    const file = files.file?.[0];
    if (!file) {
      return error('Image file is required');
    }
    try {
      const imageUrl = await uploadMedia(staff.admin, 'product-media', path[1], file);
      const { data: existing } = await staff.admin
        .from('product_images')
        .select('id')
        .eq('product_id', path[1]);
      await staff.admin.from('product_images').insert({
        product_id: path[1],
        image_url: imageUrl,
        alt_text: file.name,
        is_primary: !existing?.length,
        display_order: existing?.length ?? 0,
      });
      const { data } = await staff.admin
        .from('products')
        .select(productSelect)
        .eq('id', path[1])
        .single();
      return response(mapProduct(data));
    } catch (uploadError) {
      return error(uploadError instanceof Error ? uploadError.message : 'Upload failed');
    }
  }
  if (path[0] === 'brands' && path[1] && ['logo', 'banner'].includes(path[2])) {
    const { files } = await parseInput(request);
    const file = files.file?.[0];
    if (!file) {
      return error('Image file is required');
    }
    try {
      const imageUrl = await uploadMedia(staff.admin, 'brand-media', path[1], file);
      const column = path[2] === 'logo' ? 'logo_url' : 'banner_url';
      const { data } = await staff.admin
        .from('brands')
        .update({ [column]: imageUrl })
        .eq('id', path[1])
        .select('*,products(count)')
        .single();
      return response(mapBrand(data));
    } catch (uploadError) {
      return error(uploadError instanceof Error ? uploadError.message : 'Upload failed');
    }
  }
  const input = await parseInput(request);
  const body = clean(input.fields);
  const table =
    path[0] === 'products'
      ? 'products'
      : path[0] === 'categories'
        ? 'categories'
        : path[0] === 'brands'
          ? 'brands'
          : null;
  if (!table) {
    return error('Endpoint not found', 404);
  }
  const patch =
    table === 'products'
      ? productPatch(body)
      : table === 'categories'
        ? categoryPatch(body)
        : brandPatch(body);
  const { data, error: e } = await staff.admin
    .from(table)
    .insert(clean(patch))
    .select('*')
    .single();
  if (!e && data && table === 'products' && input.files.imageFiles?.length) {
    for (const [index, file] of input.files.imageFiles.entries()) {
      const imageUrl = await uploadMedia(staff.admin, 'product-media', data.id, file);
      await staff.admin.from('product_images').insert({
        product_id: data.id,
        image_url: imageUrl,
        alt_text: data.name,
        is_primary: index === 0,
        display_order: index,
      });
    }
  }
  if (!e && data && table === 'categories') {
    const update: Record<string, string> = {};
    if (input.files.imageFile?.[0]) {
      update.image_url = await uploadMedia(
        staff.admin,
        'product-media',
        `categories/${data.id}`,
        input.files.imageFile[0]
      );
    }
    if (input.files.iconFile?.[0]) {
      update.icon_url = await uploadMedia(
        staff.admin,
        'product-media',
        `categories/${data.id}`,
        input.files.iconFile[0]
      );
    }
    if (Object.keys(update).length) {
      await staff.admin.from('categories').update(update).eq('id', data.id);
    }
  }
  if (!e && data && table === 'brands') {
    const update: Record<string, string> = {};
    if (input.files.logoFile?.[0]) {
      update.logo_url = await uploadMedia(
        staff.admin,
        'brand-media',
        `${data.id}/logo`,
        input.files.logoFile[0]
      );
    }
    if (input.files.bannerFile?.[0]) {
      update.banner_url = await uploadMedia(
        staff.admin,
        'brand-media',
        `${data.id}/banner`,
        input.files.bannerFile[0]
      );
    }
    if (Object.keys(update).length) {
      await staff.admin.from('brands').update(update).eq('id', data.id);
    }
  }
  return e ? error(e.message) : response(data, 201);
}
export async function PUT(request: Request, { params }: Context) {
  const path = (await params).path;
  if (path[0] === 'cart' && path[1] === 'items' && path[2]) {
    const cart = await loadCart(request, false);
    if (!cart) {
      return error('Cart unavailable', 404);
    }
    const body = await request.json();
    const admin = createAdminClient();
    const owns = cart.cart_items?.some((i: any) => i.id === path[2]);
    if (!owns) {
      return error('Cart item not found', 404);
    }
    await admin
      .from('cart_items')
      .update({ quantity: Number(body.quantity) })
      .eq('id', path[2]);
    return response(mapCart(await loadCart(request, false)));
  }
  const staff = await requireStaff();
  if (!staff) {
    return error('Forbidden', 403);
  }
  if (path[0] === 'orders' && path[1] && path[2] === 'status') {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    if (!status) {
      return error('Status is required');
    }
    const { data, error: transitionError } = await staff.admin.rpc('transition_order', {
      p_order_id: path[1],
      p_status: status,
      p_tracking: url.searchParams.get('trackingNumber'),
      p_actor: staff.user.id,
    });
    if (transitionError) {
      return error(transitionError.message, 409);
    }
    const { data: order } = await staff.admin
      .from('orders')
      .select('*,order_items(*),payments(*,payment_attempts(*))')
      .eq('id', data.id)
      .single();
    return response(mapOrder(order));
  }
  const input = await parseInput(request);
  const body = clean(input.fields);
  const table =
    path[0] === 'products'
      ? 'products'
      : path[0] === 'categories'
        ? 'categories'
        : path[0] === 'brands'
          ? 'brands'
          : null;
  if (!table || !path[1]) {
    return error('Endpoint not found', 404);
  }
  const patch =
    table === 'products'
      ? productPatch(body)
      : table === 'categories'
        ? categoryPatch(body)
        : brandPatch(body);
  const { data, error: e } = await staff.admin
    .from(table)
    .update(clean(patch))
    .eq('id', path[1])
    .select('*')
    .single();
  if (!e && data && table === 'categories') {
    const update: Record<string, string> = {};
    if (input.files.imageFile?.[0]) {
      update.image_url = await uploadMedia(
        staff.admin,
        'product-media',
        `categories/${data.id}`,
        input.files.imageFile[0]
      );
    }
    if (input.files.iconFile?.[0]) {
      update.icon_url = await uploadMedia(
        staff.admin,
        'product-media',
        `categories/${data.id}`,
        input.files.iconFile[0]
      );
    }
    if (Object.keys(update).length) {
      await staff.admin.from('categories').update(update).eq('id', data.id);
    }
  }
  if (!e && data && table === 'brands') {
    const update: Record<string, string> = {};
    if (input.files.logoFile?.[0]) {
      update.logo_url = await uploadMedia(
        staff.admin,
        'brand-media',
        `${data.id}/logo`,
        input.files.logoFile[0]
      );
    }
    if (input.files.bannerFile?.[0]) {
      update.banner_url = await uploadMedia(
        staff.admin,
        'brand-media',
        `${data.id}/banner`,
        input.files.bannerFile[0]
      );
    }
    if (Object.keys(update).length) {
      await staff.admin.from('brands').update(update).eq('id', data.id);
    }
  }
  return e ? error(e.message) : response(data);
}
export async function DELETE(request: Request, { params }: Context) {
  const path = (await params).path;
  if (path[0] === 'cart') {
    const cart = await loadCart(request, false);
    if (!cart) {
      return error('Cart unavailable', 404);
    }
    const admin = createAdminClient();
    if (path[1] === 'items' && path[2]) {
      await admin.from('cart_items').delete().eq('id', path[2]).eq('cart_id', cart.id);
    } else {
      await admin.from('cart_items').delete().eq('cart_id', cart.id);
    }
    return response(mapCart(await loadCart(request, false)));
  }
  if (path[0] === 'orders' && path[1]) {
    const scoped = await createClient();
    const {
      data: { user },
    } = await scoped.auth.getUser();
    const admin = createAdminClient();
    const { data: order } = await admin
      .from('orders')
      .select('user_id,guest_access_token_hash')
      .eq('id', path[1])
      .single();
    if (!order) {
      return error('Order not found', 404);
    }
    const staff = await requireStaff();
    const guestToken = request.headers.get('x-guest-order-token');
    const guestHash = guestToken
      ? await crypto.subtle
          .digest('SHA-256', new TextEncoder().encode(guestToken))
          .then((value) => Buffer.from(value).toString('hex'))
      : null;
    if (!staff && order.user_id !== user?.id && guestHash !== order.guest_access_token_hash) {
      return error('Forbidden', 403);
    }
    const { data, error: cancelError } = await admin.rpc('cancel_unpaid_order', {
      p_order_id: path[1],
      p_reason: new URL(request.url).searchParams.get('reason') ?? 'Cancelled by customer',
      p_actor: user?.id ?? null,
    });
    if (cancelError) {
      return error(cancelError.message, 409);
    }
    const { data: updated } = await admin
      .from('orders')
      .select('*,order_items(*),payments(*,payment_attempts(*))')
      .eq('id', data.id)
      .single();
    return response(mapOrder(updated));
  }
  const staff = await requireStaff();
  if (!staff) {
    return error('Forbidden', 403);
  }
  if (path[0] === 'storefront-media' && path[1]) {
    const { error: mediaError } = await staff.admin
      .from('storefront_media_items')
      .delete()
      .eq('id', path[1]);
    revalidatePath('/', 'layout');
    return mediaError ? error(mediaError.message) : response(null);
  }
  if (path[0] === 'category-stories' && path[1] && path[2]) {
    const { error: storyError } = await staff.admin
      .from('category_story_items')
      .delete()
      .eq('id', path[2])
      .eq('category_id', path[1]);
    revalidatePath('/shop/categories', 'layout');
    return storyError ? error(storyError.message) : response(null);
  }
  if (path[0] === 'products' && path[1] && path[2] === 'images' && path[3]) {
    const { error: imageError } = await staff.admin
      .from('product_images')
      .delete()
      .eq('id', path[3])
      .eq('product_id', path[1]);
    return imageError ? error(imageError.message) : response(null);
  }
  if (path[0] === 'brands' && path[1] && ['logo', 'banner'].includes(path[2])) {
    const column = path[2] === 'logo' ? 'logo_url' : 'banner_url';
    const { data, error: imageError } = await staff.admin
      .from('brands')
      .update({ [column]: null })
      .eq('id', path[1])
      .select('*,products(count)')
      .single();
    return imageError ? error(imageError.message) : response(mapBrand(data));
  }
  const table =
    path[0] === 'products'
      ? 'products'
      : path[0] === 'categories'
        ? 'categories'
        : path[0] === 'brands'
          ? 'brands'
          : null;
  if (!table || !path[1]) {
    return error('Endpoint not found', 404);
  }
  const { error: e } = await staff.admin.from(table).delete().eq('id', path[1]);
  return e ? error(e.message) : response(null);
}

export async function PATCH(request: Request, { params }: Context) {
  const path = (await params).path;
  const staff = await requireStaff();
  if (!staff) {
    return error('Forbidden', 403);
  }
  if (path[0] === 'category-stories' && path[1] && path[2]) {
    try {
      const { fields, files } = await parseInput(request);
      const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
      if (fields.kind !== undefined) {
        if (!['HERO', 'SCENE', 'GUIDE'].includes(fields.kind)) {
          return error('Invalid section type');
        }
        update.kind = fields.kind;
      }
      if (fields.title !== undefined) {
        update.title = fields.title.trim();
      }
      if (fields.eyebrow !== undefined) {
        update.eyebrow = fields.eyebrow || null;
      }
      if (fields.body !== undefined) {
        update.body = fields.body || null;
      }
      if (fields.altText !== undefined) {
        update.alt_text = fields.altText || null;
      }
      if (fields.mediaUrl !== undefined) {
        update.media_url = fields.mediaUrl || null;
      }
      if (fields.displayOrder !== undefined) {
        update.display_order = Number(fields.displayOrder);
      }
      if (fields.active !== undefined) {
        update.active = fields.active === 'true';
      }
      if (files.file?.[0]) {
        update.media_url = await uploadMedia(
          staff.admin,
          'product-media',
          `categories/${path[1]}/story`,
          files.file[0]
        );
      }
      const { data, error: storyError } = await staff.admin
        .from('category_story_items')
        .update(update)
        .eq('id', path[2])
        .eq('category_id', path[1])
        .select('*')
        .single();
      revalidatePath('/shop/categories', 'layout');
      return storyError ? error(storyError.message) : response(mapCategoryStory(data));
    } catch (storyError) {
      return error(storyError instanceof Error ? storyError.message : 'Unable to update story');
    }
  }
  if (path[0] === 'storefront-settings') {
    try {
      const { fields, files } = await parseInput(request);
      const update: Record<string, unknown> = {
        updated_at: new Date().toISOString(),
        updated_by: staff.user.id,
      };
      if (fields.siteName !== undefined) {
        update.site_name = fields.siteName;
      }
      if (fields.tagline !== undefined) {
        update.tagline = fields.tagline;
      }
      if (fields.heroAltText !== undefined) {
        update.hero_alt_text = fields.heroAltText;
      }

      const uploads = [
        ['logoFile', 'logo_url', 'branding'],
        ['heroFile', 'hero_image_url', 'home/hero'],
        ['beforeFile', 'before_image_url', 'home/before-after'],
        ['afterFile', 'after_image_url', 'home/before-after'],
        ['videoFile', 'motion_video_url', 'home/motion'],
        ['videoPosterFile', 'motion_video_poster_url', 'home/motion'],
      ] as const;
      for (const [field, column, folder] of uploads) {
        const file = files[field]?.[0];
        if (file) {
          update[column] = await uploadSiteMedia(staff.admin, folder, file);
        }
      }

      const { data, error: settingsError } = await staff.admin
        .from('storefront_settings')
        .update(update)
        .eq('id', 1)
        .select('*')
        .single();
      revalidatePath('/', 'layout');
      return settingsError ? error(settingsError.message) : response(mapStorefrontSettings(data));
    } catch (settingsError) {
      return error(
        settingsError instanceof Error ? settingsError.message : 'Unable to update media'
      );
    }
  }
  if (path[0] === 'products' && path[1] && path[2] === 'images' && path[3]) {
    const input = await request.json();
    if (input.isPrimary === true) {
      await staff.admin
        .from('product_images')
        .update({ is_primary: false })
        .eq('product_id', path[1]);
    }
    const imagePatch = clean({
      alt_text: input.altText,
      display_order: input.displayOrder,
      is_primary: input.isPrimary,
    });
    const { error: imageError } = await staff.admin
      .from('product_images')
      .update(imagePatch)
      .eq('id', path[3])
      .eq('product_id', path[1]);
    if (imageError) {
      return error(imageError.message);
    }
    const { data } = await staff.admin
      .from('products')
      .select(productSelect)
      .eq('id', path[1])
      .single();
    return response(mapProduct(data));
  }
  if (path[0] === 'products' && path[1] && path[2] === 'stock') {
    const input = await request.json();
    const { data, error: stockError } = await staff.admin.rpc('adjust_inventory', {
      p_product_id: path[1],
      p_quantity: Number(input.quantity),
      p_reason: input.reason ?? 'Admin adjustment',
      p_actor: staff.user.id,
      p_idempotency_key: request.headers.get('idempotency-key') ?? crypto.randomUUID(),
    });
    if (stockError) {
      return error(stockError.message, 409);
    }
    const { data: product } = await staff.admin
      .from('products')
      .select(productSelect)
      .eq('id', data.id)
      .single();
    return response(mapProduct(product));
  }
  if (path[0] === 'categories' && path[1] === 'reorder') {
    const ids: string[] = await request.json();
    await Promise.all(
      ids.map((id, display_order) =>
        staff.admin.from('categories').update({ display_order }).eq('id', id)
      )
    );
    return response(null);
  }
  if (path[0] === 'categories' && path[1] && path[2] === 'move') {
    const newParentId = new URL(request.url).searchParams.get('newParentId');
    if (newParentId === path[1]) {
      return error('A category cannot be its own parent');
    }
    const { data, error: moveError } = await staff.admin
      .from('categories')
      .update({ parent_id: newParentId })
      .eq('id', path[1])
      .select('*')
      .single();
    return moveError ? error(moveError.message) : response(mapCategory(data));
  }
  return error('Endpoint not found', 404);
}
