alter table public.products
  add column if not exists purchase_unit_price numeric(14,2) check (purchase_unit_price >= 0),
  add column if not exists inbound_freight_unit numeric(14,2) check (inbound_freight_unit >= 0),
  add column if not exists supplier_url text,
  add column if not exists supplier_price_checked_at timestamptz;

update public.products set
  purchase_unit_price = source.purchase_price,
  inbound_freight_unit = source.freight_unit,
  supplier_url = source.supplier_url,
  cost_price = source.purchase_price + source.freight_unit
from (values
  ('MON-34-4K', 19000.00, 6150.00, null::text),
  ('CHR-ERG-01', 7800.00, 6150.00, 'https://www.alibaba.com/product-detail/2025-Full-Mesh-Fabric-Recliner-With_1601458817171.html'),
  ('DCK-USBC-8', 262.00, 200.00, 'https://www.alibaba.com/product-detail/8-In1-Usb-C-Hub-Splitter_1601211424348.html'),
  ('DSK-DUAL-01', 10200.00, 6500.00, 'https://www.alibaba.com/product-detail/Premium-Electric-Convertible-Modern-Height-Adjustable_1601277622033.html'),
  ('DSK-SINGLE-01', 6700.00, 6500.00, 'https://www.alibaba.com/product-detail/Premium-Electric-Convertible-Modern-Height-Adjustable_1601277622033.html'),
  ('MSE-LANGTU-01', 1200.00, 300.00, 'https://www.alibaba.com/product-detail/Professional-Factory-Wholesale-LANGTU-G3-RGB_1601401573972.html'),
  ('MSE-GAME-01', 294.00, 150.00, 'https://www.alibaba.com/product-detail/Newly-Designed-High-quality-Wireless-Mouse_1601353459622.html'),
  ('LMP-TABLE-01', 1800.00, 650.00, 'https://www.alibaba.com/product-detail/CE-Certified-Gooseneck-Architect-Lamp-Table_1600763188454.html'),
  ('LMP-EYE-01', 3100.00, 650.00, 'https://www.alibaba.com/product-detail/Eye-Caring-Touch-Control-Desktop-Work_1601452058566.html'),
  ('ARM-45-01', 3000.00, 650.00, 'https://www.alibaba.com/product-detail/17-45inch-Gaming-RGB-Single-Monitor_1601038824390.html'),
  ('ARM-32-01', 1300.00, 650.00, 'https://www.alibaba.com/product-detail/TC5-1G-17-32-9kg-Cost_1601377831745.html'),
  ('CAM-2K-5MP', 1400.00, 650.00, 'https://www.alibaba.com/product-detail/Hot-Sell-2k-5MP-Ultra-HD_11000015541935.html')
) as source(sku, purchase_price, freight_unit, supplier_url)
where products.sku = source.sku;

insert into public.product_images(product_id,image_url,alt_text,is_primary,display_order)
select id,'/images/monitor-arm-lifestyle-v2.webp','Ultrawide monitor on a heavy-duty arm in a modern workspace',false,10
from public.products where sku in ('MON-34-4K','ARM-45-01')
on conflict do nothing;

insert into public.product_images(product_id,image_url,alt_text,is_primary,display_order)
select id,'/images/ergonomic-desk-lifestyle-v2.webp','Ergonomic mesh chair and electric sit-stand desk',false,10
from public.products where sku in ('CHR-ERG-01','DSK-DUAL-01','DSK-SINGLE-01')
on conflict do nothing;

create or replace function public.commit_confirmed_order_inventory()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  v_reservation record;
  v_cogs numeric(14,2) := 0;
  v_journal uuid;
  v_cogs_account uuid;
  v_inventory_account uuid;
begin
  if new.status <> 'PAYMENT_CONFIRMED' or old.status = 'PAYMENT_CONFIRMED' then
    return new;
  end if;

  for v_reservation in
    select m.product_id, sum(-m.quantity)::integer as quantity, p.cost_price
    from public.inventory_movements m
    join public.products p on p.id = m.product_id
    where m.order_id = new.id and m.type = 'RESERVATION'
    group by m.product_id, p.cost_price
  loop
    update public.products
      set stock_quantity = stock_quantity - v_reservation.quantity,
          reserved_quantity = reserved_quantity - v_reservation.quantity,
          updated_at = now()
      where id = v_reservation.product_id
        and stock_quantity >= v_reservation.quantity
        and reserved_quantity >= v_reservation.quantity;
    if not found then
      raise exception 'Reserved stock is inconsistent for product %', v_reservation.product_id;
    end if;

    insert into public.inventory_movements(
      product_id,order_id,type,quantity,balance_after,unit_cost,reason,idempotency_key
    )
    select p.id,new.id,'SALE',-v_reservation.quantity,
      p.stock_quantity-p.reserved_quantity,v_reservation.cost_price,
      'Confirmed order '||new.order_number,'sale:'||new.id||':'||p.id
    from public.products p where p.id = v_reservation.product_id
    on conflict (idempotency_key) do nothing;

    v_cogs := v_cogs + (v_reservation.quantity * v_reservation.cost_price);
  end loop;

  if v_cogs > 0 then
    select id into v_cogs_account from public.ledger_accounts where code='5000-COGS';
    select id into v_inventory_account from public.ledger_accounts where code='1200-INVENTORY';
    insert into public.ledger_journals(reference_type,reference_id,description,idempotency_key)
      values('COGS',new.id,'Cost of goods sold for '||new.order_number,'cogs:'||new.id)
      on conflict (idempotency_key) do nothing
      returning id into v_journal;
    if v_journal is not null then
      insert into public.ledger_entries(journal_id,account_id,direction,amount) values
        (v_journal,v_cogs_account,'DEBIT',v_cogs),
        (v_journal,v_inventory_account,'CREDIT',v_cogs);
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists commit_inventory_on_confirmation on public.orders;
create trigger commit_inventory_on_confirmation
after update of status on public.orders
for each row execute function public.commit_confirmed_order_inventory();

create index if not exists products_inventory_health_idx
  on public.products(active, stock_quantity, reserved_quantity);
