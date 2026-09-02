do $$
declare
  v_sets uuid;
  v_brand uuid;
  v_remote uuid;
  v_creator uuid;
  v_single_desk uuid;
  v_dual_desk uuid;
  v_monitor uuid;
  v_arm_32 uuid;
  v_arm_45 uuid;
  v_chair uuid;
  v_light uuid;
  v_dock uuid;
  v_webcam uuid;
begin
  select id into v_sets from public.categories where slug='complete-setups';
  select id into v_brand from public.brands where slug='picknquicks-select';
  select id into v_single_desk from public.products where sku='DSK-SINGLE-01';
  select id into v_dual_desk from public.products where sku='DSK-DUAL-01';
  select id into v_monitor from public.products where sku='MON-34-4K';
  select id into v_arm_32 from public.products where sku='ARM-32-01';
  select id into v_arm_45 from public.products where sku='ARM-45-01';
  select id into v_chair from public.products where sku='CHR-ERG-01';
  select id into v_light from public.products where sku='LMP-EYE-01';
  select id into v_dock from public.products where sku='DCK-USBC-8';
  select id into v_webcam from public.products where sku='CAM-2K-5MP';

  insert into public.products(
    category_id,brand_id,name,slug,sku,short_description,description,price,cost_price,
    stock_quantity,featured,is_bundle,display_order
  ) values (
    v_sets,v_brand,'Remote Ready Base','remote-ready-base','BND-REMOTE-BASE',
    'A compact sit–stand desk, monitor arm, webcam, light and USB-C dock. Bring your screen.',
    'A considered starting point for remote work in a smaller room. The single-motor desk adds posture changes, the arm supports a 17–32-inch screen you already own, and the webcam, low-glare light and USB-C dock make calls and laptop connection feel intentional.',
    31500,21412,6,true,true,3
  ) on conflict(sku) do update set
    name=excluded.name,slug=excluded.slug,short_description=excluded.short_description,
    description=excluded.description,price=excluded.price,cost_price=excluded.cost_price,
    active=true,featured=true,is_bundle=true,display_order=excluded.display_order
  returning id into v_remote;

  insert into public.bundle_components(bundle_product_id,component_product_id,quantity) values
    (v_remote,v_single_desk,1),(v_remote,v_arm_32,1),(v_remote,v_webcam,1),
    (v_remote,v_light,1),(v_remote,v_dock,1)
  on conflict do nothing;
  insert into public.product_images(product_id,image_url,alt_text,is_primary)
  values(v_remote,'/images/complete-setup-remote-v1.png','Compact height-adjustable remote work setup with monitor arm, webcam, task light and dock',true)
  on conflict(product_id) where is_primary do update set
    image_url=excluded.image_url,alt_text=excluded.alt_text;

  insert into public.products(
    category_id,brand_id,name,slug,sku,short_description,description,price,cost_price,
    stock_quantity,featured,is_bundle,display_order
  ) values (
    v_sets,v_brand,'Complete Creator Studio','complete-creator-studio','BND-CREATOR-STUDIO',
    'Dual-motor desk, 4K ultrawide, heavy-duty arm, ergonomic chair, light, dock and webcam.',
    'A full workspace reset for creators, founders and people who work from home all day. The large display and matched arm handle focused work, the desk and chair support posture changes, while the dock, light and webcam make switching into calls effortless.',
    114000,65712,6,true,true,4
  ) on conflict(sku) do update set
    name=excluded.name,slug=excluded.slug,short_description=excluded.short_description,
    description=excluded.description,price=excluded.price,cost_price=excluded.cost_price,
    active=true,featured=true,is_bundle=true,display_order=excluded.display_order
  returning id into v_creator;

  insert into public.bundle_components(bundle_product_id,component_product_id,quantity) values
    (v_creator,v_dual_desk,1),(v_creator,v_monitor,1),(v_creator,v_arm_45,1),
    (v_creator,v_chair,1),(v_creator,v_light,1),(v_creator,v_dock,1),(v_creator,v_webcam,1)
  on conflict do nothing;
  insert into public.product_images(product_id,image_url,alt_text,is_primary)
  values(v_creator,'/images/complete-setup-deep-work-v1.png','Complete creator workstation with adjustable desk, ultrawide monitor, monitor arm and ergonomic chair',true)
  on conflict(product_id) where is_primary do update set
    image_url=excluded.image_url,alt_text=excluded.alt_text;

  update public.categories
  set description='Desk recipes built around real working days: compatible screens, arms, adjustable desks, lighting and connectivity at one package price.',
      image_url='/images/complete-setup-deep-work-v1.png',updated_at=now()
  where id=v_sets;

  update public.product_images
  set image_url='/images/complete-setup-deep-work-v1.png',
      alt_text='Dual-motor adjustable desk with ultrawide monitor on a heavy-duty arm'
  where product_id=(select id from public.products where sku='BND-DEEP-WORK') and is_primary;
end $$;
