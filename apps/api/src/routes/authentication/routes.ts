import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@repo/utils/http/status-codes";
import * as HttpStatusPhrases from "@repo/utils/http/status-phrases";
import { userSchema } from "@repo/validators/schema/user";
import { loginSchema, registerSchema } from "@repo/validators/forms/auth";

const paths = {
  register: "/authentication/register",
  login: "/authentication/login",
} as const;

const tags = ["Authentication"];
export const register = createRoute({
  path: paths.register,
  method: "post",
  tags,
  request: {
    body: {
      content: {
        "application/json": {
          schema: registerSchema,
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.CREATED]: {
      description: "User created",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: userSchema,
          }),
        },
      },
    },
    [HttpStatusCodes.BAD_REQUEST]: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            error: z.literal(HttpStatusPhrases.BAD_REQUEST),
          }),
        },
      },
    },
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: {
      description: HttpStatusPhrases.INTERNAL_SERVER_ERROR,
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            error: z.literal(HttpStatusPhrases.INTERNAL_SERVER_ERROR),
          }),
        },
      },
    },
  },
});

export const login = createRoute({
  path: paths.login,
  method: "post",
  tags,
  request: {
    body: {
      content: {
        "application/json": {
          schema: loginSchema,
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.CREATED]: {
      description: "User created",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            data: userSchema,
          }),
        },
      },
    },
    [HttpStatusCodes.BAD_REQUEST]: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            error: z.literal(HttpStatusPhrases.BAD_REQUEST),
          }),
        },
      },
    },
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: {
      description: HttpStatusPhrases.INTERNAL_SERVER_ERROR,
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
            error: z.literal(HttpStatusPhrases.INTERNAL_SERVER_ERROR),
          }),
        },
      },
    },
  },
});

export type AuthenticationRegisterRoute = typeof register;
export type AuthenticationLoginRoute = typeof login;
