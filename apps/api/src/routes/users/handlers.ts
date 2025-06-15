import { AppRouteHandler } from "~/types";
import { ListUsersRoute } from "./routes";
import { auth } from "@repo/auth";
import { headers } from "next/headers";
import { db } from "@repo/db";
import { users } from "@repo/db/schema";
import { createPaginatedResponse } from "@repo/utils/api";
import * as HttpStatusCodes from "@repo/utils/http/status-codes";

export const list: AppRouteHandler<ListUsersRoute> = async (c) => {
  const headersData = await headers();
  const sessionResult = await auth.api.getSession({
    headers: headersData,
  });

  if (!sessionResult) {
    globalThis.logger.error({
      message: "Unauthorized",
      err: new Error("Unauthorized"),
    });
    return c.json(
      {
        message: "Unauthorized" as const,
      },
      {
        status: HttpStatusCodes.UNAUTHORIZED,
      }
    );
  }

  const { cursor, limit } = c.req.valid("query");

  const take = limit;
  const page = cursor ?? 1;
  const skip = (page - 1) * limit;

  const results = await db
    .select()
    .from(users)
    .limit(take + 1)
    .offset(skip);

  const responseData = createPaginatedResponse({
    data: results,
    limit,
    cursor: page,
  });

  return c.json(responseData, {
    status: HttpStatusCodes.OK,
  });
};
