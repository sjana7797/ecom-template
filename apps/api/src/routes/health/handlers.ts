import { AppRouteHandler } from "~/types";
import { HealthCheckRoute } from "./routes";

export const healthCheck: AppRouteHandler<HealthCheckRoute> = (c) => {
  c.var.logger.info("Health Ok");
  return c.json({
    message: "OK" as const,
  });
};
