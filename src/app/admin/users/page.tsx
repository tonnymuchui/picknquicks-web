'use client';

import {
  Search,
  Filter,
  UserPlus,
  Trash2,
  Shield,
  CheckCircle,
  XCircle,
  Loader2,
} from 'lucide-react';
import { useState } from 'react';

import { CreateStaffModal } from '@/components/admin/create-staff-modal';
import { EditUserRolesModal } from '@/components/admin/edit-user-roles-modal';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { useToggleUserStatus, useDeleteUser } from '@/lib/admin/mutations';
import { useUsers } from '@/lib/admin/queries';
import { UserRole } from '@/types/auth';

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | ''>('');
  const [page, setPage] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateStaffOpen, setIsCreateStaffOpen] = useState(false);

  const { data: usersData, isLoading } = useUsers({
    page,
    size: 20,
    search: search || undefined,
    role: roleFilter || undefined,
  });

  const toggleStatus = useToggleUserStatus();
  const deleteUser = useDeleteUser();

  const handleEditRoles = (userId: string) => {
    setSelectedUserId(userId);
    setIsEditModalOpen(true);
  };

  const handleToggleStatus = (userId: string, currentStatus: boolean) => {
    toggleStatus.mutate({ userId, enabled: !currentStatus });
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    if (confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      deleteUser.mutate(userId);
    }
  };

  return (
    <ProtectedRoute requiredRoles={[UserRole.ADMIN]}>
      <div className="to-primary/5 bg-linear-to-br min-h-screen from-gray-50 via-white">
        <div className="border-b border-gray-100 bg-white/60 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Users Management</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Total users: {usersData?.totalElements || 0}
                </p>
              </div>
              <button
                className="bg-primary shadow-primary/25 hover:bg-primary-light flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all"
                onClick={() => setIsCreateStaffOpen(true)}
              >
                <UserPlus size={20} />
                Create Staff
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  className="focus:border-primary focus:ring-primary/20 w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2 pl-10 pr-4 focus:outline-none focus:ring-2"
                  placeholder="Search by name or email..."
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="relative">
                <Filter
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <select
                  className="focus:border-primary focus:ring-primary/20 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 py-2 pl-10 pr-4 focus:outline-none focus:ring-2"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value as UserRole | '')}
                >
                  <option value="">All Roles</option>
                  <option value={UserRole.CUSTOMER}>Customer</option>
                  <option value={UserRole.STAFF}>Staff</option>
                  <option value={UserRole.MANAGER}>Manager</option>
                  <option value={UserRole.ADMIN}>Admin</option>
                </select>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="text-primary h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-100 bg-gray-50/80">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Roles
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Provider
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {usersData?.content.map((user) => (
                      <tr key={user.id} className="hover:bg-primary/2">
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center">
                            <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full font-medium text-white">
                              {user.firstName[0]}
                              {user.lastName[0]}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.fullName}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {user.id.slice(0, 8)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-900">{user.email}</div>
                          {user.emailVerified ? (
                            <div className="mt-1 flex items-center text-xs text-green-600">
                              <CheckCircle className="mr-1" size={12} />
                              Verified
                            </div>
                          ) : (
                            <div className="mt-1 flex items-center text-xs text-gray-400">
                              <XCircle className="mr-1" size={12} />
                              Not verified
                            </div>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {user.roles.map((role) => (
                              <span
                                key={role}
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  role === UserRole.ADMIN
                                    ? 'bg-accent/10 text-accent'
                                    : role === UserRole.MANAGER
                                      ? 'bg-highlight/10 text-highlight'
                                      : role === UserRole.STAFF
                                        ? 'bg-primary/10 text-primary'
                                        : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {user.enabled ? (
                            <span className="bg-secondary/20 text-secondary-dark inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                              Active
                            </span>
                          ) : (
                            <span className="bg-accent/10 text-accent inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                              Disabled
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {user.provider}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              className="text-primary hover:text-primary-dark rounded-lg p-1.5 transition-colors hover:bg-gray-100"
                              title="Edit roles"
                              onClick={() => handleEditRoles(user.id)}
                            >
                              <Shield size={18} />
                            </button>
                            <button
                              className={`rounded-lg p-1.5 transition-colors ${
                                user.enabled
                                  ? 'text-primary hover:text-primary-dark hover:bg-gray-100'
                                  : 'text-primary hover:text-primary-dark hover:bg-gray-100'
                              }`}
                              title={user.enabled ? 'Disable user' : 'Enable user'}
                              onClick={() => handleToggleStatus(user.id, user.enabled)}
                            >
                              {user.enabled ? <XCircle size={18} /> : <CheckCircle size={18} />}
                            </button>
                            <button
                              className="hover:text-accent hover:bg-accent/5 rounded-lg p-1.5 text-gray-400 transition-colors"
                              title="Delete user"
                              onClick={() => handleDeleteUser(user.id, user.fullName)}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {usersData && usersData.totalPages > 1 ? (
                <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
                  <div className="text-sm text-gray-500">
                    Showing page {page + 1} of {usersData.totalPages}
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={page === 0}
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                    >
                      Previous
                    </button>
                    <button
                      className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={page === usersData.totalPages - 1}
                      onClick={() => setPage((p) => Math.min(usersData.totalPages - 1, p + 1))}
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {selectedUserId ? (
        <EditUserRolesModal
          isOpen={isEditModalOpen}
          userId={selectedUserId}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedUserId(null);
          }}
        />
      ) : null}

      <CreateStaffModal isOpen={isCreateStaffOpen} onClose={() => setIsCreateStaffOpen(false)} />
    </ProtectedRoute>
  );
}
