import { z } from "zod";

export const paginatedRequestParamsSchema = z.object({
  cursor: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});

export type PaginatedRequestParams = z.infer<
  typeof paginatedRequestParamsSchema
>;
