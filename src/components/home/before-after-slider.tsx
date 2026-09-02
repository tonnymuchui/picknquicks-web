'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  className = '',
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);

  return (
    <figure
      className={`relative isolate aspect-[4/5] overflow-hidden bg-[#eee9e1] sm:aspect-[16/10] ${className}`}
    >
      <Image
        fill
        alt={afterAlt}
        className="select-none object-cover"
        draggable={false}
        sizes="(min-width: 1024px) 58vw, 100vw"
        src={afterSrc}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          fill
          alt=""
          className="select-none object-cover"
          draggable={false}
          sizes="(min-width: 1024px) 58vw, 100vw"
          src={beforeSrc}
        />
      </div>

      <span className="sr-only">{beforeAlt}</span>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.12)]"
        style={{ left: `${position}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-lg sm:size-16">
          <ChevronLeft aria-hidden="true" className="-mr-1 size-5" strokeWidth={1.8} />
          <ChevronRight aria-hidden="true" className="-ml-1 size-5" strokeWidth={1.8} />
        </span>
      </div>

      <input
        aria-label="Compare before and after images"
        aria-valuetext={`${position}% before image visible`}
        className="absolute inset-0 z-20 h-full w-full cursor-col-resize opacity-0"
        max="100"
        min="0"
        step="1"
        style={{ touchAction: 'pan-y' }}
        type="range"
        value={position}
        onChange={(event) => setPosition(Number(event.currentTarget.value))}
      />
    </figure>
  );
}
