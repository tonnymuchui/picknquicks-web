'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProductImage } from '@/types/product';
import { resolveMediaUrl } from '@/lib/utils/media';

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

  useEffect(() => {
    setHiddenImageIds(new Set());
    setSelectedIndex(0);
  }, [images]);

  useEffect(() => {
    if (selectedIndex >= visibleImages.length && visibleImages.length > 0) {
      setSelectedIndex(visibleImages.length - 1);
    }
  }, [selectedIndex, visibleImages.length]);

  const currentImage = visibleImages[selectedIndex];

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
          src={resolveMediaUrl(currentImage.imageUrl) || '/favicon.ico'}
          alt={currentImage.altText || productName}
          fill
          className="object-contain p-8"
          priority
          onError={() => hideBrokenImage(currentImage.id)}
        />

        {visibleImages.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 opacity-0 shadow-lg transition-opacity hover:bg-white group-hover:opacity-100"
            >
              <ChevronLeft size={24} className="text-gray-800" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 opacity-0 shadow-lg transition-opacity hover:bg-white group-hover:opacity-100"
            >
              <ChevronRight size={24} className="text-gray-800" />
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {visibleImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedIndex(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === selectedIndex ? 'w-6 bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {visibleImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {visibleImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedIndex(index)}
              className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                index === selectedIndex
                  ? 'border-blue-600 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image
                src={resolveMediaUrl(image.imageUrl) || '/favicon.ico'}
                alt={image.altText || productName}
                width={100}
                height={100}
                className="h-full w-full object-contain p-2"
                onError={() => hideBrokenImage(image.id)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
