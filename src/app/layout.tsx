import { Navbar } from '@/components/layout/navbar';
import { QueryProvider } from '@/lib/providers/query-provider';

import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PickNQuicks - Premium Tech Solutions & Online Shopping',
  description:
    'Shop the latest products at the best prices. Premium tech solutions, fast delivery, and 24/7 support.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 font-sans antialiased">
        <QueryProvider>
          <Navbar />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}