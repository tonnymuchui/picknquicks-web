create or replace function public.guard_order_confirmation_email()
returns trigger
language plpgsql
security definer
set search_path = '' as $$
begin
  if new.template = 'ORDER_CONFIRMATION' and exists (
    select 1
    from public.payments p
    where p.order_id = new.order_id
      and p.purpose in ('ORDER_TOTAL', 'DELIVERY_FEE')
      and p.status <> 'SUCCEEDED'
  ) then
    return null;
  end if;

  return new;
end;
$$;

drop trigger if exists guard_order_confirmation_email on public.email_outbox;
create trigger guard_order_confirmation_email
before insert on public.email_outbox
for each row execute function public.guard_order_confirmation_email();

create or replace function public.confirm_order_after_advance_payment()
returns trigger
language plpgsql
security definer
set search_path = '' as $$
declare
  v_order public.orders%rowtype;
begin
  if tg_op = 'INSERT' then
    if new.purpose <> 'ORDER_BALANCE' or exists (
      select 1
      from public.payments p
      where p.order_id = new.order_id
        and p.purpose in ('ORDER_TOTAL', 'DELIVERY_FEE')
    ) then
      return new;
    end if;

    update public.orders
    set status = 'PAYMENT_CONFIRMED', updated_at = now()
    where id = new.order_id and status = 'AWAITING_PAYMENT'
    returning * into v_order;
  else
    if new.status <> 'SUCCEEDED'
      or old.status = 'SUCCEEDED'
      or new.purpose not in ('ORDER_TOTAL', 'DELIVERY_FEE') then
      return new;
    end if;

    select * into v_order from public.orders where id = new.order_id;
  end if;

  if v_order.id is null then
    select * into v_order from public.orders where id = new.order_id;
  end if;

  insert into public.email_outbox(
    order_id,
    template,
    recipient,
    subject,
    payload,
    idempotency_key
  ) values (
    v_order.id,
    'ORDER_CONFIRMATION',
    v_order.email,
    'Order ' || v_order.order_number || ' confirmed',
    jsonb_build_object('orderId', v_order.id),
    'confirmation:' || v_order.id || ':v1'
  )
  on conflict (idempotency_key) do update
  set status = 'PENDING',
      next_attempt_at = now(),
      last_error = null
  where public.email_outbox.status <> 'SENT';

  return new;
end;
$$;

drop trigger if exists confirm_order_without_advance_payment on public.payments;
create trigger confirm_order_without_advance_payment
after insert on public.payments
for each row execute function public.confirm_order_after_advance_payment();

drop trigger if exists confirm_order_after_advance_payment on public.payments;
create trigger confirm_order_after_advance_payment
after update of status on public.payments
for each row execute function public.confirm_order_after_advance_payment();

update public.email_outbox e
set status = 'DEAD',
    last_error = 'Waiting for advance payment confirmation'
where e.template = 'ORDER_CONFIRMATION'
  and e.status in ('PENDING', 'FAILED')
  and exists (
    select 1
    from public.payments p
    where p.order_id = e.order_id
      and p.purpose in ('ORDER_TOTAL', 'DELIVERY_FEE')
      and p.status <> 'SUCCEEDED'
  );

revoke all on function public.guard_order_confirmation_email() from public, anon, authenticated;
revoke all on function public.confirm_order_after_advance_payment() from public, anon, authenticated;
