import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  createPostSchema,
  getPostSchema,
  listPostSchema,
} from 'src/schemas/post.schema';
import { validate } from 'src/utils/utils';
import { PostService } from './post.service';
import { Ctx, CurrentCtx } from 'src/decorators/current-ctx.decorator';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  async create(@Body() body: any, @CurrentCtx() ctx: Ctx) {
    console.log('body :>> ', body);
    const data = validate(createPostSchema, body);
    console.log('data :>> ', data);

    return await this.postService.createPost({
      ...data,
      authorId: ctx.user.id,
    });
  }

  @Get('list')
  async list(@Query() query: any) {
    const data = validate(listPostSchema, query);
    return await this.postService.listPost(data);
  }

  @Get(':id')
  async get(@Param() param: any) {
    const data = validate(getPostSchema, param);
    return await this.postService.getPost(data);
  }
}
