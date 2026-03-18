const RAW_API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';
const API_BASE = RAW_API_BASE.replace(/\/+$/, '').replace(/\/api$/, '');

export function resolveAvatarUrl(avatarUrl?: string | null): string | undefined {
  if (!avatarUrl) return undefined;

  if (/^https?:\/\//i.test(avatarUrl)) return avatarUrl;

  const clean = avatarUrl.replace(/^\/+/, '');
  const [typeRaw, ...rest] = clean.split('/');
  const filename = rest.join('/');

  if (!filename) return undefined;

  const type = typeRaw === 'avatar' ? 'avatars' : typeRaw;

  return `${API_BASE}/api/files/preview/${type}/${filename}`;
}
