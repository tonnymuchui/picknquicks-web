'use client';

import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type CSSProperties } from 'react';

type MotionDirection = 'up' | 'left' | 'right' | 'scale';

interface MotionOptions {
  delay?: number;
  direction?: MotionDirection;
  stagger?: boolean;
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function motionClassName(
  className: string | undefined,
  direction: MotionDirection,
  stagger: boolean
) {
  return [
    'motion-reveal',
    `motion-reveal--${direction}`,
    stagger ? 'motion-stagger' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');
}

function motionStyle(style: CSSProperties | undefined, delay: number): CSSProperties {
  return { ...style, '--motion-delay': `${delay}ms` } as CSSProperties;
}

export function RevealSection({
  className,
  delay = 0,
  direction = 'up',
  stagger = false,
  style,
  ...props
}: ComponentPropsWithoutRef<'section'> & MotionOptions) {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      {...props}
      ref={ref}
      className={motionClassName(className, direction, stagger)}
      data-motion-visible={visible}
      style={motionStyle(style, delay)}
    />
  );
}

export function RevealDiv({
  className,
  delay = 0,
  direction = 'up',
  stagger = false,
  style,
  ...props
}: ComponentPropsWithoutRef<'div'> & MotionOptions) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      {...props}
      ref={ref}
      className={motionClassName(className, direction, stagger)}
      data-motion-visible={visible}
      style={motionStyle(style, delay)}
    />
  );
}

export function ParallaxMedia({
  children,
  className = '',
  distance = 36,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!node || reduceMotion.matches) {
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const parent = node.parentElement;
      if (!parent) {
        return;
      }
      const bounds = parent.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > window.innerHeight) {
        return;
      }
      const progress =
        (window.innerHeight / 2 - (bounds.top + bounds.height / 2)) /
        (window.innerHeight + bounds.height);
      const offset = Math.max(-distance, Math.min(distance, progress * distance * 2));
      node.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0) scale(1.04)`;
    };

    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [distance]);

  return (
    <div ref={ref} className={`motion-parallax ${className}`}>
      {children}
    </div>
  );
}
