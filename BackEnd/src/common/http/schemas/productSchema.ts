import { BadRequestError } from '@/common/errors/AppError';
import {z} from 'zod';

export const productSchema = z.object({
    code: z.string(),
    name: z.string(),
    description: z.string(),
    value: z.number(),
    stock: z.number()
});

export const productOptionalSchema = z.object({
    code: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    value: z.number().optional(),
    stock: z.number().optional()
});
