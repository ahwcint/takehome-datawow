import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigator from "@/components/common/navigator/navigator";
import { SessionProvider } from "@/context/session-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Datawow test",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-dvh flex flex-col overflow-clip`}
      >
        <SessionProvider>
          <Navigator>{children}</Navigator>
          <Toaster richColors position="top-right"/>
        </SessionProvider>
      </body>
    </html>
  );
}
