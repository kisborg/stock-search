import type { Metadata } from 'next';
import './globals.css';
import Favorites from '@/components/favorites/Favorites';

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
      <body>
        <Favorites />
        {children}
      </body>
    </html>
  );
}
