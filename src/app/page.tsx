import { ArrowRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

import { BeforeAfterSlider } from '@/components/home/before-after-slider';
import { EditorialCarousel } from '@/components/home/editorial-carousel';
import {
  CategoryCollectionFallback,
  EndpointCategoryCollection,
} from '@/components/home/endpoint-category-collection';
import {
  EndpointProductCollection,
  ProductCollectionFallback,
} from '@/components/home/endpoint-product-collection';
import { SetupRecipesSection } from '@/components/home/setup-recipes-section';
import { WorkspaceMotionVideo } from '@/components/home/workspace-motion-video';
import { JsonLd } from '@/components/seo/json-ld';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/seo/site';
import { getStorefrontMedia, getStorefrontSettings } from '@/lib/site/storefront-settings';

import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME} | Tech & Workspace Essentials in Kenya` },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: `${SITE_NAME} | Tech & Workspace Essentials in Kenya`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/images/workspace-after-v2.webp',
        alt: 'A complete warm workspace selected by PickNQuicks',
      },
    ],
  },
};

const journalStories = [
  {
    title: 'Start with a clearer line of sight',
    category: 'Workspace notes',
    image: '/images/monitor-arm.webp',
    alt: 'Monitor arm arranged on a clean workspace',
  },
  {
    title: 'The quiet value of a supportive chair',
    category: 'Buying guide',
    image: '/images/office-chair.webp',
    alt: 'Ergonomic chair in a warm neutral setting',
  },
  {
    title: 'Small tools, calmer working days',
    category: 'The desk edit',
    image: '/images/keyboard.webp',
    alt: 'Minimal keyboard on a warm desktop',
  },
  {
    title: 'Lighting that keeps calls feeling natural',
    category: 'Setup guide',
    image: '/images/video-call-light.webp',
    alt: 'Compact video light beside a desktop setup',
  },
] as const;

const faqs = [
  {
    question: 'How do I know an item is available?',
    answer:
      'Every product card shows the current quantity in this collection. Availability is confirmed again before checkout.',
  },
  {
    question: 'Which payment methods can I use?',
    answer:
      'The checkout supports M-Pesa and cash on delivery where available. The options shown there are the options available for your order.',
  },
  {
    question: 'How will delivery be arranged?',
    answer:
      'Available delivery choices and their details appear during checkout so you can review them before placing the order.',
  },
  {
    question: 'Can I follow the progress of my order?',
    answer:
      'Yes. Use Track Order from the main navigation, or open your account to review your recent orders.',
  },
  {
    question: 'Where can I review a product before buying?',
    answer:
      'Select any product card to open its full page with description, price, stock, and the available purchase actions.',
  },
] as const;

const galleryItems = [
  {
    src: '/images/complete-setup-remote-v1.png',
    alt: 'Complete workspace with an adjustable desk, monitor arm, and ergonomic chair',
    eyebrow: 'A complete setup',
    title: 'A complete setup, ready for the workday',
    body: 'An adjustable desk, elevated display, focused lighting, and supportive chair work together in one calm space.',
    fit: 'contain' as const,
  },
  {
    src: '/images/category-stories/displays-create.webp',
    alt: 'Ultrawide curved monitor displaying creative and coding work',
    eyebrow: 'Curved displays',
    title: 'More room for every part of the project',
    body: 'A wide curved monitor keeps creative tools, code, and reference material comfortably in view.',
    fit: 'contain' as const,
  },
  {
    src: '/images/ergonomic-desk-lifestyle-v2.webp',
    alt: 'Height-adjustable desk paired with a black ergonomic mesh chair',
    eyebrow: 'Sit or stand',
    title: 'A desk and chair that move with your day',
    body: 'Change working height when you need to and settle into ergonomic support when it is time to focus.',
    fit: 'contain' as const,
  },
  {
    src: '/images/category-stories/displays-edit.webp',
    alt: 'Curved monitor in a professional video-editing workspace',
    eyebrow: 'Made for creators',
    title: 'See the full timeline without losing the detail',
    body: 'An expansive curved display gives editing tools and the work itself space to sit side by side.',
    fit: 'contain' as const,
  },
  {
    src: '/images/monitor-arm-lifestyle-v2.webp',
    alt: 'Curved monitor mounted on an adjustable arm above a clean desk',
    eyebrow: 'Flexible positioning',
    title: 'Lift the screen and reclaim your desk',
    body: 'A strong adjustable arm creates more working space and brings the display to a comfortable position.',
    fit: 'contain' as const,
  },
] as const;

function SectionHeading({ title, id }: { title: string; id: string }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
      <h2
        className="text-[1.85rem] font-normal leading-tight tracking-[-0.035em] text-black sm:text-[2.6rem]"
        id={id}
      >
        {title}
      </h2>
      <Link
        className="mb-1 shrink-0 border-b border-transparent text-sm text-black transition-colors hover:border-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        href="/products"
      >
        View all
      </Link>
    </div>
  );
}

export default async function HomePage() {
  const [settings, managedJournal] = await Promise.all([
    getStorefrontSettings(),
    getStorefrontMedia('JOURNAL'),
  ]);
  const visibleJournal = managedJournal.length ? managedJournal : journalStories;
  return (
    <main className="overflow-hidden bg-white text-[#1f1c17]">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': `${SITE_URL}/#shopping-faq`,
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }}
      />
      <section
        aria-labelledby="hero-heading"
        className="relative h-[calc(100svh-104px)] min-h-[600px] overflow-hidden bg-[#c8b49d] lg:h-[calc(100svh-218px)] lg:min-h-[680px]"
      >
        <Image
          fill
          priority
          alt={settings.heroAltText}
          className="object-cover object-center"
          sizes="100vw"
          src={settings.heroImageUrl}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,14,10,0.66)_0%,rgba(18,14,10,0.2)_46%,rgba(18,14,10,0.03)_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/35 to-transparent" />

        <div className="relative mx-auto flex h-full max-w-[1920px] items-end px-6 pb-14 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
          <div className="max-w-4xl text-white">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.08em] sm:text-xl">
              Chosen for the way you work
            </p>
            <h1
              className="max-w-4xl text-[2.8rem] font-light uppercase leading-[0.98] tracking-[-0.045em] sm:text-[4.7rem] lg:text-[5.2rem]"
              id="hero-heading"
            >
              Made for better work.
            </h1>
            <Link
              className="mt-8 inline-flex min-h-14 items-center gap-7 rounded-full bg-[#9a5d3b] py-1.5 pl-7 pr-1.5 text-sm font-medium uppercase tracking-[0.04em] text-white transition-colors hover:bg-[#7f492d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              href="#most-loved"
            >
              Explore
              <span className="flex size-11 items-center justify-center rounded-full bg-white text-black">
                <ArrowRight aria-hidden="true" size={21} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="signature-heading"
        className="mx-auto max-w-[1920px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20"
      >
        <h2
          className="mb-7 text-2xl font-normal tracking-[-0.025em] text-black sm:text-3xl"
          id="signature-heading"
        >
          Shop signature collections
        </h2>
        <Suspense fallback={<CategoryCollectionFallback />}>
          <EndpointCategoryCollection />
        </Suspense>
      </section>

      <section aria-label="PickNQuicks workspace in motion" className="relative bg-black">
        <WorkspaceMotionVideo
          poster={settings.motionVideoPosterUrl}
          src={settings.motionVideoUrl}
        />
        <div className="pointer-events-none absolute inset-0 bg-black/15" />
      </section>

      <section
        aria-labelledby="most-loved-heading"
        className="mx-auto max-w-[1920px] px-6 py-16 sm:px-10 lg:px-16 lg:py-24"
        id="most-loved"
      >
        <div className="mb-8 flex items-center justify-between gap-5 sm:mb-10">
          <h2
            className="text-xl font-normal uppercase tracking-[-0.025em] text-black sm:text-3xl"
            id="most-loved-heading"
          >
            Most loved workspace pieces
          </h2>
          <Link className="shrink-0 text-sm text-black hover:underline" href="/products">
            View all
          </Link>
        </div>
        <Suspense fallback={<ProductCollectionFallback mode="grid" />}>
          <EndpointProductCollection
            filters={{ page: 0, size: 8, sortBy: 'saleCount', sortDirection: 'DESC' }}
            mode="grid"
            source="best-sellers"
          />
        </Suspense>
      </section>

      <SetupRecipesSection />

      <section
        aria-labelledby="transformation-heading"
        className="mx-auto grid max-w-[1920px] gap-12 px-6 py-14 sm:px-10 lg:grid-cols-[38%_62%] lg:items-center lg:gap-0 lg:px-16 lg:py-24"
      >
        <div className="mx-auto max-w-[620px] text-center lg:pr-16">
          <h2
            className="text-[2.15rem] font-normal leading-[1.12] tracking-[-0.045em] text-black sm:text-[3rem]"
            id="transformation-heading"
          >
            Before, it was only a desk.
            <br />
            After, it felt complete.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-black/65 sm:text-lg sm:leading-8">
            Support, a clearer view, and well-chosen tools bring balance and quiet focus to the
            room.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="inline-flex min-h-14 items-center justify-center bg-black px-8 text-sm text-white transition-colors hover:bg-black/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              href="/products"
            >
              View all
            </Link>
            <Link
              className="inline-flex min-h-14 items-center justify-center bg-black px-8 text-sm text-white transition-colors hover:bg-black/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              href="#most-loved"
            >
              Shop now
            </Link>
          </div>
        </div>

        <BeforeAfterSlider
          afterAlt="Complete warm workspace with ergonomic chair, monitor, keyboard, mouse, and video light"
          afterSrc={settings.afterImageUrl}
          beforeAlt="The same warm room with an empty wooden desk before the workspace pieces were added"
          beforeSrc={settings.beforeImageUrl}
        />
      </section>

      <section
        aria-labelledby="new-arrivals-heading"
        className="mx-auto max-w-[1920px] px-6 py-14 sm:px-10 lg:px-16 lg:py-20"
      >
        <SectionHeading id="new-arrivals-heading" title="New arrivals" />
        <Suspense fallback={<ProductCollectionFallback mode="rail" />}>
          <EndpointProductCollection
            filters={{ page: 0, size: 8, sortBy: 'createdAt', sortDirection: 'DESC' }}
            mode="rail"
            source="new-arrivals"
          />
        </Suspense>
      </section>

      <section
        aria-labelledby="workspace-essentials-heading"
        className="mx-auto max-w-[1920px] px-6 py-14 sm:px-10 lg:px-16 lg:py-20"
      >
        <SectionHeading id="workspace-essentials-heading" title="Workspace essentials" />
        <Suspense fallback={<ProductCollectionFallback mode="rail" />}>
          <EndpointProductCollection
            filters={{ page: 0, size: 8, sortBy: 'viewCount', sortDirection: 'DESC' }}
            mode="rail"
          />
        </Suspense>
      </section>

      <section
        aria-labelledby="journal-heading"
        className="mx-auto max-w-[1920px] px-6 py-14 sm:px-10 lg:px-16 lg:py-20"
      >
        <h2
          className="mb-8 text-[1.85rem] font-normal tracking-[-0.035em] text-black sm:mb-10 sm:text-[2.6rem]"
          id="journal-heading"
        >
          News
        </h2>
        <div className="no-scrollbar grid snap-x auto-cols-[82vw] grid-flow-col gap-5 overflow-x-auto pb-2 sm:auto-cols-[46vw] lg:auto-cols-[calc((100%_-_60px)/4)]">
          {visibleJournal.map((story) => (
            <article key={story.title || story.alt} className="snap-start">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f2eee7]">
                <Image
                  fill
                  alt={story.alt}
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 46vw, 82vw"
                  src={'image' in story ? story.image : story.src}
                />
              </div>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#9a5d3b]">
                {'category' in story ? story.category : story.eyebrow}
              </p>
              <h3 className="mt-2 max-w-sm text-xl font-normal leading-snug tracking-[-0.025em] text-black sm:text-2xl">
                {story.title}
              </h3>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="faq-heading"
        className="mx-auto max-w-[1920px] px-6 py-16 sm:px-10 lg:px-16 lg:py-24"
      >
        <h2
          className="mb-10 text-[2.2rem] font-normal tracking-[-0.04em] text-black sm:text-[3rem]"
          id="faq-heading"
        >
          Shopping questions
        </h2>
        <div className="border-b border-black">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="group border-t border-black">
              <summary className="flex min-h-16 cursor-pointer list-none items-center gap-4 py-4 text-base uppercase tracking-[0.01em] text-black marker:content-none sm:min-h-[72px] sm:text-xl [&::-webkit-details-marker]:hidden">
                <span className="w-7 shrink-0 text-xs text-black/50">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="flex-1">{faq.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className="size-5 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                  strokeWidth={1.5}
                />
              </summary>
              <p className="max-w-4xl pb-6 pl-11 pr-10 text-sm leading-7 text-black/65 sm:text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="gallery-heading"
        className="mx-auto max-w-[1920px] px-6 pb-24 pt-12 sm:px-10 lg:px-16 lg:pb-32 lg:pt-16"
      >
        <h2
          className="mb-10 text-center text-[2rem] font-normal tracking-[-0.04em] text-black sm:text-[3rem]"
          id="gallery-heading"
        >
          Built to make a workspace feel alive.
        </h2>
        <EditorialCarousel items={galleryItems} label="Workspace inspiration" />
      </section>
    </main>
  );
}
