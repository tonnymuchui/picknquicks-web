const required = (name: string, value: string | undefined) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

export function publicSupabaseEnv() {
  return {
    url: required('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL),
    publishableKey: required(
      'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    ),
  };
}

export function serverSupabaseEnv() {
  return {
    ...publicSupabaseEnv(),
    secretKey: required('SUPABASE_SECRET_KEY', process.env.SUPABASE_SECRET_KEY),
  };
}
