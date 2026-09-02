import type { NextConfig } from 'next';

interface ImageRemotePattern {
  protocol: 'http' | 'https';
  hostname: string;
  port: string;
  pathname: string;
}

function toRemotePattern(value: string): ImageRemotePattern | null {
  try {
    const url = new URL(value);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return null;
    }

    return {
      protocol: url.protocol.slice(0, -1) as 'http' | 'https',
      hostname: url.hostname,
      port: url.port,
      pathname: '/**',
    };
  } catch {
    return null;
  }
}

const configuredImageHosts = (process.env.NEXT_PUBLIC_IMAGE_HOSTS ?? '')
  .split(',')
  .map((host) => host.trim())
  .filter(Boolean);
const remotePatterns = [
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  'https://lh3.googleusercontent.com',
  ...configuredImageHosts,
]
  .filter((value): value is string => Boolean(value))
  .map(toRemotePattern)
  .filter((pattern): pattern is ImageRemotePattern => pattern !== null);

const nextConfig: NextConfig = {
  reactCompiler: true,
  distDir: process.env.NEXT_DIST_DIR ?? '.next',
  async redirects() {
    return [
      {
        source: '/shop/categories/connectivity',
        destination: '/shop/categories/accessories',
        permanent: true,
      },
    ];
  },
  async headers() {
    const noindexHeaders = [
      '/admin/:path*',
      '/api/:path*',
      '/auth/:path*',
      '/cart/:path*',
      '/checkout/:path*',
      '/orders/:path*',
      '/settings/:path*',
      '/track-order/:path*',
    ].map((source) => ({
      source,
      headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }],
    }));

    return [
      ...noindexHeaders,
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        ],
      },
    ];
  },
  images: {
    remotePatterns,
  },
};

export default nextConfig;
