import { createHash } from 'node:crypto';

import { z } from 'zod';

const callbackItem = z.object({
  Name: z.string(),
  Value: z.union([z.string(), z.number()]).optional(),
});
export const darajaCallbackSchema = z.object({
  Body: z.object({
    stkCallback: z.object({
      MerchantRequestID: z.string(),
      CheckoutRequestID: z.string(),
      ResultCode: z.number(),
      ResultDesc: z.string(),
      CallbackMetadata: z.object({ Item: z.array(callbackItem) }).optional(),
    }),
  }),
});

export function parseDarajaCallback(value: unknown) {
  const parsed = darajaCallbackSchema.parse(value).Body.stkCallback;
  const metadata = Object.fromEntries(
    (parsed.CallbackMetadata?.Item ?? []).map((item) => [item.Name, item.Value])
  );
  return {
    ...parsed,
    amount: Number(metadata.Amount ?? 0),
    receipt: String(metadata.MpesaReceiptNumber ?? ''),
    phone: String(metadata.PhoneNumber ?? ''),
    transactionDate: String(metadata.TransactionDate ?? ''),
  };
}

export function callbackFingerprint(value: unknown) {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex');
}
