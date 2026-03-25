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

import { CreateStaffModal } from '@/components/admin/auth/create-staff-modal';
import { EditUserRolesModal } from '@/components/admin/auth/edit-user-roles-modal';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { useToggleUserStatus, useDeleteUser } from '@/lib/admin/mutations';
import { useUsers } from '@/lib/admin/queries';
import { UserRole } from '@/types/auth';

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | ''>('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateStaffOpen, setIsCreateStaffOpen] = useState(false);

  const { data: usersData, isLoading } = useUsers({
    page: 0,
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
      <div className="min-h-screen bg-gray-950 p-4 md:p-8">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white md:text-3xl">Users Management</h1>
              <p className="mt-2 text-sm text-gray-400">
                Total users: {usersData?.totalElements || 0}
              </p>
            </div>
            <button
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-gray-950 transition-colors hover:bg-yellow-300 md:mt-0"
              onClick={() => setIsCreateStaffOpen(true)}
            >
              <UserPlus size={20} />
              Create Staff
            </button>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={20}
              />
              <input
                className="w-full rounded-lg border border-gray-700 bg-gray-900 py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                placeholder="Search by name or email..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="relative md:w-48">
              <Filter
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={20}
              />
              <select
                className="w-full appearance-none rounded-lg border border-gray-700 bg-gray-900 py-2.5 pl-10 pr-4 text-white focus:border-yellow-400 focus:outline-none"
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

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-yellow-400" />
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-sm md:rounded-2xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-800 bg-gray-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 md:px-6">
                        User
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 md:px-6">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 md:px-6">
                        Roles
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 md:px-6">
                        Status
                      </th>
                      <th className="hidden px-4 py-3 text-left text-xs font-semibold text-gray-400 md:table-cell md:px-6">
                        Provider
                      </th>
                      <th className="hidden px-4 py-3 text-left text-xs font-semibold text-gray-400 md:table-cell md:px-6">
                        Joined
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 md:px-6">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {usersData?.content.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-800/50">
                        <td className="whitespace-nowrap px-4 py-4 md:px-6">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-xs font-semibold text-gray-950 md:h-10 md:w-10 md:text-sm">
                              {user.firstName[0]}
                              {user.lastName[0]}
                            </div>
                            <div>
                              <div className="text-xs font-medium text-white md:text-sm">
                                {user.fullName}
                              </div>
                              <div className="text-xs text-gray-500">
                                ID: {user.id.slice(0, 8)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 md:px-6">
                          <div className="text-xs text-gray-300 md:text-sm">{user.email}</div>
                          {user.emailVerified ? (
                            <div className="mt-1 flex items-center text-xs text-emerald-400">
                              <CheckCircle className="mr-1" size={12} />
                              Verified
                            </div>
                          ) : (
                            <div className="mt-1 flex items-center text-xs text-gray-500">
                              <XCircle className="mr-1" size={12} />
                              Not verified
                            </div>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 md:px-6">
                          <div className="flex flex-wrap gap-1">
                            {user.roles.map((role) => (
                              <span
                                key={role}
                                className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ${
                                  role === UserRole.ADMIN
                                    ? 'bg-red-900/30 text-red-400'
                                    : role === UserRole.MANAGER
                                      ? 'bg-purple-900/30 text-purple-400'
                                      : role === UserRole.STAFF
                                        ? 'bg-blue-900/30 text-blue-400'
                                        : 'bg-gray-700 text-gray-300'
                                }`}
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 md:px-6">
                          {user.enabled ? (
                            <span className="inline-flex items-center rounded bg-emerald-900/30 px-2 py-1 text-xs font-medium text-emerald-400">
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded bg-red-900/30 px-2 py-1 text-xs font-medium text-red-400">
                              Disabled
                            </span>
                          )}
                        </td>
                        <td className="hidden whitespace-nowrap px-4 py-4 text-xs text-gray-400 md:table-cell md:px-6">
                          {user.provider}
                        </td>
                        <td className="hidden whitespace-nowrap px-4 py-4 text-xs text-gray-400 md:table-cell md:px-6">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right md:px-6">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-800 hover:text-yellow-400"
                              title="Edit roles"
                              onClick={() => handleEditRoles(user.id)}
                            >
                              <Shield size={16} />
                            </button>
                            <button
                              className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-800 hover:text-emerald-400"
                              title={user.enabled ? 'Disable user' : 'Enable user'}
                              onClick={() => handleToggleStatus(user.id, user.enabled)}
                            >
                              {user.enabled ? <XCircle size={16} /> : <CheckCircle size={16} />}
                            </button>
                            <button
                              className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-800 hover:text-red-400"
                              title="Delete user"
                              onClick={() => handleDeleteUser(user.id, user.fullName)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
