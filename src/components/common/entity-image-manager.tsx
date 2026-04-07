'use client';

import { Upload, Trash2, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { resolveMediaUrl } from '@/lib/utils/media';

interface ImageConfig {
  url?: string;
  label: string;
  width: number;
  height: number;
  onUpload: (file: File) => void;
  onRemove: () => void;
  isUploading: boolean;
  isRemoving: boolean;
}

interface EntityImageManagerProps {
  images: ImageConfig[];
}

export function EntityImageManager({ images }: EntityImageManagerProps) {
  const [inputKeys, setInputKeys] = useState<Record<string, number>>({});

  const resetInput = (label: string) => {
    setInputKeys((prev) => ({ ...prev, [label]: (prev[label] || 0) + 1 }));
  };

  const handleUpload = (config: ImageConfig, file: File) => {
    config.onUpload(file);
    resetInput(config.label);
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {images.map((config) => (
        <div key={config.label} className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">{config.label}</label>
          {config.url ? (
            <div className="relative inline-block">
              <div
                className="overflow-hidden rounded-lg border-2 border-gray-700 bg-gray-800"
                style={{ width: config.width, height: config.height }}
              >
                <Image
                  alt={config.label}
                  className="h-full w-full object-cover"
                  height={config.height}
                  src={resolveMediaUrl(config.url) || config.url}
                  width={config.width}
                />
              </div>
              <button
                className="absolute -right-2 -top-2 rounded-full bg-red-500 p-2 text-white transition-colors hover:bg-red-600 disabled:opacity-50"
                disabled={config.isRemoving}
                onClick={config.onRemove}
              >
                {config.isRemoving ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <Trash2 size={16} />
                )}
              </button>
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-700 bg-gray-800/50"
              style={{ width: config.width, height: config.height }}
            >
              <input
                key={inputKeys[config.label] || 0}
                accept="image/*"
                className="hidden"
                id={`${config.label}-upload`}
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {handleUpload(config, file);}
                }}
              />
              <label
                className="flex cursor-pointer flex-col items-center"
                htmlFor={`${config.label}-upload`}
              >
                {config.isUploading ? (
                  <Loader2 className="animate-spin text-purple-500" size={32} />
                ) : (
                  <>
                    <Upload className="mb-2 text-gray-500" size={32} />
                    <span className="text-sm text-gray-400">Click to upload</span>
                  </>
                )}
              </label>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
