import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop Workspace Brands',
  description:
    'Explore active technology and workspace brands available from PickNQuicks in Kenya.',
  alternates: { canonical: '/shop/brands' },
  openGraph: {
    type: 'website',
    url: '/shop/brands',
    title: 'Shop Workspace Brands',
    description: 'Explore active technology and workspace brands available from PickNQuicks.',
    images: ['/images/workspace-after-v2.webp'],
  },
};

export default function BrandsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
