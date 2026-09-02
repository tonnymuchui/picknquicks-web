'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';

interface EditorialCarouselItem {
  src: string;
  alt: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  fit?: 'cover' | 'contain';
}

interface EditorialCarouselProps {
  items: readonly EditorialCarouselItem[];
  className?: string;
  label?: string;
}

export function EditorialCarousel({
  items,
  className = '',
  label = 'Editorial gallery',
}: EditorialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemCount = items.length;

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + itemCount) % itemCount);
  }, [itemCount]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % itemCount);
  }, [itemCount]);

  if (itemCount === 0) {
    return null;
  }

  const normalizedIndex = activeIndex % itemCount;
  const activeItem = items[normalizedIndex];
  const hasCaption = activeItem.eyebrow || activeItem.title || activeItem.body;

  return (
    <section
      aria-label={label}
      aria-roledescription="carousel"
      className={`outline-none ${className}`}
      role="region"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          showPrevious();
        }

        if (event.key === 'ArrowRight') {
          event.preventDefault();
          showNext();
        }
      }}
    >
      <div className="relative h-64 overflow-hidden rounded-[1.75rem] bg-[#eee9e1] sm:h-96 lg:h-[560px] 2xl:h-[620px]">
        <Image
          key={activeItem.src}
          fill
          alt={activeItem.alt}
          className={`motion-safe:animate-[fade-in_350ms_ease-out] ${
            activeItem.fit === 'contain' ? 'object-contain' : 'object-cover'
          }`}
          draggable={false}
          priority={normalizedIndex === 0}
          sizes="(min-width: 1920px) 1792px, (min-width: 1024px) calc(100vw - 128px), (min-width: 640px) calc(100vw - 80px), calc(100vw - 48px)"
          src={activeItem.src}
        />

        {itemCount > 1 ? (
          <>
            <button
              aria-label="Show previous image"
              className="absolute left-3 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:left-5 sm:size-14"
              type="button"
              onClick={showPrevious}
            >
              <ChevronLeft aria-hidden="true" className="size-7" strokeWidth={1.8} />
            </button>
            <button
              aria-label="Show next image"
              className="absolute right-3 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:right-5 sm:size-14"
              type="button"
              onClick={showNext}
            >
              <ChevronRight aria-hidden="true" className="size-7" strokeWidth={1.8} />
            </button>
          </>
        ) : null}

        <p aria-live="polite" className="sr-only">
          Image {normalizedIndex + 1} of {itemCount}: {activeItem.alt}
        </p>
      </div>

      {hasCaption ? (
        <div className="mx-auto max-w-2xl px-5 pt-8 text-center sm:pt-10">
          {activeItem.eyebrow ? (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#9a5d3b]">
              {activeItem.eyebrow}
            </p>
          ) : null}
          {activeItem.title ? (
            <h3 className="text-2xl font-normal tracking-[-0.02em] text-[#1f1c17] sm:text-3xl">
              {activeItem.title}
            </h3>
          ) : null}
          {activeItem.body ? (
            <p className="mt-3 text-sm leading-6 text-[#5f5a52] sm:text-base sm:leading-7">
              {activeItem.body}
            </p>
          ) : null}
        </div>
      ) : null}

      {itemCount > 1 ? (
        <div
          aria-label="Choose gallery image"
          className="mt-5 flex justify-center gap-2"
          role="group"
        >
          {items.map((item, index) => (
            <button
              key={`${item.src}-${index}`}
              aria-label={`Show image ${index + 1}`}
              aria-pressed={index === normalizedIndex}
              className={`h-1.5 rounded-full transition-[width,background-color] motion-reduce:transition-none ${
                index === normalizedIndex ? 'w-8 bg-black' : 'w-1.5 bg-black/25 hover:bg-black/50'
              }`}
              type="button"
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
