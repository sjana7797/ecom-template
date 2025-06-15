import { AppRouteHandler } from "~/types";
import {
  AuthenticationLoginRoute,
  AuthenticationRegisterRoute,
} from "./routes";
import { auth } from "@repo/auth";
import * as HttpStatusCodes from "@repo/utils/http/status-codes";
import * as HttpStatusPhrases from "@repo/utils/http/status-phrases";
import { db } from "@repo/db";
import { users } from "@repo/db/schema";
import { eq } from "drizzle-orm";

export const register: AppRouteHandler<AuthenticationRegisterRoute> = async (
  c
) => {
  const { confirmPassword, email, firstName, lastName, password } =
    c.req.valid("json");

  if (password !== confirmPassword) {
    return c.json(
      {
        message: "Passwords do not match",
        error: HttpStatusPhrases.BAD_REQUEST,
      } as const,
      {
        status: HttpStatusCodes.BAD_REQUEST,
      }
    );
  }

  const { user } = await auth.api.createUser({
    body: {
      email,
      name: `${firstName} ${lastName}`,
      password,
    },
  });

  const results = await db.select().from(users).where(eq(users.id, user.id));

  const userData = results.at(0);

  if (!userData) {
    return c.json(
      {
        message: "User cannot be created",
        error: HttpStatusPhrases.INTERNAL_SERVER_ERROR,
      } as const,
      {
        status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      }
    );
  }

  return c.json(
    {
      message: "User created",
      data: userData,
    },
    {
      status: HttpStatusCodes.CREATED,
    }
  );
};

export const login: AppRouteHandler<AuthenticationLoginRoute> = async (c) => {
  const { email, password } = c.req.valid("json");

  const { user } = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  const results = await db.select().from(users).where(eq(users.id, user.id));

  const userData = results.at(0);

  if (!userData) {
    return c.json(
      {
        message: "User login failed",
        error: HttpStatusPhrases.INTERNAL_SERVER_ERROR,
      } as const,
      {
        status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      }
    );
  }

  return c.json(
    {
      message: "User login success",
      data: userData,
    },
    {
      status: HttpStatusCodes.CREATED,
    }
  );
};
