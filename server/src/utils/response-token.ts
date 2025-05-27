import { Response } from 'express';

export default function setCookieToken(response: Response, token: string) {
  response.cookie('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  });
}
