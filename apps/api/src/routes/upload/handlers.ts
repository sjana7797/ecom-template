import { AppRouteHandler } from "~/types";
import { UploadImageRoute } from "./routes";
import { S3Client } from "bun";
import { env } from "~/env";
import * as HttpStatusCodes from "@repo/utils/http/status-codes";
import { db } from "@repo/db";
import { images } from "@repo/db/schema";
import { UnauthorizedException } from "~/exceptions/unauthorised";

const credentials = {
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  accessKeyId: env.ACCESS_KEY_ID,
  secretAccessKey: env.SECRET_ACCESS_KEY,
  bucket: env.BUCKET_NAME,
};

export const uploadImage: AppRouteHandler<UploadImageRoute> = async (c) => {
  try {
    if (!c.var.session) {
      throw new UnauthorizedException();
    }

    const { file } = c.req.valid("form");

    const client = new S3Client(credentials);

    await client.write(file.name, file, {
      type: file.type,
    });

    const url = client.presign(file.name, {
      ...credentials,
    });

    const results = await db
      .insert(images)
      .values({
        url,
      })
      .returning();

    if (!results.length) {
      throw new Error("Failed to upload image");
    }

    return c.json(results[0], {
      status: HttpStatusCodes.CREATED,
    });
  } catch (error) {
    c.var.logger.error({
      message: "Error uploading image",
      err: error,
    });

    return c.json(
      {
        message: "Error uploading image",
        error: JSON.stringify(error),
      },
      {
        status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      },
    );
  }
};
