"use client";

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { LoginFormSchema, SignUpFormSchema } from "@repo/validators/forms/auth";
import { APIResponse, mutator } from "../fetcher";
import { AUTHENTICATION_ROUTES } from "../routes";
import { type User } from "@repo/validators/schema/user";

type SignUpResponse = {
  data: User;
  message: string;
};

const register = {
  useMutation: (
    options?: Omit<
      UseMutationOptions<
        APIResponse<SignUpResponse>,
        Error,
        SignUpFormSchema,
        unknown
      >,
      "mutationFn"
    >
  ) =>
    useMutation({
      ...options,
      mutationFn: async (body: SignUpFormSchema) => {
        return await mutator<SignUpFormSchema, SignUpResponse>({
          body,
          url: AUTHENTICATION_ROUTES.REGISTER,
        });
      },
    }),
};

const login = {
  useMutation: (
    options?: Omit<
      UseMutationOptions<
        APIResponse<SignUpResponse>,
        Error,
        LoginFormSchema,
        unknown
      >,
      "mutationFn"
    >
  ) =>
    useMutation({
      ...options,
      mutationFn: async (body: LoginFormSchema) => {
        return await mutator<LoginFormSchema, SignUpResponse>({
          body,
          url: AUTHENTICATION_ROUTES.LOGIN,
        });
      },
    }),
};

export const authService = {
  register,
  login,
};
