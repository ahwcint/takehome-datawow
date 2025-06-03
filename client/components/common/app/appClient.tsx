'use client';

import Navigator from '@/components/common/navigator/navigator';
import { Geist, Geist_Mono } from 'next/font/google';
import { SessionProvider, Session } from '@/context/session-provider';
import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient();

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function AppClient({ children, user }: PropsWithChildren & Session) {
  return (
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased h-dvh flex flex-col overflow-clip`}
    >
      <QueryClientProvider client={queryClient}>
        <SessionProvider initialValue={{ user }}>
          <Navigator>{children}</Navigator>
          <Toaster richColors position="top-right" />
        </SessionProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </body>
  );
}
