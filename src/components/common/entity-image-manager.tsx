'use client';

import { Loader2, Trash2, Upload } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { resolveMediaUrl } from '@/lib/utils/media';

interface ImageConfig {
  url?: string;
  label: string;
  width: number;
  height: number;
  onUpload: (file: File) => void;
  onRemove?: () => void;
  isUploading: boolean;
  isRemoving?: boolean;
}

interface EntityImageManagerProps {
  images: ImageConfig[];
}

export function EntityImageManager({ images }: EntityImageManagerProps) {
  const [inputKeys, setInputKeys] = useState<Record<string, number>>({});

  const handleUpload = (config: ImageConfig, file: File) => {
    config.onUpload(file);
    setInputKeys((current) => ({
      ...current,
      [config.label]: (current[config.label] || 0) + 1,
    }));
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {images.map((config) => (
        <div key={config.label} className="space-y-2">
          <p className="text-sm font-medium text-black/70">{config.label}</p>
          <input
            key={inputKeys[config.label] || 0}
            accept="image/*"
            className="hidden"
            id={`${config.label}-upload`}
            type="file"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                handleUpload(config, file);
              }
            }}
          />

          {config.url ? (
            <div>
              <div className="relative inline-block">
                <div
                  className="overflow-hidden border border-black/15 bg-[#f1f1f1]"
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
                {config.onRemove ? (
                  <button
                    aria-label={`Remove ${config.label}`}
                    className="absolute -right-2 -top-2 bg-red-700 p-2 text-white transition-colors hover:bg-red-800 disabled:opacity-50"
                    disabled={config.isRemoving}
                    type="button"
                    onClick={config.onRemove}
                  >
                    {config.isRemoving ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                ) : null}
              </div>
              <label
                className="mt-2 flex min-h-10 w-fit cursor-pointer items-center gap-2 border border-black/20 bg-white px-3 text-sm text-black/70 hover:bg-[#f1f1f1]"
                htmlFor={`${config.label}-upload`}
              >
                {config.isUploading ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <Upload size={16} />
                )}
                Replace image
              </label>
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center border border-dashed border-black/20 bg-white"
              style={{ width: config.width, height: config.height }}
            >
              <label
                className="flex cursor-pointer flex-col items-center"
                htmlFor={`${config.label}-upload`}
              >
                {config.isUploading ? (
                  <Loader2 className="animate-spin text-black/65" size={32} />
                ) : (
                  <>
                    <Upload className="mb-2 text-black/40" size={28} />
                    <span className="text-sm text-black/55">Upload image</span>
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
