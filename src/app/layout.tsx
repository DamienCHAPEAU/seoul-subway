import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import Provider from '@/app/_trpc/Provider';
import { ComboboxSubwayLines } from '@/components/select-subway';
import { fontSans } from '@/lib/font';
import { serverClient } from './_trpc/serverClient';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'Seoul Subway',
  description: 'Get the latest subway information in Seoul, South Korea.',
  keywords: 'subway, seoul, south korea',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const lines = await serverClient.getLines();
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased container p-12 lg:p-24',
          fontSans.variable
        )}
      >
        <h1 className="text-4xl font-bold pb-4">Seoul Subway</h1>
        <ComboboxSubwayLines lines={lines} />
        <Provider>{children}</Provider>
        <Analytics />
      </body>
    </html>
  );
}
