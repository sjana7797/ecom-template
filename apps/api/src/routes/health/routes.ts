import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@repo/utils/http/status-codes";

const tags = ["Health"];

export const healthCheck = createRoute({
  path: "/health",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: {
      description: "Health check",
      content: {
        "application/json": {
          schema: z.object({
            message: z.literal("OK"),
          }),
        },
      },
    },
  },
});

export type HealthCheckRoute = typeof healthCheck;
