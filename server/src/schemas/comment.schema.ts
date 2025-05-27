import { z } from 'zod';

export const createCommentSchema = z.object({
  postId: z.string().uuid(),
  content: z.string().min(1),
});
