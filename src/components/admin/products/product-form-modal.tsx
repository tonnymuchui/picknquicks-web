'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { X, Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useActiveBrands } from '@/lib/brand/brands.queries';
import { useCategories } from '@/lib/category/categories.queries';
import { useCreateProduct, useUpdateProduct } from '@/lib/product/products.mutations';
import { productSchema } from '@/lib/schemas/productSchema';

import type { Product } from '@/types/product';
import type { z } from 'zod';

type ProductFormInput = z.infer<typeof productSchema>;

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
}

export function ProductFormModal({ isOpen, onClose, product }: ProductFormModalProps) {
  const { data: categories } = useCategories();
  const { data: brands } = useActiveBrands();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ProductFormInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      active: true,
      featured: false,
      isDigital: false,
      requiresShipping: true,
      displayOrder: 0,
      stockQuantity: 0,
      lowStockThreshold: 10,
      taxRate: 16,
    },
  });

  // Auto-generate slug from name for new products
  // eslint-disable-next-line react-hooks/incompatible-library
  const name = watch('name');
  // Track digital product status for conditional shipping field
  const isDigital = watch('isDigital');

  useEffect(() => {
    if (name && !product) {
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setValue('slug', slug);
    }
  }, [name, product, setValue]);

  useEffect(() => {
    setValue('requiresShipping', !isDigital);
  }, [isDigital, setValue]);

  const onSubmit = (data: ProductFormInput) => {
    const input = {
      ...data,
      salePrice: data.salePrice && data.salePrice > 0 ? data.salePrice : undefined,
      costPrice: data.costPrice && data.costPrice > 0 ? data.costPrice : undefined,
      taxRate: data.taxRate && data.taxRate > 0 ? data.taxRate : undefined,
      brandId: data.brandId || undefined,
      stockQuantity: data.stockQuantity || 0,
      lowStockThreshold: data.lowStockThreshold || 10,
      weightGrams: data.weightGrams && data.weightGrams > 0 ? data.weightGrams : undefined,
      dimensions: data.dimensions || undefined,
      displayOrder: data.displayOrder || 0,
      description: data.description || undefined,
      shortDescription: data.shortDescription || undefined,
      metaTitle: data.metaTitle || undefined,
      metaDescription: data.metaDescription || undefined,
      metaKeywords: data.metaKeywords || undefined,
    };

    if (product) {
      updateProduct.mutate(
        { id: product.id, input },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        }
      );
    } else {
      createProduct.mutate(input, {
        onSuccess: () => {
          reset();
          onClose();
        },
      });
    }
  };

  if (!isOpen) {
    return null;
  }

  const isPending = createProduct.isPending || updateProduct.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="mx-4 max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-lg bg-white shadow-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white p-6">
          <h2 className="text-xl font-bold text-gray-900">
            {product ? 'Edit Product' : 'Create Product'}
          </h2>
          <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form className="space-y-6 p-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Product Name *
                </label>
                <input
                  {...register('name')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Apple MacBook Pro 16 inch"
                  type="text"
                />
                {errors.name ? (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Slug *</label>
                <input
                  {...register('slug')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="apple-macbook-pro-16"
                  type="text"
                />
                {errors.slug ? (
                  <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">SKU *</label>
                <input
                  {...register('sku')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="APPLE-MBP16-2024"
                  type="text"
                />
                {errors.sku ? (
                  <p className="mt-1 text-sm text-red-600">{errors.sku.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Category *</label>
                <select
                  {...register('categoryId')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  {categories?.content?.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId ? (
                  <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Brand</label>
                <select
                  {...register('brandId')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">No brand</option>
                  {brands?.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Price *</label>
                  <input
                    {...register('price', { valueAsNumber: true })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0.01"
                    placeholder="999.99"
                    step="0.01"
                    type="number"
                  />
                  {errors.price ? (
                    <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                  ) : null}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Sale Price</label>
                  <input
                    {...register('salePrice', { valueAsNumber: true })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    placeholder="799.99"
                    step="0.01"
                    type="number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Stock Quantity
                  </label>
                  <input
                    {...register('stockQuantity', { valueAsNumber: true })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    placeholder="50"
                    type="number"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Low Stock Alert
                  </label>
                  <input
                    {...register('lowStockThreshold', { valueAsNumber: true })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    placeholder="10"
                    type="number"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Short Description
                </label>
                <textarea
                  {...register('shortDescription')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief product description..."
                  rows={3}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Full Description
                </label>
                <textarea
                  {...register('description')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Detailed product description..."
                  rows={6}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Weight (grams)
                  </label>
                  <input
                    {...register('weightGrams', { valueAsNumber: true })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    placeholder="500"
                    type="number"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Dimensions</label>
                  <input
                    {...register('dimensions')}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="20 x 15 x 5 cm"
                    type="text"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="flex cursor-pointer items-center">
                  <input
                    {...register('active')}
                    className="h-4 w-4 rounded text-blue-600"
                    type="checkbox"
                  />
                  <span className="ml-2 text-sm text-gray-700">Active</span>
                </label>

                <label className="flex cursor-pointer items-center">
                  <input
                    {...register('featured')}
                    className="h-4 w-4 rounded text-blue-600"
                    type="checkbox"
                  />
                  <span className="ml-2 text-sm text-gray-700">Featured</span>
                </label>

                <label className="flex cursor-pointer items-center">
                  <input
                    {...register('isDigital')}
                    className="h-4 w-4 rounded text-blue-600"
                    type="checkbox"
                  />
                  <span className="ml-2 text-sm text-gray-700">Digital Product</span>
                </label>

                {!isDigital ? (
                  <label className="flex cursor-pointer items-center">
                    <input
                      {...register('requiresShipping')}
                      className="h-4 w-4 rounded text-blue-600"
                      type="checkbox"
                    />
                    <span className="ml-2 text-sm text-gray-700">Requires Shipping</span>
                  </label>
                ) : null}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="mb-4 text-sm font-semibold text-gray-900">SEO Settings</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Meta Title</label>
                <input
                  {...register('metaTitle')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Meta Description
                </label>
                <textarea
                  {...register('metaDescription')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Meta Keywords
                </label>
                <input
                  {...register('metaKeywords')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="laptop, apple, macbook"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-4">
            <button
              className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
              disabled={isPending}
              type="submit"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {product ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
