import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
});

const { data, success, error } = envSchema.safeParse(process.env);

if (!success) {
  console.error('Failed to create environment', error.format());

  throw new Error('Failed to create environment');
}

export const env = data;
