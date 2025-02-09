import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Node ping',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`antialiased font-sans min-h-screen`}>{children}</body>
    </html>
  );
}
