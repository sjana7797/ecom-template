import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import { auth } from "@repo/auth";
import type { Schema } from "hono";
import { Logger } from "pino";

export interface AppBindings {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
    logger: Logger;
  };
}

export type AppOpenAPI<S extends Schema = {}> = OpenAPIHono<AppBindings, S>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;
