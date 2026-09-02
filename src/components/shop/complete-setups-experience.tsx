'use client';

import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { formatPriceKsh } from '@/lib/utils/currency';
import { resolveMediaUrl } from '@/lib/utils/media';

import type { Category } from '@/types/category';
import type { Product } from '@/types/product';

interface CompleteSetupsExperienceProps {
  category: Category;
  isLoading: boolean;
  products: Product[];
}

export function CompleteSetupsExperience({
  category,
  isLoading,
  products,
}: CompleteSetupsExperienceProps) {
  const [selectedId, setSelectedId] = useState<string>();
  const selected = products.find((product) => product.id === selectedId) ?? products[0];
  const heroImage = resolveMediaUrl(category.imageUrl || selected?.primaryImageUrl);

  return (
    <>
      <header className="border-b border-black/15 bg-white">
        <div className="mx-auto grid max-w-[1920px] lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
          <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-16 lg:py-24">
            <p className="text-warm text-[10px] font-semibold uppercase tracking-[0.18em]">
              PickNQuicks collection
            </p>
            <h1 className="mt-4 max-w-2xl text-[44px] font-normal leading-[1.02] tracking-[-0.045em] sm:text-[62px] lg:text-[74px]">
              Find the setup that finishes your workspace.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-black/55">
              {category.description ||
                'Displays, support and everyday tools selected to work well together.'}
            </p>
            <a
              className="mt-8 inline-flex min-h-14 w-fit items-center gap-6 rounded-full bg-black py-1.5 pl-7 pr-1.5 text-[11px] font-semibold uppercase tracking-[0.13em] text-white transition-colors hover:bg-[#292621]"
              href="#selected-setups"
            >
              View the setups
              <span className="flex size-11 items-center justify-center rounded-full bg-white text-black">
                <ArrowRight size={16} />
              </span>
            </a>
          </div>
          <div className="relative min-h-[420px] bg-[#f1f1f1] lg:min-h-[680px]">
            {heroImage ? (
              <Image
                fill
                priority
                alt={category.name}
                className="object-cover"
                sizes="(min-width:1024px) 59vw,100vw"
                src={heroImage}
              />
            ) : null}
          </div>
        </div>
      </header>

      <section className="border-b border-black/15 bg-[#f1f1f1]">
        <div className="mx-auto grid max-w-[1920px] grid-cols-2 lg:grid-cols-4 lg:px-16">
          {[
            'Prices in KES',
            'M-Pesa checkout',
            'Matched components',
            'Delivery options at checkout',
          ].map((item) => (
            <p
              key={item}
              className="flex min-h-20 items-center justify-center border-r border-black/15 px-4 text-center text-[9px] font-semibold uppercase tracking-[0.14em] last:border-r-0 sm:text-[10px]"
            >
              {item}
            </p>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="selected-setups-heading"
        className="bg-white px-6 py-16 sm:px-10 lg:px-16 lg:py-24"
        id="selected-setups"
      >
        <div className="mx-auto max-w-[1920px]">
          <div className="mb-9 max-w-3xl">
            <p className="text-warm text-[10px] font-semibold uppercase tracking-[0.18em]">
              Selected combinations
            </p>
            <h2
              className="mt-3 text-[34px] font-normal tracking-[-0.035em] sm:text-[46px]"
              id="selected-setups-heading"
            >
              Start with the way you work.
            </h2>
            <p className="mt-4 text-sm leading-7 text-black/55">
              Choose the combination closest to your space. Open any setup to see full product and
              delivery details.
            </p>
          </div>

          {isLoading ? (
            <div className="grid animate-pulse gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
              <div className="h-80 bg-[#f1f1f1]" />
              <div className="aspect-[3/2] bg-[#f1f1f1]" />
            </div>
          ) : selected ? (
            <div className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-12">
              <div className="border-t border-black/15">
                {products.map((product) => (
                  <button
                    key={product.id}
                    aria-pressed={selected.id === product.id}
                    className={`grid min-h-24 w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-black/15 px-1 text-left transition-all ${selected.id === product.id ? 'border-l-2 border-l-[#9a5d3b] pl-5' : 'hover:pl-4'}`}
                    type="button"
                    onClick={() => setSelectedId(product.id)}
                  >
                    <span>
                      <span className="block text-sm font-semibold">{product.name}</span>
                      <span className="mt-1 block text-xs text-black/45">
                        {formatPriceKsh(product.effectivePrice)}
                      </span>
                    </span>
                    <ArrowRight aria-hidden="true" size={15} />
                  </button>
                ))}
              </div>

              <article className="border border-black/15">
                <div className="relative aspect-[3/2] bg-[#f1f1f1]">
                  {resolveMediaUrl(selected.primaryImageUrl) ? (
                    <Image
                      fill
                      alt={
                        selected.images.find((image) => image.isPrimary)?.altText || selected.name
                      }
                      className="object-cover"
                      sizes="(min-width:1024px) 65vw,100vw"
                      src={resolveMediaUrl(selected.primaryImageUrl)!}
                    />
                  ) : null}
                </div>
                <div className="grid gap-8 p-6 sm:p-9 xl:grid-cols-[minmax(0,1fr)_230px]">
                  <div>
                    <h3 className="text-3xl font-normal tracking-[-0.03em] sm:text-4xl">
                      {selected.name}
                    </h3>
                    {selected.shortDescription ? (
                      <p className="mt-4 text-sm leading-7 text-black/55">
                        {selected.shortDescription}
                      </p>
                    ) : null}
                    {selected.bundleComponents.length ? (
                      <div className="mt-7 border-t border-black/15 pt-5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45">
                          Included
                        </p>
                        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                          {selected.bundleComponents.map((component) => (
                            <li
                              key={component.id}
                              className="flex items-start gap-2 text-xs leading-5 text-black/65"
                            >
                              <Check aria-hidden="true" className="mt-0.5 shrink-0" size={13} />
                              {component.quantity > 1 ? `${component.quantity} × ` : ''}
                              {component.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                  <div className="border-t border-black/15 pt-6 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
                    <p className="text-[10px] uppercase tracking-[0.13em] text-black/45">
                      Package price
                    </p>
                    <p className="mt-2 text-2xl font-semibold">
                      {formatPriceKsh(selected.effectivePrice)}
                    </p>
                    {selected.bundleOriginalPrice && selected.bundleSavings ? (
                      <>
                        <p className="mt-1 text-xs text-black/40 line-through">
                          {formatPriceKsh(selected.bundleOriginalPrice)}
                        </p>
                        <p className="text-warm mt-3 text-xs font-semibold">
                          Save {formatPriceKsh(selected.bundleSavings)}
                        </p>
                      </>
                    ) : null}
                    <Link
                      className="mt-6 flex min-h-12 items-center justify-between rounded-full bg-black px-6 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#292621]"
                      href={`/products/${selected.slug}`}
                    >
                      View setup <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          ) : (
            <p className="border-y border-black/15 py-8 text-sm text-black/50">
              No complete setups are available at the moment.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
