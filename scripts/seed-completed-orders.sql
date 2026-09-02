-- Development/test data for the PickNQuicks admin dashboard.
--
-- Run this in the Supabase SQL editor after all migrations and the catalog seed.
-- It creates 120 completed guest orders over the last 180 days so the 7, 30,
-- and 90 day dashboard comparisons all contain data. The IDs and idempotency
-- keys are deterministic, so running this file again refreshes the fixture
-- dates and values instead of adding duplicates.
--
-- Do not run this against a production database.

begin;
set constraints all deferred;

do $$
declare
  v_i integer;
  v_product_count integer;
  v_product public.products%rowtype;
  v_order_id uuid;
  v_item_id uuid;
  v_payment_id uuid;
  v_attempt_id uuid;
  v_order_journal_id uuid;
  v_payment_journal_id uuid;
  v_cogs_journal_id uuid;
  v_created_at timestamptz;
  v_delivered_at timestamptz;
  v_quantity integer;
  v_unit_price numeric(14,2);
  v_subtotal numeric(14,2);
  v_tax numeric(14,2);
  v_shipping numeric(14,2);
  v_total numeric(14,2);
  v_cogs numeric(14,2);
  v_ar uuid;
  v_mpesa uuid;
  v_sales uuid;
  v_delivery uuid;
  v_tax_payable uuid;
  v_cogs_account uuid;
  v_inventory uuid;
begin
  select count(*) into v_product_count
  from public.products
  where active
    and cost_price > 0
    and coalesce(sale_price, price) > 0;

  if v_product_count = 0 then
    raise exception 'No active, priced products with a cost were found. Apply the catalog seed first.';
  end if;

  select id into v_ar from public.ledger_accounts where code = '1100-AR';
  select id into v_mpesa from public.ledger_accounts where code = '1000-MPESA';
  select id into v_sales from public.ledger_accounts where code = '4000-SALES';
  select id into v_delivery from public.ledger_accounts where code = '4010-DELIVERY';
  select id into v_tax_payable from public.ledger_accounts where code = '2100-TAX';
  select id into v_cogs_account from public.ledger_accounts where code = '5000-COGS';
  select id into v_inventory from public.ledger_accounts where code = '1200-INVENTORY';

  if v_ar is null or v_mpesa is null or v_sales is null or v_delivery is null
     or v_tax_payable is null or v_cogs_account is null or v_inventory is null then
    raise exception 'Required ledger accounts are missing. Apply the commerce migration first.';
  end if;

  for v_i in 1..120 loop
    -- One order every 36 hours: enough history for current and previous 90-day periods.
    v_created_at := now() - ((v_i - 1) * interval '36 hours') - interval '2 hours';
    v_delivered_at := least(v_created_at + interval '2 days', now() - interval '1 hour');
    v_quantity := 1 + mod(v_i, 3);
    v_shipping := case mod(v_i, 4)
      when 0 then 350.00
      when 1 then 500.00
      when 2 then 700.00
      else 1000.00
    end;

    select p.* into v_product
    from public.products p
    where p.active
      and p.cost_price > 0
      and coalesce(p.sale_price, p.price) > 0
    order by p.sku
    offset mod(v_i - 1, v_product_count)
    limit 1;

    v_unit_price := coalesce(v_product.sale_price, v_product.price);
    v_subtotal := v_unit_price * v_quantity;
    v_tax := round(v_subtotal * v_product.tax_rate, 2);
    v_total := v_subtotal + v_tax + v_shipping;
    v_cogs := v_product.cost_price * v_quantity;

    v_order_id := ('a1100000-0000-4000-8000-' || lpad(v_i::text, 12, '0'))::uuid;
    v_item_id := ('a1200000-0000-4000-8000-' || lpad(v_i::text, 12, '0'))::uuid;
    v_payment_id := ('a1300000-0000-4000-8000-' || lpad(v_i::text, 12, '0'))::uuid;
    v_attempt_id := ('a1400000-0000-4000-8000-' || lpad(v_i::text, 12, '0'))::uuid;
    v_order_journal_id := ('a1500000-0000-4000-8000-' || lpad(v_i::text, 12, '0'))::uuid;
    v_payment_journal_id := ('a1600000-0000-4000-8000-' || lpad(v_i::text, 12, '0'))::uuid;
    v_cogs_journal_id := ('a1700000-0000-4000-8000-' || lpad(v_i::text, 12, '0'))::uuid;

    insert into public.orders (
      id, order_number, idempotency_key, email, phone_number, customer_name,
      status, payment_method, currency, subtotal, tax_amount, shipping_cost,
      discount_amount, total_amount, paid_amount, shipping_address, notes,
      tracking_number, estimated_delivery_date, delivered_at, created_at, updated_at
    ) values (
      v_order_id,
      'TEST-ANALYTICS-' || lpad(v_i::text, 4, '0'),
      'test:admin-analytics:order:' || v_i,
      'analytics.customer' || v_i || '@example.com',
      '+254700' || lpad(v_i::text, 6, '0'),
      'Analytics Customer ' || v_i,
      'COMPLETED', 'MPESA_FULL', 'KES', v_subtotal, v_tax, v_shipping,
      0, v_total, v_total,
      jsonb_build_object(
        'line1', 'Test Address ' || v_i,
        'city', case mod(v_i, 4)
          when 0 then 'Nairobi'
          when 1 then 'Mombasa'
          when 2 then 'Kisumu'
          else 'Nakuru'
        end,
        'country', 'Kenya'
      ),
      'Generated admin analytics fixture',
      'TEST-TRACK-' || lpad(v_i::text, 6, '0'),
      v_created_at::date + 2,
      v_delivered_at,
      v_created_at,
      v_delivered_at
    )
    on conflict (id) do update set
      email = excluded.email,
      phone_number = excluded.phone_number,
      customer_name = excluded.customer_name,
      status = excluded.status,
      subtotal = excluded.subtotal,
      tax_amount = excluded.tax_amount,
      shipping_cost = excluded.shipping_cost,
      total_amount = excluded.total_amount,
      paid_amount = excluded.paid_amount,
      shipping_address = excluded.shipping_address,
      delivered_at = excluded.delivered_at,
      created_at = excluded.created_at,
      updated_at = excluded.updated_at;

    insert into public.order_items (
      id, order_id, product_id, product_name, product_sku, product_image_url,
      quantity, unit_price, unit_cost, tax_rate, subtotal, tax_amount, total
    ) values (
      v_item_id, v_order_id, v_product.id, v_product.name, v_product.sku,
      (select image_url from public.product_images
       where product_id = v_product.id order by is_primary desc, display_order limit 1),
      v_quantity, v_unit_price, v_product.cost_price, v_product.tax_rate,
      v_subtotal, v_tax, v_subtotal + v_tax
    )
    on conflict (id) do update set
      product_id = excluded.product_id,
      product_name = excluded.product_name,
      product_sku = excluded.product_sku,
      product_image_url = excluded.product_image_url,
      quantity = excluded.quantity,
      unit_price = excluded.unit_price,
      unit_cost = excluded.unit_cost,
      tax_rate = excluded.tax_rate,
      subtotal = excluded.subtotal,
      tax_amount = excluded.tax_amount,
      total = excluded.total;

    insert into public.payments (
      id, order_id, purpose, method, status, amount, currency, idempotency_key,
      provider, provider_reference, succeeded_at, created_at, updated_at
    ) values (
      v_payment_id, v_order_id, 'ORDER_TOTAL', 'MPESA_FULL', 'SUCCEEDED', v_total,
      'KES', 'test:admin-analytics:payment:' || v_i, 'MPESA',
      'TESTMPESA' || lpad(v_i::text, 6, '0'),
      v_created_at + interval '5 minutes', v_created_at, v_created_at + interval '5 minutes'
    )
    on conflict (id) do update set
      amount = excluded.amount,
      status = excluded.status,
      provider_reference = excluded.provider_reference,
      succeeded_at = excluded.succeeded_at,
      created_at = excluded.created_at,
      updated_at = excluded.updated_at;

    insert into public.payment_attempts (
      id, payment_id, attempt_number, status, phone_number, mpesa_receipt_number,
      provider_result_code, provider_result_description, created_at, completed_at
    ) values (
      v_attempt_id, v_payment_id, 1, 'SUCCEEDED',
      '+254700' || lpad(v_i::text, 6, '0'),
      'TESTMPESA' || lpad(v_i::text, 6, '0'), '0', 'Test payment completed',
      v_created_at, v_created_at + interval '5 minutes'
    )
    on conflict (id) do update set
      status = excluded.status,
      phone_number = excluded.phone_number,
      mpesa_receipt_number = excluded.mpesa_receipt_number,
      created_at = excluded.created_at,
      completed_at = excluded.completed_at;

    insert into public.ledger_journals (
      id, reference_type, reference_id, description, idempotency_key, posted_at, created_at
    ) values
      (v_order_journal_id, 'ORDER', v_order_id,
       'Test order placed TEST-ANALYTICS-' || lpad(v_i::text, 4, '0'),
       'test:admin-analytics:journal:order:' || v_i, v_created_at, v_created_at),
      (v_payment_journal_id, 'PAYMENT', v_payment_id,
       'Test M-Pesa payment TESTMPESA' || lpad(v_i::text, 6, '0'),
       'test:admin-analytics:journal:payment:' || v_i,
       v_created_at + interval '5 minutes', v_created_at + interval '5 minutes'),
      (v_cogs_journal_id, 'COGS', v_order_id,
       'Test cost of goods sold TEST-ANALYTICS-' || lpad(v_i::text, 4, '0'),
       'test:admin-analytics:journal:cogs:' || v_i,
       v_created_at + interval '5 minutes', v_created_at + interval '5 minutes')
    on conflict (id) do update set
      description = excluded.description,
      reference_id = excluded.reference_id,
      posted_at = excluded.posted_at,
      created_at = excluded.created_at;

    -- Replace only this fixture's entries, keeping each journal balanced.
    delete from public.ledger_entries
    where journal_id in (v_order_journal_id, v_payment_journal_id, v_cogs_journal_id);

    insert into public.ledger_entries (journal_id, account_id, direction, amount, created_at)
    values (v_order_journal_id, v_ar, 'DEBIT', v_total, v_created_at);

    insert into public.ledger_entries (journal_id, account_id, direction, amount, created_at)
    values (v_order_journal_id, v_sales, 'CREDIT', v_subtotal, v_created_at);

    if v_shipping > 0 then
      insert into public.ledger_entries (journal_id, account_id, direction, amount, created_at)
      values (v_order_journal_id, v_delivery, 'CREDIT', v_shipping, v_created_at);
    end if;

    if v_tax > 0 then
      insert into public.ledger_entries (journal_id, account_id, direction, amount, created_at)
      values (v_order_journal_id, v_tax_payable, 'CREDIT', v_tax, v_created_at);
    end if;

    insert into public.ledger_entries (journal_id, account_id, direction, amount, created_at)
    values
      (v_payment_journal_id, v_mpesa, 'DEBIT', v_total, v_created_at + interval '5 minutes'),
      (v_payment_journal_id, v_ar, 'CREDIT', v_total, v_created_at + interval '5 minutes'),
      (v_cogs_journal_id, v_cogs_account, 'DEBIT', v_cogs, v_created_at + interval '5 minutes'),
      (v_cogs_journal_id, v_inventory, 'CREDIT', v_cogs, v_created_at + interval '5 minutes');
  end loop;
end $$;

commit;

-- Quick verification (expected fixture counts: 120 / 120 / 360):
select
  (select count(*) from public.orders where idempotency_key like 'test:admin-analytics:order:%') as orders,
  (select count(*) from public.payments where idempotency_key like 'test:admin-analytics:payment:%') as payments,
  (select count(*) from public.ledger_journals where idempotency_key like 'test:admin-analytics:journal:%') as journals;
