import { Body, Controller, Post } from '@nestjs/common';
import { createCommentSchema } from 'src/schemas/comment.schema';
import { validate } from 'src/utils/utils';
import { CommentService } from './comment.service';
import { Ctx, CurrentCtx } from 'src/decorators/current-ctx.decorator';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() body: any, @CurrentCtx() ctx: Ctx) {
    const data = validate(createCommentSchema, body);

    return await this.commentService.createComment({
      ...data,
      authorId: ctx.user.id,
    });
  }
}
