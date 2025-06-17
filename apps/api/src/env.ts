import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    ACCESS_KEY_ID: z.string().min(1),
    SECRET_ACCESS_KEY: z.string().min(1),
    BUCKET_NAME: z.string().min(1),
    R2_TOKEN: z.string().min(1),
    R2_ACCOUNT_ID: z.string().min(1),
  },
  client: {},
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    BUCKET_NAME: process.env.BUCKET_NAME,
    R2_TOKEN: process.env.R2_TOKEN,
    R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // }
});
