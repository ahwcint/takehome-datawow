import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import {
  createUserSchema,
  getUserSchema,
  loginSchema,
} from 'src/schemas/user.schema';
import { comparePassword, hashPassword } from 'src/utils/hash';
import { z } from 'zod';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async login(payload: z.infer<typeof loginSchema>) {
    const user = await this.prisma.user.findUnique({
      where: { username: payload.username },
    });

    if (!user) throw new UnauthorizedException('username or password invalid');
    const { password, ...safeUser } = user;
    const verifyPassword = await comparePassword(password, payload.password);

    if (!verifyPassword)
      throw new UnauthorizedException('username or password invalid');

    return safeUser;
  }
  async easyLogin(payload: Omit<z.infer<typeof loginSchema>, 'password'>) {
    const user = await this.prisma.user.findUnique({
      where: { username: payload.username },
      omit: { password: true },
    });

    if (!user) {
      const newUser = await this.prisma.user.create({
        data: {
          username: payload.username,
          password: 'easy-password',
        },
        omit: { password: true },
      });
      return newUser;
    }

    return user;
  }
  async createUser(body: z.infer<typeof createUserSchema>) {
    const passwordHashed = await hashPassword(body.password);
    return await this.prisma.user.create({
      data: {
        username: body.username,
        password: passwordHashed,
      },
      omit: { password: true },
    });
  }

  async getUser(param: z.infer<typeof getUserSchema>) {
    return await this.prisma.user.findUnique({
      where: param,
      omit: { password: true },
    });
  }
}
