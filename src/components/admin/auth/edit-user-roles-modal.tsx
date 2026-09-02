'use client';

import { X, Loader2, Shield } from 'lucide-react';
import { useState } from 'react';

import { useUpdateUserRoles } from '@/lib/admin/mutations';
import { useUser } from '@/lib/admin/queries';
import { UserRole } from '@/types/auth';

interface EditUserRolesModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export function EditUserRolesModal({ isOpen, onClose, userId }: EditUserRolesModalProps) {
  const { data: user, isLoading } = useUser(userId);
  const updateRoles = useUpdateUserRoles();

  const [roleSelection, setRoleSelection] = useState<{
    userId: string;
    roles: UserRole[];
  } | null>(null);
  const selectedRoles: UserRole[] =
    roleSelection?.userId === userId
      ? roleSelection.roles
      : ((user?.roles as UserRole[] | undefined) ?? []);

  if (!isOpen) {
    return null;
  }

  const handleToggleRole = (role: UserRole) => {
    setRoleSelection({
      userId,
      roles: selectedRoles.includes(role)
        ? selectedRoles.filter((currentRole) => currentRole !== role)
        : [...selectedRoles, role],
    });
  };

  const handleClose = () => {
    setRoleSelection(null);
    onClose();
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
          handleClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 ">
      <div className="mx-4 w-full max-w-md  bg-white ">
        <div className="flex items-center justify-between border-b border-black/10 p-5">
          <div className="flex items-center gap-2">
            <Shield className="text-primary h-5 w-5" />
            <h2 className="text-lg font-semibold text-black">Edit User Roles</h2>
          </div>
          <button
            className=" p-1 text-black/45 transition-colors hover:bg-[#f1f1f1] hover:text-black/65"
            onClick={handleClose}
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
              <div className="mb-6  bg-gray-50/80 p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary flex h-12 w-12 items-center justify-center  text-lg font-medium text-white">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </div>
                  <div>
                    <p className="font-medium text-black">{user.fullName}</p>
                    <p className="text-sm text-black/45">{user.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="mb-3 block text-sm font-medium text-black/70">
                  Select Roles (at least one required)
                </label>

                {Object.values(UserRole).map((role) => (
                  <label
                    key={role}
                    className="hover:bg-primary/2 flex cursor-pointer items-center  border border-black/10 p-3 transition-colors"
                  >
                    <input
                      checked={selectedRoles.includes(role)}
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
                        {role === UserRole.CUSTOMER ? 'Shop and place orders' : null}
                      </p>
                    </div>
                    <span
                      className={`ml-2  px-2 py-0.5 text-xs font-medium ${
                        role === UserRole.ADMIN
                          ? 'bg-accent/10 text-accent'
                          : role === UserRole.MANAGER
                            ? 'bg-highlight/10 text-highlight'
                            : role === UserRole.STAFF
                              ? 'bg-primary/10 text-primary'
                              : 'bg-gray-100 text-black'
                      }`}
                    >
                      {role}
                    </span>
                  </label>
                ))}
              </div>

              {selectedRoles.length === 0 ? (
                <div className="bg-highlight/5 border-highlight/10 mt-4  border p-3">
                  <p className="text-highlight-dark text-sm">⚠️ User must have at least one role</p>
                </div>
              ) : null}
            </>
          ) : (
            <p className="py-8 text-center text-black/45">User not found</p>
          )}
        </div>

        <div className="-b-2xl flex items-center justify-end gap-3 border-t border-black/10 bg-gray-50/50 p-5">
          <button
            className=" border border-black/15 bg-white px-4 py-2.5 text-sm font-medium text-black/65 transition-colors hover:bg-[#f1f1f1]"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="bg-primary hover:bg-primary-light flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            disabled={updateRoles.isPending || selectedRoles.length === 0}
            onClick={handleSave}
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
