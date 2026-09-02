import { z } from 'zod';

export const shippingZoneSchema = z.object({
  name: z.string().trim().min(2, 'Enter a zone name').max(100),
  citiesText: z
    .string()
    .max(2000, 'The location list is too long')
    .refine(
      (value) =>
        value
          .split(/[\n,]/)
          .map((city) => city.trim())
          .filter(Boolean)
          .every((city) => city.length <= 80),
      'Each location must be 80 characters or fewer'
    ),
  fee: z.number().min(0, 'Delivery price cannot be negative').max(10_000_000),
  estimatedDays: z
    .number()
    .int('Use a whole number of days')
    .min(1, 'Delivery must take at least one day')
    .max(90),
  active: z.boolean(),
});

export type ShippingZoneFormData = z.infer<typeof shippingZoneSchema>;

