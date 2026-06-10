import { z } from "zod";

export const signUpSchema = z.object({
	name: z.string().trim().min(1, "Name is required").max(100),
	email: z.email("Enter a valid email"),
	password: z.string().min(8, "Password must be at least 8 characters").max(128),
});

export const signInSchema = z.object({
	email: z.email("Enter a valid email"),
	password: z.string().min(1, "Password is required"),
});

export const todoSchema = z.object({
	text: z.string().trim().min(1, "Todo text is required").max(500),
});
