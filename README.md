# PickNQuicks Commerce

A Next.js 16 commerce application backed by Supabase, Daraja 3.0 M-Pesa Express, and Resend.

## Architecture

- Supabase Postgres is the system of record. Auth uses cookie-based `@supabase/ssr`; authorization is enforced with row-level security.
- Next.js route handlers are the trusted payment/backend boundary. Daraja and Supabase secret keys never reach the browser.
- Checkout is a Postgres transaction: prices are re-read, stock is locked/reserved, immutable order lines are captured, payment obligations are created, the ledger journal is balanced, and email work is queued.
- COD creates two obligations: `DELIVERY_FEE` collected by M-Pesa now and `ORDER_BALANCE` collected once delivery is completed. A zero delivery fee skips the advance charge.
- Payment attempts are separate from payment obligations. An ambiguous STK timeout remains `PROCESSING`; another prompt cannot be issued until reconciliation resolves the attempt.
- Daraja callbacks are deduplicated by provider event ID. Settlement checks the expected amount and atomically posts the payment, order state, double-entry journal, and receipt outbox item.
- Resend delivery uses a transactional outbox, exponential retry, dead-letter state, and Resend's `Idempotency-Key`.

## Local setup

1. Create a Supabase project and install the Supabase CLI.
2. Copy `.env.example` to `.env.local` and fill in new credentials. Never reuse credentials that were pasted into chat or committed anywhere.
3. Link and apply the database:

   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   supabase db push
   ```

4. In Supabase Auth, enable Google and set the callback to `https://YOUR_PROJECT.supabase.co/auth/v1/callback`. Put the rotated Google ID/secret in the Supabase dashboard, not in browser environment variables.
5. Create a public `avatars` storage bucket or change the avatar policy to a private signed-URL flow.
6. Configure a Daraja app and set its environment credentials. `APP_URL` must be a public HTTPS origin for callbacks. Production requires a production shortcode/passkey and Safaricom onboarding.
7. Verify the Resend sending domain and set `RESEND_FROM_EMAIL` to an address on it.
8. Start the app:

   ```bash
   npm install
   npm run dev
   ```

## Scheduled operations

Call these with `Authorization: Bearer $CRON_SECRET` from Vercel Cron, Supabase Cron, or another scheduler:

- `POST /api/internal/email-outbox` every five minutes.
- `POST /api/admin/reconcile` every 5–10 minutes.

The included `vercel.json` runs the email outbox every five minutes on Vercel so failed or
interrupted deliveries are retried. Immediate order/payment events also invoke the worker directly.
Signup verification and password-reset messages are sent by Supabase Auth, so configure a verified
custom SMTP provider separately in the Supabase Auth dashboard; they do not use the commerce outbox.

The reconciliation job never invents a receipt or settles money from an ambiguous status query. A provider success without callback receipt metadata is surfaced as an exception for statement/C2B confirmation.

## First administrator

After signing up, assign the first administrator in the Supabase SQL editor:

```sql
insert into public.user_roles (user_id, role)
select id, 'ADMIN'::public.app_role from auth.users where email = 'owner@example.com'
on conflict do nothing;
```

## Validation

```bash
npm run typecheck
npm run lint
npm run build
```

Before production, test at minimum: duplicate checkout submissions, delayed/out-of-order callbacks, exact amount mismatch, user-cancelled STK, Daraja timeout, email retry/dead-letter behavior, COD delivery collection, unpaid cancellation/release, and daily ledger/provider reconciliation.
