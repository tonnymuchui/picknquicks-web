'use client';

import { Upload, Trash2, Loader2, AlertCircle, Image as ImageIcon, Star } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';

import {
  useAddProductImage,
  useRemoveProductImage,
  useSetPrimaryProductImage,
} from '@/lib/product/products.mutations';
import { useProduct } from '@/lib/product/products.queries';
import { resolveMediaUrl } from '@/lib/utils/media';

import type { ProductImage } from '@/types/product';

interface ProductImageManagerProps {
  productId: string;
  images?: ProductImage[];
}

export function ProductImageManager({ productId, images = [] }: ProductImageManagerProps) {
  const { data: productData, refetch } = useProduct(productId);
  const addImage = useAddProductImage();
  const removeImage = useRemoveProductImage();
  const setPrimary = useSetPrimaryProductImage();
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const displayImages = useMemo(
    () => (productData?.images && productData.images.length > 0 ? productData.images : images),
    [productData?.images, images]
  );

  const sortedImages = [...displayImages].sort((a, b) => a.displayOrder - b.displayOrder);
  const isEmpty = displayImages.length === 0;

  const handleUpload = useCallback(
    async (file: File, _isPrimary: boolean = false) => {
      setUploadingIndex(displayImages.length);

      try {
        await addImage.mutateAsync({
          id: productId,
          file,
        });
        await refetch();
      } catch {
      } finally {
        setUploadingIndex(null);
      }
    },
    [productId, displayImages.length, addImage, refetch]
  );

  const handleRemove = (imageId: string) => {
    if (confirm('Remove this image?')) {
      removeImage.mutate({ productId, imageId });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-black">Product Images</label>
        <span className="inline-flex items-center  bg-[#f1f1f1] px-2.5 py-0.5 text-xs font-medium text-black/60">
          {displayImages.length} image(s)
        </span>
      </div>

      {isEmpty ? (
        <div className="flex items-start gap-3 border border-black/15 bg-[#f1f1f1] p-4">
          <AlertCircle className="mt-0.5 shrink-0 text-black/60" size={18} />
          <div>
            <h3 className="text-sm font-medium text-black/60">No images yet</h3>
            <p className="mt-1 text-sm text-black/60">Add product images to showcase your items</p>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {sortedImages.map((image) => (
          <div key={image.id} className="group relative">
            <div className="aspect-square overflow-hidden  border-2 border-black/15 bg-white transition-colors hover:border-[#9a5d3b]">
              <div className="relative h-full w-full">
                <Image
                  alt={image.altText || 'Product image'}
                  className="h-full w-full object-contain p-1"
                  height={200}
                  src={resolveMediaUrl(image.imageUrl) || '/favicon.ico'}
                  width={200}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 hidden items-center justify-center bg-gray-100">
                  <ImageIcon className="text-black/65" size={40} />
                </div>
              </div>
            </div>

            {image.isPrimary ? (
              <div className="absolute left-2 top-2 flex items-center gap-1 bg-black px-2 py-1 text-xs font-semibold text-white">
                Primary
              </div>
            ) : null}

            {!image.isPrimary ? (
              <button
                className="absolute bottom-2 left-2 inline-flex items-center gap-1 bg-white px-2 py-1 text-xs font-semibold text-black opacity-0 shadow transition-opacity group-hover:opacity-100"
                disabled={setPrimary.isPending}
                title="Use as the main storefront image"
                type="button"
                onClick={() => setPrimary.mutate({ productId, imageId: image.id })}
              >
                <Star size={13} /> Main image
              </button>
            ) : null}

            <button
              className="absolute right-2 top-2 bg-red-700 p-1.5 text-white opacity-0 transition-opacity hover:bg-red-800 disabled:opacity-50 group-hover:opacity-100"
              disabled={removeImage.isPending}
              title="Delete image"
              onClick={() => handleRemove(image.id)}
            >
              {removeImage.isPending ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Trash2 size={16} />
              )}
            </button>

            {image.displayOrder === 0 && !image.isPrimary ? (
              <div className="absolute bottom-2 left-2 bg-black px-2 py-1 text-xs font-medium text-white">
                First
              </div>
            ) : null}
          </div>
        ))}

        <div className="flex aspect-square cursor-pointer flex-col items-center justify-center  border-2 border-dashed border-black/20 bg-gray-50 transition-all hover:border-[#9a5d3b] hover:bg-[#f1f1f1]">
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
            className="flex h-full w-full cursor-pointer flex-col items-center justify-center p-4"
            htmlFor="product-image-upload"
          >
            {uploadingIndex !== null || addImage.isPending ? (
              <div className="flex flex-col items-center">
                <Loader2 className="mb-2 animate-spin text-black/60" size={32} />
                <span className="text-sm font-medium text-black/60">Uploading...</span>
              </div>
            ) : (
              <>
                <Upload className="mb-2 text-black/45 group-hover:text-black/60" size={32} />
                <span className="text-center text-sm font-medium text-black/65">
                  Click to upload
                </span>
                <span className="mt-1 text-xs text-black/45">PNG, JPG up to 10MB</span>
              </>
            )}
          </label>
        </div>
      </div>
    </div>
  );
}
