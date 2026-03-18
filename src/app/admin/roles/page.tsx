'use client';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { useRoles } from '@/lib/admin/queries';
import { useDeleteRole } from '@/lib/admin/mutations';
import { UserRole } from '@/types/auth';
import type { RoleResponse } from '@/types/admin';
import { useState } from 'react';
import { Plus, Edit, Trash2, Shield, Loader2, Search } from 'lucide-react';
import { RoleModal } from '@/components/admin/role-modal';

export default function AdminRolesPage() {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<RoleResponse | null>(null);

  const { data: roles, isLoading } = useRoles();
  const deleteRole = useDeleteRole();

  const filteredRoles = roles?.filter(
    (role) =>
      role.name.toLowerCase().includes(search.toLowerCase()) ||
      role.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (role: RoleResponse) => {
    setEditingRole(role);
    setIsModalOpen(true);
  };

  const handleDelete = (role: RoleResponse) => {
    if (
      confirm(
        `Are you sure you want to delete the role "${role.name}"? Users with this role will lose its permissions.`
      )
    ) {
      deleteRole.mutate(role.id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRole(null);
  };

  return (
    <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MANAGER]}>
      <div className="to-primary/5 bg-linear-to-br min-h-screen from-gray-50 via-white">
        <div className="container mx-auto px-4 py-8">
          <div className="-mx-4 mb-8 flex items-center justify-between border-b border-gray-100 bg-white/60 px-4 pb-6 backdrop-blur-sm">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Roles Management</h1>
              <p className="mt-1 text-gray-600">
                {roles?.length ?? 0} role{(roles?.length ?? 0) !== 1 ? 's' : ''} configured
              </p>
            </div>
            <button
              onClick={() => {
                setEditingRole(null);
                setIsModalOpen(true);
              }}
              className="bg-primary shadow-primary/25 hover:bg-primary-light flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors"
            >
              <Plus size={20} />
              Create Role
            </button>
          </div>

          <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search roles..."
                className="focus:border-primary focus:ring-primary/20 w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2 pl-10 pr-4 focus:outline-none focus:ring-2"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="text-primary h-8 w-8 animate-spin" />
            </div>
          ) : !filteredRoles || filteredRoles.length === 0 ? (
            <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
              <Shield className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <h3 className="mb-1 text-lg font-medium text-gray-900">
                {search ? 'No roles match your search' : 'No roles yet'}
              </h3>
              <p className="text-sm text-gray-500">
                {search ? 'Try a different search term.' : 'Create your first role to get started.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredRoles.map((role) => (
                <div
                  key={role.id}
                  className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-gray-200 hover:shadow-md"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                        <Shield className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{role.name}</h3>
                        {role.createdAt && (
                          <p className="text-xs text-gray-400">
                            Created {new Date(role.createdAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(role)}
                        className="hover:text-primary rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100"
                        title="Edit role"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(role)}
                        disabled={deleteRole.isPending}
                        className="hover:bg-accent/5 hover:text-accent rounded-lg p-1.5 text-gray-400 transition-colors disabled:opacity-50"
                        title="Delete role"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {role.description && (
                    <p className="mb-3 line-clamp-2 text-sm text-gray-600">{role.description}</p>
                  )}

                  {role.permissions && role.permissions.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.slice(0, 3).map((perm) => (
                        <span
                          key={perm}
                          className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600"
                        >
                          {perm}
                        </span>
                      ))}
                      {role.permissions.length > 3 && (
                        <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
                          +{role.permissions.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <RoleModal isOpen={isModalOpen} onClose={handleCloseModal} role={editingRole} />
    </ProtectedRoute>
  );
}
