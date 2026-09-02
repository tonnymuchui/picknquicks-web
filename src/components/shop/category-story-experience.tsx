'use client';

import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { resolveMediaUrl } from '@/lib/utils/media';

import type { Category, CategoryStoryItem } from '@/types/category';

export const displaysStoryFallback: CategoryStoryItem[] = [
  {
    id: 'displays-hero',
    categoryId: 'fallback',
    kind: 'HERO',
    eyebrow: 'Displays for focused work',
    title: 'More room for the work that matters.',
    body: 'A better display makes the whole day feel clearer—less switching, less clutter and more space for your ideas to stay in view.',
    mediaUrl: '/images/category-stories/displays-code.webp',
    altText: 'Curved ultrawide monitor in a calm coding workspace',
    displayOrder: 0,
    active: true,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'displays-code',
    categoryId: 'fallback',
    kind: 'SCENE',
    eyebrow: 'For development',
    title: 'Keep the whole system in view.',
    body: 'Editor, terminal, documentation and browser can live side by side, helping you stay in the flow instead of constantly rearranging windows.',
    mediaUrl: '/images/category-stories/displays-create.webp',
    altText: 'Curved ultrawide monitor showing a design and development workflow',
    displayOrder: 10,
    active: true,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'displays-edit',
    categoryId: 'fallback',
    kind: 'SCENE',
    eyebrow: 'For editing',
    title: 'See the cut. Feel every detail.',
    body: 'Give the timeline room to breathe while keeping the preview and tools visible. The right screen turns a busy desk into a place where ideas move freely.',
    mediaUrl: '/images/category-stories/displays-edit.webp',
    altText: 'Curved monitor in a warm video editing workspace',
    displayOrder: 20,
    active: true,
    createdAt: '',
    updatedAt: '',
  },
  ...[
    ['Clarity', '4K / UHD'],
    ['Space', 'Ultrawide'],
    ['Comfort', 'Curved'],
  ].map(
    ([eyebrow, title], index): CategoryStoryItem => ({
      id: `displays-guide-${index}`,
      categoryId: 'fallback',
      kind: 'GUIDE',
      eyebrow,
      title,
      displayOrder: 30 + index * 10,
      active: true,
      createdAt: '',
      updatedAt: '',
    })
  ),
];

export function CategoryStoryExperience({
  category,
  items,
}: {
  category: Category;
  items: CategoryStoryItem[];
}) {
  const sorted = [...items]
    .filter((item) => item.active)
    .sort((a, b) => a.displayOrder - b.displayOrder);
  const hero = sorted.find((item) => item.kind === 'HERO');
  const scenes = sorted.filter((item) => item.kind === 'SCENE');
  const guides = sorted.filter((item) => item.kind === 'GUIDE');
  const heroImage = resolveMediaUrl(hero?.mediaUrl || category.imageUrl);
  const focusScene = scenes.at(-1) ?? scenes[0];
  const focusImage = resolveMediaUrl(focusScene?.mediaUrl);
  const choices = guides.slice(0, 3);

  if (!hero) {
    return null;
  }

  return (
    <div className="overflow-hidden bg-white text-black">
      <section className="border-b border-black/15 bg-white text-black">
        <div className="mx-auto max-w-[1920px] px-3 pt-5 sm:px-8 lg:px-16">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-black/50"
          >
            <Link className="transition-colors hover:text-black" href="/shop/categories">
              Categories
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-black/80">
              {category.name}
            </span>
          </nav>

          <div className="mt-5 grid lg:min-h-[650px] lg:grid-cols-[minmax(320px,.72fr)_minmax(0,1.28fr)] lg:items-stretch lg:gap-14 xl:gap-20">
            <div className="order-2 flex max-w-xl flex-col justify-center px-2 py-10 sm:py-14 lg:order-1 lg:px-0 lg:py-20">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/55">
                {hero.eyebrow}
              </p>
              <h1 className="mt-5 text-4xl font-normal leading-[1.02] tracking-[-0.045em] sm:text-6xl xl:text-7xl">
                {hero.title}
              </h1>
              {hero.body ? (
                <p className="mt-6 max-w-lg text-[15px] leading-7 text-black/65">{hero.body}</p>
              ) : null}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  className="inline-flex min-h-12 items-center justify-center gap-2 bg-black px-6 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-black/80"
                  href="#category-products"
                >
                  Shop {category.name} <ArrowUpRight aria-hidden="true" size={14} />
                </Link>
                {focusScene || choices.length ? (
                  <Link
                    className="inline-flex min-h-12 items-center border-b border-black/50 text-xs font-semibold uppercase tracking-[0.12em] text-black/75 transition-colors hover:border-black hover:text-black"
                    href="#category-chooser"
                  >
                    Find your fit
                  </Link>
                ) : null}
              </div>
            </div>

            {heroImage ? (
              <div className="relative order-1 aspect-video overflow-hidden bg-[#f2f1ee] lg:order-2 lg:aspect-auto lg:min-h-full lg:bg-[#1a1a1a]">
                <Image
                  fill
                  priority
                  alt={hero.altText || hero.title}
                  className="object-contain lg:object-cover"
                  sizes="(min-width: 1024px) 65vw, 100vw"
                  src={heroImage}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent lg:hidden" />
                <p className="absolute bottom-4 left-4 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/80 lg:hidden">
                  A workspace with room to think
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {focusScene || choices.length ? (
        <section
          aria-labelledby="category-chooser-title"
          className="border-b border-black/15 bg-white"
          id="category-chooser"
        >
          <div className="mx-auto grid max-w-[1920px] lg:grid-cols-2">
            {focusImage ? (
              <div className="relative aspect-[16/10] overflow-hidden bg-[#f2f1ee] lg:aspect-auto lg:min-h-[520px]">
                <Image
                  fill
                  alt={focusScene?.altText || focusScene?.title || category.name}
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  src={focusImage}
                />
              </div>
            ) : null}
            <div className="flex flex-col justify-center px-5 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-20">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/45">
                Made for the way you work
              </p>
              <h2
                className="mt-4 max-w-xl text-3xl font-normal leading-tight tracking-[-0.035em] sm:text-5xl"
                id="category-chooser-title"
              >
                {focusScene?.title || 'Choose the view that feels right.'}
              </h2>
              {focusScene?.body ? (
                <p className="mt-5 line-clamp-3 max-w-xl text-sm leading-7 text-black/55">
                  {focusScene.body}
                </p>
              ) : null}

              {choices.length ? (
                <div className="mt-8 border-t border-black/15">
                  {choices.map((choice, index) => (
                    <div
                      key={choice.id}
                      className="grid grid-cols-[2rem_minmax(0,1fr)] items-center gap-3 border-b border-black/15 py-4"
                    >
                      <span className="text-xs text-black/35">0{index + 1}</span>
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-black/45">
                          {choice.eyebrow}
                        </p>
                        <p className="text-base font-semibold">{choice.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              <Link
                className="mt-8 inline-flex min-h-12 w-fit items-center gap-2 bg-black px-6 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#292929]"
                href="#category-products"
              >
                See all {category.name} <ArrowUpRight aria-hidden="true" size={14} />
              </Link>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
