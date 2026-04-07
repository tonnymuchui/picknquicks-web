'use client';
/* eslint-disable @next/next/no-img-element */

import { Plus, Edit, Trash2, Loader2, Search, ExternalLink, Star } from 'lucide-react';
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
      <div className="min-h-screen bg-gray-950 p-4 md:p-8">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Brands</h1>
              <p className="mt-2 text-gray-400">Manage product brands</p>
            </div>
            <button
              className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700"
              onClick={handleCreate}
            >
              <Plus size={20} />
              Create Brand
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </div>
          ) : (
            <div className={`grid grid-cols-1 gap-6 ${selectedBrand ? 'lg:grid-cols-3' : ''}`}>
              <div
                className={`rounded-lg border border-gray-800 bg-gray-900 ${selectedBrand ? 'lg:col-span-2' : ''}`}
              >
                <div className="border-b border-gray-800 p-4">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                      size={20}
                    />
                    <input
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 pl-10 pr-4 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Search brands..."
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="divide-y divide-gray-800">
                  {brandsData?.content.map((brand: Brand) => (
                    <div
                      key={brand.id}
                      className={`cursor-pointer p-4 transition-colors hover:bg-gray-800/50 ${
                        selectedBrand?.id === brand.id
                          ? 'border-l-2 border-purple-500 bg-purple-950/30'
                          : ''
                      }`}
                      onClick={() => setSelectedBrand(brand)}
                    >
                      <div className="flex items-start gap-4">
                        {brand.logoUrl ? (
                          <img
                            alt={brand.name}
                            className="h-16 w-16 flex-shrink-0 rounded-lg border border-gray-700 bg-gray-800 object-contain p-2"
                            src={resolveMediaUrl(brand.logoUrl) || brand.logoUrl}
                          />
                        ) : (
                          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-2xl font-bold text-gray-500">
                            {brand.name[0]}
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-white">{brand.name}</h3>
                            {brand.featured ? (
                              <Star className="fill-yellow-500 text-yellow-500" size={16} />
                            ) : null}
                            {!brand.active ? (
                              <span className="rounded-full bg-gray-700/50 px-2 py-0.5 text-xs text-gray-300">
                                Inactive
                              </span>
                            ) : null}
                          </div>
                          {brand.description ? (
                            <p className="mt-1 line-clamp-2 text-sm text-gray-400">
                              {brand.description}
                            </p>
                          ) : null}
                          <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                            {brand.countryOfOrigin ? <span>{brand.countryOfOrigin}</span> : null}
                            <span>{brand.productCount} products</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            className="rounded-lg p-2 text-purple-400 transition-colors hover:bg-gray-800"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(brand);
                            }}
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            className="rounded-lg p-2 text-red-400 transition-colors hover:bg-gray-800"
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
                  <div className="flex items-center justify-between border-t border-gray-800 p-4">
                    <div className="text-sm text-gray-400">
                      Page {page + 1} of {brandsData.totalPages}
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="rounded-lg border border-gray-700 px-3 py-1 text-sm text-gray-300 transition-colors hover:bg-gray-800 disabled:opacity-30"
                        disabled={page === 0}
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                      >
                        Previous
                      </button>
                      <button
                        className="rounded-lg border border-gray-700 px-3 py-1 text-sm text-gray-300 transition-colors hover:bg-gray-800 disabled:opacity-30"
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
                <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 lg:col-span-1">
                  <div className="space-y-6">
                    <div>
                      <h2 className="mb-2 text-xl font-bold text-white">{selectedBrand.name}</h2>
                      {selectedBrand.description ? (
                        <p className="text-sm text-gray-400">{selectedBrand.description}</p>
                      ) : null}
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-b border-gray-800 pb-6">
                      <div>
                        <label className="text-sm font-medium text-gray-400">Slug</label>
                        <p className="text-white">{selectedBrand.slug}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-400">Country</label>
                        <p className="text-white">{selectedBrand.countryOfOrigin || 'N/A'}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-400">Products</label>
                        <p className="text-white">{selectedBrand.productCount}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-400">Display Order</label>
                        <p className="text-white">{selectedBrand.displayOrder}</p>
                      </div>
                    </div>

                    {selectedBrand.websiteUrl ? (
                      <a
                        className="flex items-center gap-2 text-purple-400 transition-colors hover:text-purple-300"
                        href={selectedBrand.websiteUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <ExternalLink size={16} />
                        Visit Website
                      </a>
                    ) : null}

                    <BrandImageManager
                      bannerUrl={selectedBrand.bannerUrl}
                      brandId={selectedBrand.id}
                      logoUrl={selectedBrand.logoUrl}
                    />
                  </div>
                </div>
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
