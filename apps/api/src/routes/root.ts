import "server-only";

import { healthRouter } from "./health";
import { usersRouter } from "./users";
import { metricsRoute } from "./metrics";
import { authenticationRouter } from "./authentication";

export const routes = [
  healthRouter,
  usersRouter,
  metricsRoute,
  authenticationRouter,
] as const;
