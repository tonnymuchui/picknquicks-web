import 'server-only';

import { z } from 'zod';

const tokenSchema = z.object({ access_token: z.string(), expires_in: z.coerce.number() });
const stkResponseSchema = z.object({
  MerchantRequestID: z.string(),
  CheckoutRequestID: z.string(),
  ResponseCode: z.string(),
  ResponseDescription: z.string(),
  CustomerMessage: z.string().optional(),
});

let cachedToken: { value: string; expiresAt: number } | undefined;

function env(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function baseUrl() {
  return process.env.DARAJA_ENVIRONMENT === 'production'
    ? 'https://api.safaricom.co.ke'
    : 'https://sandbox.safaricom.co.ke';
}

export function normalizeKenyanPhone(value: string) {
  const digits = value.replace(/\D/g, '');
  if (/^0[17]\d{8}$/.test(digits)) {
    return `254${digits.slice(1)}`;
  }
  if (/^[17]\d{8}$/.test(digits)) {
    return `254${digits}`;
  }
  if (/^254[17]\d{8}$/.test(digits)) {
    return digits;
  }
  throw new Error('Enter a valid Safaricom number, for example 0712345678');
}

async function accessToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.value;
  }
  const credentials = Buffer.from(
    `${env('DARAJA_CONSUMER_KEY')}:${env('DARAJA_CONSUMER_SECRET')}`
  ).toString('base64');
  const response = await fetch(`${baseUrl()}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${credentials}` },
    cache: 'no-store',
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) {
    throw new Error(`Daraja authentication failed (${response.status})`);
  }
  const token = tokenSchema.parse(await response.json());
  cachedToken = { value: token.access_token, expiresAt: Date.now() + token.expires_in * 1000 };
  return token.access_token;
}

function timestamp() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Nairobi',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(new Date());
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? '';
  return `${get('year')}${get('month')}${get('day')}${get('hour')}${get('minute')}${get('second')}`;
}

export async function initiateStkPush(input: {
  amount: number;
  phone: string;
  accountReference: string;
}) {
  const businessShortCode = env('DARAJA_SHORTCODE');
  const requestTimestamp = timestamp();
  const body = {
    BusinessShortCode: businessShortCode,
    Password: Buffer.from(
      `${businessShortCode}${env('DARAJA_PASSKEY')}${requestTimestamp}`
    ).toString('base64'),
    Timestamp: requestTimestamp,
    TransactionType: process.env.DARAJA_TRANSACTION_TYPE ?? 'CustomerPayBillOnline',
    Amount: Math.round(input.amount),
    PartyA: normalizeKenyanPhone(input.phone),
    PartyB: businessShortCode,
    PhoneNumber: normalizeKenyanPhone(input.phone),
    CallBackURL: `${env('APP_URL').replace(/\/$/, '')}/api/payments/mpesa/callback?token=${encodeURIComponent(env('DARAJA_CALLBACK_TOKEN'))}`,
    AccountReference: input.accountReference.slice(0, 12),
    TransactionDesc: `PickNQuicks ${input.accountReference}`.slice(0, 20),
  };
  const response = await fetch(`${baseUrl()}/mpesa/stkpush/v1/processrequest`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${await accessToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
    signal: AbortSignal.timeout(20_000),
  });
  const payload: unknown = await response.json();
  if (!response.ok) {
    throw new Error(`Daraja rejected the request (${response.status})`);
  }
  return {
    request: { ...body, Password: '[REDACTED]' },
    response: stkResponseSchema.parse(payload),
  };
}

export async function queryStkStatus(checkoutRequestId: string) {
  const businessShortCode = env('DARAJA_SHORTCODE');
  const requestTimestamp = timestamp();
  const response = await fetch(`${baseUrl()}/mpesa/stkpushquery/v1/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${await accessToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      BusinessShortCode: businessShortCode,
      Password: Buffer.from(
        `${businessShortCode}${env('DARAJA_PASSKEY')}${requestTimestamp}`
      ).toString('base64'),
      Timestamp: requestTimestamp,
      CheckoutRequestID: checkoutRequestId,
    }),
    cache: 'no-store',
    signal: AbortSignal.timeout(15_000),
  });
  const payload: unknown = await response.json();
  if (!response.ok) {
    throw new Error(`Daraja query failed (${response.status})`);
  }
  return z
    .object({ ResultCode: z.coerce.string(), ResultDesc: z.string() })
    .passthrough()
    .parse(payload);
}
