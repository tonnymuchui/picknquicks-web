update public.categories
set
  name = 'Accessories',
  slug = 'accessories',
  description = 'Mice, webcams, and practical extras for work, calls, and play.',
  meta_title = coalesce(meta_title, 'Workspace Accessories'),
  updated_at = now()
where slug = 'peripherals' or name = 'Peripherals';

update public.products
set
  description = replace(description, 'display and peripherals', 'display and accessories'),
  updated_at = now()
where description like '%display and peripherals%';
