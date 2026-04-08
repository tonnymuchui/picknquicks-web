'use client';

import { Upload, Trash2, Loader2, Star } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { useAddProductImage, useRemoveProductImage } from '@/lib/product/products.mutations';

import type { ProductImage } from '@/types/product';

interface ProductImageManagerProps {
  productId: string;
  images: ProductImage[];
}

export function ProductImageManager({ productId, images }: ProductImageManagerProps) {
  const addImage = useAddProductImage();
  const removeImage = useRemoveProductImage();
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const sortedImages = [...images].sort((a, b) => a.displayOrder - b.displayOrder);

  const handleUpload = async (file: File, _isPrimary: boolean = false) => {
    const index = images.length;
    setUploadingIndex(index);

    try {
      await addImage.mutateAsync({
        id: productId,
        file,
      });
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleRemove = (imageId: string) => {
    if (confirm('Remove this image?')) {
      removeImage.mutate({ productId, imageId });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">Product Images</label>
        <span className="text-xs text-gray-500">{images.length} image(s)</span>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {sortedImages.map((image) => (
          <div key={image.id} className="group relative">
            <div className="aspect-square overflow-hidden rounded-lg border-2 border-gray-200 bg-white">
              <Image
                alt={image.altText || 'Product image'}
                className="h-full w-full object-contain"
                height={200}
                src={image.imageUrl}
                width={200}
              />
            </div>

            {image.isPrimary ? (
              <div className="absolute left-2 top-2 flex items-center gap-1 rounded bg-yellow-500 px-2 py-1 text-xs font-medium text-white">
                <Star className="fill-white" size={12} />
                Primary
              </div>
            ) : null}

            <button
              className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white opacity-0 transition-opacity hover:bg-red-600 disabled:opacity-50 group-hover:opacity-100"
              disabled={removeImage.isPending}
              onClick={() => handleRemove(image.id)}
            >
              {removeImage.isPending ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Trash2 size={16} />
              )}
            </button>

            {image.displayOrder === 0 && !image.isPrimary ? (
              <div className="absolute bottom-2 left-2 rounded bg-blue-500 px-2 py-1 text-xs text-white">
                First
              </div>
            ) : null}
          </div>
        ))}

        <div className="flex aspect-square flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-blue-500">
          <input
            accept="image/*"
            className="hidden"
            disabled={addImage.isPending}
            id="product-image-upload"
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleUpload(file);
              }
            }}
          />
          <label
            className="flex cursor-pointer flex-col items-center p-4"
            htmlFor="product-image-upload"
          >
            {uploadingIndex !== null ? (
              <Loader2 className="animate-spin text-blue-600" size={32} />
            ) : (
              <>
                <Upload className="mb-2 text-gray-400" size={32} />
                <span className="text-center text-sm text-gray-500">Click to upload</span>
                <span className="mt-1 text-xs text-gray-400">PNG, JPG up to 10MB</span>
              </>
            )}
          </label>
        </div>
      </div>
    </div>
  );
}
