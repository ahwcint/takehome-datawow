import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: Record<string, any> | null = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'object' && res !== null) {
        const { message: msg, ...rest } = res as Record<string, unknown>;
        message = (msg || message) as string;
        errors = rest.errors || null;
      } else {
        message = res;
      }
    }

    if (exception instanceof BadRequestException) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Validation error';
      errors = (exception as unknown as { response: Record<string, unknown> })
        .response;
    }

    if (exception instanceof PrismaClientKnownRequestError) {
      message = 'Validation failed';
      if (exception.code === 'P2002') message = 'username already existed';
      status = HttpStatus.BAD_REQUEST;
      errors = exception;
    }

    if (exception instanceof UnauthorizedException) {
      status = HttpStatus.UNAUTHORIZED;
      message = 'Unauthorized';
      errors = exception;
      response.clearCookie('token');
    }

    console.error('exception', exception);
    response.status(status).json({
      success: false,
      message,
      errors,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
