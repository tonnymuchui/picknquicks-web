'use client';

import { ChevronRight, ChevronDown, Folder, FolderOpen } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { resolveMediaUrl } from '@/lib/utils/media';

import type { CategoryTree } from '@/types/category';

interface CategoryTreeViewProps {
  categories: CategoryTree[];
  onSelect?: (category: CategoryTree) => void;
  selectedId?: string;
}

export function CategoryTreeView({ categories, onSelect, selectedId }: CategoryTreeViewProps) {
  return (
    <div className="space-y-1">
      {categories.map((category) => (
        <TreeNode
          key={category.id}
          category={category}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

interface TreeNodeProps {
  category: CategoryTree;
  onSelect?: (category: CategoryTree) => void;
  selectedId?: string;
  level?: number;
}

function TreeNode({ category, onSelect, selectedId, level = 0 }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level < 1);
  const hasChildren = category.children && category.children.length > 0;
  const isSelected = selectedId === category.id;
  const iconSrc = resolveMediaUrl(category.iconUrl);

  return (
    <div>
      <div
        className={`group flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 transition-all ${
          isSelected
            ? 'border-blue-200 bg-blue-50/80 text-blue-700 shadow-sm'
            : 'border-transparent hover:border-gray-200 hover:bg-white'
        }`}
        style={{ paddingLeft: `${level * 20 + 12}px` }}
        onClick={() => onSelect?.(category)}
      >
        {hasChildren ? <button
            className="rounded p-0.5 hover:bg-gray-200"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button> : null}

        {!hasChildren ? <div className="w-5" /> : null}

        <div className="h-8 w-8 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white">
          {iconSrc ? (
            <Image
              alt={`${category.name} icon`}
              className="h-full w-full object-cover"
              height={32}
              src={iconSrc}
              width={32}
            />
          ) : hasChildren && isExpanded ? (
            <FolderOpen className="mx-auto mt-2 text-gray-400" size={16} />
          ) : (
            <Folder className="mx-auto mt-2 text-gray-400" size={16} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <span
            className={`block truncate text-sm font-medium ${!category.active ? 'text-gray-400' : ''}`}
          >
            {category.name}
          </span>
          <span className="block text-xs text-gray-500">/{category.slug}</span>
        </div>

        {hasChildren ? <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
            {category.children.length}
          </span> : null}

        {!category.active ? <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
            Inactive
          </span> : null}
      </div>

      {hasChildren && isExpanded ? <div>
          {category.children.map((child) => (
            <TreeNode
              key={child.id}
              category={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div> : null}
    </div>
  );
}
