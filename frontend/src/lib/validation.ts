import { z } from "zod";

export const signUpFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    repeatPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .superRefine((data, ctx) => {
    const repeat = !!data.repeatPassword;

    if (!repeat) {
      ctx.addIssue({
        path: ["repeatPassword"],
        code: "custom",
        message: "Please confirm your password",
      });
    }
    if (data.password !== data.repeatPassword) {
      ctx.addIssue({
        path: ["repeatPassword"],
        code: "custom",
        message: "Passwords do not match",
      });
    }
  });

export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
