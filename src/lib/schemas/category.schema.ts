import z from 'zod';

export const categorySchema = z.object({
  name: z.string().min(2).max(128),
  slug: z
    .string()
    .min(2)
    .max(150)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().max(500).optional().or(z.literal('')),
  imageUrl: z.string().url().optional().or(z.literal('')),
  iconUrl: z.string().max(255).optional().or(z.literal('')),
  parentId: z.string().uuid().optional().or(z.literal('')),
  displayOrder: z.number().min(0).optional(),
  active: z.boolean(),
  metaTitle: z.string().max(128).optional().or(z.literal('')),
  metaDescription: z.string().max(255).optional().or(z.literal('')),
  metaKeywords: z.string().max(255).optional().or(z.literal('')),
});
