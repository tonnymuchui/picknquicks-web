'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Loader2, TrendingUp, TrendingDown } from 'lucide-react';
import type { Product } from '@/types/product';
import { useUpdateProductStock } from '@/lib/product/products.mutations';

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

  if (!isOpen) return null;

  const isAdding = quantity > 0;
  const isRemoving = quantity < 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Update Stock</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Current Stock</div>
            <div className="text-3xl font-bold text-gray-900">{product.stockQuantity}</div>
            <div className="text-sm text-gray-500 mt-1">{product.name}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity Change
            </label>
            <div className="relative">
              <input
                {...register('quantity', { valueAsNumber: true })}
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter positive to add, negative to remove"
              />
              {quantity !== 0 && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isAdding ? (
                    <TrendingUp className="text-green-500" size={20} />
                  ) : (
                    <TrendingDown className="text-red-500" size={20} />
                  )}
                </div>
              )}
            </div>
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
            )}
            
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => register('quantity').onChange({ target: { value: 10 } })}
                className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
              >
                +10
              </button>
              <button
                type="button"
                onClick={() => register('quantity').onChange({ target: { value: -10 } })}
                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
              >
                -10
              </button>
              <button
                type="button"
                onClick={() => register('quantity').onChange({ target: { value: 50 } })}
                className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
              >
                +50
              </button>
            </div>
          </div>

          {quantity !== 0 && (
            <div
              className={`p-4 rounded-lg ${
                newStock < 0
                  ? 'bg-red-50 border border-red-200'
                  : isAdding
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-orange-50 border border-orange-200'
              }`}
            >
              <div className="text-sm font-medium mb-1">
                {newStock < 0 ? 'Error: Insufficient Stock' : 'New Stock Level'}
              </div>
              <div
                className={`text-2xl font-bold ${
                  newStock < 0 ? 'text-red-600' : 'text-gray-900'
                }`}
              >
                {newStock}
              </div>
              {newStock >= 0 && newStock <= 10 && (
                <div className="text-sm text-orange-600 mt-1">⚠️ Low stock alert</div>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason (Optional)
            </label>
            <input
              {...register('reason')}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Received shipment, Damaged items removed"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateStock.isPending || quantity === 0 || newStock < 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
              {updateStock.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              Update Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}