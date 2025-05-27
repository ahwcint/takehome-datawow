import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, PostModule, CommentModule],
})
export class AppModule {}
