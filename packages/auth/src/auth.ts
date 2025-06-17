import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@repo/db";
import { admin, openAPI } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  plugins: [admin(), openAPI()],
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["http://localhost:3000", "http://localhost:3002"],
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain: "localhost",
    },
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
      partitioned: true, // New browser standards will mandate this for foreign cookies
    },
  },
});

export type Auth = typeof auth.$Infer;
