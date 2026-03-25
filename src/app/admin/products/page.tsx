'use client';

import { Plus, Search, Filter, Package, Tag, Layers } from 'lucide-react';
import { useState } from 'react';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { UserRole } from '@/types/auth';

export default function AdminProductsPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'brands' | 'categories'>('products');
  const [search, setSearch] = useState('');

  const tabs = [
    { id: 'products', label: 'Products', icon: Package },
    { id: 'brands', label: 'Brands', icon: Tag },
    { id: 'categories', label: 'Categories', icon: Layers },
  ] as const;

  return (
    <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
      <div className="min-h-screen bg-gray-950 p-4 md:p-8">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white md:text-3xl">Products Management</h1>
              <p className="mt-2 text-sm text-gray-400">Manage products, brands & categories</p>
            </div>
            <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-gray-950 transition-colors hover:bg-yellow-300 md:mt-0">
              <Plus size={20} />
              Add New
            </button>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={20}
              />
              <input
                className="w-full rounded-lg border border-gray-700 bg-gray-900 py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                placeholder="Search..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-gray-300 transition-colors hover:bg-gray-800">
              <Filter size={20} />
              Filter
            </button>
          </div>

          <div className="flex gap-1 overflow-x-auto border-b border-gray-800">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  className={`flex items-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'border-b-2 border-yellow-400 text-yellow-400'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {activeTab === 'products' ? (
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-4 shadow-sm md:rounded-2xl md:p-6">
              <div className="flex h-64 items-center justify-center">
                <div className="text-center">
                  <Package className="mx-auto mb-3 h-12 w-12 text-gray-600" />
                  <p className="text-gray-400">Products management coming soon</p>
                </div>
              </div>
            </div>
          ) : null}

          {activeTab === 'brands' ? (
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-4 shadow-sm md:rounded-2xl md:p-6">
              <div className="flex h-64 items-center justify-center">
                <div className="text-center">
                  <Tag className="mx-auto mb-3 h-12 w-12 text-gray-600" />
                  <p className="text-gray-400">Brands management coming soon</p>
                </div>
              </div>
            </div>
          ) : null}

          {activeTab === 'categories' ? (
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-4 shadow-sm md:rounded-2xl md:p-6">
              <div className="text-center">
                <p className="mb-4 text-gray-400">
                  Categories are managed in the dedicated Categories page
                </p>
                <a
                  className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-gray-950 transition-colors hover:bg-yellow-300"
                  href="/admin/categories"
                >
                  <Layers size={18} />
                  Go to Categories
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </ProtectedRoute>
  );
}
