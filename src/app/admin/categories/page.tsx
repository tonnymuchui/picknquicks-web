'use client';

import { Plus, Edit, Trash2, Loader2, Tag, Layers, ArrowUpDown, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { CategoryFormModal } from '@/components/admin/categories/category-form-modal';
import { CategoryImageManager } from '@/components/admin/categories/category-image-manager';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { CategoryTreeView } from '@/components/categories/category-tree';
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

  const [selectedCategory, setSelectedCategory] = useState<CategoryTree | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMoveOpen, setIsMoveOpen] = useState(false);
  const [targetParentId, setTargetParentId] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();
  const { data: selectedCategoryDetails, isLoading: isCategoryLoading } = useCategory(
    selectedCategory?.id || ''
  );

  const activeCategory = selectedCategoryDetails;
  const activeImage = resolveMediaUrl(activeCategory?.imageUrl);
  const activeIcon = resolveMediaUrl(activeCategory?.iconUrl);

  const handleCreate = () => {
    setEditingCategory(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = () => {
    if (!activeCategory) {
      return;
    }
    setEditingCategory(activeCategory);
    setIsFormOpen(true);
  };

  const handleDelete = () => {
    if (!selectedCategory) {
      return;
    }
    if (confirm(`Delete "${selectedCategory.name}"? This action cannot be undone.`)) {
      deleteCategory.mutate(selectedCategory.id);
      setSelectedCategory(null);
    }
  };

  const findNodeById = (nodes: CategoryTree[], id: string): CategoryTree | null => {
    for (const node of nodes) {
      if (node.id === id) {
        return node;
      }

      const childMatch = findNodeById(node.children, id);
      if (childMatch) {
        return childMatch;
      }
    }

    return null;
  };

  const collectDescendantIds = (node: CategoryTree): Set<string> => {
    const ids = new Set<string>();

    const visit = (current: CategoryTree) => {
      ids.add(current.id);
      current.children.forEach(visit);
    };

    visit(node);
    return ids;
  };

  const buildMoveOptions = (
    nodes: CategoryTree[],
    excludedIds: Set<string>,
    level = 0
  ): Array<{ id: string; label: string }> => {
    return nodes.flatMap((node) => {
      const own = excludedIds.has(node.id)
        ? []
        : [{ id: node.id, label: `${'— '.repeat(level)}${node.name}` }];

      return [...own, ...buildMoveOptions(node.children, excludedIds, level + 1)];
    });
  };

  const moveOptions = (() => {
    if (!selectedCategory || !categoryTree) {
      return [] as Array<{ id: string; label: string }>;
    }

    const selectedNode = findNodeById(categoryTree, selectedCategory.id);
    if (!selectedNode) {
      return [] as Array<{ id: string; label: string }>;
    }

    const excludedIds = collectDescendantIds(selectedNode);
    return buildMoveOptions(categoryTree, excludedIds);
  })();

  const handleOpenMove = () => {
    if (!activeCategory) {
      return;
    }

    setTargetParentId(activeCategory.parentId ?? '');
    setIsMoveOpen(true);
  };

  const handleConfirmMove = () => {
    if (!activeCategory) {
      return;
    }

    const currentParentId = activeCategory.parentId ?? '';
    if (targetParentId === currentParentId) {
      setIsMoveOpen(false);
      return;
    }

    moveCategory.mutate(
      { id: activeCategory.id, newParentId: targetParentId || undefined },
      {
        onSuccess: () => {
          setIsMoveOpen(false);
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

  return (
    <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 lg:py-10">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Categories</h1>
              <p className="mt-1 text-gray-600">Manage product categories</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={reorderCategories.isPending || !categoryTree || categoryTree.length === 0}
                onClick={handleReorder}
              >
                {reorderCategories.isPending ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <ArrowUpDown size={16} />
                )}
                Reorder Tree
              </button>

              <button
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700"
                onClick={handleCreate}
              >
                <Plus size={20} />
                Create Category
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
              <div className="rounded-2xl border border-white/50 bg-white/90 p-5 shadow-sm backdrop-blur xl:col-span-4 2xl:col-span-3">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
                  Category Tree
                </h2>
                {categoryTree && categoryTree.length > 0 ? (
                  <CategoryTreeView
                    categories={categoryTree}
                    selectedId={selectedCategory?.id}
                    onSelect={setSelectedCategory}
                  />
                ) : (
                  <p className="text-sm text-gray-500">No categories yet</p>
                )}
              </div>

              <div className="rounded-2xl border border-white/50 bg-white/95 p-6 shadow-sm backdrop-blur xl:col-span-8 2xl:col-span-9">
                {selectedCategory ? (
                  <div className="space-y-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {selectedCategory.name}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">/{selectedCategory.slug}</p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                          disabled={!activeCategory || moveCategory.isPending}
                          onClick={handleOpenMove}
                        >
                          {moveCategory.isPending ? (
                            <Loader2 className="animate-spin" size={16} />
                          ) : (
                            <Layers size={16} />
                          )}
                          Move Category
                        </button>

                        <button
                          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                          disabled={!activeCategory || isCategoryLoading}
                          onClick={handleEdit}
                        >
                          <Edit size={16} />
                          Edit
                        </button>
                        <button
                          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                          disabled={deleteCategory.isPending}
                          onClick={handleDelete}
                        >
                          {deleteCategory.isPending ? (
                            <Loader2 className="animate-spin" size={16} />
                          ) : (
                            <Trash2 size={16} />
                          )}
                          Delete
                        </button>
                      </div>
                    </div>

                    {isCategoryLoading ? (
                      <div className="flex items-center justify-center rounded-xl border border-gray-100 bg-gray-50 py-12">
                        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                          <div className="rounded-xl border border-gray-100 bg-white p-4">
                            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                              <Tag size={14} />
                              Slug
                            </div>
                            <p className="break-all text-sm font-medium text-gray-900">
                              {activeCategory?.slug ?? '-'}
                            </p>
                          </div>

                          <div className="rounded-xl border border-gray-100 bg-white p-4">
                            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                              <Layers size={14} />
                              Level
                            </div>
                            <p className="text-sm font-medium text-gray-900">
                              {activeCategory?.level ?? selectedCategory.level}
                            </p>
                          </div>

                          <div className="rounded-xl border border-gray-100 bg-white p-4">
                            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                              <ArrowUpDown size={14} />
                              Display Order
                            </div>
                            <p className="text-sm font-medium text-gray-900">
                              {activeCategory?.displayOrder ?? selectedCategory.displayOrder}
                            </p>
                          </div>

                          <div className="rounded-xl border border-gray-100 bg-white p-4">
                            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                              Status
                            </div>
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                                (activeCategory?.active ?? selectedCategory.active)
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {(activeCategory?.active ?? selectedCategory.active)
                                ? 'Active'
                                : 'Inactive'}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 border-y border-gray-200 py-6 md:grid-cols-2">
                          <div className="rounded-xl border border-gray-100 p-4">
                            <h3 className="mb-3 text-sm font-semibold text-gray-800">
                              Current Category Image
                            </h3>
                            {activeImage ? (
                              <div className="overflow-hidden rounded-lg border border-gray-200">
                                <Image
                                  alt={`${selectedCategory.name} image`}
                                  className="h-44 w-full object-cover"
                                  height={360}
                                  src={activeImage}
                                  width={640}
                                />
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500">No image uploaded yet.</p>
                            )}
                          </div>

                          <div className="rounded-xl border border-gray-100 p-4">
                            <h3 className="mb-3 text-sm font-semibold text-gray-800">
                              Current Category Icon
                            </h3>
                            {activeIcon ? (
                              <div className="inline-flex overflow-hidden rounded-lg border border-gray-200">
                                <Image
                                  alt={`${selectedCategory.name} icon`}
                                  className="h-24 w-24 object-cover"
                                  height={96}
                                  src={activeIcon}
                                  width={96}
                                />
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500">No icon uploaded yet.</p>
                            )}
                          </div>
                        </div>

                        {activeCategory ? (
                          <CategoryImageManager
                            categoryId={selectedCategory.id}
                            iconUrl={activeCategory.iconUrl}
                            imageUrl={activeCategory.imageUrl}
                          />
                        ) : null}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex h-72 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 text-gray-500">
                    Select a category to view details
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <CategoryFormModal
        category={editingCategory}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />

      {isMoveOpen && activeCategory ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Move Category</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Choose the new parent for{' '}
                  <span className="font-medium">{activeCategory.name}</span>.
                </p>
              </div>
              <button
                className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                type="button"
                onClick={() => setIsMoveOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="move-parent-select">
                New Parent Category
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                id="move-parent-select"
                value={targetParentId}
                onChange={(e) => setTargetParentId(e.target.value)}
              >
                <option value="">Root (Top Level)</option>
                {moveOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                type="button"
                onClick={() => setIsMoveOpen(false)}
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={
                  moveCategory.isPending || targetParentId === (activeCategory.parentId ?? '')
                }
                type="button"
                onClick={handleConfirmMove}
              >
                {moveCategory.isPending ? <Loader2 className="animate-spin" size={14} /> : null}
                Save Move
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </ProtectedRoute>
  );
}
