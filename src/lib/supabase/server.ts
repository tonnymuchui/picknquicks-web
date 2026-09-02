import { createServerClient } from '@supabase/ssr';
import {
  createClient as createSupabaseClient,
  type SupabaseClientOptions,
} from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import WebSocket from 'ws';

import { publicSupabaseEnv, serverSupabaseEnv } from './env';

type RealtimeTransport = NonNullable<
  NonNullable<SupabaseClientOptions<'public'>['realtime']>['transport']
>;
const serverWebSocket = WebSocket as unknown as RealtimeTransport;

export async function createClient() {
  const cookieStore = await cookies();
  const { url, publishableKey } = publicSupabaseEnv();

  return createServerClient(url, publishableKey, {
    realtime: { transport: serverWebSocket },
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {}
      },
    },
  });
}

export function createAdminClient() {
  const { url, secretKey } = serverSupabaseEnv();
  return createSupabaseClient(url, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    realtime: { transport: serverWebSocket },
  });
}
