'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { X, Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { useActiveBrands } from '@/lib/brand/brands.queries';
import { useCategoryOptions } from '@/lib/category/categories.queries';
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
  const { data: categories } = useCategoryOptions();
  const { data: brands } = useActiveBrands();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
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

  const name = useWatch({ control, name: 'name' });
  const isDigital = useWatch({ control, name: 'isDigital' });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (product) {
      reset({
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        description: product.description ?? '',
        shortDescription: product.shortDescription ?? '',
        price: product.price,
        salePrice: product.salePrice ?? 0,
        categoryId: product.categoryId ?? '',
        brandId: product.brandId ?? '',
        weightGrams: product.weightGrams ?? 0,
        dimensions: product.dimensions ?? '',
        active: product.active,
        featured: product.featured,
        isDigital: product.isDigital,
        requiresShipping: product.requiresShipping,
        metaTitle: product.metaTitle ?? '',
        metaDescription: product.metaDescription ?? '',
        metaKeywords: product.metaKeywords ?? '',
      });
      return;
    }

    reset({
      active: true,
      featured: false,
      isDigital: false,
      requiresShipping: true,
      displayOrder: 0,
      stockQuantity: 0,
      lowStockThreshold: 10,
      taxRate: 16,
    });
  }, [isOpen, product, reset]);

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
      const updateInput = { ...input, stockQuantity: undefined };
      updateProduct.mutate(
        { id: product.id, input: updateInput },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
      <div className="mx-4 max-h-[90vh] w-full max-w-5xl overflow-y-auto  bg-white ">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/15 bg-white p-6">
          <h2 className="text-xl font-bold text-black">
            {product ? 'Edit Product' : 'Create Product'}
          </h2>
          <button className="text-black/45 hover:text-black/65" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form className="space-y-6 p-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-black/70">Product name</label>
                <input
                  {...register('name')}
                  className="w-full  border border-black/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9a5d3b]"
                  placeholder="Apple MacBook Pro 16 inch"
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
                  placeholder="apple-macbook-pro-16"
                  type="text"
                />
                {errors.slug ? (
                  <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black/70">SKU</label>
                <input
                  {...register('sku')}
                  className="w-full  border border-black/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9a5d3b]"
                  placeholder="APPLE-MBP16-2024"
                  type="text"
                />
                {errors.sku ? (
                  <p className="mt-1 text-sm text-red-600">{errors.sku.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black/70">Category</label>
                <select
                  {...register('categoryId')}
                  className="w-full  border border-black/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9a5d3b]"
                >
                  <option value="">Select category</option>
                  {categories?.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {'— '.repeat(cat.level)}
                      {cat.name}
                      {cat.active ? '' : ' (inactive)'}
                    </option>
                  ))}
                </select>
                {errors.categoryId ? (
                  <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black/70">Brand</label>
                <select
                  {...register('brandId')}
                  className="w-full  border border-black/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9a5d3b]"
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
                  <label className="mb-1 block text-sm font-medium text-black/70">Price</label>
                  <input
                    {...register('price', { valueAsNumber: true })}
                    className="w-full  border border-black/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9a5d3b]"
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
                  <label className="mb-1 block text-sm font-medium text-black/70">Sale Price</label>
                  <input
                    {...register('salePrice', { valueAsNumber: true })}
                    className="w-full  border border-black/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9a5d3b]"
                    min="0"
                    placeholder="799.99"
                    step="0.01"
                    type="number"
                  />
                </div>
              </div>

              <div className={`grid gap-4 ${product ? '' : 'grid-cols-2'}`}>
                {!product ? (
                  <div>
                    <label className="mb-1 block text-sm font-medium text-black/70">
                      Stock Quantity
                    </label>
                    <input
                      {...register('stockQuantity', { valueAsNumber: true })}
                      className="w-full  border border-black/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9a5d3b]"
                      min="0"
                      placeholder="50"
                      type="number"
                    />
                  </div>
                ) : null}

                <div>
                  <label className="mb-1 block text-sm font-medium text-black/70">
                    Low Stock Alert
                  </label>
                  <input
                    {...register('lowStockThreshold', { valueAsNumber: true })}
                    className="w-full  border border-black/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9a5d3b]"
                    min="1"
                    placeholder="10"
                    type="number"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-black/70">
                  Short Description
                </label>
                <textarea
                  {...register('shortDescription')}
                  className="w-full  border border-black/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9a5d3b]"
                  placeholder="Brief product description..."
                  rows={3}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black/70">
                  Full Description
                </label>
                <textarea
                  {...register('description')}
                  className="w-full  border border-black/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9a5d3b]"
                  placeholder="Detailed product description..."
                  rows={6}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-black/70">
                    Weight (grams)
                  </label>
                  <input
                    {...register('weightGrams', { valueAsNumber: true })}
                    className="w-full  border border-black/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9a5d3b]"
                    min="0"
                    placeholder="500"
                    type="number"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-black/70">Dimensions</label>
                  <input
                    {...register('dimensions')}
                    className="w-full  border border-black/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9a5d3b]"
                    placeholder="20 x 15 x 5 cm"
                    type="text"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="flex cursor-pointer items-center">
                  <input
                    {...register('active')}
                    className="h-4 w-4  text-black/60"
                    type="checkbox"
                  />
                  <span className="ml-2 text-sm text-black/70">Active</span>
                </label>

                <label className="flex cursor-pointer items-center">
                  <input
                    {...register('featured')}
                    className="h-4 w-4  text-black/60"
                    type="checkbox"
                  />
                  <span className="ml-2 text-sm text-black/70">Featured</span>
                </label>

                <label className="flex cursor-pointer items-center">
                  <input
                    {...register('isDigital')}
                    className="h-4 w-4  text-black/60"
                    type="checkbox"
                  />
                  <span className="ml-2 text-sm text-black/70">Digital Product</span>
                </label>

                {!isDigital ? (
                  <label className="flex cursor-pointer items-center">
                    <input
                      {...register('requiresShipping')}
                      className="h-4 w-4  text-black/60"
                      type="checkbox"
                    />
                    <span className="ml-2 text-sm text-black/70">Requires Shipping</span>
                  </label>
                ) : null}
              </div>
            </div>
          </div>

          <div className="border-t border-black/15 pt-6">
            <h3 className="mb-4 text-sm font-semibold text-black">SEO Settings</h3>
            <div className="grid grid-cols-1 gap-4">
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
                  placeholder="laptop, apple, macbook"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-black/15 pt-4">
            <button
              className=" border border-black/20 px-4 py-2 text-black/70 hover:bg-[#f1f1f1]"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="flex items-center gap-2  bg-[#9a5d3b] px-4 py-2 text-white hover:bg-[#754329] disabled:opacity-50"
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
