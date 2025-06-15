import { OpenAPIHono } from "@hono/zod-openapi";
import configureOpenAPI from "~/lib/configure-open-api";
import { AppBindings } from "~/types";
import { cors } from "hono/cors";

export function createRouter() {
  const router = new OpenAPIHono<AppBindings>();

  return router;
}

export function createApp() {
  const app = createRouter().basePath("/api");

  app.use(
    "/api/*",
    cors({
      origin: "*", // or specific: (origin) => origin === "http://localhost:3000"
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
    })
  );

  return app;
}
