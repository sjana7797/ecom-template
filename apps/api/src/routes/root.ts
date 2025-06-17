import { healthRouter } from "./health";
import { usersRouter } from "./users";
import { authenticationRouter } from "./authentication";
import uploadRouter from "./upload";

export const routes = [
  healthRouter,
  usersRouter,
  authenticationRouter,
  uploadRouter,
] as const;
