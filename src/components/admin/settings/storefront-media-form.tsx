'use client';

import { ImageIcon, Loader2, Save, Upload, Video } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Settings = {
  siteName: string;
  tagline: string;
  logoUrl?: string;
  heroImageUrl?: string;
  heroAltText: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  motionVideoUrl?: string;
  motionVideoPosterUrl?: string;
};

type ApiResponse = { data?: Settings; message?: string };

const initial: Settings = {
  siteName: 'PickNQuicks',
  tagline: 'Tech & Workspace Essentials',
  heroAltText: 'A considered technology workspace',
};

export function StorefrontMediaForm() {
  const [settings, setSettings] = useState(initial);
  const [files, setFiles] = useState<Record<string, File | undefined>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/storefront-settings')
      .then((response) => response.json())
      .then((payload: ApiResponse) => payload.data && setSettings(payload.data))
      .catch(() => toast.error('Unable to load storefront media'))
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    const body = new FormData();
    body.set('siteName', settings.siteName);
    body.set('tagline', settings.tagline);
    body.set('heroAltText', settings.heroAltText);
    Object.entries(files).forEach(([name, file]) => file && body.set(name, file));
    try {
      const response = await fetch('/api/storefront-settings', { method: 'PATCH', body });
      const payload = (await response.json()) as ApiResponse;
      if (!response.ok || !payload.data) {throw new Error(payload.message || 'Update failed');}
      setSettings(payload.data);
      setFiles({});
      toast.success('Storefront media updated');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to update storefront media');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="border border-black/10 bg-white p-6">
        <h3 className="text-lg font-semibold">Store identity</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Field
            label="Store name"
            value={settings.siteName}
            onChange={(siteName) => setSettings((v) => ({ ...v, siteName }))}
          />
          <Field
            label="Tagline"
            value={settings.tagline}
            onChange={(tagline) => setSettings((v) => ({ ...v, tagline }))}
          />
        </div>
        <div className="mt-5">
          <MediaUpload
            accept="image/*"
            file={files.logoFile}
            label="Optional uploaded logo"
            preview={settings.logoUrl}
            onChange={(file) => setFiles((v) => ({ ...v, logoFile: file }))}
          />
        </div>
      </section>

      <section className="border border-black/10 bg-white p-6">
        <h3 className="text-lg font-semibold">Homepage media</h3>
        <p className="mt-1 text-sm text-black/50">
          Replacing a file updates the live homepage without a deployment.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <MediaUpload
            accept="image/*"
            file={files.heroFile}
            label="Hero image"
            preview={settings.heroImageUrl}
            onChange={(file) => setFiles((v) => ({ ...v, heroFile: file }))}
          />
          <MediaUpload
            accept="image/*"
            file={files.videoPosterFile}
            label="Video poster"
            preview={settings.motionVideoPosterUrl}
            onChange={(file) => setFiles((v) => ({ ...v, videoPosterFile: file }))}
          />
          <MediaUpload
            accept="image/*"
            file={files.beforeFile}
            label="Before image"
            preview={settings.beforeImageUrl}
            onChange={(file) => setFiles((v) => ({ ...v, beforeFile: file }))}
          />
          <MediaUpload
            accept="image/*"
            file={files.afterFile}
            label="After image"
            preview={settings.afterImageUrl}
            onChange={(file) => setFiles((v) => ({ ...v, afterFile: file }))}
          />
          <MediaUpload
            video
            accept="video/mp4,video/webm"
            file={files.videoFile}
            label="Motion video"
            preview={settings.motionVideoUrl}
            onChange={(file) => setFiles((v) => ({ ...v, videoFile: file }))}
          />
        </div>
        <div className="mt-5">
          <Field
            label="Hero image description (accessibility and SEO)"
            value={settings.heroAltText}
            onChange={(heroAltText) => setSettings((v) => ({ ...v, heroAltText }))}
          />
        </div>
      </section>

      <button
        className="inline-flex min-h-12 items-center gap-2 bg-black px-6 text-sm font-semibold text-white disabled:opacity-50"
        disabled={saving}
        onClick={save}
      >
        {saving ? <Loader2 className="animate-spin" size={17} /> : <Save size={17} />}
        Save storefront
      </button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <input
        className="mt-2 min-h-12 w-full border border-black/20 px-3 font-normal"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function MediaUpload({
  accept,
  file,
  label,
  onChange,
  preview,
  video = false,
}: {
  accept: string;
  file?: File;
  label: string;
  onChange: (file: File) => void;
  preview?: string;
  video?: boolean;
}) {
  const localPreview = file ? URL.createObjectURL(file) : preview;
  return (
    <div>
      <p className="mb-2 text-sm font-semibold">{label}</p>
      <div className="relative flex aspect-video items-center justify-center overflow-hidden border border-black/15 bg-[#f1f1f1]">
        {localPreview && !video ? (
          <Image
            fill
            alt={label}
            className="object-cover"
            src={localPreview}
            unoptimized={Boolean(file)}
          />
        ) : video ? (
          <Video className="text-black/35" size={40} />
        ) : (
          <ImageIcon className="text-black/35" size={40} />
        )}
      </div>
      <label className="mt-2 inline-flex min-h-10 cursor-pointer items-center gap-2 border border-black/20 px-3 text-sm font-semibold">
        <Upload size={15} />
        {file ? file.name : 'Choose replacement'}
        <input
          accept={accept}
          className="hidden"
          type="file"
          onChange={(event) => {
            const selected = event.target.files?.[0];
            if (selected) {onChange(selected);}
          }}
        />
      </label>
    </div>
  );
}
