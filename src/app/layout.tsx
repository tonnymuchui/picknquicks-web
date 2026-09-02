import { Navbar } from '@/components/layout/navbar';
import { SiteFooter } from '@/components/layout/site-footer';
import { JsonLd } from '@/components/seo/json-ld';
import { QueryProvider } from '@/lib/providers/query-provider';
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from '@/lib/seo/site';
import { getStorefrontSettings } from '@/lib/site/storefront-settings';
import { StorefrontSettingsProvider } from '@/lib/site/storefront-settings-context';

import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  category: 'shopping',
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    siteName: SITE_NAME,
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/images/workspace-after-v2.webp',
        alt: 'A complete PickNQuicks workspace setup',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: ['/images/workspace-after-v2.webp'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storefrontSettings = await getStorefrontSettings();
  const organizationId = `${SITE_URL}/#organization`;
  const logo = absoluteUrl(storefrontSettings.logoUrl || '/icon.svg');

  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-sans text-[#1f1c17] antialiased">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'OnlineStore',
                '@id': organizationId,
                name: storefrontSettings.siteName || SITE_NAME,
                url: SITE_URL,
                description: SITE_DESCRIPTION,
                ...(logo ? { logo } : {}),
                currenciesAccepted: 'KES',
                paymentAccepted: ['M-Pesa', 'Cash on delivery'],
              },
              {
                '@type': 'WebSite',
                '@id': `${SITE_URL}/#website`,
                url: SITE_URL,
                name: storefrontSettings.siteName || SITE_NAME,
                description: SITE_DESCRIPTION,
                publisher: { '@id': organizationId },
                inLanguage: 'en-KE',
              },
            ],
          }}
        />
        <QueryProvider>
          <StorefrontSettingsProvider value={storefrontSettings}>
            <a
              className="sr-only z-[100] bg-black px-4 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white"
              href="#main-content"
            >
              Skip to main content
            </a>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <div className="flex-1 outline-none" id="main-content" tabIndex={-1}>
                {children}
              </div>
              <SiteFooter />
            </div>
          </StorefrontSettingsProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
