'use server';

import { PropsWithChildren } from 'react';
import AppClient from './appClient';
import { getToken } from '@/lib/getToken';
import { verifyToken } from '@/lib/auth';

export default async function AppServer({ children }: PropsWithChildren) {
  const cookie = await getToken();
  const validToken = await verifyToken(cookie);
  const user = validToken ? { id: validToken.sub, username: validToken.username } : validToken;
  return (
    <html lang="en">
      <AppClient user={user}>{children}</AppClient>
    </html>
  );
}
