import { auth } from "@repo/auth";
import { handle } from "hono/vercel";
import configureOpenAPI from "~/lib/configure-open-api";
import { routes } from "~/routes/root";
import { createApp } from "~/utils/create-app";

const app = createApp();

routes.forEach((route) => {
  app.route("/", route);
});

app.on(["POST", "GET"], "/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

configureOpenAPI(app);

export const GET = handle(app);
export const POST = handle(app);
