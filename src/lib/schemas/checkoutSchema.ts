import z from 'zod/v3';

const kenyanPhone = z
  .string()
  .min(1, 'Phone number is required')
  .regex(/^\+254[17]\d{8}$/, 'Format: +254712345678');

export const checkoutSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: kenyanPhone,
  paymentMethod: z.enum(['MPESA_FULL', 'CASH_ON_DELIVERY'], {
    required_error: 'Please select a payment method',
  }),
  recipientName: z.string().min(2, 'Recipient name is required'),
  recipientPhone: kenyanPhone,
  addressLine1: z.string().min(5, 'Address is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  county: z.string().optional(),
  postalCode: z.string().optional(),
  deliveryNotes: z.string().optional(),
  notes: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
