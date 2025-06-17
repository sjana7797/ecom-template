import { z } from "zod";

export const imageSchema = z.object({
  id: z.string().uuid(),
  url: z.string(),
  createdAt: z.string().datetime().nullable(),
  updatedAt: z.string().datetime().nullable(),
});

export type ImageForm = z.infer<typeof imageSchema>;

export const imageUploadResponseSchema = z.object({
  url: z.string(),
});
