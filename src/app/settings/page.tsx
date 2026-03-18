'use client';

import { useState } from 'react';
import { useChangePassword, useLogout } from '@/lib/auth/mutations';
import { useRequireAuth } from '@/lib/auth/hooks';
import Link from 'next/link';
import { ArrowLeft, Lock, LogOut as LogOutIcon, Eye, EyeOff, Shield, Check } from 'lucide-react';

export default function SettingsPage() {
  const { user, isLoading, status } = useRequireAuth();
  const changePassword = useChangePassword();
  const logout = useLogout();

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [isPasswordDirty, setIsPasswordDirty] = useState(false);

  if (isLoading || status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="border-t-primary h-12 w-12 animate-spin rounded-full border-4 border-gray-200"></div>
          <p className="text-sm text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated' || !user) {
    return null;
  }

  const validatePasswordForm = () => {
    const newErrors: Record<string, string> = {};

    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    if (!passwordForm.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordForm.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    if (!passwordForm.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsPasswordDirty(true);
    if (passwordErrors[name]) {
      setPasswordErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePasswordForm()) {
      changePassword.mutate(passwordForm, {
        onSuccess: () => {
          setPasswordForm({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          });
          setPasswordErrors({});
          setIsPasswordDirty(false);
        },
      });
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout? You will need to sign in again.')) {
      logout.mutate();
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length < 8) return { level: 'Weak', color: 'bg-red-500' };
    if (password.length < 12) return { level: 'Medium', color: 'bg-yellow-500' };
    if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
      return { level: 'Strong', color: 'bg-green-500' };
    }
    return { level: 'Medium', color: 'bg-yellow-500' };
  };

  const passwordStrength = getPasswordStrength(passwordForm.newPassword);

  return (
    <div className="bg-linear-to-b min-h-screen from-gray-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <Link
            href="/auth/profile"
            className="inline-flex items-center justify-center rounded-lg p-2 transition-all hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-gray-900">
                Home
              </Link>
              <span>/</span>
              <Link href="/auth/profile" className="hover:text-gray-900">
                Profile
              </Link>
              <span>/</span>
              <span className="font-medium text-gray-900">Settings</span>
            </nav>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="bg-linear-to-r from-primary to-primary-light border-b border-gray-200 px-6 py-6">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-white" />
                  <h2 className="text-xl font-bold text-white">Security Settings</h2>
                </div>
                <p className="mt-2 text-white/80">Manage your password and account security</p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="divide-y divide-gray-200">
                <div className="space-y-6 p-6">
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="block text-sm font-semibold text-gray-900"
                    >
                      Current Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative mt-2">
                      <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        id="currentPassword"
                        type={showPasswords.current ? 'text' : 'password'}
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        className={`focus:border-primary/60 focus:ring-primary/20 shadow-primary/5 block w-full rounded-xl border bg-white py-2.5 pl-12 pr-12 shadow-sm transition-all focus:outline-none focus:ring-2 ${
                          passwordErrors.currentPassword
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-300'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswords((prev) => ({
                            ...prev,
                            current: !prev.current,
                          }))
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                      >
                        {showPasswords.current ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {passwordErrors.currentPassword && (
                      <p className="mt-1 text-sm text-red-600">{passwordErrors.currentPassword}</p>
                    )}
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-semibold text-gray-900"
                    >
                      New Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative mt-2">
                      <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        id="newPassword"
                        type={showPasswords.new ? 'text' : 'password'}
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        className={`focus:border-primary/60 focus:ring-primary/20 shadow-primary/5 block w-full rounded-xl border bg-white py-2.5 pl-12 pr-12 shadow-sm transition-all focus:outline-none focus:ring-2 ${
                          passwordErrors.newPassword
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-300'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswords((prev) => ({
                            ...prev,
                            new: !prev.new,
                          }))
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                      >
                        {showPasswords.new ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    {passwordForm.newPassword && (
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-1 flex-1 rounded-full bg-gray-200">
                            <div
                              className={`h-full rounded-full transition-all ${passwordStrength.color}`}
                              style={{
                                width:
                                  passwordStrength.level === 'Weak'
                                    ? '33%'
                                    : passwordStrength.level === 'Medium'
                                      ? '66%'
                                      : '100%',
                              }}
                            ></div>
                          </div>
                          <span
                            className={`text-xs font-medium ${
                              passwordStrength.color.includes('red')
                                ? 'text-red-600'
                                : passwordStrength.color.includes('yellow')
                                  ? 'text-yellow-600'
                                  : 'text-green-600'
                            }`}
                          >
                            {passwordStrength.level}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">
                          Use uppercase, numbers, and symbols for better security
                        </p>
                      </div>
                    )}
                    {passwordErrors.newPassword && (
                      <p className="mt-1 text-sm text-red-600">{passwordErrors.newPassword}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-semibold text-gray-900"
                    >
                      Confirm New Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative mt-2">
                      <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        id="confirmPassword"
                        type={showPasswords.confirm ? 'text' : 'password'}
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        className={`focus:border-primary/60 focus:ring-primary/20 shadow-primary/5 block w-full rounded-xl border bg-white py-2.5 pl-12 pr-12 shadow-sm transition-all focus:outline-none focus:ring-2 ${
                          passwordErrors.confirmPassword
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-300'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswords((prev) => ({
                            ...prev,
                            confirm: !prev.confirm,
                          }))
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                      >
                        {showPasswords.confirm ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {passwordErrors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{passwordErrors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 bg-gray-50 p-6">
                  <button
                    type="submit"
                    disabled={changePassword.isPending || !isPasswordDirty}
                    className="bg-primary hover:bg-primary-light flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Lock className="h-4 w-4" />
                    {changePassword.isPending ? 'Updating Password...' : 'Update Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-semibold text-gray-900">Account Overview</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-600">Member Since</p>
                  <p className="mt-1 font-medium text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-gray-600">Email Status</p>
                  <div className="mt-2 flex items-center gap-2">
                    {user.emailVerified ? (
                      <>
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-600">Verified</span>
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 text-yellow-600" />
                        <span className="font-medium text-yellow-600">Not Verified</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/auth/profile"
              className="block rounded-xl border border-gray-300 bg-white px-4 py-3 text-center font-semibold text-gray-900 transition-all hover:border-gray-400 hover:bg-gray-50"
            >
              ← Back to Profile
            </Link>

            <button
              onClick={handleLogout}
              disabled={logout.isPending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-center font-semibold text-white transition-all hover:bg-red-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOutIcon className="h-4 w-4" />
              {logout.isPending ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
