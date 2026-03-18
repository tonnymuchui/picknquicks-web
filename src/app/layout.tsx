import { QueryProvider } from '@/lib/providers/query-provider';
import { Navbar } from '@/components/layout/navbar';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PickNQuicks - Your Online Shopping Destination',
  description: 'Shop the latest products at the best prices',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <QueryProvider>
          <Navbar />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}