'use client';

import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';

import { resolveMediaUrl } from '@/lib/utils/media';

import type { ProductImage } from '@/types/product';

interface ProductDetailGalleryProps {
  images: ProductImage[];
  primaryImageUrl?: string;
  productName: string;
}

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  displayOrder: number;
  isPrimary: boolean;
}

function getGalleryImages(
  images: ProductImage[],
  primaryImageUrl: string | undefined,
  productName: string
): GalleryImage[] {
  const media = images
    .map((image) => ({
      id: image.id,
      src: resolveMediaUrl(image.imageUrl),
      alt: image.altText || productName,
      displayOrder: image.displayOrder,
      isPrimary: image.isPrimary,
    }))
    .filter((image): image is GalleryImage => Boolean(image.src));

  const resolvedPrimaryImage = resolveMediaUrl(primaryImageUrl);
  if (resolvedPrimaryImage && !media.some((image) => image.src === resolvedPrimaryImage)) {
    media.push({
      id: 'primary-image',
      src: resolvedPrimaryImage,
      alt: productName,
      displayOrder: -1,
      isPrimary: true,
    });
  }

  return media.sort((left, right) => {
    if (left.isPrimary !== right.isPrimary) {
      return left.isPrimary ? -1 : 1;
    }
    return left.displayOrder - right.displayOrder;
  });
}

export function ProductDetailGallery({
  images,
  primaryImageUrl,
  productName,
}: ProductDetailGalleryProps) {
  const [selectedImageId, setSelectedImageId] = useState<string>();
  const [failedImageIds, setFailedImageIds] = useState<Set<string>>(new Set());

  const galleryImages = useMemo(
    () => getGalleryImages(images, primaryImageUrl, productName),
    [images, primaryImageUrl, productName]
  );
  const availableImages = galleryImages.filter((image) => !failedImageIds.has(image.id));
  const selectedIndex = Math.max(
    0,
    availableImages.findIndex((image) => image.id === selectedImageId)
  );
  const selectedImage = availableImages[selectedIndex];

  const selectRelativeImage = (direction: -1 | 1) => {
    if (availableImages.length < 2) {
      return;
    }
    const nextIndex = (selectedIndex + direction + availableImages.length) % availableImages.length;
    setSelectedImageId(availableImages[nextIndex].id);
  };

  const markImageAsFailed = (imageId: string) => {
    setFailedImageIds((current) => new Set(current).add(imageId));
  };

  if (!selectedImage) {
    return (
      <div className="bg-sand flex aspect-square items-center justify-center rounded-lg">
        <div className="text-muted-foreground flex flex-col items-center gap-3 text-center">
          <ImageIcon aria-hidden="true" size={34} strokeWidth={1.4} />
          <span className="text-xs font-semibold uppercase tracking-[0.16em]">
            Image coming soon
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-sand group relative aspect-square overflow-hidden rounded-lg">
        <Image
          fill
          priority
          alt={selectedImage.alt}
          className="object-cover"
          sizes="(min-width: 1280px) 52vw, (min-width: 1024px) 56vw, 100vw"
          src={selectedImage.src}
          onError={() => markImageAsFailed(selectedImage.id)}
        />

        {availableImages.length > 1 ? (
          <>
            <button
              aria-label="Show previous product image"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white transition-transform hover:scale-105 sm:left-5"
              type="button"
              onClick={() => selectRelativeImage(-1)}
            >
              <ChevronLeft aria-hidden="true" size={21} />
            </button>
            <button
              aria-label="Show next product image"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white transition-transform hover:scale-105 sm:right-5"
              type="button"
              onClick={() => selectRelativeImage(1)}
            >
              <ChevronRight aria-hidden="true" size={21} />
            </button>
            <span className="absolute bottom-4 right-4 rounded-full bg-black/75 px-3 py-1.5 text-[11px] font-semibold tabular-nums tracking-[0.12em] text-white">
              {selectedIndex + 1} / {availableImages.length}
            </span>
          </>
        ) : null}
      </div>

      {availableImages.length > 1 ? (
        <div
          aria-label="Product image thumbnails"
          className="no-scrollbar mt-3 flex snap-x gap-3 overflow-x-auto pb-1"
          role="list"
        >
          {availableImages.map((image, index) => {
            const isSelected = index === selectedIndex;
            return (
              <div
                key={image.id}
                className="aspect-square w-[22%] min-w-[88px] shrink-0 snap-start sm:min-w-[108px]"
                role="listitem"
              >
                <button
                  aria-label={`Show product image ${index + 1}`}
                  aria-pressed={isSelected}
                  className={`bg-sand relative h-full w-full overflow-hidden rounded-lg border transition-colors ${
                    isSelected ? 'border-ink' : 'border-line hover:border-ink/60'
                  }`}
                  type="button"
                  onClick={() => setSelectedImageId(image.id)}
                >
                  <Image
                    fill
                    alt=""
                    className="object-cover"
                    sizes="120px"
                    src={image.src}
                    onError={() => markImageAsFailed(image.id)}
                  />
                </button>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
