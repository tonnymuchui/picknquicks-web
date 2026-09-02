'use client';

import { Plus, Edit, Trash2, Shield, Loader2, Search } from 'lucide-react';
import { useState } from 'react';

import { RoleModal } from '@/components/admin/auth/role-modal';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { useDeleteRole } from '@/lib/admin/mutations';
import { useRoles } from '@/lib/admin/queries';
import { UserRole } from '@/types/auth';

import type { RoleResponse } from '@/types/admin';

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
        `Are you sure you want to delete the role "${role.name}"? ${role.userCount} user${role.userCount === 1 ? '' : 's'} currently have this role.`
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
    <ProtectedRoute requiredRoles={[UserRole.ADMIN]}>
      <div className="min-h-screen bg-white">
        <div className="px-4 py-7 sm:px-7 xl:px-9">
          <div className="mb-7 flex flex-col justify-between gap-5 border-b border-black/10 pb-7 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-[#9a5d3b]">Access</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-.045em] text-black sm:text-4xl">
                Roles
              </h1>
              <p className="mt-2 text-sm text-black/50">
                {roles?.length ?? 0} role{(roles?.length ?? 0) !== 1 ? 's' : ''} configured
              </p>
            </div>
            <button
              className="flex h-11 items-center gap-2 bg-[#9a5d3b] px-5 text-sm font-semibold text-white hover:bg-[#754329]"
              onClick={() => {
                setEditingRole(null);
                setIsModalOpen(true);
              }}
            >
              <Plus size={20} />
              Add role
            </button>
          </div>

          <div className="mb-6 border border-black/10 bg-white p-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-black/45"
                size={20}
              />
              <input
                className="focus:border-primary focus:ring-primary/20 w-full  border border-black/15 bg-gray-50/50 py-2 pl-10 pr-4 focus:outline-none focus:ring-2"
                placeholder="Search roles..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="text-primary h-8 w-8 animate-spin" />
            </div>
          ) : !filteredRoles || filteredRoles.length === 0 ? (
            <div className=" border border-black/10 bg-white p-12 text-center ">
              <Shield className="mx-auto mb-4 h-12 w-12 text-black/65" />
              <h3 className="mb-1 text-lg font-medium text-black">
                {search ? 'No roles match your search' : 'No roles yet'}
              </h3>
              <p className="text-sm text-black/45">
                {search ? 'Try a different search term.' : 'Create your first role to get started.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredRoles.map((role) => (
                <div
                  key={role.id}
                  className="border border-black/10 bg-white p-5 transition hover:bg-[#f1f1f1]"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 flex h-10 w-10 items-center justify-center ">
                        <Shield className="text-primary h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-black">{role.name}</h3>
                        <p className="text-xs text-black/45">
                          {role.userCount} user{role.userCount === 1 ? '' : 's'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        className="hover:text-primary  p-1.5 text-black/45 transition-colors hover:bg-[#f1f1f1]"
                        title="Edit role"
                        onClick={() => handleEdit(role)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="hover:bg-accent/5 hover:text-accent  p-1.5 text-black/45 transition-colors disabled:opacity-50"
                        disabled={deleteRole.isPending}
                        title="Delete role"
                        onClick={() => handleDelete(role)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {role.description ? (
                    <p className="mb-3 line-clamp-2 text-sm text-black/65">{role.description}</p>
                  ) : null}

                  <p className="text-xs text-black/45">
                    Created {new Date(role.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <RoleModal isOpen={isModalOpen} role={editingRole} onClose={handleCloseModal} />
    </ProtectedRoute>
  );
}
