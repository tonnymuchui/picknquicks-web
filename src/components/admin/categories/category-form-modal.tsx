'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { X, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { CategoryStoryManager } from '@/components/admin/categories/category-story-manager';
import { FileUpload } from '@/components/common/file-upload';
import { useCreateCategory, useUpdateCategory } from '@/lib/category/categories.mutations';
import { useCategoryTree } from '@/lib/category/categories.queries';
import { categorySchema } from '@/lib/schemas/category.schema';

import type { Category, CategoryTree } from '@/types/category';
import type { z } from 'zod';

type CategoryFormInput = z.infer<typeof categorySchema>;

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: Category;
}

export function CategoryFormModal({ isOpen, onClose, category }: CategoryFormModalProps) {
  const { data: categoryTree } = useCategoryTree();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CategoryFormInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      active: true,
      displayOrder: 0,
    },
  });

  const name = useWatch({ control, name: 'name' });

  const handleClose = () => {
    setImageFile(null);
    setIconFile(null);
    onClose();
  };

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        slug: category.slug,
        description: category.description || '',
        imageUrl: category.imageUrl || '',
        iconUrl: category.iconUrl || '',
        parentId: category.parentId || '',
        displayOrder: category.displayOrder,
        active: category.active,
        metaTitle: category.metaTitle || '',
        metaDescription: category.metaDescription || '',
        metaKeywords: category.metaKeywords || '',
      });
    } else {
      reset({
        active: true,
        displayOrder: 0,
      });
    }
  }, [category, reset]);

  useEffect(() => {
    if (name && !category) {
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setValue('slug', slug);
    }
  }, [name, category, setValue]);

  const onSubmit = (data: CategoryFormInput) => {
    const input = {
      ...data,
      imageFile: imageFile || undefined,
      iconFile: iconFile || undefined,
      parentId: data.parentId || undefined,
      description: data.description || undefined,
      imageUrl: !imageFile ? data.imageUrl || undefined : undefined,
      iconUrl: !iconFile ? data.iconUrl || undefined : undefined,
      metaTitle: data.metaTitle || undefined,
      metaDescription: data.metaDescription || undefined,
      metaKeywords: data.metaKeywords || undefined,
    };

    if (category) {
      updateCategory.mutate(
        { id: category.id, input },
        {
          onSuccess: () => {
            reset();
            handleClose();
          },
        }
      );
    } else {
      createCategory.mutate(input, {
        onSuccess: () => {
          reset();
          handleClose();
        },
      });
    }
  };

  if (!isOpen) {
    return null;
  }

  const isPending = createCategory.isPending || updateCategory.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
      <div className="mx-4 max-h-[90vh] w-full max-w-5xl overflow-y-auto bg-white">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/15 bg-white p-6">
          <h2 className="text-xl font-bold text-black">
            {category ? 'Edit Category' : 'Create Category'}
          </h2>
          <button className="text-black/45 hover:text-black/65" onClick={handleClose}>
            <X size={24} />
          </button>
        </div>

        <form className="space-y-6 p-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-black/70">Name</label>
                <input
                  {...register('name')}
                  className="w-full  border border-black/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9a5d3b]"
                  placeholder="Electronics"
                  type="text"
                />
                {errors.name ? (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black/70">Slug</label>
                <input
                  {...register('slug')}
                  className="w-full  border border-black/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9a5d3b]"
                  placeholder="electronics"
                  type="text"
                />
                {errors.slug ? (
                  <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black/70">Description</label>
                <textarea
                  {...register('description')}
                  className="w-full  border border-black/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9a5d3b]"
                  placeholder="Category description..."
                  rows={3}
                />
                {errors.description ? (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                ) : null}
              </div>
            </div>

            <div className="space-y-4">
              <FileUpload
                label="Category Image"
                maxSize={5}
                value={imageFile || category?.imageUrl}
                onChange={setImageFile}
              />

              <FileUpload
                label="Category Icon"
                maxSize={2}
                value={iconFile || category?.iconUrl}
                onChange={setIconFile}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-black/70">
                Parent Category
              </label>
              <select
                {...register('parentId')}
                className="w-full  border border-black/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9a5d3b]"
              >
                <option value="">None (Root Category)</option>
                {categoryTree?.map((cat) => (
                  <CategoryOption key={cat.id} category={cat} currentId={category?.id} />
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-black/70">Display Order</label>
              <input
                {...register('displayOrder', { valueAsNumber: true })}
                className="w-full  border border-black/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9a5d3b]"
                min="0"
                type="number"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="flex cursor-pointer items-center">
              <input {...register('active')} className="h-4 w-4  text-black/60" type="checkbox" />
              <span className="ml-2 text-sm text-black/70">Active</span>
            </label>
          </div>

          <div className="border-t border-black/15 pt-6">
            <h3 className="mb-4 text-sm font-semibold text-black">SEO Settings</h3>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-black/70">Meta Title</label>
                <input
                  {...register('metaTitle')}
                  className="w-full  border border-black/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9a5d3b]"
                  type="text"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black/70">
                  Meta Description
                </label>
                <textarea
                  {...register('metaDescription')}
                  className="w-full  border border-black/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9a5d3b]"
                  rows={2}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black/70">
                  Meta Keywords
                </label>
                <input
                  {...register('metaKeywords')}
                  className="w-full  border border-black/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9a5d3b]"
                  placeholder="electronics, gadgets, devices"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-black/15 pt-4">
            <button
              className=" border border-black/20 px-4 py-2 text-black/70 hover:bg-[#f1f1f1]"
              type="button"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="flex items-center gap-2  bg-[#9a5d3b] px-4 py-2 text-white hover:bg-[#754329] disabled:opacity-50"
              disabled={isPending}
              type="submit"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {category ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
        {category ? <CategoryStoryManager categoryId={category.id} /> : null}
      </div>
    </div>
  );
}

function CategoryOption({
  category,
  level = 0,
  currentId,
}: {
  category: CategoryTree;
  level?: number;
  currentId?: string;
}) {
  const disabled = currentId === category.id;

  return (
    <>
      <option disabled={disabled} value={category.id}>
        {'—'.repeat(level)} {category.name}
      </option>
      {category.children?.map((child) => (
        <CategoryOption key={child.id} category={child} currentId={currentId} level={level + 1} />
      ))}
    </>
  );
}
