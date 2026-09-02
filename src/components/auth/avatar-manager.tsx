'use client';

import { EntityImageManager } from '@/components/common/entity-image-manager';
import { useUploadAvatar } from '@/lib/auth/mutations';

interface AuthAvatarManagerProps {
  avatarUrl?: string;
}

export function AuthAvatarManager({ avatarUrl }: AuthAvatarManagerProps) {
  const uploadAvatar = useUploadAvatar();

  const images = [
    {
      url: avatarUrl,
      label: 'Profile Avatar',
      width: 192,
      height: 192,
      onUpload: (file: File) => uploadAvatar.mutate(file),
      isUploading: uploadAvatar.isPending,
    },
  ];

  return <EntityImageManager images={images} />;
}
