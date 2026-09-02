'use client';

import { ChevronDown, ChevronUp, ImagePlus, Loader2, Plus, Save, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import {
  useCreateCategoryStoryItem,
  useDeleteCategoryStoryItem,
  useUpdateCategoryStoryItem,
} from '@/lib/category/category-stories.mutations';
import { useCategoryStory } from '@/lib/category/category-stories.queries';
import { resolveMediaUrl } from '@/lib/utils/media';

import type { CategoryStoryInput, CategoryStoryItem, CategoryStoryKind } from '@/types/category';

const inputClass =
  'w-full border border-black/20 bg-white px-3 py-2 text-sm outline-none focus:border-[#9a5d3b] focus:ring-1 focus:ring-[#9a5d3b]';

function StoryEditor({
  item,
  categoryId,
  onDone,
}: {
  item?: CategoryStoryItem;
  categoryId: string;
  onDone?: () => void;
}) {
  const create = useCreateCategoryStoryItem(categoryId);
  const update = useUpdateCategoryStoryItem(categoryId);
  const [kind, setKind] = useState<CategoryStoryKind>(item?.kind ?? 'SCENE');
  const [eyebrow, setEyebrow] = useState(item?.eyebrow ?? '');
  const [title, setTitle] = useState(item?.title ?? '');
  const [body, setBody] = useState(item?.body ?? '');
  const [altText, setAltText] = useState(item?.altText ?? '');
  const [mediaUrl, setMediaUrl] = useState(item?.mediaUrl ?? '');
  const [displayOrder, setDisplayOrder] = useState(item?.displayOrder ?? 0);
  const [active, setActive] = useState(item?.active ?? true);
  const [file, setFile] = useState<File>();
  const pending = create.isPending || update.isPending;

  const save = () => {
    const input: CategoryStoryInput = {
      kind,
      eyebrow,
      title,
      body,
      altText,
      mediaUrl,
      displayOrder,
      active,
      file,
    };
    if (item) {
      update.mutate({ id: item.id, input });
    } else {
      create.mutate(input, { onSuccess: onDone });
    }
  };

  return (
    <div className="border border-black/15 bg-[#f8f6f2] p-4">
      <div className="grid gap-3 sm:grid-cols-[9rem_minmax(0,1fr)_7rem]">
        <label className="text-xs text-black/55">
          Section type
          <select
            className={`${inputClass} mt-1`}
            value={kind}
            onChange={(event) => setKind(event.target.value as CategoryStoryKind)}
          >
            <option value="HERO">Hero</option>
            <option value="SCENE">Work scene</option>
            <option value="GUIDE">Buying guide</option>
          </select>
        </label>
        <label className="text-xs text-black/55">
          Small heading
          <input
            className={`${inputClass} mt-1`}
            value={eyebrow}
            onChange={(event) => setEyebrow(event.target.value)}
          />
        </label>
        <label className="text-xs text-black/55">
          Order
          <input
            className={`${inputClass} mt-1`}
            min={0}
            type="number"
            value={displayOrder}
            onChange={(event) => setDisplayOrder(Number(event.target.value))}
          />
        </label>
      </div>
      <label className="mt-3 block text-xs text-black/55">
        Headline
        <input
          className={`${inputClass} mt-1`}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <label className="mt-3 block text-xs text-black/55">
        Story copy
        <textarea
          className={`${inputClass} mt-1 min-h-24 resize-y`}
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
      </label>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="text-xs text-black/55">
          Existing image URL
          <input
            className={`${inputClass} mt-1`}
            placeholder="/images/... or Supabase URL"
            value={mediaUrl}
            onChange={(event) => setMediaUrl(event.target.value)}
          />
        </label>
        <label className="text-xs text-black/55">
          Accessible image description
          <input
            className={`${inputClass} mt-1`}
            value={altText}
            onChange={(event) => setAltText(event.target.value)}
          />
        </label>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-3">
        <div className="flex flex-wrap items-center gap-4">
          <label className="inline-flex cursor-pointer items-center gap-2 border border-black/20 bg-white px-3 py-2 text-xs">
            <ImagePlus size={15} />
            {file ? file.name : item?.mediaUrl ? 'Replace image' : 'Upload image'}
            <input
              accept="image/avif,image/jpeg,image/png,image/webp"
              className="sr-only"
              type="file"
              onChange={(event) => setFile(event.target.files?.[0])}
            />
          </label>
          <label className="flex items-center gap-2 text-xs text-black/65">
            <input
              checked={active}
              type="checkbox"
              onChange={(event) => setActive(event.target.checked)}
            />
            Visible
          </label>
        </div>
        <button
          className="inline-flex min-h-10 items-center gap-2 bg-black px-4 text-xs text-white disabled:opacity-45"
          disabled={pending || !title.trim()}
          type="button"
          onClick={save}
        >
          {pending ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
          {item ? 'Save section' : 'Add section'}
        </button>
      </div>
    </div>
  );
}

function StoryRow({
  item,
  items,
  categoryId,
}: {
  item: CategoryStoryItem;
  items: CategoryStoryItem[];
  categoryId: string;
}) {
  const remove = useDeleteCategoryStoryItem(categoryId);
  const update = useUpdateCategoryStoryItem(categoryId);
  const [editing, setEditing] = useState(false);
  const imageUrl = resolveMediaUrl(item.mediaUrl);
  const index = items.findIndex((entry) => entry.id === item.id);

  const move = (direction: -1 | 1) => {
    const neighbor = items[index + direction];
    if (!neighbor) {
      return;
    }
    update.mutate({ id: item.id, input: { displayOrder: neighbor.displayOrder } });
    update.mutate({ id: neighbor.id, input: { displayOrder: item.displayOrder } });
  };

  return (
    <div>
      <div className="grid grid-cols-[5rem_minmax(0,1fr)_auto] items-center gap-3 border border-black/15 bg-white p-2">
        <div className="relative h-16 overflow-hidden bg-[#eee9e1]">
          {imageUrl ? (
            <Image fill alt="" className="object-cover" sizes="80px" src={imageUrl} />
          ) : (
            <div className="flex h-full items-center justify-center text-[9px] uppercase tracking-wider text-black/35">
              Copy
            </div>
          )}
        </div>
        <button
          className="min-w-0 text-left"
          type="button"
          onClick={() => setEditing((value) => !value)}
        >
          <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-[#9a5d3b]">
            {item.kind} · {item.displayOrder}
          </span>
          <span className="mt-1 block truncate text-sm font-medium">{item.title}</span>
          <span className="mt-1 block text-[11px] text-black/45">
            {item.active ? 'Visible' : 'Hidden'} · Click to edit
          </span>
        </button>
        <div className="flex items-center">
          <button
            aria-label="Move up"
            className="p-2 disabled:text-black/20"
            disabled={index === 0}
            type="button"
            onClick={() => move(-1)}
          >
            <ChevronUp size={16} />
          </button>
          <button
            aria-label="Move down"
            className="p-2 disabled:text-black/20"
            disabled={index === items.length - 1}
            type="button"
            onClick={() => move(1)}
          >
            <ChevronDown size={16} />
          </button>
          <button
            aria-label="Delete section"
            className="p-2 text-red-700 disabled:opacity-40"
            disabled={remove.isPending}
            type="button"
            onClick={() => {
              if (window.confirm(`Remove “${item.title}”?`)) {
                remove.mutate(item.id);
              }
            }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      {editing ? (
        <div className="mt-2">
          <StoryEditor categoryId={categoryId} item={item} />
        </div>
      ) : null}
    </div>
  );
}

export function CategoryStoryManager({ categoryId }: { categoryId: string }) {
  const query = useCategoryStory(categoryId, true);
  const [adding, setAdding] = useState(false);
  const items = [...(query.data ?? [])].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section className="border-t border-black/15 bg-[#f1eee8] p-6">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#9a5d3b]">
            Category landing page
          </p>
          <h3 className="mt-2 text-xl font-normal tracking-[-0.025em]">Editorial story</h3>
          <p className="mt-1 max-w-xl text-xs leading-5 text-black/50">
            Build the hero, working scenes and buying guide. Uploads are stored in the product-media
            bucket under this category’s story folder.
          </p>
        </div>
        <button
          className="inline-flex shrink-0 items-center gap-2 border border-black px-3 py-2 text-xs"
          type="button"
          onClick={() => setAdding((value) => !value)}
        >
          <Plus size={14} /> Add section
        </button>
      </div>

      {adding ? (
        <div className="mt-5">
          <StoryEditor categoryId={categoryId} onDone={() => setAdding(false)} />
        </div>
      ) : null}
      {query.isLoading ? <div className="mt-5 h-20 animate-pulse bg-black/10" /> : null}
      {query.isError ? (
        <p className="mt-5 border border-[#9a5d3b]/30 bg-white p-4 text-xs leading-5 text-black/60">
          The story table is not available yet. Run the latest Supabase migration, then reopen this
          category.
        </p>
      ) : null}
      {items.length ? (
        <div className="mt-5 space-y-2">
          {items.map((item) => (
            <StoryRow key={item.id} categoryId={categoryId} item={item} items={items} />
          ))}
        </div>
      ) : !query.isLoading && !query.isError ? (
        <p className="mt-5 border border-dashed border-black/25 bg-white p-5 text-center text-xs text-black/45">
          No story sections yet. Start with one Hero section.
        </p>
      ) : null}
    </section>
  );
}
