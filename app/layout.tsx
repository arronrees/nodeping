import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Node Ping',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`antialiased font-sans min-h-screen flex flex-col`}>
        <Header />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
