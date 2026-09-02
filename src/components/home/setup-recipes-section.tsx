import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { getActiveProductsByCategorySlug } from '@/lib/catalog/server';
import { formatPriceKsh } from '@/lib/utils/currency';
import { resolveMediaUrl } from '@/lib/utils/media';

import type { Product } from '@/types/product';

export async function SetupRecipesSection() {
  let setups: Product[];
  try {
    setups = await getActiveProductsByCategorySlug('complete-setups', 2);
  } catch {
    return null;
  }

  if (!setups.length) {
    return null;
  }

  return (
    <section
      aria-labelledby="complete-workspace-heading"
      className="bg-white px-6 py-16 text-black sm:px-10 lg:px-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1920px]">
        <div className="mb-9 flex flex-col justify-between gap-5 border-b border-black/15 pb-7 sm:flex-row sm:items-end">
          <div>
            <p className="text-warm text-[10px] font-semibold uppercase tracking-[0.18em]">
              Complete setups
            </p>
            <h2
              className="mt-3 text-[32px] font-normal leading-tight tracking-[-0.035em] sm:text-[44px]"
              id="complete-workspace-heading"
            >
              Find the setup that finishes your workspace.
            </h2>
          </div>
          <Link
            className="inline-flex min-h-11 shrink-0 items-center gap-3 text-sm text-black underline-offset-4 hover:underline"
            href="/shop/categories/complete-setups"
          >
            View all setups <ArrowRight size={15} />
          </Link>
        </div>

        <div className="motion-stagger-items grid gap-x-3 gap-y-10 lg:grid-cols-2">
          {setups.map((setup) => {
            const imageUrl = resolveMediaUrl(setup.primaryImageUrl);
            return (
              <article
                key={setup.id}
                className="group h-full transition-transform duration-500 ease-out hover:-translate-y-1 motion-reduce:transition-none"
              >
                <Link className="flex h-full flex-col" href={`/products/${setup.slug}`}>
                  <div className="relative aspect-[3/2] overflow-hidden bg-[#f1f1f1]">
                    {imageUrl ? (
                      <Image
                        fill
                        alt={setup.images.find((image) => image.isPrimary)?.altText || setup.name}
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
                        sizes="(min-width:1024px) 50vw,100vw"
                        src={imageUrl}
                      />
                    ) : null}
                  </div>
                  <div className="grid flex-1 gap-5 border-b border-black/15 py-6 sm:grid-cols-[minmax(0,1fr)_auto]">
                    <div>
                      <h3 className="text-xl font-normal tracking-[-0.02em] sm:text-2xl">
                        {setup.name}
                      </h3>
                      {setup.shortDescription ? (
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-black/55">
                          {setup.shortDescription}
                        </p>
                      ) : null}
                      {setup.bundleComponents.length ? (
                        <p className="mt-4 text-[10px] uppercase tracking-[0.1em] text-black/45">
                          {setup.bundleComponents.map((component) => component.name).join(' · ')}
                        </p>
                      ) : null}
                    </div>
                    <div className="sm:text-right">
                      <p className="text-sm font-semibold">
                        {formatPriceKsh(setup.effectivePrice)}
                      </p>
                      {setup.bundleSavings ? (
                        <p className="text-warm mt-1 text-xs">
                          Save {formatPriceKsh(setup.bundleSavings)}
                        </p>
                      ) : null}
                      <span className="mt-4 inline-flex size-10 items-center justify-center rounded-full bg-black text-white transition-colors group-hover:bg-[#292621]">
                        <ArrowRight size={15} />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
