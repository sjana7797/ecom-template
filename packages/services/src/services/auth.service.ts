"use client";

import { type User } from "@repo/validators/schema/user";

type SignUpResponse = {
  data: User;
  message: string;
};

export const authService = {};
