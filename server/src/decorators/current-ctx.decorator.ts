import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentCtx = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Ctx>();
    return { user: request.user };
  },
);

export type Ctx = {
  user: {
    id: string;
    username: string;
  };
};
