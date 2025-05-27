import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const getUserSchema = z.object({
  id: z.string().uuid(),
});

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const easyUserLogin = z.object({
  username: z.string().min(1),
});
