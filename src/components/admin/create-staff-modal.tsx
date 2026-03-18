'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateStaff } from '@/lib/admin/mutations';
import { UserRole } from '@/types/auth';
import { X, Loader2, UserPlus } from 'lucide-react';

const createStaffSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number').optional().or(z.literal('')),
  roles: z.array(z.nativeEnum(UserRole)).min(1, 'Select at least one role'),
});

type CreateStaffInput = z.infer<typeof createStaffSchema>;

interface CreateStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateStaffModal({ isOpen, onClose }: CreateStaffModalProps) {
  const createStaff = useCreateStaff();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<CreateStaffInput>({
    resolver: zodResolver(createStaffSchema),
    defaultValues: {
      roles: [],
    },
  });

  const selectedRoles = watch('roles');

  const handleToggleRole = (role: UserRole) => {
    const currentRoles = selectedRoles || [];
    const newRoles = currentRoles.includes(role)
      ? currentRoles.filter(r => r !== role)
      : [...currentRoles, role];
    setValue('roles', newRoles);
  };

  const onSubmit = (data: CreateStaffInput) => {
    createStaff.mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
          <div className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-900">Create Staff Member</h2>
          </div>
          <button
            onClick={handleClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-5">
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  {...register('firstName')}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 bg-gray-50/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  {...register('lastName')}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 bg-gray-50/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-3 py-2 border border-gray-200 bg-gray-50/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="john@picknquicks.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone (Optional)
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-200 bg-gray-50/50 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="+254712345678"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Assign Roles</h3>
            <div className="space-y-3">
              {[UserRole.STAFF, UserRole.MANAGER, UserRole.ADMIN].map((role) => (
                <label
                  key={role}
                  className="flex items-center p-3 border border-gray-100 rounded-xl hover:bg-primary/2 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedRoles?.includes(role) || false}
                    onChange={() => handleToggleRole(role)}
                    className="h-4 w-4 text-primary rounded focus:ring-primary/30"
                  />
                  <div className="ml-3 flex-1">
                    <span className="font-medium text-gray-900">{role}</span>
                    <p className="text-sm text-gray-500">
                      {role === UserRole.ADMIN && 'Full system access and user management'}
                      {role === UserRole.MANAGER && 'Manage products, orders, and reports'}
                      {role === UserRole.STAFF && 'Process orders and customer support'}
                    </p>
                  </div>
                  <span
                    className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${
                      role === UserRole.ADMIN
                        ? 'bg-accent/10 text-accent'
                        : role === UserRole.MANAGER
                        ? 'bg-highlight/10 text-highlight'
                        : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {role}
                  </span>
                </label>
              ))}
            </div>
            {errors.roles && (
              <p className="mt-2 text-sm text-red-600">{errors.roles.message}</p>
            )}
          </div>

          <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
            <p className="text-sm text-primary-dark">
              ℹ️ A temporary password will be generated and sent to the staff member's email.
              They will be required to change it on first login.
            </p>
          </div>

          <div className="-mx-5 -mb-5 flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50/50 p-5 rounded-b-2xl">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createStaff.isPending}
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {createStaff.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  Create Staff
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}