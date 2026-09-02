
alter table public.orders
  add column if not exists source text not null default 'ONLINE'
  check (source in ('ONLINE', 'PHONE', 'IN_STORE'));

create index if not exists orders_source_created_idx
  on public.orders(source, created_at desc);

drop policy if exists "staff email delivery read" on public.email_outbox;
create policy "staff email delivery read"
on public.email_outbox
for select
using (public.is_staff());

create or replace function public.create_staff_order(
  p_idempotency_key text,
  p_actor uuid,
  p_email text,
  p_phone text,
  p_customer_name text,
  p_payment_method public.payment_method,
  p_shipping_address jsonb,
  p_items jsonb,
  p_notes text default null,
  p_source text default 'PHONE'
) returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, extensions
as $$
declare
  v_result jsonb;
  v_order_id uuid;
  v_tagged boolean := false;
begin
  if p_source not in ('PHONE', 'IN_STORE') then
    raise exception 'Invalid back-office order source';
  end if;

  if not exists (
    select 1 from public.user_roles
    where user_id = p_actor and role in ('ADMIN', 'MANAGER')
  ) then
    raise exception 'Only an administrator or manager can create a back-office order';
  end if;

  v_result := public.create_checkout(
    p_idempotency_key,
    null,
    p_email,
    p_phone,
    p_customer_name,
    p_payment_method,
    p_shipping_address,
    p_items,
    p_notes
  );
  v_order_id := (v_result->>'orderId')::uuid;

  update public.orders
  set source = p_source,
      notes = concat_ws(E'\n', notes, 'Created by staff from a customer call or shop request'),
      updated_at = now()
  where id = v_order_id and source = 'ONLINE';
  v_tagged := found;

  if v_tagged then
    insert into public.audit_log(actor_id, action, entity_type, entity_id, after_data)
    values (
      p_actor,
      'CREATE_BACKOFFICE_ORDER',
      'order',
      v_order_id::text,
      jsonb_build_object('source', p_source, 'paymentMethod', p_payment_method)
    );
  end if;

  return v_result;
end;
$$;

revoke all on function public.create_staff_order(
  text, uuid, text, text, text, public.payment_method, jsonb, jsonb, text, text
) from public, anon, authenticated;
grant execute on function public.create_staff_order(
  text, uuid, text, text, text, public.payment_method, jsonb, jsonb, text, text
) to service_role;

create or replace function public.confirm_zero_fee_cod_order()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.purpose = 'ORDER_BALANCE' then
    update public.orders
    set status = 'PAYMENT_CONFIRMED', updated_at = now()
    where id = new.order_id
      and payment_method = 'CASH_ON_DELIVERY'
      and shipping_cost = 0
      and status = 'AWAITING_PAYMENT';
  end if;
  return new;
end;
$$;

drop trigger if exists confirm_zero_fee_cod_order on public.payments;
create trigger confirm_zero_fee_cod_order
after insert on public.payments
for each row execute function public.confirm_zero_fee_cod_order();

create or replace function public.record_delivery_collection_v2(
  p_payment_id uuid,
  p_amount numeric,
  p_idempotency_key text,
  p_actor uuid,
  p_channel text,
  p_reference text default null
) returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_payment public.payments%rowtype;
  v_order public.orders%rowtype;
  v_journal uuid;
  v_cash_account uuid;
  v_ar uuid;
  v_channel text := upper(btrim(p_channel));
  v_reference text := nullif(btrim(p_reference), '');
begin
  if v_channel not in ('CASH', 'MPESA') then
    raise exception 'Collection channel must be CASH or MPESA';
  end if;
  if v_channel = 'MPESA' and v_reference is null then
    raise exception 'An M-Pesa receipt or reference is required';
  end if;

  select * into v_payment from public.payments where id = p_payment_id for update;
  if not found or v_payment.purpose <> 'ORDER_BALANCE' then
    raise exception 'Delivery balance payment not found';
  end if;
  if v_payment.status = 'SUCCEEDED' then
    return false;
  end if;
  if p_amount <> v_payment.amount then
    raise exception 'Collected amount must equal the outstanding balance';
  end if;

  select * into v_order from public.orders where id = v_payment.order_id for update;
  if v_order.status not in ('SHIPPED', 'DELIVERED') then
    raise exception 'The order must be shipped or delivered before collecting its delivery balance';
  end if;

  if v_payment.status <> 'PROCESSING' then
    update public.payments set status = 'PROCESSING', updated_at = now()
    where id = v_payment.id;
  end if;
  update public.payments
  set status = 'SUCCEEDED',
      provider = v_channel,
      provider_reference = coalesce(v_reference, p_idempotency_key),
      succeeded_at = now(),
      updated_at = now()
  where id = v_payment.id;

  if v_order.status = 'SHIPPED' then
    update public.orders
    set status = 'DELIVERED', delivered_at = coalesce(delivered_at, now()), updated_at = now()
    where id = v_order.id;
  end if;
  update public.orders
  set paid_amount = least(total_amount, paid_amount + p_amount),
      status = 'COMPLETED',
      delivered_at = coalesce(delivered_at, now()),
      updated_at = now()
  where id = v_order.id;

  select id into v_cash_account from public.ledger_accounts
  where code = case when v_channel = 'MPESA' then '1000-MPESA' else '1010-CASH' end;
  select id into v_ar from public.ledger_accounts where code = '1100-AR';

  insert into public.ledger_journals(reference_type, reference_id, description, idempotency_key)
  values (
    'PAYMENT',
    v_payment.id,
    case when v_channel = 'MPESA' then 'M-Pesa collected on delivery' else 'Cash collected on delivery' end,
    p_idempotency_key
  ) returning id into v_journal;
  insert into public.ledger_entries(journal_id, account_id, direction, amount) values
    (v_journal, v_cash_account, 'DEBIT', p_amount),
    (v_journal, v_ar, 'CREDIT', p_amount);

  insert into public.email_outbox(order_id, template, recipient, subject, payload, idempotency_key)
  values (
    v_order.id,
    'PAYMENT_RECEIPT',
    v_order.email,
    'Final receipt for ' || v_order.order_number,
    jsonb_build_object('orderId', v_order.id, 'paymentId', v_payment.id),
    'receipt:' || v_payment.id || ':v1'
  ) on conflict (idempotency_key) do nothing;

  insert into public.audit_log(actor_id, action, entity_type, entity_id, after_data)
  values (
    p_actor,
    'COLLECT_DELIVERY_BALANCE',
    'payment',
    v_payment.id::text,
    jsonb_build_object('amount', p_amount, 'channel', v_channel, 'reference', v_reference)
  );
  return true;
end;
$$;

revoke all on function public.record_delivery_collection_v2(
  uuid, numeric, text, uuid, text, text
) from public, anon, authenticated;
grant execute on function public.record_delivery_collection_v2(
  uuid, numeric, text, uuid, text, text
) to service_role;
