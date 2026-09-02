
create or replace function public.normalize_and_validate_shipping_zone()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.name := btrim(new.name);

  select coalesce(array_agg(city order by city), array[]::text[])
    into new.cities
  from (
    select distinct lower(btrim(raw.city)) as city
    from unnest(new.cities) as raw(city)
    where btrim(raw.city) <> ''
  ) normalized;

  if new.active and cardinality(new.cities) > 0 and exists (
    select 1
    from public.shipping_zones zone
    where zone.id <> new.id
      and zone.active
      and cardinality(zone.cities) > 0
      and zone.cities && new.cities
  ) then
    raise exception 'One or more locations already belong to another active delivery zone';
  end if;

  return new;
end;
$$;

drop trigger if exists normalize_shipping_zone on public.shipping_zones;
create trigger normalize_shipping_zone
before insert or update of name, cities, active on public.shipping_zones
for each row execute function public.normalize_and_validate_shipping_zone();

update public.shipping_zones set cities = cities;

create unique index if not exists shipping_zones_name_unique
  on public.shipping_zones (lower(name));

create unique index if not exists shipping_zones_one_active_fallback
  on public.shipping_zones (active)
  where active and cardinality(cities) = 0;

create or replace function public.require_active_shipping_fallback()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if not exists (
    select 1 from public.shipping_zones
    where active and cardinality(cities) = 0
  ) then
    raise exception 'At least one active fallback delivery zone is required';
  end if;
  return null;
end;
$$;

drop trigger if exists require_shipping_fallback on public.shipping_zones;
create constraint trigger require_shipping_fallback
after insert or update or delete on public.shipping_zones
deferrable initially deferred
for each row execute function public.require_active_shipping_fallback();

drop policy if exists "staff shipping manage" on public.shipping_zones;
create policy "staff shipping manage"
on public.shipping_zones
for all
using (public.is_staff())
with check (public.is_staff());

