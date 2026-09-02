'use client';

import { AlertTriangle, Loader2 } from 'lucide-react';

import { Modal } from './modal';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning';
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} size="sm" title={title} onClose={onClose}>
      <div className="space-y-4">
        <div
          className={`flex items-start gap-3 rounded-lg p-4 ${
            variant === 'danger' ? 'bg-red-50' : 'bg-[#f1f1f1]'
          }`}
        >
          <AlertTriangle
            className={`mt-0.5 flex-shrink-0 ${
              variant === 'danger' ? 'text-red-500' : 'text-black/65'
            }`}
            size={20}
          />
          <p className={`text-sm ${variant === 'danger' ? 'text-red-800' : 'text-black/65'}`}>
            {message}
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            className="flex-1 rounded-lg border-2 border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            disabled={isLoading}
            onClick={onClose}
          >
            {cancelLabel}
          </button>
          <button
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold text-white disabled:opacity-50 ${
              variant === 'danger'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-[#9a5d3b] hover:bg-[#9a5d3b]'
            }`}
            disabled={isLoading}
            onClick={onConfirm}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Processing...
              </>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
