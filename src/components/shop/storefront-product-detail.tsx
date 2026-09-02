'use client';

import {
  ChevronDown,
  CircleHelp,
  CreditCard,
  Minus,
  MessageCircle,
  PackageCheck,
  Plus,
  RotateCcw,
  Star,
  Truck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, type ReactNode } from 'react';

import { AddToCartButton } from '@/components/cart/add-to-cart-button';
import { ProductCard } from '@/components/shop/product-card';
import { ProductDetailGallery } from '@/components/shop/product-detail/product-detail-gallery';
import { formatPriceKsh } from '@/lib/utils/currency';

import type { Product } from '@/types/product';

interface StorefrontProductDetailProps {
  product: Product;
  relatedProducts?: Product[];
}

interface DetailAccordionProps {
  children: ReactNode;
  icon: ReactNode;
  title: string;
  defaultOpen?: boolean;
}

const picknquicksReasons = [
  {
    title: 'Chosen for real setups',
    description:
      'Products are selected for useful design, everyday comfort, and a calmer workspace.',
    image: '/images/monitor-arm-lifestyle-v2.webp',
    alt: 'Ultrawide monitor mounted on an adjustable arm above a clear wooden desk',
  },
  {
    title: 'Details you can use',
    description: 'Live availability and practical specifications help you choose with confidence.',
    image: '/images/ergonomic-desk-lifestyle-v2.webp',
    alt: 'Ergonomic chair and height-adjustable desk arranged in a bright workspace',
  },
  {
    title: 'Checkout with clarity',
    description:
      'Pricing, delivery, and payment details are confirmed before your order is placed.',
    image: '/images/complete-setup-remote-v1.png',
    alt: 'Complete home-office setup with monitor, lighting, keyboard, and ergonomic seating',
  },
  {
    title: 'Support after purchase',
    description:
      'Order confirmation and tracking keep the next steps visible from checkout onward.',
    image: '/images/workspace-after-v2.webp',
    alt: 'Finished workspace with a monitor arm, ergonomic chair, and desktop accessories',
  },
] as const;

function QuantitySelector({
  quantity,
  maximum,
  onChange,
}: {
  quantity: number;
  maximum: number;
  onChange: (quantity: number) => void;
}) {
  const updateQuantity = (nextQuantity: number) => {
    onChange(Math.min(maximum, Math.max(1, nextQuantity)));
  };

  return (
    <div className="border-ink flex h-14 w-32 shrink-0 items-center rounded-full border">
      <button
        aria-label="Decrease quantity"
        className="flex h-full w-10 items-center justify-center disabled:cursor-not-allowed disabled:opacity-35"
        disabled={quantity <= 1}
        type="button"
        onClick={() => updateQuantity(quantity - 1)}
      >
        <Minus aria-hidden="true" size={16} />
      </button>
      <input
        aria-label="Quantity"
        className="h-full min-w-0 flex-1 appearance-none bg-transparent text-center text-sm font-semibold outline-none"
        inputMode="numeric"
        max={maximum}
        min={1}
        type="number"
        value={quantity}
        onChange={(event) => {
          const nextQuantity = Number(event.target.value);
          if (Number.isFinite(nextQuantity)) {
            updateQuantity(nextQuantity);
          }
        }}
      />
      <button
        aria-label="Increase quantity"
        className="flex h-full w-10 items-center justify-center disabled:cursor-not-allowed disabled:opacity-35"
        disabled={quantity >= maximum}
        type="button"
        onClick={() => updateQuantity(quantity + 1)}
      >
        <Plus aria-hidden="true" size={16} />
      </button>
    </div>
  );
}

function DetailAccordion({ children, icon, title, defaultOpen = false }: DetailAccordionProps) {
  return (
    <details className="border-line group border-b" open={defaultOpen}>
      <summary className="flex min-h-16 cursor-pointer list-none items-center gap-3 py-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
        <span className="text-ink shrink-0">{icon}</span>
        <span className="flex-1">{title}</span>
        <ChevronDown
          aria-hidden="true"
          className="shrink-0 transition-transform group-open:rotate-180"
          size={17}
        />
      </summary>
      <div className="text-muted-foreground space-y-4 pb-6 pl-8 text-sm leading-7">{children}</div>
    </details>
  );
}

function ProductRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div
      aria-label={`${rating.toFixed(1)} out of 5 stars from ${reviewCount} reviews`}
      className="flex items-center gap-2"
    >
      <span aria-hidden="true" className="flex gap-0.5">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={index < Math.round(rating) ? 'fill-ink text-ink' : 'text-line'}
            size={14}
          />
        ))}
      </span>
      <span className="text-muted-foreground text-xs">
        {rating.toFixed(1)} ({reviewCount})
      </span>
    </div>
  );
}

export function StorefrontProductDetail({
  product,
  relatedProducts = [],
}: StorefrontProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const originalPrice =
    product.salePrice && product.salePrice < product.price ? product.price : null;
  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - product.effectivePrice) / originalPrice) * 100)
    : null;
  const stockLabel = product.inStock
    ? product.lowStock
      ? `Low stock: ${product.stockQuantity}`
      : `In stock: ${product.stockQuantity}`
    : 'Out of stock';
  const weight = product.weightGrams
    ? product.weightGrams >= 1000
      ? `${(product.weightGrams / 1000).toLocaleString('en-KE', {
          maximumFractionDigits: 2,
        })} kg`
      : `${product.weightGrams.toLocaleString('en-KE')} g`
    : null;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') ?? '';
  const productUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.picknquicks.com'}/products/${product.slug}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi PickNQuicks, I am interested in ${product.name} (${formatPriceKsh(product.effectivePrice)}). ${productUrl}`)}`;

  return (
    <main className="bg-canvas text-ink min-h-screen">
      <div className="mx-auto max-w-[1600px] px-4 pb-16 pt-5 sm:px-7 lg:px-10 lg:pb-24">
        <nav
          aria-label="Breadcrumb"
          className="text-muted-foreground mb-5 flex min-w-0 items-center gap-2 overflow-hidden text-[11px] uppercase tracking-[0.12em]"
        >
          <Link className="hover:text-ink shrink-0 transition-colors" href="/">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link className="hover:text-ink shrink-0 transition-colors" href="/products">
            Shop
          </Link>
          {product.categoryName ? (
            <>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-ink truncate">
                {product.categoryName}
              </span>
            </>
          ) : null}
        </nav>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.18fr)_minmax(390px,0.82fr)] lg:gap-12 xl:gap-20">
          <ProductDetailGallery
            images={product.images}
            primaryImageUrl={product.primaryImageUrl}
            productName={product.name}
          />

          <section aria-labelledby="product-heading" className="lg:sticky lg:top-6">
            {product.brandName || product.categoryName ? (
              <p className="text-warm text-[11px] font-bold uppercase tracking-[0.17em]">
                {[product.brandName, product.categoryName].filter(Boolean).join(' · ')}
              </p>
            ) : null}
            <h1
              className="mt-2 max-w-2xl text-3xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-4xl lg:text-[2rem] xl:text-[2.4rem]"
              id="product-heading"
            >
              {product.name}
            </h1>
            <p className="text-muted-foreground mt-2 text-[11px] uppercase tracking-[0.08em]">
              SKU: {product.sku}
            </p>

            {product.averageRating && product.averageRating > 0 ? (
              <div className="mt-4">
                <ProductRating rating={product.averageRating} reviewCount={product.reviewCount} />
              </div>
            ) : null}

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="text-2xl font-semibold tracking-[-0.025em]">
                {formatPriceKsh(product.effectivePrice)}
              </p>
              {originalPrice ? (
                <>
                  <span className="text-muted-foreground text-sm line-through">
                    {formatPriceKsh(originalPrice)}
                  </span>
                  <span className="bg-ink rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
                    Save {discountPercentage}%
                  </span>
                </>
              ) : null}
              <span
                className={`inline-flex items-center gap-2 text-xs font-semibold ${
                  product.inStock
                    ? product.lowStock
                      ? 'text-warm'
                      : 'text-emerald-700'
                    : 'text-red-700'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`size-2 rounded-full ${
                    product.inStock
                      ? product.lowStock
                        ? 'bg-warm'
                        : 'bg-emerald-600'
                      : 'bg-red-600'
                  }`}
                />
                {stockLabel}
              </span>
            </div>

            {product.shortDescription ? (
              <p className="text-muted-foreground mt-4 max-w-xl text-sm leading-6">
                {product.shortDescription}
              </p>
            ) : null}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <QuantitySelector
                maximum={Math.max(1, product.stockQuantity)}
                quantity={quantity}
                onChange={setQuantity}
              />
              <AddToCartButton
                className="bg-[#000]! hover:bg-[#292621]! min-h-14 w-full flex-1 rounded-full px-8 text-sm uppercase tracking-[0.12em]"
                inStock={product.inStock}
                productId={product.id}
                quantity={quantity}
              />
            </div>
            <div className="mt-3 flex justify-end px-1">
              <Link
                className="text-xs font-semibold underline underline-offset-4 hover:no-underline"
                href="/cart"
              >
                View cart & checkout
              </Link>
            </div>
            {whatsappNumber ? (
              <a
                className="mt-4 flex min-h-12 items-center justify-center gap-2 border border-black/25 text-sm font-semibold text-black transition hover:bg-[#f1f1f1]"
                href={whatsappUrl}
                rel="noreferrer"
                target="_blank"
              >
                <MessageCircle aria-hidden="true" size={18} />
                Ask about this product on WhatsApp
              </a>
            ) : null}

            <div className="border-line mt-6 border-t">
              <DetailAccordion
                defaultOpen
                icon={<CircleHelp aria-hidden="true" size={19} strokeWidth={1.6} />}
                title="Product details"
              >
                <p>
                  {product.description ||
                    product.shortDescription ||
                    'Detailed product information is currently unavailable.'}
                </p>
              </DetailAccordion>

              <DetailAccordion
                icon={<PackageCheck aria-hidden="true" size={19} strokeWidth={1.6} />}
                title="Specifications"
              >
                <dl className="divide-line divide-y">
                  <div className="flex justify-between gap-6 py-2 first:pt-0">
                    <dt>SKU</dt>
                    <dd className="text-ink text-right font-medium">{product.sku}</dd>
                  </div>
                  {product.categoryName ? (
                    <div className="flex justify-between gap-6 py-2">
                      <dt>Category</dt>
                      <dd className="text-ink text-right font-medium">{product.categoryName}</dd>
                    </div>
                  ) : null}
                  {product.brandName ? (
                    <div className="flex justify-between gap-6 py-2">
                      <dt>Brand</dt>
                      <dd className="text-ink text-right font-medium">{product.brandName}</dd>
                    </div>
                  ) : null}
                  {product.dimensions ? (
                    <div className="flex justify-between gap-6 py-2">
                      <dt>Dimensions</dt>
                      <dd className="text-ink text-right font-medium">{product.dimensions}</dd>
                    </div>
                  ) : null}
                  {weight ? (
                    <div className="flex justify-between gap-6 py-2">
                      <dt>Weight</dt>
                      <dd className="text-ink text-right font-medium">{weight}</dd>
                    </div>
                  ) : null}
                  <div className="flex justify-between gap-6 py-2">
                    <dt>Fulfilment</dt>
                    <dd className="text-ink text-right font-medium">
                      {product.isDigital
                        ? 'Digital delivery'
                        : product.requiresShipping
                          ? 'Physical delivery'
                          : 'No shipping required'}
                    </dd>
                  </div>
                </dl>
              </DetailAccordion>

              <DetailAccordion
                icon={<Truck aria-hidden="true" size={19} strokeWidth={1.6} />}
                title="Delivery & checkout"
              >
                <p>
                  {product.requiresShipping
                    ? 'Enter your delivery city at checkout to confirm the shipping cost and delivery estimate before payment.'
                    : 'This item does not require physical shipping. Fulfilment details are shown during checkout.'}
                </p>
                <p className="flex items-center gap-2">
                  <CreditCard aria-hidden="true" size={17} />
                  Payment is completed through the secure checkout flow.
                </p>
              </DetailAccordion>

              <DetailAccordion
                icon={<RotateCcw aria-hidden="true" size={19} strokeWidth={1.6} />}
                title="Returns & order support"
              >
                <p>
                  Review the status of an existing purchase with your order number. Return
                  eligibility is confirmed against the details of that order.
                </p>
                <Link
                  className="text-ink inline-flex font-semibold underline underline-offset-4"
                  href="/track-order"
                >
                  Track an order
                </Link>
              </DetailAccordion>
            </div>
          </section>
        </div>

        <section
          aria-labelledby="why-picknquicks-heading"
          className="mt-16 pb-16 lg:mt-24 lg:pb-24"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-black sm:text-xs">
            Useful design, clear details, dependable support
          </p>
          <h2
            className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-5xl"
            id="why-picknquicks-heading"
          >
            Why PickNQuicks
          </h2>
          <p className="text-muted-foreground mt-5 max-w-6xl text-base leading-7 sm:text-lg sm:leading-8">
            Workspace tools should do more than occupy a desk. We choose pieces that bring comfort,
            clarity, and dependable function to the way you work, with the practical details made
            clear before you buy.
          </p>

          <div className="no-scrollbar mt-8 grid snap-x snap-mandatory auto-cols-[84vw] grid-flow-col gap-4 overflow-x-auto pb-3 sm:grid-flow-row sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:pb-0 xl:grid-cols-4">
            {picknquicksReasons.map((reason) => (
              <article
                key={reason.title}
                className="snap-start overflow-hidden rounded-xl bg-[#f0f0f0]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e3dc]">
                  <Image
                    fill
                    alt={reason.alt}
                    className="object-cover transition-transform duration-500 hover:scale-[1.02] motion-reduce:transition-none"
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                    src={reason.image}
                  />
                </div>
                <div className="min-h-48 p-6 sm:p-7">
                  <h3 className="text-xl font-semibold leading-[1.15] tracking-[-0.025em] sm:text-2xl">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground mt-4 text-sm leading-6 sm:text-base sm:leading-7">
                    {reason.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {relatedProducts.length > 0 ? (
          <section
            aria-labelledby="related-products-heading"
            className="border-line border-t pt-12 lg:pt-16"
          >
            <div className="mb-8 flex items-end justify-between gap-5 sm:mb-10">
              <h2 className="text-3xl tracking-[-0.04em] sm:text-4xl" id="related-products-heading">
                Related products
              </h2>
              <Link
                className="shrink-0 border-b border-black pb-1 text-sm font-semibold"
                href="/products"
              >
                View all
              </Link>
            </div>

            <div className="no-scrollbar grid snap-x auto-cols-[82vw] grid-flow-col gap-3 overflow-x-auto pb-3 sm:auto-cols-[46vw] lg:grid-flow-row lg:grid-cols-4 lg:overflow-visible">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="snap-start">
                  <ProductCard product={relatedProduct} />
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
