import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().optional(),
  community: z.string().optional(),
});

export const getPostSchema = z.object({
  id: z.string().uuid(),
});

export const listPostSchema = z.object({
  page: z.preprocess((v) => Number(v), z.number()),
  pageSize: z.preprocess((v) => Number(v), z.number()),
  search: z.string().optional(),
  community: z.string().optional(),
});
