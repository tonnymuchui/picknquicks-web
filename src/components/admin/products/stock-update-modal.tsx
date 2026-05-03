'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { X, Loader2, TrendingUp, TrendingDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useUpdateProductStock } from '@/lib/product/products.mutations';

import type { Product } from '@/types/product';

const stockSchema = z.object({
  quantity: z.number().int(),
  reason: z.string().max(255).optional().or(z.literal('')),
});

type StockFormInput = z.infer<typeof stockSchema>;

interface StockUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export function StockUpdateModal({ isOpen, onClose, product }: StockUpdateModalProps) {
  const updateStock = useUpdateProductStock();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<StockFormInput>({
    resolver: zodResolver(stockSchema),
    defaultValues: {
      quantity: 0,
      reason: '',
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const quantity = watch('quantity');
  const newStock = product.stockQuantity + (quantity || 0);

  const onSubmit = (data: StockFormInput) => {
    updateStock.mutate(
      {
        productId: product.id,
        input: {
          quantity: data.quantity,
          reason: data.reason || undefined,
        },
      },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      }
    );
  };

  if (!isOpen) {
    return null;
  }

  const isAdding = quantity > 0;
  const hasQuantityChange = typeof quantity === 'number' && quantity !== 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900">Update Stock</h2>
          <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form className="space-y-6 p-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="mb-1 text-sm text-gray-600">Current Stock</div>
            <div className="text-3xl font-bold text-gray-900">{product.stockQuantity}</div>
            <div className="mt-1 text-sm text-gray-500">{product.name}</div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Quantity Change</label>
            <div className="relative">
              <input
                {...register('quantity', { valueAsNumber: true })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter positive to add, negative to remove"
                type="number"
              />
              {hasQuantityChange ? (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isAdding ? (
                    <TrendingUp className="text-green-500" size={20} />
                  ) : (
                    <TrendingDown className="text-red-500" size={20} />
                  )}
                </div>
              ) : null}
            </div>
            {errors.quantity ? (
              <p className="mt-1 text-sm text-red-600">{String(errors.quantity.message ?? '')}</p>
            ) : null}

            <div className="mt-2 flex items-center gap-2">
              <button
                className="rounded bg-green-100 px-3 py-1 text-sm text-green-700 hover:bg-green-200"
                type="button"
                onClick={() => register('quantity').onChange({ target: { value: 10 } })}
              >
                +10
              </button>
              <button
                className="rounded bg-red-100 px-3 py-1 text-sm text-red-700 hover:bg-red-200"
                type="button"
                onClick={() => register('quantity').onChange({ target: { value: -10 } })}
              >
                -10
              </button>
              <button
                className="rounded bg-green-100 px-3 py-1 text-sm text-green-700 hover:bg-green-200"
                type="button"
                onClick={() => register('quantity').onChange({ target: { value: 50 } })}
              >
                +50
              </button>
            </div>
          </div>

          {hasQuantityChange ? (
            <div
              className={`rounded-lg p-4 ${
                newStock < 0
                  ? 'border border-red-200 bg-red-50'
                  : isAdding
                    ? 'border border-green-200 bg-green-50'
                    : 'border border-orange-200 bg-orange-50'
              }`}
            >
              <div className="mb-1 text-sm font-medium">
                {newStock < 0 ? 'Error: Insufficient Stock' : 'New Stock Level'}
              </div>
              <div
                className={`text-2xl font-bold ${newStock < 0 ? 'text-red-600' : 'text-gray-900'}`}
              >
                {newStock}
              </div>
              {newStock >= 0 && newStock <= 10 ? (
                <div className="mt-1 text-sm text-orange-600">⚠️ Low stock alert</div>
              ) : null}
            </div>
          ) : null}

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Reason (Optional)
            </label>
            <input
              {...register('reason')}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Received shipment, Damaged items removed"
              type="text"
            />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-4">
            <button
              className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
              disabled={updateStock.isPending || !hasQuantityChange || newStock < 0}
              type="submit"
            >
              {updateStock.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Update Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
