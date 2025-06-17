import { OpenAPIHono } from "@hono/zod-openapi";
import { AppBindings } from "~/types";
import { cors } from "hono/cors";
import { requestId } from "hono/request-id";
import { pinoLogger } from "~/middlewares/pinoLogger";
import { Registry } from "prom-client";
import { prometheus } from "@hono/prometheus";
import { protectedRoutesMiddleware } from "~/middlewares/protected-routes";

export function createRouter() {
  const router = new OpenAPIHono<AppBindings>();
  return router;
}

export function createApp() {
  const app = createRouter().basePath("/api");
  app.use(
    "*",
    cors({
      origin: ["http://localhost:3000", "http://localhost:3002"],
      credentials: true,
    }),
  );

  app.use(protectedRoutesMiddleware);

  const prometheusRegistry = new Registry();

  const { printMetrics, registerMetrics } = prometheus({
    registry: prometheusRegistry,
    collectDefaultMetrics: true,
  });

  app.use("*", registerMetrics);
  app.get("/metrics", printMetrics);

  app.use(pinoLogger());
  app.use(requestId());

  return app;
}
