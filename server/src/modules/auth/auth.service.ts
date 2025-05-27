import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(user: { id: string; username: string }) {
    const payload = { sub: user.id, username: user.username };
    const token = this.jwtService.sign(payload);

    return token;
  }
}
