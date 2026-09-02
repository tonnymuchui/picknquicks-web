'use client';

import { Search, X } from 'lucide-react';

import type { OrderFilters, OrderStatus } from '@/types/order';

interface AdminOrderFiltersBarProps {
  filters: OrderFilters;
  onChange: (filters: OrderFilters) => void;
}

const statusOptions: { value: OrderStatus | 'ALL'; label: string }[] = [
  { value: 'ALL', label: 'All Orders' },
  { value: 'AWAITING_PAYMENT', label: 'Awaiting Payment' },
  { value: 'PAYMENT_CONFIRMED', label: 'Payment Confirmed' },
  { value: 'PAYMENT_FAILED', label: 'Payment Failed' },
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'READY_TO_SHIP', label: 'Ready to Ship' },
  { value: 'SHIPPED', label: 'Shipped' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'REFUND_PENDING', label: 'Refund Pending' },
  { value: 'REFUNDED', label: 'Refunded' },
];

export function AdminOrderFiltersBar({ filters, onChange }: AdminOrderFiltersBarProps) {
  const hasActiveFilters =
    (filters.status !== undefined && filters.status !== 'ALL') || Boolean(filters.search);

  return (
    <div className="space-y-4  border border-black/15 bg-white p-4 ">
      <p className="text-xs text-black/45">Filters apply to the currently loaded page.</p>
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/45" size={18} />
          <input
            className="w-full  border border-black/20 py-2 pl-10 pr-4 text-sm focus:border-transparent focus:ring-2 focus:ring-[#9a5d3b]"
            placeholder="Search by order number, email, customer name..."
            type="text"
            value={filters.search ?? ''}
            onChange={(e) => onChange({ ...filters, search: e.target.value || undefined, page: 0 })}
          />
        </div>

        <select
          className=" border border-black/20 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-[#9a5d3b]"
          value={filters.paymentMethod ?? ''}
          onChange={(e) =>
            onChange({
              ...filters,
              paymentMethod: e.target.value as OrderFilters['paymentMethod'],
              page: 0,
            })
          }
        >
          <option value="">All Payment Methods</option>
          <option value="MPESA_FULL">M-Pesa Full</option>
          <option value="CASH_ON_DELIVERY">Cash on Delivery</option>
        </select>

        {hasActiveFilters ? (
          <button
            className="flex items-center gap-1.5  px-3 py-2 text-sm text-black/65 transition-colors hover:bg-red-50 hover:text-red-600"
            onClick={() => onChange({ page: 0, size: filters.size, status: 'ALL' })}
          >
            <X size={16} />
            Clear
          </button>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        {statusOptions.map((opt) => (
          <button
            key={opt.value}
            className={` px-3 py-1.5 text-xs font-medium transition-colors ${
              filters.status === opt.value
                ? 'bg-[#9a5d3b] text-white'
                : 'bg-gray-100 text-black/70 hover:bg-gray-200'
            }`}
            onClick={() => onChange({ ...filters, status: opt.value, page: 0 })}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
