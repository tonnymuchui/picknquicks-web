do $$
declare
  v_connectivity_id uuid;
  v_accessories_id uuid;
begin
  select id into v_connectivity_id
    from public.categories
   where slug = 'connectivity';

  select id into v_accessories_id
    from public.categories
   where slug = 'accessories';

  if v_accessories_id is null then
    raise exception 'Accessories category is required before merging Connectivity';
  end if;

  update public.categories
     set parent_id = null,
         updated_at = now()
   where id = v_accessories_id
     and parent_id is not null;

  if v_connectivity_id is not null then
    update public.products
       set category_id = v_accessories_id,
           updated_at = now()
     where category_id = v_connectivity_id;

    update public.categories
       set parent_id = v_accessories_id,
           updated_at = now()
     where parent_id = v_connectivity_id
       and id <> v_accessories_id;

    update public.categories
       set active = false,
           updated_at = now()
     where id = v_connectivity_id;
  end if;

  update public.categories
     set description = 'Docks, adapters, mice, webcams, and practical extras that keep your workspace connected and complete.',
         meta_title = coalesce(meta_title, 'Workspace Accessories'),
         display_order = least(display_order, 3),
         updated_at = now()
   where id = v_accessories_id;
end;
$$;
