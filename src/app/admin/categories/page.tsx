'use client';

import { Plus, Edit, Trash2, Loader2, ArrowUpDown, X, ChevronRight, Layers } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { CategoryFormModal } from '@/components/admin/categories/category-form-modal';
import { ProtectedRoute } from '@/components/auth/protected-route';
import {
  useDeleteCategory,
  useMoveCategory,
  useReorderCategories,
} from '@/lib/category/categories.mutations';
import { useCategory, useCategoryTree } from '@/lib/category/categories.queries';
import { resolveMediaUrl } from '@/lib/utils/media';
import { UserRole } from '@/types/auth';

import type { CategoryTree } from '@/types/category';

export default function AdminCategoriesPage() {
  const { data: categoryTree, isLoading } = useCategoryTree();
  const deleteCategory = useDeleteCategory();
  const moveCategory = useMoveCategory();
  const reorderCategories = useReorderCategories();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMoveOpen, setIsMoveOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [targetParentId, setTargetParentId] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const { data: fullCategoryData } = useCategory(selectedCategoryId ?? '');
  const editingCategory = selectedCategoryId ? fullCategoryData : undefined;

  const handleCreate = () => {
    setSelectedCategoryId(null);
    setIsFormOpen(true);
  };

  const handleEdit = (category: CategoryTree) => {
    setSelectedCategoryId(category.id);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete "${name}"? This action cannot be undone.`)) {
      deleteCategory.mutate(id);
      if (selectedCategoryId === id) {
        setSelectedCategoryId(null);
      }
    }
  };

  const handleMove = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setTargetParentId('');
    setIsMoveOpen(true);
  };

  const handleConfirmMove = () => {
    if (!selectedCategoryId) {
      return;
    }

    moveCategory.mutate(
      { id: selectedCategoryId, newParentId: targetParentId || undefined },
      {
        onSuccess: () => {
          setIsMoveOpen(false);
          setSelectedCategoryId(null);
        },
      }
    );
  };

  const handleReorder = () => {
    if (!categoryTree || categoryTree.length === 0) {
      return;
    }

    const flattenTree = (nodes: CategoryTree[]): string[] => {
      return nodes.flatMap((node) => [node.id, ...flattenTree(node.children ?? [])]);
    };

    reorderCategories.mutate(flattenTree(categoryTree));
  };

  const toggleFolder = (id: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedFolders(newExpanded);
  };

  const renderCategoryRow = (category: CategoryTree, level: number = 0) => {
    const isExpanded = expandedFolders.has(category.id);
    const children = category.children ?? [];
    const hasChildren = children.length > 0;

    return (
      <div key={category.id}>
        <div className="flex items-center gap-2 border-b border-black/10 px-4 py-3 transition-colors hover:bg-[#f1f1f1] md:gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-3">
            {hasChildren ? (
              <button
                className="shrink-0  p-1 transition-colors hover:bg-[#f1f1f1]"
                onClick={() => toggleFolder(category.id)}
              >
                <ChevronRight
                  className={`text-black/45 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                  size={18}
                />
              </button>
            ) : null}
            {!hasChildren ? <div className="w-6 shrink-0" /> : null}

            <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden  border border-[#9a5d3b]/30 bg-[#9a5d3b]/10 md:h-10 md:w-10">
                {category.iconUrl ? (
                  <Image
                    alt={category.name}
                    className="h-full w-full object-cover"
                    height={40}
                    src={resolveMediaUrl(category.iconUrl) || ''}
                    width={40}
                  />
                ) : (
                  <Layers className="text-black/60" size={16} />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-black">{category.name}</p>
                <p className="truncate text-xs text-black/45">/{category.slug}</p>
              </div>
            </div>
          </div>

          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <span className=" bg-[#f1f1f1] px-2 py-1 text-xs text-black/45">
              Level {category.level}
            </span>
          </div>

          <button
            className="shrink-0  p-2 text-black/45 transition-colors hover:bg-[#f1f1f1] hover:text-black/60"
            title="Edit"
            onClick={() => handleEdit(category)}
          >
            <Edit size={16} />
          </button>

          <button
            className="shrink-0  p-2 text-black/45 transition-colors hover:bg-[#f1f1f1] hover:text-black/60"
            title="Move"
            onClick={() => handleMove(category.id)}
          >
            <ArrowUpDown size={16} />
          </button>

          <button
            className="shrink-0  p-2 text-black/45 transition-colors hover:bg-[#f1f1f1] hover:text-red-400"
            disabled={deleteCategory.isPending}
            title="Delete"
            onClick={() => handleDelete(category.id, category.name)}
          >
            {deleteCategory.isPending ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Trash2 size={16} />
            )}
          </button>
        </div>

        {hasChildren && isExpanded ? (
          <div className="bg-white">
            {children.map((child) => renderCategoryRow(child, level + 1))}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
      <div className="min-h-screen bg-white p-4 sm:p-7 xl:p-9">
        <div className="space-y-6">
          <div className="flex flex-col gap-5 border-b border-black/10 pb-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-[#9a5d3b]">Catalog</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-.045em] text-black sm:text-4xl">
                Categories
              </h1>
              <p className="mt-2 text-sm text-black/50">
                Shape how customers browse the collection.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                className="inline-flex items-center gap-2  border border-black/20 bg-white px-4 py-2.5 text-sm font-semibold text-black/65 transition-colors hover:bg-[#f1f1f1] disabled:opacity-50"
                disabled={reorderCategories.isPending || !categoryTree || categoryTree.length === 0}
                onClick={handleReorder}
              >
                {reorderCategories.isPending ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <ArrowUpDown size={16} />
                )}
                Reorder All
              </button>

              <button
                className="inline-flex h-11 items-center gap-2 bg-[#9a5d3b] px-5 text-sm font-semibold text-white hover:bg-[#754329]"
                onClick={handleCreate}
              >
                <Plus size={20} />
                Add category
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-black/60" />
            </div>
          ) : categoryTree && categoryTree.length > 0 ? (
            <div className="md:  overflow-hidden border border-black/15  bg-white">
              <div className="hidden gap-4 border-b border-black/15 bg-[#f1f1f1] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-black/45 md:grid md:grid-cols-12">
                <div className="md:col-span-6">Name</div>
                <div className="md:col-span-2">Level</div>
                <div className="md:col-span-4">Actions</div>
              </div>

              <div className="divide-y divide-black/10">
                {categoryTree.map((category) => renderCategoryRow(category))}
              </div>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center  border border-dashed border-black/20 bg-[#f1f1f1]">
              <div className="text-center">
                <p className="mb-4 text-black/45">No categories yet</p>
                <button
                  className="inline-flex items-center gap-2 bg-[#9a5d3b] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#754329]"
                  onClick={handleCreate}
                >
                  <Plus size={18} />
                  Create First Category
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <CategoryFormModal
        category={editingCategory}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedCategoryId(null);
        }}
      />

      {isMoveOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg  border border-black/20 bg-white p-6 ">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-black">Move category</h3>
                <p className="mt-1 text-sm text-black/45">Choose the new parent category</p>
              </div>
              <button
                className=" p-1 text-black/45 hover:bg-[#f1f1f1] hover:text-black/65"
                type="button"
                onClick={() => setIsMoveOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="mb-5 space-y-2">
              <label className="text-sm font-medium text-black/65" htmlFor="move-parent">
                New Parent Category
              </label>
              <select
                className="w-full border border-black/20 bg-white px-3 py-2.5 text-sm text-black focus:border-[#9a5d3b] focus:outline-none"
                id="move-parent"
                value={targetParentId}
                onChange={(e) => setTargetParentId(e.target.value)}
              >
                <option value="">Root (Top Level)</option>
                {categoryTree?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                className=" border border-black/20 bg-[#f1f1f1] px-3 py-2 text-sm text-black/65 transition-colors hover:bg-[#f1f1f1]"
                type="button"
                onClick={() => setIsMoveOpen(false)}
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center gap-2 bg-[#9a5d3b] px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#754329] disabled:opacity-50"
                disabled={moveCategory.isPending}
                type="button"
                onClick={handleConfirmMove}
              >
                {moveCategory.isPending ? <Loader2 className="animate-spin" size={14} /> : null}
                Move
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </ProtectedRoute>
  );
}
