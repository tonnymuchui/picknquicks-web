export function resolveMediaUrl(mediaUrl?: string | null): string | undefined {
  if (!mediaUrl) {
    return undefined;
  }

  if (/^https?:\/\//i.test(mediaUrl)) {
    return mediaUrl;
  }

  if (mediaUrl.startsWith('/')) {
    return mediaUrl;
  }

  const clean = mediaUrl.replace(/^\/+/, '');
  return `/${clean}`;
}

export function resolveAvatarUrl(avatarUrl?: string | null): string | undefined {
  if (avatarUrl && /^https?:\/\//i.test(avatarUrl)) {
    return avatarUrl;
  }

  const clean = avatarUrl?.replace(/^\/+/, '');
  if (!clean) {
    return undefined;
  }

  return `/${clean}`;
}
