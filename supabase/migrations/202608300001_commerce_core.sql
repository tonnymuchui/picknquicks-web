create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role' and typnamespace = 'public'::regnamespace) then
    create type public.app_role as enum ('ADMIN', 'MANAGER', 'STAFF', 'CUSTOMER');
  end if;
  if not exists (select 1 from pg_type where typname = 'order_status' and typnamespace = 'public'::regnamespace) then
    create type public.order_status as enum (
      'AWAITING_PAYMENT', 'PAYMENT_CONFIRMED', 'PROCESSING', 'READY_TO_SHIP',
      'SHIPPED', 'DELIVERED', 'COMPLETED', 'CANCELLED', 'REFUND_PENDING', 'REFUNDED'
    );
  end if;
  if not exists (select 1 from pg_type where typname = 'payment_method' and typnamespace = 'public'::regnamespace) then
    create type public.payment_method as enum ('MPESA_FULL', 'CASH_ON_DELIVERY');
  end if;
  if not exists (select 1 from pg_type where typname = 'payment_purpose' and typnamespace = 'public'::regnamespace) then
    create type public.payment_purpose as enum ('ORDER_TOTAL', 'DELIVERY_FEE', 'ORDER_BALANCE', 'REFUND');
  end if;
  if not exists (select 1 from pg_type where typname = 'payment_status' and typnamespace = 'public'::regnamespace) then
    create type public.payment_status as enum (
      'REQUIRES_ACTION', 'PROCESSING', 'SUCCEEDED', 'FAILED', 'CANCELLED', 'EXPIRED', 'REFUND_PENDING', 'REFUNDED'
    );
  end if;
  if not exists (select 1 from pg_type where typname = 'inventory_movement_type' and typnamespace = 'public'::regnamespace) then
    create type public.inventory_movement_type as enum ('PURCHASE', 'SALE', 'RESERVATION', 'RELEASE', 'RETURN', 'ADJUSTMENT');
  end if;
  if not exists (select 1 from pg_type where typname = 'ledger_account_type' and typnamespace = 'public'::regnamespace) then
    create type public.ledger_account_type as enum ('ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE');
  end if;
  if not exists (select 1 from pg_type where typname = 'entry_direction' and typnamespace = 'public'::regnamespace) then
    create type public.entry_direction as enum ('DEBIT', 'CREDIT');
  end if;
  if not exists (select 1 from pg_type where typname = 'outbox_status' and typnamespace = 'public'::regnamespace) then
    create type public.outbox_status as enum ('PENDING', 'SENDING', 'SENT', 'FAILED', 'DEAD');
  end if;
end $$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  first_name text not null default '',
  last_name text not null default '',
  phone text,
  avatar_url text,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_roles (
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  primary key (user_id, role)
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  icon_url text,
  active boolean not null default true,
  display_order integer not null default 0,
  meta_title text,
  meta_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  logo_url text,
  banner_url text,
  website_url text,
  country_of_origin text,
  active boolean not null default true,
  featured boolean not null default false,
  display_order integer not null default 0,
  meta_title text,
  meta_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id),
  brand_id uuid references public.brands(id) on delete set null,
  name text not null,
  slug text not null unique,
  sku text not null unique,
  description text,
  short_description text,
  price numeric(14,2) not null check (price >= 0),
  sale_price numeric(14,2) check (sale_price >= 0 and sale_price <= price),
  cost_price numeric(14,2) not null default 0 check (cost_price >= 0),
  tax_rate numeric(7,4) not null default 0 check (tax_rate between 0 and 1),
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  reserved_quantity integer not null default 0 check (reserved_quantity between 0 and stock_quantity),
  low_stock_threshold integer not null default 3 check (low_stock_threshold >= 0),
  weight_grams integer,
  dimensions text,
  active boolean not null default true,
  featured boolean not null default false,
  is_bundle boolean not null default false,
  requires_shipping boolean not null default true,
  display_order integer not null default 0,
  meta_title text,
  meta_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_url text not null,
  alt_text text,
  is_primary boolean not null default false,
  display_order integer not null default 0
);
create unique index one_primary_product_image on public.product_images(product_id) where is_primary;

create table public.bundle_components (
  bundle_product_id uuid not null references public.products(id) on delete cascade,
  component_product_id uuid not null references public.products(id) on delete restrict,
  quantity integer not null default 1 check (quantity > 0),
  primary key (bundle_product_id, component_product_id),
  check (bundle_product_id <> component_product_id)
);

create table public.shipping_zones (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  cities text[] not null default '{}',
  fee numeric(14,2) not null check (fee >= 0),
  estimated_days integer not null default 2 check (estimated_days > 0),
  active boolean not null default true
);

create table public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  guest_token uuid,
  status text not null default 'ACTIVE' check (status in ('ACTIVE','ABANDONED','CONVERTED','EXPIRED','MERGED')),
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((user_id is not null) <> (guest_token is not null))
);
create unique index one_active_user_cart on public.carts(user_id) where status = 'ACTIVE' and user_id is not null;
create unique index one_active_guest_cart on public.carts(guest_token) where status = 'ACTIVE' and guest_token is not null;

create table public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.carts(id) on delete cascade,
  product_id uuid not null references public.products(id),
  quantity integer not null check (quantity > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (cart_id, product_id)
);

create sequence public.order_number_seq;
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique default ('PNQ-' || to_char(now(), 'YYYYMMDD') || '-' || lpad(nextval('public.order_number_seq')::text, 6, '0')),
  idempotency_key text not null unique,
  user_id uuid references auth.users(id) on delete set null,
  guest_access_token_hash text,
  email text not null,
  phone_number text not null,
  customer_name text not null,
  status public.order_status not null default 'AWAITING_PAYMENT',
  payment_method public.payment_method not null,
  currency char(3) not null default 'KES',
  subtotal numeric(14,2) not null check (subtotal >= 0),
  tax_amount numeric(14,2) not null default 0 check (tax_amount >= 0),
  shipping_cost numeric(14,2) not null default 0 check (shipping_cost >= 0),
  discount_amount numeric(14,2) not null default 0 check (discount_amount >= 0),
  total_amount numeric(14,2) not null check (total_amount >= 0),
  paid_amount numeric(14,2) not null default 0 check (paid_amount >= 0),
  balance_due numeric(14,2) generated always as (greatest(total_amount - paid_amount, 0)) stored,
  shipping_address jsonb not null,
  notes text,
  tracking_number text,
  estimated_delivery_date date,
  delivered_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete restrict,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  product_sku text not null,
  product_image_url text,
  quantity integer not null check (quantity > 0),
  unit_price numeric(14,2) not null check (unit_price >= 0),
  unit_cost numeric(14,2) not null default 0 check (unit_cost >= 0),
  tax_rate numeric(7,4) not null default 0,
  subtotal numeric(14,2) not null,
  tax_amount numeric(14,2) not null,
  total numeric(14,2) not null
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete restrict,
  purpose public.payment_purpose not null,
  method public.payment_method not null,
  status public.payment_status not null default 'REQUIRES_ACTION',
  amount numeric(14,2) not null check (amount > 0),
  currency char(3) not null default 'KES',
  idempotency_key text not null unique,
  provider text not null default 'MPESA',
  provider_reference text,
  due_at timestamptz,
  succeeded_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (order_id, purpose)
);

create table public.payment_attempts (
  id uuid primary key default gen_random_uuid(),
  payment_id uuid not null references public.payments(id) on delete restrict,
  attempt_number integer not null check (attempt_number > 0),
  status public.payment_status not null default 'PROCESSING',
  phone_number text not null,
  merchant_request_id text,
  checkout_request_id text unique,
  mpesa_receipt_number text unique,
  provider_result_code text,
  provider_result_description text,
  request_payload jsonb,
  response_payload jsonb,
  next_retry_at timestamptz,
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  unique (payment_id, attempt_number)
);

create table public.payment_events (
  id uuid primary key default gen_random_uuid(),
  payment_id uuid references public.payments(id),
  attempt_id uuid references public.payment_attempts(id),
  provider text not null,
  provider_event_id text not null,
  event_type text not null,
  payload jsonb not null,
  payload_hash text not null,
  processed_at timestamptz,
  processing_error text,
  received_at timestamptz not null default now(),
  unique (provider, provider_event_id)
);

create table public.ledger_accounts (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  type public.ledger_account_type not null,
  currency char(3) not null default 'KES',
  active boolean not null default true
);
create table public.ledger_journals (
  id uuid primary key default gen_random_uuid(),
  reference_type text not null,
  reference_id uuid not null,
  description text not null,
  idempotency_key text not null unique,
  posted_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create table public.ledger_entries (
  id uuid primary key default gen_random_uuid(),
  journal_id uuid not null references public.ledger_journals(id) on delete restrict,
  account_id uuid not null references public.ledger_accounts(id),
  direction public.entry_direction not null,
  amount numeric(14,2) not null check (amount > 0),
  currency char(3) not null default 'KES',
  created_at timestamptz not null default now()
);

create table public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id),
  order_id uuid references public.orders(id),
  type public.inventory_movement_type not null,
  quantity integer not null check (quantity <> 0),
  balance_after integer not null check (balance_after >= 0),
  unit_cost numeric(14,2),
  reason text,
  idempotency_key text not null unique,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id),
  document_type text not null check (document_type in ('INVOICE','RECEIPT','CREDIT_NOTE')),
  document_number text not null unique,
  version integer not null default 1,
  snapshot jsonb not null,
  issued_at timestamptz not null default now(),
  unique (order_id, document_type, version)
);

create table public.email_outbox (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id),
  document_id uuid references public.documents(id),
  template text not null,
  recipient text not null,
  subject text not null,
  payload jsonb not null,
  idempotency_key text not null unique,
  status public.outbox_status not null default 'PENDING',
  attempts integer not null default 0,
  next_attempt_at timestamptz not null default now(),
  provider_message_id text,
  last_error text,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.reconciliation_runs (
  id uuid primary key default gen_random_uuid(),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  status text not null default 'RUNNING' check (status in ('RUNNING','COMPLETED','FAILED')),
  checked_count integer not null default 0,
  matched_count integer not null default 0,
  exception_count integer not null default 0,
  notes jsonb not null default '{}'
);
create table public.reconciliation_items (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null references public.reconciliation_runs(id) on delete cascade,
  payment_id uuid not null references public.payments(id),
  expected_amount numeric(14,2) not null,
  provider_amount numeric(14,2),
  provider_status text,
  result text not null check (result in ('MATCHED','MISSING','AMOUNT_MISMATCH','STATUS_MISMATCH','DUPLICATE')),
  details jsonb not null default '{}'
);

create table public.audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id),
  action text not null,
  entity_type text not null,
  entity_id text not null,
  before_data jsonb,
  after_data jsonb,
  request_id text,
  created_at timestamptz not null default now()
);

create index orders_customer_idx on public.orders(user_id, created_at desc);
create index orders_status_idx on public.orders(status, created_at desc);
create index payments_status_idx on public.payments(status, created_at);
create index attempts_payment_idx on public.payment_attempts(payment_id, attempt_number desc);
create index outbox_due_idx on public.email_outbox(status, next_attempt_at);
create index inventory_product_idx on public.inventory_movements(product_id, created_at desc);

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role in ('ADMIN','MANAGER','STAFF')
  );
$$;
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'ADMIN');
$$;

create or replace function public.settle_mpesa_payment(
  p_attempt_id uuid,
  p_receipt text,
  p_amount numeric,
  p_event_id text
) returns boolean
language plpgsql security definer set search_path = '' as $$
declare
  v_payment public.payments%rowtype;
  v_order public.orders%rowtype;
  v_journal uuid;
  v_cash uuid;
  v_receivable uuid;
begin
  select p.* into v_payment from public.payments p
  join public.payment_attempts a on a.payment_id = p.id
  where a.id = p_attempt_id for update of p;
  if not found then raise exception 'Payment attempt not found'; end if;
  if v_payment.status = 'SUCCEEDED' then return false; end if;
  if p_amount <> v_payment.amount then raise exception 'Payment amount mismatch'; end if;

  select * into v_order from public.orders where id = v_payment.order_id for update;
  update public.payment_attempts set status='SUCCEEDED', mpesa_receipt_number=p_receipt,
    completed_at=now() where id=p_attempt_id;
  update public.payments set status='SUCCEEDED', provider_reference=p_receipt,
    succeeded_at=now(), updated_at=now() where id=v_payment.id;
  update public.orders set paid_amount=least(total_amount, paid_amount+p_amount),
    status=case when paid_amount+p_amount >= total_amount or v_payment.purpose='DELIVERY_FEE'
      then 'PAYMENT_CONFIRMED'::public.order_status else status end,
    updated_at=now() where id=v_order.id;

  select id into v_cash from public.ledger_accounts where code='1000-MPESA';
  select id into v_receivable from public.ledger_accounts where code='1100-AR';
  insert into public.ledger_journals(reference_type,reference_id,description,idempotency_key)
    values('PAYMENT',v_payment.id,'M-Pesa payment '||p_receipt,'mpesa:'||p_receipt)
    returning id into v_journal;
  insert into public.ledger_entries(journal_id,account_id,direction,amount) values
    (v_journal,v_cash,'DEBIT',p_amount),(v_journal,v_receivable,'CREDIT',p_amount);

  insert into public.email_outbox(order_id,template,recipient,subject,payload,idempotency_key)
    values(v_order.id,'PAYMENT_RECEIPT',v_order.email,'Receipt for '||v_order.order_number,
      jsonb_build_object('orderId',v_order.id,'paymentId',v_payment.id),
      'receipt:'||v_payment.id||':v1') on conflict (idempotency_key) do nothing;
  update public.payment_events set processed_at=now() where provider_event_id=p_event_id;
  return true;
end;
$$;

create or replace function public.create_checkout(
  p_idempotency_key text,
  p_user_id uuid,
  p_email text,
  p_phone text,
  p_customer_name text,
  p_payment_method public.payment_method,
  p_shipping_address jsonb,
  p_items jsonb,
  p_notes text default null
) returns jsonb
language plpgsql security definer set search_path = pg_catalog, extensions as $$
declare
  v_order public.orders%rowtype;
  v_item jsonb;
  v_product public.products%rowtype;
  v_component record;
  v_qty integer;
  v_unit numeric;
  v_subtotal numeric := 0;
  v_tax numeric := 0;
  v_shipping numeric;
  v_city text := lower(trim(p_shipping_address->>'city'));
  v_guest_token text := encode(extensions.gen_random_bytes(32),'hex');
  v_journal uuid;
  v_ar uuid;
  v_sales uuid;
  v_delivery uuid;
  v_tax_payable uuid;
begin
  select * into v_order from public.orders where idempotency_key=p_idempotency_key;
  if found then return jsonb_build_object('orderId',v_order.id,'orderNumber',v_order.order_number); end if;
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items)=0 then raise exception 'Cart is empty'; end if;

  for v_item in select * from jsonb_array_elements(p_items) loop
    v_qty := (v_item->>'quantity')::integer;
    select * into v_product from public.products where id=(v_item->>'productId')::uuid and active for update;
    if not found or v_qty < 1 then raise exception 'Invalid product'; end if;
    if v_product.is_bundle then
      for v_component in
        select p.*, bc.quantity as component_quantity from public.bundle_components bc
        join public.products p on p.id=bc.component_product_id
        where bc.bundle_product_id=v_product.id for update of p
      loop
        if v_component.stock_quantity-v_component.reserved_quantity < v_qty*v_component.component_quantity then
          raise exception 'Insufficient component stock for %',v_product.name;
        end if;
      end loop;
    elsif v_product.stock_quantity-v_product.reserved_quantity < v_qty then
      raise exception 'Insufficient stock for %',v_product.name;
    end if;
    v_unit := coalesce(v_product.sale_price,v_product.price);
    v_subtotal := v_subtotal + v_unit*v_qty;
    v_tax := v_tax + round((v_unit*v_qty)*v_product.tax_rate,2);
  end loop;
  select fee into v_shipping from public.shipping_zones
    where active and (v_city=any(cities) or cardinality(cities)=0)
    order by cardinality(cities)=0 limit 1;
  if v_shipping is null then raise exception 'No delivery zone found'; end if;

  insert into public.orders(idempotency_key,user_id,guest_access_token_hash,email,phone_number,
    customer_name,payment_method,subtotal,tax_amount,shipping_cost,total_amount,shipping_address,notes)
  values(p_idempotency_key,p_user_id,encode(extensions.digest(v_guest_token,'sha256'),'hex'),lower(p_email),p_phone,
    p_customer_name,p_payment_method,v_subtotal,v_tax,v_shipping,v_subtotal+v_tax+v_shipping,p_shipping_address,p_notes)
  returning * into v_order;

  for v_item in select * from jsonb_array_elements(p_items) loop
    v_qty := (v_item->>'quantity')::integer;
    select * into v_product from public.products where id=(v_item->>'productId')::uuid for update;
    v_unit := coalesce(v_product.sale_price,v_product.price);
    insert into public.order_items(order_id,product_id,product_name,product_sku,quantity,unit_price,
      unit_cost,tax_rate,subtotal,tax_amount,total)
    values(v_order.id,v_product.id,v_product.name,v_product.sku,v_qty,v_unit,v_product.cost_price,
      v_product.tax_rate,v_unit*v_qty,round(v_unit*v_qty*v_product.tax_rate,2),
      v_unit*v_qty+round(v_unit*v_qty*v_product.tax_rate,2));
    if v_product.is_bundle then
      for v_component in
        select p.*, bc.quantity as component_quantity from public.bundle_components bc
        join public.products p on p.id=bc.component_product_id
        where bc.bundle_product_id=v_product.id for update of p
      loop
        update public.products set reserved_quantity=reserved_quantity+v_qty*v_component.component_quantity,
          updated_at=now() where id=v_component.id;
        insert into public.inventory_movements(product_id,order_id,type,quantity,balance_after,reason,idempotency_key)
        values(v_component.id,v_order.id,'RESERVATION',-v_qty*v_component.component_quantity,
          v_component.stock_quantity-v_component.reserved_quantity-v_qty*v_component.component_quantity,
          'Bundle reservation: '||v_product.name,'reserve:'||v_order.id||':'||v_component.id);
      end loop;
    else
      update public.products set reserved_quantity=reserved_quantity+v_qty,updated_at=now() where id=v_product.id;
      insert into public.inventory_movements(product_id,order_id,type,quantity,balance_after,reason,idempotency_key)
      values(v_product.id,v_order.id,'RESERVATION',-v_qty,v_product.stock_quantity-v_product.reserved_quantity-v_qty,
        'Checkout reservation','reserve:'||v_order.id||':'||v_product.id);
    end if;
  end loop;

  if p_payment_method='MPESA_FULL' then
    insert into public.payments(order_id,purpose,method,amount,idempotency_key)
    values(v_order.id,'ORDER_TOTAL','MPESA_FULL',v_order.total_amount,'order-total:'||v_order.id);
  else
    if v_shipping > 0 then
      insert into public.payments(order_id,purpose,method,amount,idempotency_key)
      values(v_order.id,'DELIVERY_FEE','CASH_ON_DELIVERY',v_shipping,'delivery-fee:'||v_order.id);
    end if;
    insert into public.payments(order_id,purpose,method,amount,idempotency_key,due_at)
    values(v_order.id,'ORDER_BALANCE','CASH_ON_DELIVERY',v_subtotal+v_tax,'order-balance:'||v_order.id,
      now()+interval '7 days');
  end if;
  select id into v_ar from public.ledger_accounts where code='1100-AR';
  select id into v_sales from public.ledger_accounts where code='4000-SALES';
  select id into v_delivery from public.ledger_accounts where code='4010-DELIVERY';
  select id into v_tax_payable from public.ledger_accounts where code='2100-TAX';
  insert into public.ledger_journals(reference_type,reference_id,description,idempotency_key)
  values('ORDER',v_order.id,'Order placed '||v_order.order_number,'order:'||v_order.id)
  returning id into v_journal;
  insert into public.ledger_entries(journal_id,account_id,direction,amount) values
    (v_journal,v_ar,'DEBIT',v_order.total_amount);
  if v_subtotal > 0 then insert into public.ledger_entries(journal_id,account_id,direction,amount) values(v_journal,v_sales,'CREDIT',v_subtotal); end if;
  if v_shipping > 0 then insert into public.ledger_entries(journal_id,account_id,direction,amount) values(v_journal,v_delivery,'CREDIT',v_shipping); end if;
  if v_tax > 0 then insert into public.ledger_entries(journal_id,account_id,direction,amount) values(v_journal,v_tax_payable,'CREDIT',v_tax); end if;
  insert into public.email_outbox(order_id,template,recipient,subject,payload,idempotency_key)
  values(v_order.id,'ORDER_CONFIRMATION',v_order.email,'Order '||v_order.order_number,
    jsonb_build_object('orderId',v_order.id),'confirmation:'||v_order.id||':v1');
  return jsonb_build_object('orderId',v_order.id,'orderNumber',v_order.order_number,'guestToken',v_guest_token);
end;
$$;

create or replace function public.create_payment_attempt(p_payment_id uuid,p_phone text)
returns public.payment_attempts
language plpgsql security definer set search_path = '' as $$
declare v_payment public.payments%rowtype; v_latest public.payment_attempts%rowtype; v_attempt public.payment_attempts%rowtype;
begin
  select * into v_payment from public.payments where id=p_payment_id for update;
  if not found then raise exception 'Payment not found'; end if;
  if v_payment.status='SUCCEEDED' then raise exception 'Payment already settled'; end if;
  select * into v_latest from public.payment_attempts where payment_id=p_payment_id order by attempt_number desc limit 1;
  if found and v_latest.status='PROCESSING' then
    return v_latest;
  end if;
  insert into public.payment_attempts(payment_id,attempt_number,phone_number)
  values(p_payment_id,coalesce(v_latest.attempt_number,0)+1,p_phone) returning * into v_attempt;
  update public.payments set status='PROCESSING',updated_at=now() where id=p_payment_id;
  return v_attempt;
end;
$$;

create or replace function public.validate_payment_transition() returns trigger
language plpgsql set search_path = '' as $$
begin
  if old.status=new.status then return new; end if;
  if not ((old.status='REQUIRES_ACTION' and new.status in ('PROCESSING','CANCELLED','EXPIRED'))
    or (old.status='PROCESSING' and new.status in ('SUCCEEDED','FAILED','CANCELLED','EXPIRED'))
    or (old.status in ('FAILED','CANCELLED','EXPIRED') and new.status='PROCESSING')
    or (old.status='SUCCEEDED' and new.status='REFUND_PENDING')
    or (old.status='REFUND_PENDING' and new.status in ('REFUNDED','SUCCEEDED'))) then
    raise exception 'Invalid payment transition from % to %',old.status,new.status;
  end if;
  return new;
end;
$$;
create trigger enforce_payment_transition before update of status on public.payments
for each row execute function public.validate_payment_transition();

create or replace function public.validate_order_transition() returns trigger
language plpgsql set search_path = '' as $$
begin
  if old.status=new.status then return new; end if;
  if not ((old.status='AWAITING_PAYMENT' and new.status in ('PAYMENT_CONFIRMED','CANCELLED'))
    or (old.status='PAYMENT_CONFIRMED' and new.status in ('PROCESSING','CANCELLED','REFUND_PENDING'))
    or (old.status='PROCESSING' and new.status in ('READY_TO_SHIP','CANCELLED','REFUND_PENDING'))
    or (old.status='READY_TO_SHIP' and new.status in ('SHIPPED','CANCELLED'))
    or (old.status='SHIPPED' and new.status in ('DELIVERED','REFUND_PENDING'))
    or (old.status='DELIVERED' and new.status in ('COMPLETED','REFUND_PENDING'))
    or (old.status='COMPLETED' and new.status='REFUND_PENDING')
    or (old.status='REFUND_PENDING' and new.status in ('REFUNDED','COMPLETED'))) then
    raise exception 'Invalid order transition from % to %',old.status,new.status;
  end if;
  return new;
end;
$$;
create trigger enforce_order_transition before update of status on public.orders
for each row execute function public.validate_order_transition();

create or replace function public.record_delivery_collection(p_payment_id uuid,p_amount numeric,p_idempotency_key text,p_actor uuid)
returns boolean language plpgsql security definer set search_path = '' as $$
declare v_payment public.payments%rowtype; v_order public.orders%rowtype; v_journal uuid; v_cash uuid; v_ar uuid;
begin
  select * into v_payment from public.payments where id=p_payment_id for update;
  if not found or v_payment.purpose<>'ORDER_BALANCE' then raise exception 'Balance payment not found'; end if;
  if v_payment.status='SUCCEEDED' then return false; end if;
  if p_amount<>v_payment.amount then raise exception 'Collected amount mismatch'; end if;
  select * into v_order from public.orders where id=v_payment.order_id for update;
  update public.payments set status='PROCESSING' where id=v_payment.id;
  update public.payments set status='SUCCEEDED',provider='CASH',provider_reference=p_idempotency_key,succeeded_at=now(),updated_at=now() where id=v_payment.id;
  if v_order.status='SHIPPED' then
    update public.orders set status='DELIVERED',delivered_at=coalesce(delivered_at,now()),updated_at=now() where id=v_order.id;
  end if;
  update public.orders set paid_amount=least(total_amount,paid_amount+p_amount),status='COMPLETED',delivered_at=coalesce(delivered_at,now()),updated_at=now() where id=v_order.id;
  select id into v_cash from public.ledger_accounts where code='1010-CASH'; select id into v_ar from public.ledger_accounts where code='1100-AR';
  insert into public.ledger_journals(reference_type,reference_id,description,idempotency_key) values('PAYMENT',v_payment.id,'Cash collected on delivery',p_idempotency_key) returning id into v_journal;
  insert into public.ledger_entries(journal_id,account_id,direction,amount) values(v_journal,v_cash,'DEBIT',p_amount),(v_journal,v_ar,'CREDIT',p_amount);
  insert into public.email_outbox(order_id,template,recipient,subject,payload,idempotency_key) values(v_order.id,'PAYMENT_RECEIPT',v_order.email,'Final receipt for '||v_order.order_number,jsonb_build_object('orderId',v_order.id,'paymentId',v_payment.id),'receipt:'||v_payment.id||':v1') on conflict do nothing;
  insert into public.audit_log(actor_id,action,entity_type,entity_id,after_data) values(p_actor,'COLLECT_DELIVERY_BALANCE','payment',v_payment.id::text,jsonb_build_object('amount',p_amount));
  return true;
end;
$$;

create or replace function public.claim_email_outbox(p_limit integer default 10)
returns setof public.email_outbox language plpgsql security definer set search_path = '' as $$
begin
  return query
  update public.email_outbox e set status='SENDING',attempts=e.attempts+1
  where e.id in (
    select id from public.email_outbox
    where status in ('PENDING','FAILED') and next_attempt_at<=now() and attempts<6
    order by created_at for update skip locked limit least(p_limit,25)
  ) returning e.*;
end;
$$;

create or replace function public.transition_order(p_order_id uuid,p_status public.order_status,p_tracking text,p_actor uuid)
returns public.orders language plpgsql security definer set search_path = '' as $$
declare v_order public.orders%rowtype;
begin
  select * into v_order from public.orders where id=p_order_id for update;
  if not found then raise exception 'Order not found'; end if;
  update public.orders set status=p_status,tracking_number=coalesce(p_tracking,tracking_number),
    delivered_at=case when p_status='DELIVERED' then now() else delivered_at end,updated_at=now()
  where id=p_order_id returning * into v_order;
  insert into public.audit_log(actor_id,action,entity_type,entity_id,after_data)
  values(p_actor,'TRANSITION_ORDER','order',p_order_id::text,jsonb_build_object('status',p_status,'trackingNumber',p_tracking));
  return v_order;
end;
$$;

create or replace function public.cancel_unpaid_order(p_order_id uuid,p_reason text,p_actor uuid)
returns public.orders language plpgsql security definer set search_path = '' as $$
declare v_order public.orders%rowtype; v_movement record; v_source uuid; v_reversal uuid;
begin
  select * into v_order from public.orders where id=p_order_id for update;
  if not found then raise exception 'Order not found'; end if;
  if v_order.paid_amount>0 then raise exception 'Paid orders require the refund workflow'; end if;
  update public.orders set status='CANCELLED',cancelled_at=now(),notes=concat_ws(E'\n',notes,'Cancellation: '||p_reason),updated_at=now() where id=p_order_id returning * into v_order;
  for v_movement in select product_id,sum(-quantity)::integer as release_qty from public.inventory_movements where order_id=p_order_id and type='RESERVATION' group by product_id loop
    update public.products set reserved_quantity=greatest(0,reserved_quantity-v_movement.release_qty),updated_at=now() where id=v_movement.product_id;
    insert into public.inventory_movements(product_id,order_id,type,quantity,balance_after,reason,idempotency_key,created_by)
    select p.id,p_order_id,'RELEASE',v_movement.release_qty,p.stock_quantity-p.reserved_quantity,'Order cancelled','release:'||p_order_id||':'||p.id,p_actor from public.products p where p.id=v_movement.product_id;
  end loop;
  select id into v_source from public.ledger_journals where idempotency_key='order:'||p_order_id;
  insert into public.ledger_journals(reference_type,reference_id,description,idempotency_key) values('ORDER_CANCELLATION',p_order_id,'Reverse cancelled order','cancel:'||p_order_id) returning id into v_reversal;
  insert into public.ledger_entries(journal_id,account_id,direction,amount,currency)
  select v_reversal,account_id,case when direction='DEBIT' then 'CREDIT'::public.entry_direction else 'DEBIT'::public.entry_direction end,amount,currency from public.ledger_entries where journal_id=v_source;
  insert into public.audit_log(actor_id,action,entity_type,entity_id,after_data) values(p_actor,'CANCEL_ORDER','order',p_order_id::text,jsonb_build_object('reason',p_reason));
  return v_order;
end;
$$;

create or replace function public.adjust_inventory(p_product_id uuid,p_quantity integer,p_reason text,p_actor uuid,p_idempotency_key text)
returns public.products language plpgsql security definer set search_path = '' as $$
declare v_product public.products%rowtype;
begin
  select * into v_product from public.products where id=p_product_id for update;
  if not found then raise exception 'Product not found'; end if;
  if v_product.stock_quantity+p_quantity<v_product.reserved_quantity then raise exception 'Adjustment would consume reserved stock'; end if;
  update public.products set stock_quantity=stock_quantity+p_quantity,updated_at=now() where id=p_product_id returning * into v_product;
  insert into public.inventory_movements(product_id,type,quantity,balance_after,reason,idempotency_key,created_by)
  values(p_product_id,'ADJUSTMENT',p_quantity,v_product.stock_quantity-v_product.reserved_quantity,p_reason,p_idempotency_key,p_actor);
  insert into public.audit_log(actor_id,action,entity_type,entity_id,after_data) values(p_actor,'ADJUST_INVENTORY','product',p_product_id::text,jsonb_build_object('quantity',p_quantity,'reason',p_reason));
  return v_product;
end;
$$;

create or replace function public.assert_balanced_journal() returns trigger
language plpgsql set search_path = '' as $$
declare v_journal uuid; v_debits numeric; v_credits numeric;
begin
  v_journal := coalesce(new.journal_id, old.journal_id);
  select coalesce(sum(amount) filter(where direction='DEBIT'),0),
         coalesce(sum(amount) filter(where direction='CREDIT'),0)
    into v_debits,v_credits from public.ledger_entries where journal_id=v_journal;
  if v_debits <> v_credits then raise exception 'Unbalanced ledger journal %',v_journal; end if;
  return null;
end;
$$;
create constraint trigger ledger_must_balance after insert or update or delete on public.ledger_entries
deferrable initially deferred for each row execute function public.assert_balanced_journal();

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles(id,email,first_name,last_name,avatar_url)
  values(new.id,new.email,coalesce(new.raw_user_meta_data->>'first_name',''),
    coalesce(new.raw_user_meta_data->>'last_name',''),new.raw_user_meta_data->>'avatar_url');
  insert into public.user_roles(user_id,role) values(new.id,'CUSTOMER');
  return new;
end;
$$;
create trigger auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.categories enable row level security;
alter table public.brands enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.bundle_components enable row level security;
alter table public.shipping_zones enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
alter table public.payment_attempts enable row level security;
alter table public.payment_events enable row level security;
alter table public.ledger_accounts enable row level security;
alter table public.ledger_journals enable row level security;
alter table public.ledger_entries enable row level security;
alter table public.inventory_movements enable row level security;
alter table public.documents enable row level security;
alter table public.email_outbox enable row level security;
alter table public.reconciliation_runs enable row level security;
alter table public.reconciliation_items enable row level security;
alter table public.audit_log enable row level security;

create policy "public catalog read" on public.products for select using (active or public.is_staff());
create policy "public category read" on public.categories for select using (active or public.is_staff());
create policy "public brand read" on public.brands for select using (active or public.is_staff());
create policy "public product images read" on public.product_images for select using (true);
create policy "public bundles read" on public.bundle_components for select using (true);
create policy "public shipping read" on public.shipping_zones for select using (active or public.is_staff());
create policy "staff catalog manage" on public.products for all using (public.is_staff()) with check (public.is_staff());
create policy "staff category manage" on public.categories for all using (public.is_staff()) with check (public.is_staff());
create policy "staff brand manage" on public.brands for all using (public.is_staff()) with check (public.is_staff());
create policy "staff image manage" on public.product_images for all using (public.is_staff()) with check (public.is_staff());
create policy "staff bundle manage" on public.bundle_components for all using (public.is_staff()) with check (public.is_staff());
create policy "profile own read" on public.profiles for select using (id=auth.uid() or public.is_staff());
create policy "profile own update" on public.profiles for update using (id=auth.uid()) with check (id=auth.uid());
create policy "roles own read" on public.user_roles for select using (user_id=auth.uid() or public.is_admin());
create policy "roles admin manage" on public.user_roles for all using (public.is_admin()) with check (public.is_admin());
create policy "orders own read" on public.orders for select using (user_id=auth.uid() or public.is_staff());
create policy "order items own read" on public.order_items for select using (
  exists(select 1 from public.orders o where o.id=order_id and (o.user_id=auth.uid() or public.is_staff()))
);
create policy "payments own read" on public.payments for select using (
  exists(select 1 from public.orders o where o.id=order_id and (o.user_id=auth.uid() or public.is_staff()))
);
create policy "attempts own read" on public.payment_attempts for select using (
  exists(select 1 from public.payments p join public.orders o on o.id=p.order_id
    where p.id=payment_id and (o.user_id=auth.uid() or public.is_staff()))
);
create policy "documents own read" on public.documents for select using (
  exists(select 1 from public.orders o where o.id=order_id and (o.user_id=auth.uid() or public.is_staff()))
);
create policy "staff inventory read" on public.inventory_movements for select using (public.is_staff());
create policy "admin ledger accounts" on public.ledger_accounts for select using (public.is_admin());
create policy "admin ledger journals" on public.ledger_journals for select using (public.is_admin());
create policy "admin ledger entries" on public.ledger_entries for select using (public.is_admin());
create policy "admin reconciliation" on public.reconciliation_runs for select using (public.is_admin());
create policy "admin reconciliation items" on public.reconciliation_items for select using (public.is_admin());
create policy "admin audit" on public.audit_log for select using (public.is_admin());

revoke all on function public.create_checkout(text,uuid,text,text,text,public.payment_method,jsonb,jsonb,text) from public, anon, authenticated;
revoke all on function public.create_payment_attempt(uuid,text) from public, anon, authenticated;
revoke all on function public.settle_mpesa_payment(uuid,text,numeric,text) from public, anon, authenticated;
revoke all on function public.record_delivery_collection(uuid,numeric,text,uuid) from public, anon, authenticated;
revoke all on function public.claim_email_outbox(integer) from public, anon, authenticated;
revoke all on function public.transition_order(uuid,public.order_status,text,uuid) from public, anon, authenticated;
revoke all on function public.cancel_unpaid_order(uuid,text,uuid) from public, anon, authenticated;
revoke all on function public.adjust_inventory(uuid,integer,text,uuid,text) from public, anon, authenticated;
grant execute on function public.create_checkout(text,uuid,text,text,text,public.payment_method,jsonb,jsonb,text) to service_role;
grant execute on function public.create_payment_attempt(uuid,text) to service_role;
grant execute on function public.settle_mpesa_payment(uuid,text,numeric,text) to service_role;
grant execute on function public.record_delivery_collection(uuid,numeric,text,uuid) to service_role;
grant execute on function public.claim_email_outbox(integer) to service_role;
grant execute on function public.transition_order(uuid,public.order_status,text,uuid) to service_role;
grant execute on function public.cancel_unpaid_order(uuid,text,uuid) to service_role;
grant execute on function public.adjust_inventory(uuid,integer,text,uuid,text) to service_role;

insert into public.ledger_accounts(code,name,type) values
 ('1000-MPESA','M-Pesa clearing','ASSET'),
 ('1010-CASH','Cash on hand','ASSET'),
 ('1100-AR','Accounts receivable','ASSET'),
 ('2000-CUSTOMER','Customer deposits','LIABILITY'),
 ('2100-TAX','Tax payable','LIABILITY'),
 ('4000-SALES','Product sales','REVENUE'),
 ('4010-DELIVERY','Delivery income','REVENUE'),
 ('5000-COGS','Cost of goods sold','EXPENSE'),
 ('1200-INVENTORY','Inventory','ASSET');

insert into public.shipping_zones(name,cities,fee,estimated_days) values
 ('Nairobi',array['nairobi','kiambu','ruaka','rongai','kitengela'],500,1),
 ('Major towns',array['mombasa','nakuru','kisumu','eldoret','thika','naivasha'],800,2),
 ('Rest of Kenya',array[]::text[],1200,3);

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values
 ('product-media','product-media',true,5242880,array['image/jpeg','image/png','image/webp','image/avif']),
 ('brand-media','brand-media',true,5242880,array['image/jpeg','image/png','image/webp','image/svg+xml']),
 ('avatars','avatars',true,3145728,array['image/jpeg','image/png','image/webp'])
on conflict(id) do nothing;
create policy "avatar public read" on storage.objects for select using (bucket_id='avatars');
create policy "avatar own upload" on storage.objects for insert to authenticated with check (bucket_id='avatars' and (storage.foldername(name))[1]=auth.uid()::text);
create policy "avatar own update" on storage.objects for update to authenticated using (bucket_id='avatars' and (storage.foldername(name))[1]=auth.uid()::text);
