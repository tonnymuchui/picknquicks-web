import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'PicknQuicks',
  description: 'PicknQuicks - Your quick pick solution',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
