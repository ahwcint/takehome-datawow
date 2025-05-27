import { BadRequestException } from '@nestjs/common';
import { ZodType, ZodTypeDef } from 'zod';

export function validate<T>(
  schema: ZodType<T, ZodTypeDef, unknown>,
  data: unknown,
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new BadRequestException({
      formErrors: [],
      fieldErrors: result.error.format(),
    });
  }
  return result.data;
}
