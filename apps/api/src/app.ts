import { auth } from "@repo/auth";
import configureOpenAPI from "~/lib/configure-open-api";
import { routes } from "~/routes/root";
import { createApp } from "~/utils/create-app";
import { Exception } from "./exceptions/exception";
import * as HttpStatusPhrases from "@repo/utils/http/status-phrases";
import * as HttpStatusCodes from "@repo/utils/http/status-codes";

const app = createApp();

routes.forEach((route) => {
  app.route("/", route);
});

app.on(["POST", "GET"], "/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

configureOpenAPI(app);

app.onError((err, c) => {
  if (err instanceof Exception) {
    c.var.logger.error({
      name: err.name,
      message: err.message,
      status: err.status,
      err: err,
    });
    return c.json(
      {
        message: err.message,
        error: err.stack,
        status: err.status,
      },
      err.status ?? HttpStatusCodes.INTERNAL_SERVER_ERROR,
    );
  }

  let message = HttpStatusPhrases.INTERNAL_SERVER_ERROR;

  if (err instanceof Error) {
    message = err.message;
  }

  c.var.logger.error({
    name: err.name,
    message: err.message,
    status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    err: err,
  });

  return c.json(
    {
      message,
      error: err.stack,
      status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    },
    HttpStatusCodes.INTERNAL_SERVER_ERROR,
  );
});

export default app;
