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

  const handleClose = () => {
    reset();
    setLogoFile(null);
    setBannerFile(null);
    onClose();
  };

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
    } else {
      reset({
        active: true,
        featured: false,
        displayOrder: 0,
      });
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
            handleClose();
          },
        }
      );
    } else {
      createBrand.mutate(input, {
        onSuccess: () => {
          handleClose();
        },
      });
    }
  };

  if (!isOpen) {
    return null;
  }

  const isPending = createBrand.isPending || updateBrand.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto border border-black/20 bg-white">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/10 bg-white p-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#9a5d3b]">
              Catalog
            </p>
            <h2 className="mt-1 text-xl font-semibold text-black">
              {brand ? 'Edit brand' : 'Add brand'}
            </h2>
          </div>
          <button
            aria-label="Close"
            className="p-1 text-black/45 transition-colors hover:bg-[#f1f1f1] hover:text-black"
            onClick={handleClose}
          >
            <X size={24} />
          </button>
        </div>

        <form className="space-y-6 p-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-black/70">Brand name</label>
                <input
                  {...nameField}
                  className="w-full border border-black/20 bg-white px-3 py-2.5 text-black placeholder:text-black/35 focus:border-[#9a5d3b] focus:outline-none"
                  placeholder="Brand name"
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
                  <p className="mt-1 text-sm text-red-700">{errors.name.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black/70">Slug</label>
                <input
                  {...register('slug')}
                  className="w-full border border-black/20 bg-white px-3 py-2.5 text-black placeholder:text-black/35 focus:border-[#9a5d3b] focus:outline-none"
                  placeholder="apple"
                  type="text"
                />
                {errors.slug ? (
                  <p className="mt-1 text-sm text-red-700">{errors.slug.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black/70">Description</label>
                <textarea
                  {...register('description')}
                  className="w-full border border-black/20 bg-white px-3 py-2.5 text-black placeholder:text-black/35 focus:border-[#9a5d3b] focus:outline-none"
                  placeholder="Describe the maker and its products"
                  rows={4}
                />
                {errors.description ? (
                  <p className="mt-1 text-sm text-red-700">{errors.description.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black/70">Website URL</label>
                <input
                  {...register('websiteUrl')}
                  className="w-full border border-black/20 bg-white px-3 py-2.5 text-black placeholder:text-black/35 focus:border-[#9a5d3b] focus:outline-none"
                  placeholder="https://example.com"
                  type="url"
                />
                {errors.websiteUrl ? (
                  <p className="mt-1 text-sm text-red-700">{errors.websiteUrl.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black/70">
                  Country of origin
                </label>
                <input
                  {...register('countryOfOrigin')}
                  className="w-full border border-black/20 bg-white px-3 py-2.5 text-black placeholder:text-black/35 focus:border-[#9a5d3b] focus:outline-none"
                  list="countries"
                  placeholder="USA"
                />
                <datalist id="countries">
                  {countries?.map((country) => (
                    <option key={country} value={country} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black/70">
                  Display order
                </label>
                <input
                  {...register('displayOrder', { valueAsNumber: true })}
                  className="w-full border border-black/20 bg-white px-3 py-2.5 text-black placeholder:text-black/35 focus:border-[#9a5d3b] focus:outline-none"
                  min="0"
                  type="number"
                />
              </div>

              <div className="flex gap-4">
                <label className="flex cursor-pointer items-center">
                  <input
                    {...register('active')}
                    className="h-4 w-4 accent-[#9a5d3b]"
                    type="checkbox"
                  />
                  <span className="ml-2 text-sm text-black/70">Active</span>
                </label>

                <label className="flex cursor-pointer items-center">
                  <input
                    {...register('featured')}
                    className="h-4 w-4 accent-[#9a5d3b]"
                    type="checkbox"
                  />
                  <span className="ml-2 text-sm text-black/70">Featured</span>
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

          <div className="border-t border-black/10 pt-6">
            <h3 className="mb-4 text-sm font-semibold text-black">Search details</h3>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-black/70">Page title</label>
                <input
                  {...register('metaTitle')}
                  className="w-full border border-black/20 bg-white px-3 py-2.5 text-black focus:border-[#9a5d3b] focus:outline-none"
                  type="text"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black/70">
                  Page description
                </label>
                <textarea
                  {...register('metaDescription')}
                  className="w-full border border-black/20 bg-white px-3 py-2.5 text-black focus:border-[#9a5d3b] focus:outline-none"
                  rows={2}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black/70">
                  Search keywords
                </label>
                <input
                  {...register('metaKeywords')}
                  className="w-full border border-black/20 bg-white px-3 py-2.5 text-black placeholder:text-black/35 focus:border-[#9a5d3b] focus:outline-none"
                  placeholder="workspace, monitor, desk"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-black/10 pt-4">
            <button
              className="border border-black/20 px-4 py-2 text-sm font-medium text-black/70 transition-colors hover:bg-[#f1f1f1]"
              type="button"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="flex items-center gap-2 bg-[#9a5d3b] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#754329] disabled:opacity-50"
              disabled={isPending}
              type="submit"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {brand ? 'Save changes' : 'Add brand'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
