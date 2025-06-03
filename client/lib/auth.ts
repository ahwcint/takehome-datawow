'use server';

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'datawow_jwt_key';

type VerifyResponse = {
  sub: string;
  username: string;
};

export const verifyToken = async (token: string): Promise<VerifyResponse | null> => {
  try {
    return jwt.verify(token, JWT_SECRET) as VerifyResponse;
  } catch {
    return null;
  }
};
