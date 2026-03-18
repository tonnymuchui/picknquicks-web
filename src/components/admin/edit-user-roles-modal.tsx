'use client';

import { useUser } from '@/lib/admin/queries';
import { useUpdateUserRoles } from '@/lib/admin/mutations';
import { UserRole } from '@/types/auth';
import { useState, useEffect } from 'react';
import { X, Loader2, Shield } from 'lucide-react';

interface EditUserRolesModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export function EditUserRolesModal({ isOpen, onClose, userId }: EditUserRolesModalProps) {
  const { data: user, isLoading } = useUser(userId);
  const updateRoles = useUpdateUserRoles();

  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>([]);

  useEffect(() => {
    if (user) {
      setSelectedRoles(user.roles);
    }
  }, [user]);

  if (!isOpen) return null;

  const handleToggleRole = (role: UserRole) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleSave = () => {
    if (selectedRoles.length === 0) {
      alert('User must have at least one role');
      return;
    }

    updateRoles.mutate(
      { userId, roles: selectedRoles },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <div className="flex items-center gap-2">
            <Shield className="text-primary h-5 w-5" />
            <h2 className="text-lg font-semibold text-gray-900">Edit User Roles</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-5">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="text-primary h-8 w-8 animate-spin" />
            </div>
          ) : user ? (
            <>
              <div className="mb-6 rounded-xl bg-gray-50/80 p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full text-lg font-medium text-white">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.fullName}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  Select Roles (at least one required)
                </label>

                {Object.values(UserRole).map((role) => (
                  <label
                    key={role}
                    className="hover:bg-primary/2 flex cursor-pointer items-center rounded-xl border border-gray-100 p-3 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedRoles.includes(role)}
                      onChange={() => handleToggleRole(role)}
                      className="text-primary focus:ring-primary/30 h-4 w-4 rounded"
                    />
                    <div className="ml-3 flex-1">
                      <span className="font-medium text-gray-900">{role}</span>
                      <p className="text-sm text-gray-500">
                        {role === UserRole.ADMIN && 'Full system access and user management'}
                        {role === UserRole.MANAGER && 'Manage products, orders, and reports'}
                        {role === UserRole.STAFF && 'Process orders and customer support'}
                        {role === UserRole.CUSTOMER && 'Shop and place orders'}
                      </p>
                    </div>
                    <span
                      className={`ml-2 rounded px-2 py-0.5 text-xs font-medium ${
                        role === UserRole.ADMIN
                          ? 'bg-accent/10 text-accent'
                          : role === UserRole.MANAGER
                            ? 'bg-highlight/10 text-highlight'
                            : role === UserRole.STAFF
                              ? 'bg-primary/10 text-primary'
                              : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {role}
                    </span>
                  </label>
                ))}
              </div>

              {selectedRoles.length === 0 && (
                <div className="bg-highlight/5 border-highlight/10 mt-4 rounded-xl border p-3">
                  <p className="text-highlight-dark text-sm">⚠️ User must have at least one role</p>
                </div>
              )}
            </>
          ) : (
            <p className="py-8 text-center text-gray-500">User not found</p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 rounded-b-2xl border-t border-gray-100 bg-gray-50/50 p-5">
          <button
            onClick={onClose}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={updateRoles.isPending || selectedRoles.length === 0}
            className="bg-primary shadow-primary/25 hover:bg-primary-light flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {updateRoles.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
