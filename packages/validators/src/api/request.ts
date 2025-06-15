import { z } from "zod";

export const paginatedRequestParamsSchema = z.object({
  cursor: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});
