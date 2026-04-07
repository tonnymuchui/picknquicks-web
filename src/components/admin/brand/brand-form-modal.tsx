'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { X, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FileUpload } from '@/components/common/file-upload';
import { useUpdateBrand, useCreateBrand } from '@/lib/brand/brands.mutations';
import { useBrandCountries } from '@/lib/brand/brands.queries';
import { brandSchema } from '@/lib/schemas/brand.schema';

import type { Brand } from '@/types/brand';
import type { z } from 'zod';

type BrandFormInput = z.infer<typeof brandSchema>;

interface BrandFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand?: Brand;
}

export function BrandFormModal({ isOpen, onClose, brand }: BrandFormModalProps) {
  const { data: countries } = useBrandCountries();
  const createBrand = useCreateBrand();
  const updateBrand = useUpdateBrand();

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<BrandFormInput>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      active: true,
      featured: false,
      displayOrder: 0,
    },
  });

  const nameField = register('name');

  useEffect(() => {
    if (brand) {
      reset({
        name: brand.name,
        slug: brand.slug,
        description: brand.description || '',
        logoUrl: brand.logoUrl || '',
        bannerUrl: brand.bannerUrl || '',
        websiteUrl: brand.websiteUrl || '',
        countryOfOrigin: brand.countryOfOrigin || '',
        displayOrder: brand.displayOrder,
        active: brand.active,
        featured: brand.featured,
        metaTitle: brand.metaTitle || '',
        metaDescription: brand.metaDescription || '',
        metaKeywords: brand.metaKeywords || '',
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLogoFile(null);
      setBannerFile(null);
    } else {
      reset({
        active: true,
        featured: false,
        displayOrder: 0,
      });
      setLogoFile(null);
      setBannerFile(null);
    }
  }, [brand, reset]);

  const onSubmit = (data: BrandFormInput) => {
    const input = {
      ...data,
      logoFile: logoFile || undefined,
      bannerFile: bannerFile || undefined,
      logoUrl: !logoFile ? data.logoUrl || undefined : undefined,
      bannerUrl: !bannerFile ? data.bannerUrl || undefined : undefined,
      description: data.description || undefined,
      websiteUrl: data.websiteUrl || undefined,
      countryOfOrigin: data.countryOfOrigin || undefined,
      metaTitle: data.metaTitle || undefined,
      metaDescription: data.metaDescription || undefined,
      metaKeywords: data.metaKeywords || undefined,
    };

    if (brand) {
      updateBrand.mutate(
        { id: brand.id, input },
        {
          onSuccess: () => {
            reset();
            setLogoFile(null);
            setBannerFile(null);
            onClose();
          },
        }
      );
    } else {
      createBrand.mutate(input, {
        onSuccess: () => {
          reset();
          setLogoFile(null);
          setBannerFile(null);
          onClose();
        },
      });
    }
  };

  if (!isOpen) {
    return null;
  }

  const isPending = createBrand.isPending || updateBrand.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="mx-4 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-gray-800 bg-gray-900 shadow-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-800 bg-gray-900/95 p-6">
          <h2 className="text-xl font-bold text-white">{brand ? 'Edit Brand' : 'Create Brand'}</h2>
          <button className="text-gray-500 transition-colors hover:text-gray-300" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form className="space-y-6 p-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">Brand Name</label>
                <input
                  {...nameField}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Apple"
                  style={{ WebkitTextFillColor: 'white' }}
                  type="text"
                  onChange={(e) => {
                    nameField.onChange(e);
                    if (!brand) {
                      const slug = e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/^-|-$/g, '');
                      setValue('slug', slug);
                    }
                  }}
                />
                {errors.name ? (
                  <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">Slug</label>
                <input
                  {...register('slug')}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="apple"
                  style={{ WebkitTextFillColor: 'white' }}
                  type="text"
                />
                {errors.slug ? (
                  <p className="mt-1 text-sm text-red-400">{errors.slug.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">Description</label>
                <textarea
                  {...register('description')}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Brand description..."
                  rows={4}
                  style={{ WebkitTextFillColor: 'white' }}
                />
                {errors.description ? (
                  <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">Website URL</label>
                <input
                  {...register('websiteUrl')}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="https://www.apple.com"
                  style={{ WebkitTextFillColor: 'white' }}
                  type="url"
                />
                {errors.websiteUrl ? (
                  <p className="mt-1 text-sm text-red-400">{errors.websiteUrl.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">
                  Country of Origin
                </label>
                <input
                  {...register('countryOfOrigin')}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  list="countries"
                  placeholder="USA"
                  style={{ WebkitTextFillColor: 'white' }}
                />
                <datalist id="countries">
                  {countries?.map((country) => (
                    <option key={country} value={country} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">
                  Display Order
                </label>
                <input
                  {...register('displayOrder', { valueAsNumber: true })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  min="0"
                  style={{ WebkitTextFillColor: 'white' }}
                  type="number"
                />
              </div>

              <div className="flex gap-4">
                <label className="flex cursor-pointer items-center">
                  <input
                    {...register('active')}
                    className="h-4 w-4 rounded text-purple-600"
                    type="checkbox"
                  />
                  <span className="ml-2 text-sm text-gray-300">Active</span>
                </label>

                <label className="flex cursor-pointer items-center">
                  <input
                    {...register('featured')}
                    className="h-4 w-4 rounded text-purple-600"
                    type="checkbox"
                  />
                  <span className="ml-2 text-sm text-gray-300">Featured</span>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <FileUpload
                label="Brand Logo"
                maxSize={5}
                value={logoFile || brand?.logoUrl}
                onChange={setLogoFile}
              />

              <FileUpload
                label="Brand Banner"
                maxSize={5}
                value={bannerFile || brand?.bannerUrl}
                onChange={setBannerFile}
              />
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6">
            <h3 className="mb-4 text-sm font-semibold text-white">SEO Settings</h3>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">Meta Title</label>
                <input
                  {...register('metaTitle')}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  style={{ WebkitTextFillColor: 'white' }}
                  type="text"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">
                  Meta Description
                </label>
                <textarea
                  {...register('metaDescription')}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={2}
                  style={{ WebkitTextFillColor: 'white' }}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">
                  Meta Keywords
                </label>
                <input
                  {...register('metaKeywords')}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="electronics, premium, technology"
                  style={{ WebkitTextFillColor: 'white' }}
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-gray-800 pt-4">
            <button
              className="rounded-lg border border-gray-700 px-4 py-2 text-gray-300 transition-colors hover:bg-gray-800"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700 disabled:opacity-50"
              disabled={isPending}
              type="submit"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {brand ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
