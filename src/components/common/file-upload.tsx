'use client';

import { Upload, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { resolveMediaUrl } from '@/lib/utils/media';

interface FileUploadProps {
  label: string;
  accept?: string;
  value?: File | string;
  onChange: (file: File | null) => void;
  preview?: boolean;
  maxSize?: number;
  error?: string;
}

export function FileUpload({
  label,
  accept = 'image/*',
  value,
  onChange,
  preview = true,
  maxSize = 5,
  error,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);
  const previewUrl =
    localPreviewUrl ?? (typeof value === 'string' ? (resolveMediaUrl(value) ?? null) : null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }

    onChange(file);

    if (preview) {
      const reader = new FileReader();
      reader.onloadend = () => setLocalPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    onChange(null);
    setLocalPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-black/70">{label}</label>

      {previewUrl ? (
        <div className="relative inline-block">
          <div className="h-32 w-32 overflow-hidden border border-black/15 bg-[#f1f1f1]">
            <Image
              alt="Preview"
              className="h-full w-full object-cover"
              height={128}
              src={previewUrl}
              width={128}
            />
          </div>
          <button
            aria-label={`Remove ${label}`}
            className="absolute -right-2 -top-2 bg-red-700 p-1 text-white hover:bg-red-800"
            type="button"
            onClick={handleRemove}
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center border border-dashed border-black/20 bg-white transition-colors hover:bg-[#f1f1f1]"
          onClick={() => inputRef.current?.click()}
        >
          {accept.includes('image') ? (
            <ImageIcon className="mb-2 text-black/40" size={28} />
          ) : (
            <Upload className="mb-2 text-black/40" size={28} />
          )}
          <span className="text-xs text-black/60">Upload image</span>
          <span className="mt-1 text-[10px] text-black/40">Maximum {maxSize} MB</span>
        </div>
      )}

      <input
        ref={inputRef}
        accept={accept}
        className="hidden"
        type="file"
        onChange={handleFileChange}
      />

      {error ? <p className="mt-1 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
