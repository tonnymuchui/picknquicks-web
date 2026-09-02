import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';
export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${origin}/auth/callback`, skipBrowserRedirect: true },
  });
  if (error || !data.url) {
    return NextResponse.redirect(`${origin}/auth/login?error=oauth`);
  }
  return NextResponse.redirect(data.url);
}
