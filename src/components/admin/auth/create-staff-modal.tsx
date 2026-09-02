'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { X, Loader2, UserPlus } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { useCreateStaff } from '@/lib/admin/mutations';
import { UserRole } from '@/types/auth';

const createStaffSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .optional()
    .or(z.literal('')),
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
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CreateStaffInput>({
    resolver: zodResolver(createStaffSchema),
    defaultValues: {
      roles: [],
    },
  });

  const selectedRoles = useWatch({ control, name: 'roles' });

  const handleToggleRole = (role: UserRole) => {
    const currentRoles = selectedRoles || [];
    const newRoles = currentRoles.includes(role)
      ? currentRoles.filter((r) => r !== role)
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

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 ">
      <div className="mx-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto  bg-white ">
        <div className="-t-2xl sticky top-0 flex items-center justify-between border-b border-black/10 bg-white p-5">
          <div className="flex items-center gap-2">
            <UserPlus className="text-primary h-5 w-5" />
            <h2 className="text-lg font-semibold text-black">Create Staff Member</h2>
          </div>
          <button
            className=" p-1 text-black/45 transition-colors hover:bg-[#f1f1f1] hover:text-black/65"
            onClick={handleClose}
          >
            <X size={24} />
          </button>
        </div>

        <form className="space-y-5 p-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h3 className="mb-4 text-base font-semibold text-black">Personal Information</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-black/70">First Name</label>
                <input
                  {...register('firstName')}
                  className="focus:border-primary focus:ring-primary/20 w-full  border border-black/15 bg-gray-50/50 px-3 py-2 focus:outline-none focus:ring-2"
                  placeholder="John"
                  type="text"
                />
                {errors.firstName ? (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black/70">Last Name</label>
                <input
                  {...register('lastName')}
                  className="focus:border-primary focus:ring-primary/20 w-full  border border-black/15 bg-gray-50/50 px-3 py-2 focus:outline-none focus:ring-2"
                  placeholder="Doe"
                  type="text"
                />
                {errors.lastName ? (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black/70">Email</label>
                <input
                  {...register('email')}
                  className="focus:border-primary focus:ring-primary/20 w-full  border border-black/15 bg-gray-50/50 px-3 py-2 focus:outline-none focus:ring-2"
                  placeholder="john@picknquicks.com"
                  type="email"
                />
                {errors.email ? (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-black/70">
                  Phone (Optional)
                </label>
                <input
                  {...register('phone')}
                  className="focus:border-primary focus:ring-primary/20 w-full  border border-black/15 bg-gray-50/50 px-3 py-2 focus:outline-none focus:ring-2"
                  placeholder="+254712345678"
                  type="tel"
                />
                {errors.phone ? (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                ) : null}
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-black">Assign Roles</h3>
            <div className="space-y-3">
              {[UserRole.STAFF, UserRole.MANAGER, UserRole.ADMIN].map((role) => (
                <label
                  key={role}
                  className="hover:bg-primary/2 flex cursor-pointer items-center  border border-black/10 p-3 transition-colors"
                >
                  <input
                    checked={selectedRoles?.includes(role) || false}
                    className="text-primary focus:ring-primary/30 h-4 w-4 "
                    type="checkbox"
                    onChange={() => handleToggleRole(role)}
                  />
                  <div className="ml-3 flex-1">
                    <span className="font-medium text-black">{role}</span>
                    <p className="text-sm text-black/45">
                      {role === UserRole.ADMIN ? 'Full system access and user management' : null}
                      {role === UserRole.MANAGER ? 'Manage products, orders, and reports' : null}
                      {role === UserRole.STAFF ? 'Process orders and customer support' : null}
                    </p>
                  </div>
                  <span
                    className={`ml-2  px-2 py-0.5 text-xs font-medium ${
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
            {errors.roles ? (
              <p className="mt-2 text-sm text-red-600">{errors.roles.message}</p>
            ) : null}
          </div>

          <div className="bg-primary/5 border-primary/10  border p-4">
            <p className="text-primary-dark text-sm">
              ℹ️ A temporary password will be generated and sent to the staff member&apos;s email.
              They will be required to change it on first login.
            </p>
          </div>

          <div className="-b-2xl -mx-5 -mb-5 flex items-center justify-end gap-3 border-t border-black/10 bg-gray-50/50 p-5">
            <button
              className=" border border-black/15 bg-white px-4 py-2.5 text-sm font-medium text-black/65 transition-colors hover:bg-[#f1f1f1]"
              type="button"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="bg-primary hover:bg-primary-light flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              disabled={createStaff.isPending}
              type="submit"
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
