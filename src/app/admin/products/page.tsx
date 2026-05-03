'use client';

import { Plus, Edit, Trash2, Loader2, Search, Package, Star, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import { ProductFormModal } from '@/components/admin/products/product-form-modal';
import { ProductImageManager } from '@/components/admin/products/product-image-manager';
import { StockUpdateModal } from '@/components/admin/products/stock-update-modal';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { useDeleteProduct } from '@/lib/product/products.mutations';
import { useProducts } from '@/lib/product/products.queries';
import { formatPriceKsh } from '@/lib/utils/currency';
import { resolveMediaUrl } from '@/lib/utils/media';
import { UserRole } from '@/types/auth';

import type { Product } from '@/types/product';

export default function AdminProductsPage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const { data: productsData, isLoading } = useProducts({ page, size: 20 });
  const deleteProduct = useDeleteProduct();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const totalPages = productsData?.totalPages ?? 0;
  const hasMultiplePages = totalPages > 1;

  useEffect(() => {
    if (selectedProduct && productsData?.content) {
      const updatedProduct = productsData.content.find((p) => p.id === selectedProduct.id);
      if (updatedProduct && JSON.stringify(updatedProduct) !== JSON.stringify(selectedProduct)) {
        setSelectedProduct(updatedProduct);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsData]);

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
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              onClick={handleCreate}
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
                      className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Search products..."
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {productsData?.content.map((product) => (
                    <div
                      key={product.id}
                      className={`cursor-pointer p-4 transition-colors hover:bg-gray-50 ${
                        selectedProduct?.id === product.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedProduct(product)}
                    >
                      <div className="flex items-start gap-4">
                        {(() => {
                          const imageUrl = resolveMediaUrl(product.primaryImageUrl);
                          return imageUrl ? (
                            <Image
                              alt={product.name}
                              className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-contain"
                              height={80}
                              src={imageUrl}
                              width={80}
                            />
                          ) : (
                            <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100">
                              <Package className="text-gray-400" size={32} />
                            </div>
                          );
                        })()}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <h3 className="truncate text-lg font-semibold text-gray-900">
                                {product.name}
                              </h3>
                              <p className="truncate text-sm text-gray-600">SKU: {product.sku}</p>
                            </div>

                            <div className="flex flex-col items-end gap-1">
                              {getStockBadge(product) || null}
                              {product.featured ? (
                                <span className="flex items-center gap-1 rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">
                                  <Star className="fill-yellow-700" size={12} />
                                  Featured
                                </span>
                              ) : null}
                              {!product.active ? (
                                <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                                  Inactive
                                </span>
                              ) : null}
                            </div>
                          </div>

                          <div className="mt-2 flex items-center gap-4 text-sm">
                            <div className="font-semibold text-gray-900">
                              {formatPriceKsh(product.effectivePrice)}
                              {product.salePrice ? (
                                <span className="ml-2 font-normal text-gray-500 line-through">
                                  {formatPriceKsh(product.price)}
                                </span>
                              ) : null}
                            </div>
                            <div className="text-gray-600">Stock: {product.stockQuantity}</div>
                            {product.categoryName ? (
                              <div className="text-gray-500">{product.categoryName}</div>
                            ) : null}
                            {product.brandName ? (
                              <div className="text-gray-500">{product.brandName}</div>
                            ) : null}
                          </div>

                          {product.averageRating && product.averageRating > 0 ? (
                            <div className="mt-1 flex items-center gap-1 text-sm text-gray-600">
                              <Star className="fill-yellow-500 text-yellow-500" size={14} />
                              <span>{product.averageRating.toFixed(1)}</span>
                              <span className="text-gray-400">({product.reviewCount})</span>
                            </div>
                          ) : null}
                        </div>

                        <div className="flex gap-2">
                          <button
                            className="rounded-md p-2 text-blue-600 hover:bg-blue-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(product);
                            }}
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            className="rounded-md p-2 text-red-600 hover:bg-red-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(product);
                            }}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      {product.lowStock ? (
                        <div className="mt-2 flex items-center gap-2 text-sm text-orange-600">
                          <AlertTriangle size={16} />
                          <span>Low stock alert - only {product.stockQuantity} remaining</span>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>

                {hasMultiplePages ? (
                  <div className="flex items-center justify-between border-t border-gray-200 p-4">
                    <div className="text-sm text-gray-700">
                      Page {page + 1} of {totalPages}
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="rounded-md border border-gray-300 px-3 py-1 text-sm disabled:opacity-50"
                        disabled={page === 0}
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                      >
                        Previous
                      </button>
                      <button
                        className="rounded-md border border-gray-300 px-3 py-1 text-sm disabled:opacity-50"
                        disabled={page === totalPages - 1}
                        onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="rounded-lg bg-white p-6 shadow lg:col-span-1">
                {selectedProduct ? (
                  <div className="space-y-6">
                    <div>
                      <h2 className="mb-2 text-xl font-bold text-gray-900">
                        {selectedProduct.name || 'Product'}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {selectedProduct.shortDescription || 'No description'}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-6">
                      <div>
                        <label className="text-sm font-medium text-gray-700">SKU</label>
                        <p className="text-gray-900">{selectedProduct.sku || 'N/A'}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700">Category</label>
                        <p className="text-gray-900">{selectedProduct.categoryName || 'N/A'}</p>
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

                      {selectedProduct.salePrice ? (
                        <div>
                          <label className="text-sm font-medium text-gray-700">Sale Price</label>
                          <p className="font-semibold text-green-600">
                            {formatPriceKsh(selectedProduct.salePrice)}
                          </p>
                        </div>
                      ) : null}
                    </div>

                    <button
                      className="flex w-full items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                      onClick={() => handleStockUpdate(selectedProduct)}
                    >
                      <Package size={18} />
                      Update Stock
                    </button>

                    <ProductImageManager
                      images={selectedProduct.images}
                      productId={selectedProduct.id}
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
        product={editingProduct}
        onClose={() => setIsFormOpen(false)}
      />

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
