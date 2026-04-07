'use client';

import { Clock, Search, TrendingUp, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TRENDING = ['Wireless Earbuds', 'Smart Watch', 'Phone Cases', 'Laptop Stands', 'USB-C Hub'];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) {return null;}

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh]">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 mx-4 w-full max-w-xl animate-float-in">
        {/* Input */}
        <div className="overflow-hidden rounded-xl border border-primary-light/15 bg-primary-dark shadow-2xl">
          <div className="relative flex items-center">
            <Search className="absolute left-4 text-secondary/40" size={20} />
            <input
              ref={inputRef}
              className="w-full bg-transparent py-4 pl-12 pr-12 text-base text-secondary placeholder:text-secondary/30 focus:outline-none"
              placeholder="Search products, categories, brands..."
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              aria-label="Close"
              className="absolute right-3 rounded-lg p-1.5 text-secondary/35 transition-colors hover:text-secondary"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex items-center justify-between border-t border-primary-light/8 px-4 py-1.5 text-[11px] text-secondary/25">
            <span>Type to search</span>
            <span><kbd className="rounded bg-primary-light/15 px-1.5 py-0.5">ESC</kbd> to close</span>
          </div>
        </div>

        {/* Results */}
        <div className="mt-2 overflow-hidden rounded-xl border border-primary-light/15 bg-primary-dark shadow-2xl">
          {query ? (
            <div className="p-5">
              <p className="text-sm text-secondary/40">
                Results for <span className="font-semibold text-secondary">&quot;{query}&quot;</span> will appear here…
              </p>
            </div>
          ) : (
            <div className="space-y-4 p-5">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <TrendingUp className="text-highlight" size={13} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Trending</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {TRENDING.map((t) => (
                    <button
                      key={t}
                      className="rounded-md bg-primary-light/12 px-2.5 py-1 text-xs text-secondary/55 transition-colors hover:bg-primary-light/20 hover:text-secondary"
                      onClick={() => setQuery(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Clock className="text-secondary/35" size={13} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-secondary/40">Recent</span>
                </div>
                <p className="text-xs text-secondary/25">No recent searches</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}