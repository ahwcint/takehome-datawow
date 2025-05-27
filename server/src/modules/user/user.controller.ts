import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import {
  createUserSchema,
  easyUserLogin,
  getUserSchema,
  loginSchema,
} from 'src/schemas/user.schema';
import { UserService } from './user.service';
import { validate } from 'src/utils/utils';
import { AuthService } from '../auth/auth.service';
import { Public } from 'src/decorators/public.decorator';
import { Response } from 'express';
import setCookieToken from 'src/utils/response-token';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('easy-login')
  async autoSignIn(
    @Body() body: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    const data = validate(easyUserLogin, body);

    const res = await this.userService.easyLogin(data);

    const token = this.authService.login({
      id: res.id,
      username: res.username,
    });

    setCookieToken(response, token);
    return res;
  }

  @Public()
  @Post('login')
  async login(
    @Body() body: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    const data = validate(loginSchema, body);

    const res = await this.userService.login(data);

    const token = this.authService.login({
      id: res.id,
      username: res.username,
    });

    setCookieToken(response, token);
    return res;
  }

  @Public()
  @Post('register')
  async register(
    @Body() body: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    const data = validate(createUserSchema, body);

    const res = await this.userService.createUser(data);

    const token = this.authService.login({
      id: res.id,
      username: res.username,
    });

    setCookieToken(response, token);
    return res;
  }

  @Get('user/:id')
  async get(@Param() param: any) {
    const data = validate(getUserSchema, param);

    return await this.userService.getUser(data);
  }
}
