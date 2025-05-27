import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { createCommentSchema } from 'src/schemas/comment.schema';
import { z } from 'zod';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async createComment(
    payload: z.infer<typeof createCommentSchema> & { authorId: string },
  ) {
    return this.prisma.comment.create({ data: payload });
  }
}
