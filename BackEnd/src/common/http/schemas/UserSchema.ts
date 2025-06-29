import { z } from "zod";

export const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
})

export const loginSchema = z.object({
    email: z.string(),
    password: z.string()
})

export const userOptionalSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional()
})