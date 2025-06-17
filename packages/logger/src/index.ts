import { pino } from "pino";
import pinoLoki from "pino-loki";
import PinoPretty from "pino-pretty";

type CreateLoggerOptions = {
  label: string;
};

export function createLogger({ label }: CreateLoggerOptions) {
  const isProd = process.env.NODE_ENV === "production";

  const transport = pinoLoki({
    host: "http://localhost:3100",
    batching: true,
    interval: 5,
    labels: {
      app: label,
    },
  });

  const logger = pino(isProd ? transport : PinoPretty());

  return logger;
}
