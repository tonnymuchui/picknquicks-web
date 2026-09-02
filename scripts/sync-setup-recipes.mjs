import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY;
if (!url || !secret) {
  throw new Error('Supabase server environment is required');
}

class NoopWebSocket {}
const supabase = createClient(url, secret, {
  auth: { persistSession: false },
  realtime: { transport: NoopWebSocket },
});
const fail = (message, error) => {
  if (error) {
    throw new Error(`${message}: ${error.message}`);
  }
};

const { data: category, error: categoryError } = await supabase
  .from('categories')
  .select('id')
  .eq('slug', 'complete-setups')
  .single();
fail('Complete Setups category lookup failed', categoryError);

const { data: brand, error: brandError } = await supabase
  .from('brands')
  .select('id')
  .eq('slug', 'picknquicks-select')
  .single();
fail('Brand lookup failed', brandError);

const componentSkus = [
  'DSK-SINGLE-01',
  'DSK-DUAL-01',
  'MON-34-4K',
  'ARM-32-01',
  'ARM-45-01',
  'CHR-ERG-01',
  'LMP-EYE-01',
  'DCK-USBC-8',
  'CAM-2K-5MP',
];
const { data: components, error: componentError } = await supabase
  .from('products')
  .select('id,sku')
  .in('sku', componentSkus);
fail('Bundle component lookup failed', componentError);
if (components.length !== componentSkus.length) {
  throw new Error('One or more bundle components are missing');
}
const componentId = Object.fromEntries(components.map((product) => [product.sku, product.id]));

const products = [
  {
    category_id: category.id,
    brand_id: brand.id,
    name: 'Remote Ready Base',
    slug: 'remote-ready-base',
    sku: 'BND-REMOTE-BASE',
    short_description:
      'A compact sit–stand desk, monitor arm, webcam, light and USB-C dock. Bring your screen.',
    description:
      'A considered starting point for remote work in a smaller room. The single-motor desk adds posture changes, the arm supports a 17–32-inch screen you already own, and the webcam, low-glare light and USB-C dock make calls and laptop connection feel intentional.',
    price: 31500,
    cost_price: 21412,
    stock_quantity: 6,
    active: true,
    featured: true,
    is_bundle: true,
    display_order: 3,
  },
  {
    category_id: category.id,
    brand_id: brand.id,
    name: 'Complete Creator Studio',
    slug: 'complete-creator-studio',
    sku: 'BND-CREATOR-STUDIO',
    short_description:
      'Dual-motor desk, 4K ultrawide, heavy-duty arm, ergonomic chair, light, dock and webcam.',
    description:
      'A full workspace reset for creators, founders and people who work from home all day. The large display and matched arm handle focused work, the desk and chair support posture changes, while the dock, light and webcam make switching into calls effortless.',
    price: 114000,
    cost_price: 65712,
    stock_quantity: 6,
    active: true,
    featured: true,
    is_bundle: true,
    display_order: 4,
  },
];
const { data: bundles, error: bundleError } = await supabase
  .from('products')
  .upsert(products, { onConflict: 'sku' })
  .select('id,sku');
fail('Bundle upsert failed', bundleError);
const bundleId = Object.fromEntries(bundles.map((product) => [product.sku, product.id]));

const links = {
  'BND-REMOTE-BASE': ['DSK-SINGLE-01', 'ARM-32-01', 'CAM-2K-5MP', 'LMP-EYE-01', 'DCK-USBC-8'],
  'BND-CREATOR-STUDIO': [
    'DSK-DUAL-01',
    'MON-34-4K',
    'ARM-45-01',
    'CHR-ERG-01',
    'LMP-EYE-01',
    'DCK-USBC-8',
    'CAM-2K-5MP',
  ],
};
const bundleComponents = Object.entries(links).flatMap(([bundleSku, skus]) =>
  skus.map((sku) => ({
    bundle_product_id: bundleId[bundleSku],
    component_product_id: componentId[sku],
    quantity: 1,
  }))
);
const { error: linksError } = await supabase
  .from('bundle_components')
  .upsert(bundleComponents, { onConflict: 'bundle_product_id,component_product_id' });
fail('Bundle component sync failed', linksError);

const images = [
  {
    sku: 'BND-REMOTE-BASE',
    image_url: '/images/complete-setup-remote-v1.png',
    alt_text:
      'Compact height-adjustable remote work setup with monitor arm, webcam, task light and dock',
  },
  {
    sku: 'BND-CREATOR-STUDIO',
    image_url: '/images/complete-setup-deep-work-v1.png',
    alt_text:
      'Complete creator workstation with adjustable desk, ultrawide monitor, monitor arm and ergonomic chair',
  },
];
for (const image of images) {
  const { sku, ...imagePatch } = image;
  const productId = bundleId[sku];
  const { data: current, error: imageLookupError } = await supabase
    .from('product_images')
    .select('id')
    .eq('product_id', productId)
    .eq('is_primary', true)
    .maybeSingle();
  fail('Primary image lookup failed', imageLookupError);
  const query = current
    ? supabase.from('product_images').update(imagePatch).eq('id', current.id)
    : supabase
        .from('product_images')
        .insert({ product_id: productId, ...imagePatch, is_primary: true });
  const { error: imageError } = await query;
  fail('Primary image sync failed', imageError);
}

const { error: categoryUpdateError } = await supabase
  .from('categories')
  .update({
    description:
      'Desk recipes built around real working days: compatible screens, arms, adjustable desks, lighting and connectivity at one package price.',
    image_url: '/images/complete-setup-deep-work-v1.png',
  })
  .eq('id', category.id);
fail('Category update failed', categoryUpdateError);

const { data: deepWork } = await supabase
  .from('products')
  .select('id')
  .eq('sku', 'BND-DEEP-WORK')
  .single();
if (deepWork) {
  await supabase
    .from('product_images')
    .update({
      image_url: '/images/complete-setup-deep-work-v1.png',
      alt_text: 'Dual-motor adjustable desk with ultrawide monitor on a heavy-duty arm',
    })
    .eq('product_id', deepWork.id)
    .eq('is_primary', true);
}

console.warn(
  `Synced ${bundles.length} setup recipes and ${bundleComponents.length} component links.`
);
