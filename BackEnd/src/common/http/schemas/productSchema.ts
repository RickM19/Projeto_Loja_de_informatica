import {z} from 'zod';

export const productSchema = z.object({
    code: z.string().nonempty(),
    imgUrl: z.string().nonempty(),
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    value: z.number().gt(0),
    stock: z.number()
});

export const productOptionalSchema = z.object({
    code: z.string().optional(),
    imgUrl: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    value: z.number().optional(),
    stock: z.number().optional()
});
