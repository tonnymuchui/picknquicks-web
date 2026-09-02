import { createBrowserClient } from '@supabase/ssr';

import { publicSupabaseEnv } from './env';

export function createClient() {
  const { url, publishableKey } = publicSupabaseEnv();
  return createBrowserClient(url, publishableKey);
}
