'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { X, Loader2, Shield } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreateRole, useUpdateRole } from '@/lib/admin/mutations';


import type { RoleResponse } from '@/types/admin';

const roleSchema = z.object({
  name: z
    .string()
    .min(2, 'Role name must be at least 2 characters')
    .max(50, 'Role name must be at most 50 characters'),
  description: z.string().max(255, 'Description too long').optional().or(z.literal('')),
});

type RoleFormInput = z.infer<typeof roleSchema>;

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  role?: RoleResponse | null;
}

export function RoleModal({ isOpen, onClose, role }: RoleModalProps) {
  const isEditing = !!role;
  const createRole = useCreateRole();
  const updateRole = useUpdateRole();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RoleFormInput>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: role?.name ?? '',
      description: role?.description ?? '',
    },
  });

  const isPending = createRole.isPending || updateRole.isPending;

  const onSubmit = (data: RoleFormInput) => {
    if (isEditing && role) {
      updateRole.mutate(
        { roleId: role.id, name: data.name, description: data.description || undefined },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        }
      );
    } else {
      createRole.mutate(
        { name: data.name, description: data.description || undefined },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        }
      );
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) {return null;}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <div className="flex items-center gap-2">
            <Shield className="text-primary h-5 w-5" />
            <h2 className="text-lg font-semibold text-gray-900">
              {isEditing ? 'Edit Role' : 'Create Role'}
            </h2>
          </div>
          <button
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            onClick={handleClose}
          >
            <X size={24} />
          </button>
        </div>

        <form className="space-y-4 p-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Role Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register('name')}
              className="focus:border-primary focus:ring-primary/20 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2 focus:outline-none focus:ring-2"
              placeholder="e.g. WAREHOUSE_MANAGER"
              type="text"
            />
            {errors.name ? <p className="mt-1 text-sm text-red-600">{errors.name.message}</p> : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register('description')}
              className="focus:border-primary focus:ring-primary/20 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2 focus:outline-none focus:ring-2"
              placeholder="What can this role do?"
              rows={3}
            />
            {errors.description ? <p className="mt-1 text-sm text-red-600">{errors.description.message}</p> : null}
          </div>

          <div className="-mx-5 -mb-5 flex justify-end gap-3 rounded-b-2xl border-t border-gray-100 bg-gray-50/50 p-5">
            <button
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
              type="button"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="bg-primary shadow-primary/25 hover:bg-primary-light flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isPending}
              type="submit"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {isEditing ? 'Update Role' : 'Create Role'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
