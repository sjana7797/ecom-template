import { pino } from "pino";
import pinoLoki from "pino-loki";

type CreateLoggerOptions = {
  label: string;
};

export function createLogger({ label }: CreateLoggerOptions) {
  const transport = pinoLoki({
    host: "http://localhost:3100",
    batching: true,
    interval: 5,
    labels: {
      app: label,
    },
  });

  const logger = pino(transport);

  return logger;
}
