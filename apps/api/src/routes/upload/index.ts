import { createRouter } from "~/utils/create-app";
import * as handlers from "./handlers";
import * as routes from "./routes";

const uploadRouter = createRouter().openapi(
  routes.uploadImage,
  handlers.uploadImage,
);

export default uploadRouter;
