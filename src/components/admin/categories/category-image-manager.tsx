'use client';

import {
  useUploadCategoryImage,
  useUploadCategoryIcon,
  useRemoveCategoryImage,
  useRemoveCategoryIcon,
} from '@/lib/category/categories.mutations';
import { EntityImageManager } from '@/components/common/entity-image-manager';

interface CategoryImageManagerProps {
  categoryId: string;
  imageUrl?: string;
  iconUrl?: string;
}

export function CategoryImageManager({ categoryId, imageUrl, iconUrl }: CategoryImageManagerProps) {
  const uploadImage = useUploadCategoryImage();
  const uploadIcon = useUploadCategoryIcon();
  const removeImage = useRemoveCategoryImage();
  const removeIcon = useRemoveCategoryIcon();

  const images = [
    {
      url: imageUrl,
      label: 'Category Image',
      width: 256,
      height: 192,
      onUpload: (file: File) => uploadImage.mutate({ id: categoryId, file }),
      onRemove: () => removeImage.mutate(categoryId),
      isUploading: uploadImage.isPending,
      isRemoving: removeImage.isPending,
    },
    {
      url: iconUrl,
      label: 'Category Icon',
      width: 128,
      height: 128,
      onUpload: (file: File) => uploadIcon.mutate({ id: categoryId, file }),
      onRemove: () => removeIcon.mutate(categoryId),
      isUploading: uploadIcon.isPending,
      isRemoving: removeIcon.isPending,
    },
  ];

  return <EntityImageManager images={images} />;
}
