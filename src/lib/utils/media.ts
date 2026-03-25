const RAW_API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';
const API_BASE = RAW_API_BASE.replace(/\/+$/, '').replace(/\/api$/, '');

export function resolveMediaUrl(mediaUrl?: string | null): string | undefined {
  if (!mediaUrl) {
    return undefined;
  }

  if (/^https?:\/\//i.test(mediaUrl)) {
    return mediaUrl;
  }

  if (mediaUrl.startsWith('/')) {
    return `${API_BASE}${mediaUrl}`;
  }

  const clean = mediaUrl.replace(/^\/+/, '');
  const [typeRaw, ...rest] = clean.split('/');
  const filename = rest.join('/');

  if (!filename) {
    return mediaUrl;
  }

  return `${API_BASE}/api/files/preview/${typeRaw}/${filename}`;
}

export function resolveAvatarUrl(avatarUrl?: string | null): string | undefined {
  const clean = avatarUrl?.replace(/^\/+/, '');
  if (!clean) {
    return undefined;
  }

  const [typeRaw, ...rest] = clean.split('/');
  const filename = rest.join('/');

  if (!filename) {
    return resolveMediaUrl(avatarUrl);
  }

  const type = typeRaw === 'avatar' ? 'avatars' : typeRaw;

  return `${API_BASE}/api/files/preview/${type}/${filename}`;
}
