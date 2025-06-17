import { Scalar } from "@scalar/hono-api-reference";

import type { AppOpenAPI } from "~/types";

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "ECommerce API",
    },
  });

  app.get(
    "/reference",
    Scalar({
      url: "/api/doc",
      theme: "bluePlanet",
      layout: "modern",
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
      },
    })
  );
}
