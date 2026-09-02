-- Removes only the records created by scripts/seed-completed-orders.sql.
-- Do not widen these predicates: this file intentionally targets fixture keys.

begin;
set constraints all deferred;

delete from public.reconciliation_items
where payment_id in (
  select id from public.payments
  where idempotency_key like 'test:admin-analytics:payment:%'
);

delete from public.payment_events
where payment_id in (
  select id from public.payments
  where idempotency_key like 'test:admin-analytics:payment:%'
)
or attempt_id in (
  select id from public.payment_attempts
  where payment_id in (
    select id from public.payments
    where idempotency_key like 'test:admin-analytics:payment:%'
  )
);

delete from public.ledger_entries
where journal_id in (
  select id from public.ledger_journals
  where idempotency_key like 'test:admin-analytics:journal:%'
);

delete from public.ledger_journals
where idempotency_key like 'test:admin-analytics:journal:%';

delete from public.payment_attempts
where payment_id in (
  select id from public.payments
  where idempotency_key like 'test:admin-analytics:payment:%'
);

delete from public.email_outbox
where order_id in (
  select id from public.orders
  where idempotency_key like 'test:admin-analytics:order:%'
);

delete from public.documents
where order_id in (
  select id from public.orders
  where idempotency_key like 'test:admin-analytics:order:%'
);

delete from public.inventory_movements
where order_id in (
  select id from public.orders
  where idempotency_key like 'test:admin-analytics:order:%'
);

delete from public.payments
where idempotency_key like 'test:admin-analytics:payment:%';

delete from public.order_items
where order_id in (
  select id from public.orders
  where idempotency_key like 'test:admin-analytics:order:%'
);

delete from public.audit_log
where (entity_type = 'order' and entity_id in (
  select id::text from public.orders
  where idempotency_key like 'test:admin-analytics:order:%'
))
or (entity_type = 'payment' and entity_id like 'a1300000-0000-4000-8000-%');

delete from public.orders
where idempotency_key like 'test:admin-analytics:order:%';

commit;
