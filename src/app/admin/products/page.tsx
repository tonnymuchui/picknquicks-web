'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { UserRole } from '@/types/auth';
import { ProductFormModal } from '@/components/admin/products/product-form-modal';
import { ProductImageManager } from '@/components/admin/products/product-image-manager';
import { StockUpdateModal } from '@/components/admin/products/stock-update-modal';
import { Plus, Edit, Trash2, Loader2, Search, Package, Star, AlertTriangle } from 'lucide-react';
import type { Product } from '@/types/product';
import Image from 'next/image';
import { useDeleteProduct } from '@/lib/product/products.mutations';
import { useProducts } from '@/lib/product/products.queries';
import { formatPriceKsh } from '@/lib/utils/currency';
import { resolveMediaUrl } from '@/lib/utils/media';

export default function AdminProductsPage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const { data: productsData, isLoading } = useProducts({ page, size: 20 });
  const deleteProduct = useDeleteProduct();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  // Sync selectedProduct with updated data from productsData
  useEffect(() => {
    if (selectedProduct && productsData?.content) {
      const updatedProduct = productsData.content.find((p) => p.id === selectedProduct.id);
      if (updatedProduct) {
        setSelectedProduct(updatedProduct);
      }
    }
  }, [productsData, selectedProduct]);

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
      if (selectedProduct?.id === product.id) {
        setSelectedProduct(null);
      }
    }
  };

  const handleStockUpdate = (product: Product) => {
    setSelectedProduct(product);
    setIsStockModalOpen(true);
  };

  const getStockBadge = (product: Product) => {
    if (product.stockQuantity === 0) {
      return (
        <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
          Out of Stock
        </span>
      );
    }
    if (product.lowStock) {
      return (
        <span className="rounded bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
          Low Stock
        </span>
      );
    }
    return (
      <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
        In Stock
      </span>
    );
  };

  return (
    <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Products</h1>
              <p className="mt-1 text-gray-600">
                {productsData?.totalElements || 0} total products
              </p>
            </div>
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <Plus size={20} />
              Create Product
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="rounded-lg bg-white shadow lg:col-span-2">
                <div className="border-b border-gray-200 p-4">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search products..."
                      className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {productsData?.content.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className={`cursor-pointer p-4 transition-colors hover:bg-gray-50 ${
                        selectedProduct?.id === product.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {resolveMediaUrl(product.primaryImageUrl) ? (
                          <Image
                            src={resolveMediaUrl(product.primaryImageUrl) || '/favicon.ico'}
                            alt={product.name}
                            width={80}
                            height={80}
                            className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-contain"
                          />
                        ) : (
                          <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100">
                            <Package size={32} className="text-gray-400" />
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <h3 className="truncate text-lg font-semibold text-gray-900">
                                {product.name}
                              </h3>
                              <p className="truncate text-sm text-gray-600">SKU: {product.sku}</p>
                            </div>

                            <div className="flex flex-col items-end gap-1">
                              {getStockBadge(product)}
                              {product.featured && (
                                <span className="flex items-center gap-1 rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">
                                  <Star size={12} className="fill-yellow-700" />
                                  Featured
                                </span>
                              )}
                              {!product.active && (
                                <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                                  Inactive
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="mt-2 flex items-center gap-4 text-sm">
                            <div className="font-semibold text-gray-900">
                              {formatPriceKsh(product.effectivePrice)}
                              {product.salePrice && (
                                <span className="ml-2 font-normal text-gray-500 line-through">
                                  {formatPriceKsh(product.price)}
                                </span>
                              )}
                            </div>
                            <div className="text-gray-600">Stock: {product.stockQuantity}</div>
                            {product.categoryName && (
                              <div className="text-gray-500">{product.categoryName}</div>
                            )}
                            {product.brandName && (
                              <div className="text-gray-500">{product.brandName}</div>
                            )}
                          </div>

                          {product.averageRating && product.averageRating > 0 && (
                            <div className="mt-1 flex items-center gap-1 text-sm text-gray-600">
                              <Star size={14} className="fill-yellow-500 text-yellow-500" />
                              <span>{product.averageRating.toFixed(1)}</span>
                              <span className="text-gray-400">({product.reviewCount})</span>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(product);
                            }}
                            className="rounded-md p-2 text-blue-600 hover:bg-blue-50"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(product);
                            }}
                            className="rounded-md p-2 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      {product.lowStock && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-orange-600">
                          <AlertTriangle size={16} />
                          <span>Low stock alert - only {product.stockQuantity} remaining</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {productsData && productsData.totalPages > 1 && (
                  <div className="flex items-center justify-between border-t border-gray-200 p-4">
                    <div className="text-sm text-gray-700">
                      Page {page + 1} of {productsData.totalPages}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        disabled={page === 0}
                        className="rounded-md border border-gray-300 px-3 py-1 text-sm disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setPage((p) => Math.min(productsData.totalPages - 1, p + 1))}
                        disabled={page === productsData.totalPages - 1}
                        className="rounded-md border border-gray-300 px-3 py-1 text-sm disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-lg bg-white p-6 shadow lg:col-span-1">
                {selectedProduct ? (
                  <div className="space-y-6">
                    <div>
                      <h2 className="mb-2 text-xl font-bold text-gray-900">
                        {selectedProduct.name}
                      </h2>
                      <p className="text-sm text-gray-600">{selectedProduct.shortDescription}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-6">
                      <div>
                        <label className="text-sm font-medium text-gray-700">SKU</label>
                        <p className="text-gray-900">{selectedProduct.sku}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700">Category</label>
                        <p className="text-gray-900">{selectedProduct.categoryName}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700">Brand</label>
                        <p className="text-gray-900">{selectedProduct.brandName || 'N/A'}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700">Stock</label>
                        <p className="text-gray-900">{selectedProduct.stockQuantity}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700">Price</label>
                        <p className="text-gray-900">{formatPriceKsh(selectedProduct.price)}</p>
                      </div>

                      {selectedProduct.salePrice && (
                        <div>
                          <label className="text-sm font-medium text-gray-700">Sale Price</label>
                          <p className="font-semibold text-green-600">
                            {formatPriceKsh(selectedProduct.salePrice)}
                          </p>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleStockUpdate(selectedProduct)}
                      className="flex w-full items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                    >
                      <Package size={18} />
                      Update Stock
                    </button>

                    <ProductImageManager
                      productId={selectedProduct.id}
                      images={selectedProduct.images}
                    />
                  </div>
                ) : (
                  <div className="flex h-64 items-center justify-center text-gray-500">
                    Select a product to view details
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <ProductFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        product={editingProduct}
      />

      {selectedProduct && (
        <StockUpdateModal
          isOpen={isStockModalOpen}
          onClose={() => setIsStockModalOpen(false)}
          product={selectedProduct}
        />
      )}
    </ProtectedRoute>
  );
}
