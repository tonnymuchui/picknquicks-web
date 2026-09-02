import { SITE_DESCRIPTION } from '@/lib/seo/site';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop All Workspace Products',
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/products' },
  openGraph: {
    type: 'website',
    url: '/products',
    title: 'Shop All Workspace Products',
    description: SITE_DESCRIPTION,
    images: ['/images/workspace-after-v2.webp'],
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
