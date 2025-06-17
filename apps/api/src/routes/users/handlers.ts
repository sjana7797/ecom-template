import { AppRouteHandler } from "~/types";
import { ListUsersRoute } from "./routes";
import { db } from "@repo/db";
import { users } from "@repo/db/schema";
import { createPaginatedResponse } from "@repo/utils/api";
import * as HttpStatusCodes from "@repo/utils/http/status-codes";
import { UnauthorizedException } from "~/exceptions/unauthorised";

export const list: AppRouteHandler<ListUsersRoute> = async (c) => {
  if (!c.var.session) {
    throw new UnauthorizedException();
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
