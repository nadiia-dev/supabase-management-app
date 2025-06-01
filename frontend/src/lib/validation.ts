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

export const createTeamSchema = z
  .object({
    name: z.string().optional(),
    inviteCode: z.string().optional(),
  })
  .refine((data) => data.name || data.inviteCode, {
    message: "Please provide either a team name or an invite code",
    path: ["name"],
  });

export const updateUserSchema = z.object({
  full_name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  avatar_url: z.string().optional(),
});
