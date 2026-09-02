'use client';

import { Plus, Edit, Trash2, Loader2, Search, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { BrandFormModal } from '@/components/admin/brand/brand-form-modal';
import { BrandImageManager } from '@/components/admin/brand/brand-image-manager';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { useDeleteBrand } from '@/lib/brand/brands.mutations';
import { useBrands } from '@/lib/brand/brands.queries';
import { resolveMediaUrl } from '@/lib/utils/media';
import { UserRole } from '@/types/auth';

import type { Brand } from '@/types/brand';

export default function AdminBrandsPage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const { data: brandsData, isLoading } = useBrands({ page, size: 20 });
  const deleteBrand = useDeleteBrand();

  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | undefined>();

  const handleCreate = () => {
    setEditingBrand(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (brand: Brand) => {
    setEditingBrand(brand);
    setIsFormOpen(true);
  };

  const handleDelete = (brand: Brand) => {
    if (brand.productCount > 0) {
      alert(`Cannot delete brand with ${brand.productCount} products. Remove products first.`);
      return;
    }
    if (confirm(`Delete "${brand.name}"? This action cannot be undone.`)) {
      deleteBrand.mutate(brand.id);
      if (selectedBrand?.id === brand.id) {
        setSelectedBrand(null);
      }
    }
  };

  return (
    <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
      <div className="min-h-screen bg-white p-4 sm:p-7 xl:p-9">
        <div className="space-y-7">
          <div className="flex flex-col justify-between gap-5 border-b border-black/10 pb-7 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-[#9a5d3b]">Catalog</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-.045em] text-black sm:text-4xl">
                Brands
              </h1>
              <p className="mt-2 text-sm text-black/50">Organise makers and product collections.</p>
            </div>
            <button
              className="flex h-11 items-center gap-2 bg-[#9a5d3b] px-5 text-sm font-semibold text-white hover:bg-[#754329]"
              onClick={handleCreate}
            >
              <Plus size={20} />
              Add brand
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-7 w-7 animate-spin text-black/45" />
            </div>
          ) : (
            <div className={`grid grid-cols-1 gap-6 ${selectedBrand ? 'lg:grid-cols-3' : ''}`}>
              <div
                className={`border border-black/15 bg-white ${selectedBrand ? 'lg:col-span-2' : ''}`}
              >
                <div className="border-b border-black/10 p-4">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-black/35"
                      size={20}
                    />
                    <input
                      className="w-full border border-black/20 bg-white py-2.5 pl-10 pr-4 text-sm text-black placeholder:text-black/35 focus:border-[#9a5d3b] focus:outline-none"
                      placeholder="Search brands"
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="divide-y divide-black/10">
                  {brandsData?.content.map((brand: Brand) => (
                    <div
                      key={brand.id}
                      className={`cursor-pointer p-4 transition-colors hover:bg-[#f1f1f1] ${
                        selectedBrand?.id === brand.id
                          ? 'border-l-2 border-[#9a5d3b] bg-[#f1f1f1]'
                          : ''
                      }`}
                      onClick={() => setSelectedBrand(brand)}
                    >
                      <div className="flex items-start gap-4">
                        {brand.logoUrl ? (
                          <Image
                            alt={brand.name}
                            className="h-16 w-16 flex-shrink-0 border border-black/10 bg-white object-contain p-2"
                            height={64}
                            src={resolveMediaUrl(brand.logoUrl) || brand.logoUrl}
                            width={64}
                          />
                        ) : (
                          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center border border-black/10 bg-[#f1f1f1] font-serif text-2xl text-black/45">
                            {brand.name[0]}
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-black">{brand.name}</h3>
                            {brand.featured ? (
                              <span className="text-[10px] font-semibold uppercase tracking-wide text-black/45">
                                Featured
                              </span>
                            ) : null}
                            {!brand.active ? (
                              <span className="border border-black/10 bg-[#f1f1f1] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-black/55">
                                Inactive
                              </span>
                            ) : null}
                          </div>
                          {brand.description ? (
                            <p className="mt-1 line-clamp-2 text-sm text-black/55">
                              {brand.description}
                            </p>
                          ) : null}
                          <div className="mt-2 flex items-center gap-4 text-xs text-black/40">
                            {brand.countryOfOrigin ? <span>{brand.countryOfOrigin}</span> : null}
                            <span>{brand.productCount} products</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            aria-label={`Edit ${brand.name}`}
                            className="p-2 text-black/55 transition-colors hover:bg-[#f1f1f1] hover:text-black"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(brand);
                            }}
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            aria-label={`Delete ${brand.name}`}
                            className="p-2 text-red-700 transition-colors hover:bg-red-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(brand);
                            }}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {brandsData && brandsData.totalPages > 1 ? (
                  <div className="flex items-center justify-between border-t border-black/10 p-4">
                    <div className="text-sm text-black/50">
                      Page {page + 1} of {brandsData.totalPages}
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="border border-black/20 px-3 py-1.5 text-sm text-black/70 transition-colors hover:bg-[#f1f1f1] disabled:opacity-30"
                        disabled={page === 0}
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                      >
                        Previous
                      </button>
                      <button
                        className="border border-black/20 px-3 py-1.5 text-sm text-black/70 transition-colors hover:bg-[#f1f1f1] disabled:opacity-30"
                        disabled={page === brandsData.totalPages - 1}
                        onClick={() => setPage((p) => Math.min(brandsData.totalPages - 1, p + 1))}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>

              {selectedBrand ? (
                <aside className="border border-black/10 bg-[#f1f1f1] p-6 lg:col-span-1">
                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[.15em] text-black/40">
                        Brand details
                      </p>
                      <h2 className="mt-2 text-xl font-semibold text-black">
                        {selectedBrand.name}
                      </h2>
                      {selectedBrand.description ? (
                        <p className="mt-2 text-sm leading-6 text-black/55">
                          {selectedBrand.description}
                        </p>
                      ) : null}
                    </div>

                    <div className="grid grid-cols-2 gap-5 border-b border-black/10 pb-6">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-black/40">
                          Slug
                        </p>
                        <p className="mt-1 text-sm text-black">{selectedBrand.slug}</p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-black/40">
                          Country
                        </p>
                        <p className="mt-1 text-sm text-black">
                          {selectedBrand.countryOfOrigin || 'Not set'}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-black/40">
                          Products
                        </p>
                        <p className="mt-1 text-sm text-black">{selectedBrand.productCount}</p>
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-black/40">
                          Display order
                        </p>
                        <p className="mt-1 text-sm text-black">{selectedBrand.displayOrder}</p>
                      </div>
                    </div>

                    {selectedBrand.websiteUrl ? (
                      <a
                        className="flex items-center gap-2 text-sm font-semibold text-[#9a5d3b] underline underline-offset-4 hover:text-[#754329]"
                        href={selectedBrand.websiteUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <ExternalLink size={16} />
                        Visit website
                      </a>
                    ) : null}

                    <BrandImageManager
                      bannerUrl={selectedBrand.bannerUrl}
                      brandId={selectedBrand.id}
                      logoUrl={selectedBrand.logoUrl}
                    />
                  </div>
                </aside>
              ) : null}
            </div>
          )}
        </div>
      </div>

      <BrandFormModal
        brand={editingBrand}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </ProtectedRoute>
  );
}
