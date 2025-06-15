import { createRouter } from "~/utils/create-app";
import * as routes from "./routes";
import * as handlers from "./handlers";

export const usersRouter = createRouter().openapi(routes.list, handlers.list);
