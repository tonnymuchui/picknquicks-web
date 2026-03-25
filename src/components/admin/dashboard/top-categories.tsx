'use client';

import { TrendingUp } from 'lucide-react';

import type { CategorySalesData } from '@/types/admin';

interface TopCategoriesProps {
  data: CategorySalesData[];
}

export function TopCategories({ data }: TopCategoriesProps) {
  const sorted = [...data].sort((a, b) => b.sales - a.sales);

  return (
    <div className="rounded-xl md:rounded-2xl border border-gray-800 bg-gray-900 p-4 md:p-6 shadow-sm">
      <h3 className="text-base md:text-lg font-semibold text-white">Top Categories</h3>
      <p className="mt-1 text-xs md:text-sm text-gray-500">By sales performance</p>

      <div className="mt-6 space-y-3 md:space-y-4">
        {sorted.map((item, index) => (
          <div key={item.category} className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800 text-xs font-semibold text-white">
                {index + 1}
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium text-white">{item.category}</p>
                <p className="text-xs text-gray-500">KSH {(item.sales / 1000).toFixed(1)}k</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-emerald-400 text-xs md:text-sm font-semibold">
                <TrendingUp size={14} />
                {item.percentage}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
