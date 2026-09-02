alter function public.create_checkout(
  text,
  uuid,
  text,
  text,
  text,
  public.payment_method,
  jsonb,
  jsonb,
  text
) set search_path = pg_catalog, extensions;
