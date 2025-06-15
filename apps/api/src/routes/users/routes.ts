import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@repo/utils/http/status-codes";
import { userSchema } from "@repo/validators/schema/user";
import { paginatedRequestParamsSchema } from "@repo/validators/api";

const tags = ["Users"];
export const list = createRoute({
  path: "/users",
  method: "get",
  tags,
  request: {
    query: paginatedRequestParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: {
      description: "List of users",
      content: {
        "application/json": {
          schema: z.object({
            data: z.array(userSchema),
            nextCursor: z.number().positive().int().nullable(),
            page: z.number().positive().int().min(1),
          }),
        },
      },
    },
    [HttpStatusCodes.UNAUTHORIZED]: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: z.object({
            message: z.literal("Unauthorized"),
          }),
        },
      },
    },
  },
});

export type ListUsersRoute = typeof list;
