import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(2, 'Minimum 2 characters').max(20, 'Maximum 20 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Minimum 6 characters'),
})