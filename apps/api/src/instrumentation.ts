import type { Logger } from "pino";
import { createLogger } from "@repo/logger";
import { collectDefaultMetrics, Registry } from "prom-client";

declare global {
  var logger: Logger;
  var metrics: {
    registry: Registry;
  };
}

export async function register() {
  const logger = createLogger({ label: "next-api" });
  globalThis.logger = logger;

  const prometheusRegistry = new Registry();
  collectDefaultMetrics({ register: prometheusRegistry });
  globalThis.metrics = {
    registry: prometheusRegistry,
  };
}
