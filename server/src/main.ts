import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './utils/http-exception.filter';
import { ResponseInterceptor } from './utils/response.interceptor';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:3000'],
      credentials: true,
    },
  });

  app.use(cookieParser());

  const jwtAuthGuards = app.get(JwtAuthGuard);
  app.useGlobalGuards(jwtAuthGuards);

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(process.env.PORT ?? 3001);
}

void bootstrap();
