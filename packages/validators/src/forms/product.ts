import { z } from "zod";

export const addProductSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  costPrice: z.number(),
  sellingPrice: z.number(),
  stock: z.number().int().positive(),
  image: z.string(),
  brandId: z.string().uuid(),
  status: z.enum(["draft", "published", "archived"]),
  maxQuantity: z.number().int().positive().optional(),
  categoryIds: z.array(z.string().uuid()),
});

export type AddProductForm = z.infer<typeof addProductSchema>;
