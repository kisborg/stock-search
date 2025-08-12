import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Stock search',
  description: 'Find the latest and greatest stocks to invest in',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
