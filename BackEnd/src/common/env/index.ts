import 'dotenv';
import { z } from 'zod';
import { AppError } from '../errors/AppError';

const envSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),
    PORT: z.coerce.number().default(3000),
    API_URL: z.string().url().default('http://localhost:3000'),
    DB_TYPE: z.literal('postgres').default('postgres'),
    DB_HOST: z.string().default('localhost'),
    DB_PORT: z.coerce.number().default(5433),
    DB_SCHEMA: z.string().default('public'),
    DB_NAME: z.string().default('postgres'),
    DB_USER: z.string().default('postgres'),
    DB_PASS: z.string().default('postgres'),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
    throw new AppError(`Invalid environment variables`);
}

export const env = _env.data;
