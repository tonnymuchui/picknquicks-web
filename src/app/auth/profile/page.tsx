'use client';

import { ArrowLeft, Mail, Phone, User as UserIcon, Save, Check, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import { useRequireAuth } from '@/lib/auth/hooks';
import { useUpdateProfile } from '@/lib/auth/mutations';
import { AuthAvatarManager } from '@/components/auth/avatar-manager';
import { resolveAvatarUrl } from '@/lib/utils/media';

export default function ProfilePage() {
  const { user, isLoading, status } = useRequireAuth();
  const updateProfile = useUpdateProfile();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      // Initialize form data when user loads
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.firstName, user?.lastName, user?.phone]);

  if (isLoading || status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="border-t-primary h-12 w-12 animate-spin rounded-full border-4 border-gray-200" />
          <p className="text-sm text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated' || !user) {
    return null;
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (formData.phone && !/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsDirty(true);
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const form = new FormData();
      form.append('firstName', formData.firstName);
      form.append('lastName', formData.lastName);
      form.append('phone', formData.phone);

      updateProfile.mutate(form, {
        onSuccess: () => {
          setIsDirty(false);
        },
      });
    }
  };

  const isFormValid = formData.firstName.trim() && formData.lastName.trim();

  return (
    <div className="bg-linear-to-b min-h-screen from-gray-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <Link
            className="inline-flex items-center justify-center rounded-lg p-2 transition-all hover:bg-gray-100"
            href="/"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <Link className="hover:text-gray-900" href="/">
                Home
              </Link>
              <span>/</span>
              <span className="font-medium text-gray-900">My Profile</span>
            </nav>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="bg-linear-to-r from-primary to-primary-light border-b border-gray-200 px-6 py-8">
                <div className="flex items-center gap-4">
                  <div>
                    {user.avatarUrl ? (
                      <Image
                        alt="Profile"
                        className="h-20 w-20 rounded-full border-2 border-white object-cover shadow-lg"
                        height={80}
                        src={resolveAvatarUrl(user.avatarUrl) || user.avatarUrl}
                        width={80}
                      />
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-2xl font-bold text-white shadow-lg">
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-white">{user.fullName}</h1>
                    <p className="text-white/90">{user.email}</p>
                    <div className="mt-2 flex items-center gap-2">
                      {user.emailVerified ? (
                        <>
                          <Check className="h-4 w-4 text-green-300" />
                          <span className="text-sm text-green-50">Email verified</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 text-yellow-300" />
                          <span className="text-sm text-yellow-50">Email not verified</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <form className="divide-y divide-gray-200" onSubmit={handleSubmit}>
                <div className="space-y-6 p-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-900"
                        htmlFor="firstName"
                      >
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        className={`focus:border-primary/60 focus:ring-primary/20 shadow-primary/5 mt-2 block w-full rounded-xl border bg-white px-4 py-2.5 shadow-sm transition-all focus:outline-none focus:ring-2 ${
                          errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      {errors.firstName ? (
                        <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                      ) : null}
                    </div>
                    <div>
                      <label
                        className="block text-sm font-semibold text-gray-900"
                        htmlFor="lastName"
                      >
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        className={`focus:border-primary/60 focus:ring-primary/20 shadow-primary/5 mt-2 block w-full rounded-xl border bg-white px-4 py-2.5 shadow-sm transition-all focus:outline-none focus:ring-2 ${
                          errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                      {errors.lastName ? (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900" htmlFor="phone">
                      Phone Number
                    </label>
                    <div className="relative mt-2">
                      <Phone className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        className={`focus:border-primary/60 focus:ring-primary/20 shadow-primary/5 block w-full rounded-xl border bg-white py-2.5 pl-12 pr-4 shadow-sm transition-all focus:outline-none focus:ring-2 ${
                          errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.phone ? (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-3 bg-gray-50 p-6">
                  <button
                    className="bg-primary hover:bg-primary-light flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={updateProfile.isPending || !isDirty || !isFormValid}
                    type="submit"
                  >
                    <Save className="h-4 w-4" />
                    {updateProfile.isPending ? 'Saving Changes...' : 'Save Changes'}
                  </button>
                </div>
              </form>

              <div className="border-t border-gray-200 p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Profile Picture</h3>
                <AuthAvatarManager avatarUrl={user.avatarUrl} />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Account Info</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-gray-400" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-600">Email Address</p>
                    <p className="truncate font-medium text-gray-900">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-t border-gray-200 pt-4">
                  <UserIcon className="mt-0.5 h-5 w-5 text-gray-400" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-600">Account Status</p>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <p className="font-medium text-gray-900">Active</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link
              className="block rounded-xl border border-gray-300 bg-white px-4 py-3 text-center font-semibold text-gray-900 transition-all hover:border-gray-400 hover:bg-gray-50"
              href="/settings"
            >
              Account Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
