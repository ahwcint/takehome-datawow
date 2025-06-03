import type { Metadata } from 'next';
import './globals.css';
import AppServer from '@/components/common/app/appServer';

export const metadata: Metadata = {
  title: 'Grid',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppServer>{children}</AppServer>;
}
