"use client";

import { authService } from "./services/auth.service";
import { userService } from "./services/user.service";

export const api = {
  authService,
  userService,
} as const;
