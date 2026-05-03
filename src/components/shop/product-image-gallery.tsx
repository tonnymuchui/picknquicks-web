'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';

import { resolveMediaUrl } from '@/lib/utils/media';

import type { ProductImage } from '@/types/product';

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hiddenImageIds, setHiddenImageIds] = useState<Set<string>>(new Set());

  const sortedImages = useMemo(
    () => [...images].sort((a, b) => a.displayOrder - b.displayOrder),
    [images]
  );

  const visibleImages = useMemo(
    () => sortedImages.filter((image) => !hiddenImageIds.has(image.id)),
    [sortedImages, hiddenImageIds]
  );

  const safeSelectedIndex = useMemo(() => {
    if (visibleImages.length === 0) {
      return 0;
    }
    return Math.min(selectedIndex, visibleImages.length - 1);
  }, [selectedIndex, visibleImages.length]);

  const currentImage = visibleImages[safeSelectedIndex];

  const hideBrokenImage = (imageId: string) => {
    setHiddenImageIds((prev) => {
      if (prev.has(imageId)) {
        return prev;
      }
      const next = new Set(prev);
      next.add(imageId);
      return next;
    });
  };

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? visibleImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === visibleImages.length - 1 ? 0 : prev + 1));
  };

  if (visibleImages.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-100">
        <span className="text-6xl text-gray-400">{productName[0]}</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="group relative aspect-square overflow-hidden rounded-lg border-2 border-gray-200 bg-white">
        <Image
          fill
          priority
          alt={currentImage.altText || productName}
          className="object-contain p-8"
          src={resolveMediaUrl(currentImage.imageUrl) || '/favicon.ico'}
          onError={() => hideBrokenImage(currentImage.id)}
        />

        {visibleImages.length > 1 ? (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 opacity-0 shadow-lg transition-opacity hover:bg-white group-hover:opacity-100"
              onClick={handlePrevious}
            >
              <ChevronLeft className="text-gray-800" size={24} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 opacity-0 shadow-lg transition-opacity hover:bg-white group-hover:opacity-100"
              onClick={handleNext}
            >
              <ChevronRight className="text-gray-800" size={24} />
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {visibleImages.map((image, index) => (
                <button
                  key={image.id}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === safeSelectedIndex
                      ? 'w-6 bg-blue-600'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setSelectedIndex(index)}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>

      {visibleImages.length > 1 ? (
        <div className="grid grid-cols-4 gap-2">
          {visibleImages.map((image, index) => (
            <button
              key={image.id}
              className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                index === safeSelectedIndex
                  ? 'border-blue-600 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedIndex(index)}
            >
              <Image
                alt={image.altText || productName}
                className="h-full w-full object-contain p-2"
                height={100}
                src={resolveMediaUrl(image.imageUrl) || '/favicon.ico'}
                width={100}
                onError={() => hideBrokenImage(image.id)}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
