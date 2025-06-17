import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@repo/utils/http/status-codes";
import { imageSchema } from "@repo/validators/forms/image";

const tags = ["Upload"];

export const uploadImage = createRoute({
  method: "post",
  path: "/upload/image",
  tags,
  summary: "Upload Image",
  description: "Upload Image",
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: z.object({
            file: z.instanceof(File),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.CREATED]: {
      description: "Image uploaded successfully",
      content: {
        "application/json": {
          schema: imageSchema,
        },
      },
    },
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            error: z.string(),
          }),
        },
      },
    },
  },
});

export type UploadImageRoute = typeof uploadImage;
