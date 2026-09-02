import 'server-only';

import { unstable_cache } from 'next/cache';

import { createAdminClient } from '@/lib/supabase/server';

export interface StorefrontSettings {
  siteName: string;
  tagline: string;
  logoUrl?: string;
  heroImageUrl: string;
  heroAltText: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  motionVideoUrl: string;
  motionVideoPosterUrl: string;
}

const defaults: StorefrontSettings = {
  siteName: 'PickNQuicks',
  tagline: 'Tech & Workspace Essentials',
  heroImageUrl: '/images/workspace-after-v2.webp',
  heroAltText: 'A considered technology workspace',
  beforeImageUrl: '/images/workspace-before-v2.webp',
  afterImageUrl: '/images/workspace-after-v2.webp',
  motionVideoUrl: '/videos/workspace-motion.mp4',
  motionVideoPosterUrl: '/images/workspace-after-v2.webp',
};

const getCachedStorefrontSettings = unstable_cache(
  async (): Promise<StorefrontSettings> => {
    const { data } = await createAdminClient()
      .from('storefront_settings')
      .select('*')
      .eq('id', 1)
      .maybeSingle();
    if (!data) {
      return defaults;
    }
    return {
      siteName: data.site_name || defaults.siteName,
      tagline: data.tagline || defaults.tagline,
      logoUrl: data.logo_url || undefined,
      heroImageUrl: data.hero_image_url || defaults.heroImageUrl,
      heroAltText: data.hero_alt_text || defaults.heroAltText,
      beforeImageUrl: data.before_image_url || defaults.beforeImageUrl,
      afterImageUrl: data.after_image_url || defaults.afterImageUrl,
      motionVideoUrl: data.motion_video_url || defaults.motionVideoUrl,
      motionVideoPosterUrl: data.motion_video_poster_url || defaults.motionVideoPosterUrl,
    };
  },
  ['storefront-settings-v2'],
  {
    revalidate: 300,
    tags: ['storefront-settings'],
  }
);

export async function getStorefrontSettings(): Promise<StorefrontSettings> {
  return getCachedStorefrontSettings();
}

export interface StorefrontMediaItem {
  id: string;
  src: string;
  alt: string;
  eyebrow?: string;
  title?: string;
  body?: string;
}

const getCachedStorefrontMedia = unstable_cache(
  async (placement: 'JOURNAL' | 'GALLERY'): Promise<StorefrontMediaItem[]> => {
    const { data } = await createAdminClient()
      .from('storefront_media_items')
      .select('*')
      .eq('placement', placement)
      .eq('active', true)
      .order('display_order');
    return (data ?? []).map((item) => ({
      id: item.id,
      src: item.media_url,
      alt: item.alt_text,
      eyebrow: item.eyebrow || undefined,
      title: item.title || undefined,
      body: item.body || undefined,
    }));
  },
  ['storefront-media'],
  {
    revalidate: 300,
    tags: ['storefront-media'],
  }
);

export async function getStorefrontMedia(
  placement: 'JOURNAL' | 'GALLERY'
): Promise<StorefrontMediaItem[]> {
  return getCachedStorefrontMedia(placement);
}
