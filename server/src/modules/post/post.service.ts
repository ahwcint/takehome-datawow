import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import {
  createPostSchema,
  getPostSchema,
  listPostSchema,
} from 'src/schemas/post.schema';
import { z } from 'zod';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(
    payload: z.infer<typeof createPostSchema> & { authorId: string },
  ) {
    return this.prisma.post.create({ data: payload });
  }

  async getPost(param: z.infer<typeof getPostSchema>) {
    return this.prisma.post.findUnique({ where: param });
  }

  async listPost(param: z.infer<typeof listPostSchema>) {
    const whereCondition = new Map();
    const search = param.search?.trim();

    if (param.community) whereCondition.set('community', param.community);

    if (search)
      whereCondition.set('OR', [
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          community: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ]);

    return this.prisma.post.findMany({
      where: Object.fromEntries(whereCondition) as object,
      skip: Math.max(param.page - 1, 0),
      take: param.pageSize,
    });
  }
}
