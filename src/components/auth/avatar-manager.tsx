'use client';

import { useUploadAvatar, useRemoveAvatar } from '@/lib/auth/mutations';
import { EntityImageManager } from '@/components/common/entity-image-manager';

interface AuthAvatarManagerProps {
  avatarUrl?: string;
}

export function AuthAvatarManager({ avatarUrl }: AuthAvatarManagerProps) {
  const uploadAvatar = useUploadAvatar();
  const removeAvatar = useRemoveAvatar();

  const images = [
    {
      url: avatarUrl,
      label: 'Profile Avatar',
      width: 192,
      height: 192,
      onUpload: (file: File) => uploadAvatar.mutate(file),
      onRemove: () => removeAvatar.mutate(),
      isUploading: uploadAvatar.isPending,
      isRemoving: removeAvatar.isPending,
    },
  ];

  return <EntityImageManager images={images} />;
}
