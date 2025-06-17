import { createLogger } from "@repo/logger";
import { pinoLogger as honoPino } from "hono-pino";

export function pinoLogger() {
  const logger = createLogger({ label: "api" });

  const pinoLogger = honoPino({
    pino: logger,
  });

  return pinoLogger;
}
