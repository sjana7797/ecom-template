import { AppRouteHandler } from "~/types";
import { HealthCheckRoute } from "./routes";

export const healthCheck: AppRouteHandler<HealthCheckRoute> = (c) => {
  globalThis.logger.info("Health Ok");
  return c.json({
    message: "OK" as const,
  });
};
