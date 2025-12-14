import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  role: z
    .string()
    .min(2, "Role must be at least 2 characters")
    .max(30, "Role must be less than 30 characters"),
  status: z.enum(["active", "suspended"] as const),
});

export type UserFormData = z.infer<typeof userSchema>;
