'use client';

import { Loader2, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

type Placement = 'JOURNAL' | 'GALLERY';
type MediaItem = {
  id: string;
  placement: Placement;
  mediaUrl: string;
  altText: string;
  eyebrow?: string;
  title?: string;
  body?: string;
};

export function StorefrontGalleryManager() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [placement, setPlacement] = useState<Placement>('GALLERY');
  const [file, setFile] = useState<File>();
  const [title, setTitle] = useState('');
  const [altText, setAltText] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const response = await fetch('/api/storefront-media');
    const payload = await response.json();
    setItems(payload.data ?? []);
  }, []);

  useEffect(() => {
    load()
      .catch(() => toast.error('Unable to load homepage galleries'))
      .finally(() => setLoading(false));
  }, [load]);

  const add = async () => {
    if (!file || !title.trim() || !altText.trim()) {
      toast.error('Choose an image and provide its title and description');
      return;
    }
    setSaving(true);
    const body = new FormData();
    body.set('file', file);
    body.set('placement', placement);
    body.set('title', title.trim());
    body.set('altText', altText.trim());
    body.set(
      'displayOrder',
      String(items.filter((item) => item.placement === placement).length + 1)
    );
    try {
      const response = await fetch('/api/storefront-media', { method: 'POST', body });
      if (!response.ok) {throw new Error('Upload failed');}
      await load();
      setFile(undefined);
      setTitle('');
      setAltText('');
      toast.success('Homepage image added');
    } catch {
      toast.error('Unable to add homepage image');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Remove this homepage image?')) {return;}
    const response = await fetch(`/api/storefront-media/${id}`, { method: 'DELETE' });
    if (response.ok) {
      setItems((current) => current.filter((item) => item.id !== id));
      toast.success('Homepage image removed');
    } else {toast.error('Unable to remove image');}
  };

  if (loading) {return <Loader2 className="mt-8 animate-spin" />;}

  return (
    <section className="mt-8 border border-black/10 bg-white p-6">
      <h3 className="text-xl font-semibold">Homepage galleries</h3>
      <p className="mt-1 text-sm text-black/50">
        Add as many editorial or inspiration images as needed.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <article key={item.id} className="border border-black/10 p-3">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#f1f1f1]">
              <Image fill alt={item.altText} className="object-cover" src={item.mediaUrl} />
            </div>
            <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#9a5d3b]">
              {item.placement}
            </p>
            <p className="mt-1 text-sm font-semibold">{item.title}</p>
            <button
              className="mt-3 inline-flex min-h-9 items-center gap-1 text-xs font-semibold text-red-700"
              onClick={() => remove(item.id)}
            >
              <Trash2 size={14} /> Remove
            </button>
          </article>
        ))}
      </div>
      <div className="mt-7 grid gap-4 border-t border-black/10 pt-6 md:grid-cols-2 xl:grid-cols-4">
        <label className="text-sm font-semibold">
          Placement
          <select
            className="mt-2 min-h-11 w-full border border-black/20 px-3"
            value={placement}
            onChange={(event) => setPlacement(event.target.value as Placement)}
          >
            <option value="GALLERY">Inspiration gallery</option>
            <option value="JOURNAL">News/editorial</option>
          </select>
        </label>
        <label className="text-sm font-semibold">
          Title
          <input
            className="mt-2 min-h-11 w-full border border-black/20 px-3"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label className="text-sm font-semibold">
          Image description
          <input
            className="mt-2 min-h-11 w-full border border-black/20 px-3"
            value={altText}
            onChange={(event) => setAltText(event.target.value)}
          />
        </label>
        <label className="text-sm font-semibold">
          Image
          <input
            accept="image/*"
            className="mt-2 block w-full text-xs"
            type="file"
            onChange={(event) => setFile(event.target.files?.[0])}
          />
        </label>
      </div>
      <button
        className="mt-5 inline-flex min-h-11 items-center gap-2 bg-black px-5 text-sm font-semibold text-white disabled:opacity-50"
        disabled={saving}
        onClick={add}
      >
        {saving ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}Add homepage
        image
      </button>
    </section>
  );
}
