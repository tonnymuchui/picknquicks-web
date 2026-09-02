'use client';

import { Plus, Edit, Trash2, Loader2, Search, Package, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';

import { ProductFormModal } from '@/components/admin/products/product-form-modal';
import { ProductImageManager } from '@/components/admin/products/product-image-manager';
import { StockUpdateModal } from '@/components/admin/products/stock-update-modal';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { useAuth } from '@/lib/auth/hooks';
import { useDeleteProduct } from '@/lib/product/products.mutations';
import { useProduct, useProducts } from '@/lib/product/products.queries';
import { formatPriceKsh } from '@/lib/utils/currency';
import { resolveMediaUrl } from '@/lib/utils/media';
import { UserRole } from '@/types/auth';

import type { Product } from '@/types/product';

export default function AdminProductsPage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const { data: productsData, isLoading } = useProducts({ page, size: 20 });
  const { hasAnyRole } = useAuth();
  const deleteProduct = useDeleteProduct();
  const canManageCatalog = hasAnyRole(UserRole.ADMIN, UserRole.MANAGER);

  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const { data: selectedProductDetails } = useProduct(selectedProductId ?? '');
  const selectedProduct =
    selectedProductDetails ??
    productsData?.content.find((product) => product.id === selectedProductId) ??
    null;
  const totalPages = productsData?.totalPages ?? 0;
  const hasMultiplePages = totalPages > 1;
  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return productsData?.content ?? [];
    }
    return (productsData?.content ?? []).filter((product) =>
      [product.name, product.sku, product.categoryName, product.brandName].some((value) =>
        value?.toLowerCase().includes(query)
      )
    );
  }, [productsData?.content, search]);

  const handleCreate = () => {
    setEditingProduct(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (product: Product) => {
    if (confirm(`Delete "${product.name}"? This action cannot be undone.`)) {
      deleteProduct.mutate(product.id);
      if (selectedProductId === product.id) {
        setSelectedProductId(null);
      }
    }
  };

  const handleStockUpdate = (product: Product) => {
    setSelectedProductId(product.id);
    setIsStockModalOpen(true);
  };

  const getStockBadge = (product: Product) => {
    if (product.stockQuantity === 0) {
      return (
        <span className=" bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
          Out of Stock
        </span>
      );
    }
    if (product.lowStock) {
      return (
        <span className=" bg-[#f1f1f1] px-2 py-0.5 text-xs font-medium text-black/60">
          Low Stock
        </span>
      );
    }
    return (
      <span className=" bg-[#f1f1f1] px-2 py-0.5 text-xs font-medium text-black/60">In Stock</span>
    );
  };

  return (
    <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF]}>
      <div className="min-h-screen bg-white">
        <div className="px-4 py-7 sm:px-7 xl:px-9">
          <div className="mb-7 flex flex-col justify-between gap-5 border-b border-black/10 pb-7 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-[#9a5d3b]">Catalog</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-.045em] text-black sm:text-4xl">
                Products
              </h1>
              <p className="mt-2 text-sm text-black/50">
                {productsData?.totalElements || 0} products in the store catalog
              </p>
            </div>
            {canManageCatalog ? (
              <button
                className="flex h-11 items-center gap-2 bg-[#9a5d3b] px-5 text-sm font-semibold text-white hover:bg-[#754329]"
                onClick={handleCreate}
              >
                <Plus size={20} />
                Add product
              </button>
            ) : null}
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-black/60" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="border border-black/10 bg-white lg:col-span-2">
                <div className="border-b border-black/15 p-4">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-black/45"
                      size={20}
                    />
                    <input
                      className="w-full  border border-black/20 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#9a5d3b]"
                      placeholder="Search products..."
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {visibleProducts.map((product) => (
                    <div
                      key={product.id}
                      className={`cursor-pointer p-4 transition-colors hover:bg-[#f1f1f1] ${
                        selectedProduct?.id === product.id ? 'bg-[#f1f1f1]' : ''
                      }`}
                      onClick={() => setSelectedProductId(product.id)}
                    >
                      <div className="flex items-start gap-4">
                        {(() => {
                          const imageUrl = resolveMediaUrl(product.primaryImageUrl);
                          return imageUrl ? (
                            <Image
                              alt={product.name}
                              className="h-20 w-20  border border-black/15 bg-white object-contain"
                              height={80}
                              src={imageUrl}
                              width={80}
                            />
                          ) : (
                            <div className="flex h-20 w-20 items-center justify-center  bg-gray-100">
                              <Package className="text-black/45" size={32} />
                            </div>
                          );
                        })()}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <h3 className="truncate text-lg font-semibold text-black">
                                {product.name}
                              </h3>
                              <p className="truncate text-sm text-black/65">SKU: {product.sku}</p>
                            </div>

                            <div className="flex flex-col items-end gap-1">
                              {getStockBadge(product) || null}
                              {product.featured ? (
                                <span className="bg-[#f1f1f1] px-2 py-0.5 text-xs text-black/60">
                                  Featured
                                </span>
                              ) : null}
                              {!product.active ? (
                                <span className=" bg-gray-100 px-2 py-0.5 text-xs text-black/65">
                                  Inactive
                                </span>
                              ) : null}
                            </div>
                          </div>

                          <div className="mt-2 flex items-center gap-4 text-sm">
                            <div className="font-semibold text-black">
                              {formatPriceKsh(product.effectivePrice)}
                              {product.salePrice ? (
                                <span className="ml-2 font-normal text-black/45 line-through">
                                  {formatPriceKsh(product.price)}
                                </span>
                              ) : null}
                            </div>
                            <div className="text-black/65">Stock: {product.stockQuantity}</div>
                            {product.categoryName ? (
                              <div className="text-black/45">{product.categoryName}</div>
                            ) : null}
                            {product.brandName ? (
                              <div className="text-black/45">{product.brandName}</div>
                            ) : null}
                          </div>

                          {product.averageRating && product.averageRating > 0 ? (
                            <div className="mt-1 flex items-center gap-1 text-sm text-black/65">
                              <span>Rating {product.averageRating.toFixed(1)}</span>
                              <span className="text-black/45">({product.reviewCount})</span>
                            </div>
                          ) : null}
                        </div>

                        {canManageCatalog ? (
                          <div className="flex gap-2">
                            <button
                              aria-label={`Edit ${product.name}`}
                              className=" p-2 text-black/60 hover:bg-[#f1f1f1]"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(product);
                              }}
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              aria-label={`Delete ${product.name}`}
                              className=" p-2 text-red-600 hover:bg-red-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(product);
                              }}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        ) : null}
                      </div>

                      {product.lowStock ? (
                        <div className="mt-2 flex items-center gap-2 text-sm text-black/60">
                          <AlertTriangle size={16} />
                          <span>Low stock alert - only {product.stockQuantity} remaining</span>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>

                {hasMultiplePages ? (
                  <div className="flex items-center justify-between border-t border-black/15 p-4">
                    <div className="text-sm text-black/70">
                      Page {page + 1} of {totalPages}
                    </div>
                    <div className="flex gap-2">
                      <button
                        className=" border border-black/20 px-3 py-1 text-sm disabled:opacity-50"
                        disabled={page === 0}
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                      >
                        Previous
                      </button>
                      <button
                        className=" border border-black/20 px-3 py-1 text-sm disabled:opacity-50"
                        disabled={page === totalPages - 1}
                        onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="border border-black/10 bg-[#f1f1f1] p-6 lg:col-span-1">
                {selectedProduct ? (
                  <div className="space-y-6">
                    <div>
                      <h2 className="mb-2 text-xl font-bold text-black">
                        {selectedProduct.name || 'Product'}
                      </h2>
                      <p className="text-sm text-black/65">
                        {selectedProduct.shortDescription || 'No description'}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-b border-black/15 pb-6">
                      <div>
                        <label className="text-sm font-medium text-black/70">SKU</label>
                        <p className="text-black">{selectedProduct.sku || 'N/A'}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-black/70">Category</label>
                        <p className="text-black">{selectedProduct.categoryName || 'N/A'}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-black/70">Brand</label>
                        <p className="text-black">{selectedProduct.brandName || 'N/A'}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-black/70">Stock</label>
                        <p className="text-black">{selectedProduct.stockQuantity}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-black/70">Price</label>
                        <p className="text-black">{formatPriceKsh(selectedProduct.price)}</p>
                      </div>

                      {selectedProduct.salePrice ? (
                        <div>
                          <label className="text-sm font-medium text-black/70">Sale Price</label>
                          <p className="font-semibold text-black/60">
                            {formatPriceKsh(selectedProduct.salePrice)}
                          </p>
                        </div>
                      ) : null}
                    </div>

                    <button
                      className="flex w-full items-center justify-center gap-2 bg-black px-4 py-2.5 text-white hover:bg-black/80"
                      onClick={() => handleStockUpdate(selectedProduct)}
                    >
                      <Package size={18} />
                      Update Stock
                    </button>

                    {canManageCatalog ? (
                      <ProductImageManager
                        images={selectedProduct.images}
                        productId={selectedProduct.id}
                      />
                    ) : null}
                  </div>
                ) : (
                  <div className="flex h-64 items-center justify-center text-black/45">
                    Select a product to view details
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {canManageCatalog ? (
        <ProductFormModal
          isOpen={isFormOpen}
          product={editingProduct}
          onClose={() => setIsFormOpen(false)}
        />
      ) : null}

      {selectedProduct !== null ? (
        <StockUpdateModal
          isOpen={isStockModalOpen}
          product={selectedProduct}
          onClose={() => setIsStockModalOpen(false)}
        />
      ) : null}
    </ProtectedRoute>
  );
}
