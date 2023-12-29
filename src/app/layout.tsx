import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import Provider from '@/app/_trpc/Provider';
import { fontSans } from '@/lib/font';

export const metadata: Metadata = {
  title: 'Seoul Subway',
  description: 'Get the latest subway information in Seoul, South Korea.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
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
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
