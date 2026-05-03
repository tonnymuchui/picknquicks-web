'use client';

import { Loader2, Grid3x3, List } from 'lucide-react';
import { useState } from 'react';

import { ProductCard } from '@/components/shop/product-card';
import { ProductFilters } from '@/components/shop/product-filters';
import { useActiveProducts } from '@/lib/product/products.queries';

import type { ProductFilters as Filters } from '@/types/product';


export default function ProductsPage() {
  const [page, setPage] = useState(0);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<Filters>({
    page,
    size: 20,
    sortBy: 'createdAt',
    sortDirection: 'DESC',
  });

  const { data: productsData, isLoading } = useActiveProducts(filters);

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters({ ...filters, ...newFilters, page: 0 });
    setPage(0);
  };

  const handleResetFilters = () => {
    setFilters({
      page: 0,
      size: 20,
      sortBy: 'createdAt',
      sortDirection: 'DESC',
    });
    setPage(0);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setFilters({ ...filters, page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">All Products</h1>
            <p className="text-gray-600 mt-2">
              {productsData?.totalElements || 0} products available
            </p>
          </div>

          <div className="flex items-center gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={`${filters.sortBy}-${filters.sortDirection}`}
              onChange={(e) => {
                const [sortBy, sortDirection] = e.target.value.split('-');
                handleFilterChange({ sortBy, sortDirection: sortDirection as 'ASC' | 'DESC' });
              }}
            >
              <option value="createdAt-DESC">Newest First</option>
              <option value="createdAt-ASC">Oldest First</option>
              <option value="price-ASC">Price: Low to High</option>
              <option value="price-DESC">Price: High to Low</option>
              <option value="name-ASC">Name: A to Z</option>
              <option value="name-DESC">Name: Z to A</option>
            </select>

            <div className="flex border border-gray-300 rounded-md overflow-hidden">
              <button
                className={`p-2 ${view === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setView('grid')}
              >
                <Grid3x3 size={20} />
              </button>
              <button
                className={`p-2 ${view === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setView('list')}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <ProductFilters
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </div>

          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : productsData?.content.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found</p>
                <button
                  className="mt-4 text-blue-600 hover:text-blue-700"
                  onClick={handleResetFilters}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <div
                  className={
                    view === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                      : 'space-y-4'
                  }
                >
                  {productsData?.content.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {productsData && productsData.totalPages > 1 ? <div className="mt-8 flex items-center justify-center gap-2">
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={page === 0}
                      onClick={() => handlePageChange(Math.max(0, page - 1))}
                    >
                      Previous
                    </button>

                    <div className="flex items-center gap-2">
                      {[...Array(Math.min(5, productsData.totalPages))].map((_, i) => {
                        const pageNum = page < 3 ? i : page - 2 + i;
                        if (pageNum >= productsData.totalPages) {return null;}

                        return (
                          <button
                            key={pageNum}
                            className={`px-4 py-2 rounded-md ${
                              page === pageNum
                                ? 'bg-blue-600 text-white'
                                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                            onClick={() => handlePageChange(pageNum)}
                          >
                            {pageNum + 1}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={page === productsData.totalPages - 1}
                      onClick={() => handlePageChange(Math.min(productsData.totalPages - 1, page + 1))}
                    >
                      Next
                    </button>
                  </div> : null}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}