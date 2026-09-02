'use client';

import { useEffect, useRef, useState } from 'react';

export function WorkspaceMotionVideo({ poster, src }: { poster: string; src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '320px' }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad || !videoRef.current) {
      return;
    }

    videoRef.current.load();
    void videoRef.current.play().catch(() => undefined);
  }, [shouldLoad]);

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      aria-label="Hands arranging a modern technology workspace"
      autoPlay={shouldLoad}
      className="aspect-video w-full object-cover"
      poster={poster}
      preload="none"
    >
      {shouldLoad ? (
        <source src={src} type={src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
      ) : null}
    </video>
  );
}
