import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop Workspace Categories',
  description:
    'Browse PickNQuicks workspace categories, from ergonomic seating and displays to desk accessories and complete setups.',
  alternates: { canonical: '/shop/categories' },
  openGraph: {
    type: 'website',
    url: '/shop/categories',
    title: 'Shop Workspace Categories',
    description:
      'Browse technology and workspace collections selected for comfort, focus, and everyday work.',
    images: ['/images/workspace-after-v2.webp'],
  },
};

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
