
create index if not exists unclaimed_orders_email_idx
  on public.orders (lower(email), created_at desc)
  where user_id is null;

create or replace function public.revoke_guest_order_access_when_owned()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.user_id is not null then
    new.guest_access_token_hash := null;
  end if;
  return new;
end;
$$;

drop trigger if exists revoke_guest_order_access_when_owned on public.orders;
create trigger revoke_guest_order_access_when_owned
before insert or update of user_id on public.orders
for each row execute function public.revoke_guest_order_access_when_owned();

create or replace function public.claim_verified_guest_orders()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.email is null or new.email_confirmed_at is null then
    return new;
  end if;

  update public.orders
     set user_id = new.id,
         guest_access_token_hash = null,
         updated_at = now()
   where user_id is null
     and lower(email) = lower(new.email);

  return new;
end;
$$;

drop trigger if exists auth_user_verified_order_claim_insert on auth.users;
create trigger auth_user_verified_order_claim_insert
after insert on auth.users
for each row execute function public.claim_verified_guest_orders();

drop trigger if exists auth_user_verified_order_claim_update on auth.users;
create trigger auth_user_verified_order_claim_update
after update of email, email_confirmed_at on auth.users
for each row execute function public.claim_verified_guest_orders();

update public.orders as orders
   set user_id = users.id,
       guest_access_token_hash = null,
       updated_at = now()
  from auth.users as users
 where orders.user_id is null
   and users.email is not null
   and users.email_confirmed_at is not null
   and lower(orders.email) = lower(users.email);

create or replace function public.claim_guest_orders_for_user(p_user_id uuid)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_email text;
  v_claimed integer;
begin
  select email into v_email
    from auth.users
   where id = p_user_id
     and email is not null
     and email_confirmed_at is not null;

  if v_email is null then
    return 0;
  end if;

  with claimed as (
    update public.orders
       set user_id = p_user_id,
           guest_access_token_hash = null,
           updated_at = now()
     where user_id is null
       and lower(email) = lower(v_email)
    returning id
  )
  select count(*)::integer into v_claimed from claimed;

  return v_claimed;
end;
$$;

revoke all on function public.claim_guest_orders_for_user(uuid) from public, anon, authenticated;
grant execute on function public.claim_guest_orders_for_user(uuid) to service_role;

create or replace function public.merge_guest_cart(
  p_guest_token uuid,
  p_user_id uuid
) returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_guest_cart_id uuid;
  v_user_cart_id uuid;
begin
  select id into v_guest_cart_id
    from public.carts
   where guest_token = p_guest_token
     and status = 'ACTIVE'
   for update;

  if v_guest_cart_id is null then
    return false;
  end if;

  select id into v_user_cart_id
    from public.carts
   where user_id = p_user_id
     and status = 'ACTIVE'
   for update;

  if v_user_cart_id is null then
    update public.carts
       set user_id = p_user_id,
           guest_token = null,
           updated_at = now()
     where id = v_guest_cart_id;
    return true;
  end if;

  insert into public.cart_items (cart_id, product_id, quantity)
  select v_user_cart_id, product_id, quantity
    from public.cart_items
   where cart_id = v_guest_cart_id
  on conflict (cart_id, product_id) do update
    set quantity = public.cart_items.quantity + excluded.quantity,
        updated_at = now();

  delete from public.cart_items where cart_id = v_guest_cart_id;
  update public.carts
     set status = 'MERGED',
         updated_at = now()
   where id = v_guest_cart_id;

  return true;
end;
$$;

revoke all on function public.merge_guest_cart(uuid, uuid) from public, anon, authenticated;
grant execute on function public.merge_guest_cart(uuid, uuid) to service_role;
