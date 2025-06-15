import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export const signUpSchema = registerSchema.superRefine((data, ctx) => {
  const passwordsMatch = data.password === data.confirmPassword;

  if (!passwordsMatch) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  }
});

export const loginSchema = registerSchema.pick({
  email: true,
  password: true,
});

export type SignUpFormSchema = z.infer<typeof signUpSchema>;
export type LoginFormSchema = z.infer<typeof loginSchema>;
