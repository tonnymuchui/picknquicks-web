'use client';

import { ArrowRight, Loader2, Package, Search, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type FormEvent, useDeferredValue, useEffect, useRef, useState } from 'react';

import { useSearchProducts } from '@/lib/product/products.queries';
import { formatPriceKsh } from '@/lib/utils/currency';
import { resolveMediaUrl } from '@/lib/utils/media';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTED_SEARCHES = ['Monitor', 'Desk', 'Chair', 'Mouse', 'Webcam'];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query.trim());
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { data, isError, isFetching } = useSearchProducts(deferredQuery, { size: 5 });
  const results = data?.content ?? [];

  useEffect(() => {
    if (!isOpen) {return;}
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 50);
    const closeFromKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {onClose();}
    };
    const closeFromOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {onClose();}
    };
    window.addEventListener('keydown', closeFromKeyboard);
    window.addEventListener('mousedown', closeFromOutside);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', closeFromKeyboard);
      window.removeEventListener('mousedown', closeFromOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {return null;}

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!deferredQuery) {return;}
    onClose();
    router.push(`/products?search=${encodeURIComponent(deferredQuery)}`);
  };

  return (
    <div
      ref={panelRef}
      aria-label="Product search"
      className="fixed inset-x-3 top-[108px] z-[70] mx-auto max-h-[min(620px,calc(100vh-124px))] max-w-xl overflow-hidden border border-black/20 bg-white shadow-[0_18px_55px_rgba(0,0,0,0.16)] lg:left-1/2 lg:right-auto lg:top-[150px] lg:w-[560px] lg:-translate-x-1/2"
      role="dialog"
    >
      <form className="flex min-h-14 items-center border-b border-black/20 px-4" onSubmit={submit}>
        {isFetching ? (
          <Loader2 aria-hidden="true" className="mr-3 animate-spin text-black/40" size={18} />
        ) : (
          <Search aria-hidden="true" className="mr-3 text-black/60" size={18} strokeWidth={1.5} />
        )}
        <input
          ref={inputRef}
          aria-label="Search products"
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent py-3 text-sm text-black outline-none placeholder:text-black/35"
          placeholder="Search products"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          aria-label="Close search"
          className="ml-2 flex size-10 items-center justify-center text-black/45 hover:text-black"
          type="button"
          onClick={onClose}
        >
          <X aria-hidden="true" size={17} />
        </button>
      </form>

      <div className="max-h-[min(550px,calc(100vh-180px))] overflow-y-auto">
        {!deferredQuery ? (
          <div className="p-4">
            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-black/40">
              Popular searches
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SUGGESTED_SEARCHES.map((suggestion) => (
                <button
                  key={suggestion}
                  className="min-h-9 border border-black/15 px-3 text-xs text-black/65 hover:border-black hover:text-black"
                  type="button"
                  onClick={() => setQuery(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : isError ? (
          <div className="p-6 text-center text-sm text-black/60">
            Search is temporarily unavailable.{' '}
            <Link className="font-semibold underline" href="/products" onClick={onClose}>
              Browse products
            </Link>
          </div>
        ) : !isFetching && results.length === 0 ? (
          <div className="flex items-center gap-3 p-5 text-sm text-black/55">
            <Package aria-hidden="true" size={20} />
            No products found for “{deferredQuery}”.
          </div>
        ) : (
          <div>
            {results.map((product) => {
              const imageUrl = resolveMediaUrl(product.primaryImageUrl);
              return (
                <Link
                  key={product.id}
                  className="group flex min-h-20 items-center gap-3 border-b border-black/10 px-4 py-2.5 last:border-b-0 hover:bg-[#f1f1f1]"
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                >
                  <div className="relative size-14 shrink-0 overflow-hidden bg-[#f1f1f1]">
                    {imageUrl ? (
                      <Image
                        fill
                        alt=""
                        className="object-contain p-1"
                        sizes="56px"
                        src={imageUrl}
                      />
                    ) : (
                      <Package className="absolute inset-0 m-auto text-black/25" size={20} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{product.name}</p>
                    <p className="mt-1 text-xs text-black/50">
                      {formatPriceKsh(product.effectivePrice)}
                    </p>
                  </div>
                  <ArrowRight
                    aria-hidden="true"
                    className="text-black/25 group-hover:text-black"
                    size={16}
                  />
                </Link>
              );
            })}
            <button
              className="flex min-h-12 w-full items-center justify-between border-t border-black/15 px-4 text-xs font-semibold"
              type="button"
              onClick={() => {
                onClose();
                router.push(`/products?search=${encodeURIComponent(deferredQuery)}`);
              }}
            >
              View all results <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
