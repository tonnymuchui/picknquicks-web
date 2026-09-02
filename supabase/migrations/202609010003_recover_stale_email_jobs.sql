create or replace function public.claim_email_outbox(p_limit integer default 10)
returns setof public.email_outbox
language plpgsql
security definer
set search_path = '' as $$
begin
  update public.email_outbox
  set status = 'DEAD',
      last_error = coalesce(last_error, 'Email worker stopped before completing the job')
  where status = 'SENDING'
    and attempts >= 6
    and next_attempt_at <= now() - interval '10 minutes';

  return query
  update public.email_outbox e
  set status = 'SENDING',
      attempts = e.attempts + 1,
      next_attempt_at = now()
  where e.id in (
    select id
    from public.email_outbox
    where attempts < 6
      and (
        (status in ('PENDING', 'FAILED') and next_attempt_at <= now())
        or (status = 'SENDING' and next_attempt_at <= now() - interval '10 minutes')
      )
    order by created_at
    for update skip locked
    limit least(p_limit, 25)
  )
  returning e.*;
end;
$$;

revoke all on function public.claim_email_outbox(integer) from public, anon, authenticated;
grant execute on function public.claim_email_outbox(integer) to service_role;
