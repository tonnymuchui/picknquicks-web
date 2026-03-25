'use client';

import { Upload, Trash2, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import {
  useUploadCategoryImage,
  useUploadCategoryIcon,
  useRemoveCategoryImage,
  useRemoveCategoryIcon,
} from '@/lib/category/categories.mutations';
import { resolveMediaUrl } from '@/lib/utils/media';

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

  const [imageInputKey, setImageInputKey] = useState(0);
  const [iconInputKey, setIconInputKey] = useState(0);

  const imageSrc = resolveMediaUrl(imageUrl);
  const iconSrc = resolveMediaUrl(iconUrl);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {return;}

    uploadImage.mutate(
      { id: categoryId, file },
      {
        onSuccess: () => setImageInputKey((prev) => prev + 1),
      }
    );
  };

  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {return;}

    uploadIcon.mutate(
      { id: categoryId, file },
      {
        onSuccess: () => setIconInputKey((prev) => prev + 1),
      }
    );
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="space-y-3 rounded-xl border border-gray-100 bg-gray-50/60 p-4">
        <label className="block text-sm font-semibold text-gray-800">Category Image</label>
        {imageSrc ? (
          <div className="relative inline-block">
            <div className="h-48 w-64 overflow-hidden rounded-lg border-2 border-gray-200 bg-white">
              <Image
                alt="Category"
                className="h-full w-full object-cover"
                height={192}
                src={imageSrc}
                width={256}
              />
            </div>

            <input
              key={imageInputKey}
              accept="image/*"
              className="hidden"
              id={`image-upload-${categoryId}`}
              type="file"
              onChange={handleImageUpload}
            />
            <label
              className="absolute bottom-2 left-2 cursor-pointer rounded-md bg-black/60 px-2 py-1 text-xs text-white"
              htmlFor={`image-upload-${categoryId}`}
            >
              Replace
            </label>

            <button
              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-2 text-white hover:bg-red-600 disabled:opacity-50"
              disabled={removeImage.isPending}
              onClick={() => removeImage.mutate(categoryId)}
            >
              {removeImage.isPending ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Trash2 size={16} />
              )}
            </button>
          </div>
        ) : (
          <div className="flex h-48 w-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white">
            <input
              key={imageInputKey}
              accept="image/*"
              className="hidden"
              id={`image-upload-${categoryId}`}
              type="file"
              onChange={handleImageUpload}
            />
            <label
              className="flex cursor-pointer flex-col items-center"
              htmlFor={`image-upload-${categoryId}`}
            >
              {uploadImage.isPending ? (
                <Loader2 className="animate-spin text-blue-600" size={32} />
              ) : (
                <>
                  <Upload className="mb-2 text-gray-400" size={32} />
                  <span className="text-sm text-gray-500">Click to upload</span>
                </>
              )}
            </label>
          </div>
        )}
      </div>

      <div className="space-y-3 rounded-xl border border-gray-100 bg-gray-50/60 p-4">
        <label className="block text-sm font-semibold text-gray-800">Category Icon</label>
        {iconSrc ? (
          <div className="relative inline-block">
            <div className="h-32 w-32 overflow-hidden rounded-lg border-2 border-gray-200 bg-white">
              <Image
                alt="Icon"
                className="h-full w-full object-cover"
                height={128}
                src={iconSrc}
                width={128}
              />
            </div>

            <input
              key={iconInputKey}
              accept="image/*"
              className="hidden"
              id={`icon-upload-${categoryId}`}
              type="file"
              onChange={handleIconUpload}
            />
            <label
              className="absolute bottom-2 left-2 cursor-pointer rounded-md bg-black/60 px-2 py-1 text-xs text-white"
              htmlFor={`icon-upload-${categoryId}`}
            >
              Replace
            </label>

            <button
              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-2 text-white hover:bg-red-600 disabled:opacity-50"
              disabled={removeIcon.isPending}
              onClick={() => removeIcon.mutate(categoryId)}
            >
              {removeIcon.isPending ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Trash2 size={16} />
              )}
            </button>
          </div>
        ) : (
          <div className="flex h-32 w-32 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white">
            <input
              key={iconInputKey}
              accept="image/*"
              className="hidden"
              id={`icon-upload-${categoryId}`}
              type="file"
              onChange={handleIconUpload}
            />
            <label
              className="flex cursor-pointer flex-col items-center"
              htmlFor={`icon-upload-${categoryId}`}
            >
              {uploadIcon.isPending ? (
                <Loader2 className="animate-spin text-blue-600" size={24} />
              ) : (
                <>
                  <Upload className="mb-2 text-gray-400" size={24} />
                  <span className="text-xs text-gray-500">Click to upload</span>
                </>
              )}
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
