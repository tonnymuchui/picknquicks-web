export const SITE_NAME = 'PickNQuicks';
export const SITE_TAGLINE = 'Tech & Workspace Essentials';
export const SITE_DESCRIPTION =
  'Shop technology and workspace essentials in Kenya, including displays, ergonomic seating, desk accessories, and complete work setups.';
export const SITE_CURRENCY = 'KES';
export const SITE_COUNTRY = 'KE';

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_URL || 'https://www.picknquicks.com';

export const SITE_URL = new URL(configuredSiteUrl).origin;

export function absoluteUrl(pathOrUrl?: string | null): string | undefined {
  if (!pathOrUrl) {
    return undefined;
  }

  try {
    return new URL(pathOrUrl, `${SITE_URL}/`).toString();
  } catch {
    return undefined;
  }
}

export function plainText(value?: string | null): string {
  return (value ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function seoDescription(value?: string | null, fallback = SITE_DESCRIPTION): string {
  const text = plainText(value) || fallback;
  return text.length > 160 ? `${text.slice(0, 157).trimEnd()}...` : text;
}

export function productPath(slug: string): string {
  return `/products/${encodeURIComponent(slug)}`;
}

export function categoryPath(slug: string): string {
  return `/shop/categories/${encodeURIComponent(slug)}`;
}

export function brandPath(slug: string): string {
  return `/shop/brands/${encodeURIComponent(slug)}`;
}
