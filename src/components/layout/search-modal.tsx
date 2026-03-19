'use client';

import { Search, X } from 'lucide-react';
import { useState } from 'react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) {return null;}

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
            <input
              autoFocus
              className="w-full bg-white text-black pl-14 pr-14 py-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search products..."
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={onClose}
            >
              <X size={24} />
            </button>
          </div>

          {query ? <div className="mt-4 bg-white rounded-lg p-4 text-black">
              <p className="text-gray-500">Search results will appear here...</p>
            </div> : null}
        </div>
      </div>
    </div>
  );
}