import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(2, 'Minimum 2 characters').max(20, 'Maximum 20 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Minimum 6 characters'),
})

export const logInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Minimum 6 characters"),
});

export const pinSchema = z.object({
  description: z.string().optional(),
  coordinates: z.string().min(1, "Position not found. Please enable location permissions in your device settings."),
  injured: z.string(),
});