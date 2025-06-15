import { createRouter } from "~/utils/create-app";

export const metricsRoute = createRouter().get("/metrics", async (c) => {
  const metrics = await globalThis.metrics.registry.metrics();

  return new Response(metrics, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
});
