import * as z from "zod";

export const registerFormSchema = z.object({
  username: z.string().trim().min(3, "Username must be at least 3 characters"),
  email: z.string().trim().email("Invalid email format"),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});
export const loginFormSchema = z.object({
  email: z.string().trim().email("Invalid email format"),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});
