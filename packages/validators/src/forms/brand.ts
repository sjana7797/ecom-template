import { z } from "zod";

export const addBrandSchema = z.object({
  name: z.string(),
  slug: z.string(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  imageId: z.string().uuid(),
});
