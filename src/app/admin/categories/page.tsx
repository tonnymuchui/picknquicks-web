'use client';

import { Plus, Edit, Trash2, Loader2, ArrowUpDown, X, ChevronRight, Layers } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

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

import type { Category, CategoryTree } from '@/types/category';

export default function AdminCategoriesPage() {
  const { data: categoryTree, isLoading } = useCategoryTree();
  const deleteCategory = useDeleteCategory();
  const moveCategory = useMoveCategory();
  const reorderCategories = useReorderCategories();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMoveOpen, setIsMoveOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [targetParentId, setTargetParentId] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const { data: fullCategoryData } = useCategory(selectedCategoryId || '');

  useEffect(() => {
    if (fullCategoryData && selectedCategoryId) {
      // Sync fetched data to editing state
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEditingCategory(fullCategoryData);
    }
  }, [fullCategoryData, selectedCategoryId]);

  const handleCreate = () => {
    setEditingCategory(undefined);
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
      return nodes.flatMap((node) => [node.id, ...flattenTree(node.children)]);
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
    const hasChildren = category.children.length > 0;

    return (
      <div key={category.id}>
        <div className="flex items-center gap-2 border-b border-gray-800 px-4 py-3 transition-colors hover:bg-gray-800/50 md:gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-3">
            {hasChildren ? (
              <button
                className="shrink-0 rounded p-1 transition-colors hover:bg-gray-700"
                onClick={() => toggleFolder(category.id)}
              >
                <ChevronRight
                  className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                  size={18}
                />
              </button>
            ) : null}
            {!hasChildren ? <div className="w-6 shrink-0" /> : null}

            <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-yellow-400/30 bg-yellow-400/10 md:h-10 md:w-10">
                {category.iconUrl ? (
                  <Image
                    alt={category.name}
                    className="h-full w-full object-cover"
                    height={40}
                    src={resolveMediaUrl(category.iconUrl) || ''}
                    width={40}
                  />
                ) : (
                  <Layers className="text-yellow-400" size={16} />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{category.name}</p>
                <p className="truncate text-xs text-gray-500">/{category.slug}</p>
              </div>
            </div>
          </div>

          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <span className="rounded bg-gray-800/50 px-2 py-1 text-xs text-gray-400">
              Level {category.level}
            </span>
          </div>

          <button
            className="shrink-0 rounded p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-blue-400"
            title="Edit"
            onClick={() => handleEdit(category)}
          >
            <Edit size={16} />
          </button>

          <button
            className="shrink-0 rounded p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-purple-400"
            title="Move"
            onClick={() => handleMove(category.id)}
          >
            <ArrowUpDown size={16} />
          </button>

          <button
            className="shrink-0 rounded p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-red-400"
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
          <div className="bg-gray-900/50">
            {category.children.map((child) => renderCategoryRow(child, level + 1))}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
      <div className="min-h-screen bg-gray-950 p-4 md:p-8">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white md:text-3xl">Categories</h1>
              <p className="mt-2 text-sm text-gray-400">Manage product categories</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-sm font-semibold text-gray-300 transition-colors hover:bg-gray-800 disabled:opacity-50"
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
                className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-gray-950 transition-colors hover:bg-yellow-300"
                onClick={handleCreate}
              >
                <Plus size={20} />
                Create Category
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-yellow-400" />
            </div>
          ) : categoryTree && categoryTree.length > 0 ? (
            <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-sm md:rounded-2xl">
              <div className="hidden gap-4 border-b border-gray-800 bg-gray-800/50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400 md:grid md:grid-cols-12">
                <div className="md:col-span-6">Name</div>
                <div className="md:col-span-2">Level</div>
                <div className="md:col-span-4">Actions</div>
              </div>

              <div className="divide-y divide-gray-800">
                {categoryTree.map((category) => renderCategoryRow(category))}
              </div>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-gray-700 bg-gray-900/50">
              <div className="text-center">
                <p className="mb-4 text-gray-500">No categories yet</p>
                <button
                  className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-gray-950 transition-colors hover:bg-yellow-300"
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
          setEditingCategory(undefined);
        }}
      />

      {isMoveOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-xl border border-gray-700 bg-gray-900 p-6 shadow-xl">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Move Category</h3>
                <p className="mt-1 text-sm text-gray-400">Choose the new parent category</p>
              </div>
              <button
                className="rounded p-1 text-gray-400 hover:bg-gray-800 hover:text-gray-300"
                type="button"
                onClick={() => setIsMoveOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="mb-5 space-y-2">
              <label className="text-sm font-medium text-gray-300" htmlFor="move-parent">
                New Parent Category
              </label>
              <select
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white focus:border-yellow-400 focus:outline-none"
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
                className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-700"
                type="button"
                onClick={() => setIsMoveOpen(false)}
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-3 py-2 text-sm font-semibold text-gray-950 transition-colors hover:bg-yellow-300 disabled:opacity-50"
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
