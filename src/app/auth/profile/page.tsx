'use client';

import { AlertCircle, Check, Mail, Package, Save, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { AccountShell } from '@/components/auth/account-shell';
import {
  authInputClass,
  authLabelClass,
  authPrimaryButtonClass,
} from '@/components/auth/auth-shell';
import { AuthAvatarManager } from '@/components/auth/avatar-manager';
import { useRequireAuth } from '@/lib/auth/hooks';
import { useUpdateProfile } from '@/lib/auth/mutations';
import { resolveAvatarUrl } from '@/lib/utils/media';

import type { User } from '@/types/auth';

export default function ProfilePage() {
  const { user, isLoading, status } = useRequireAuth();

  if (isLoading || status === 'loading') {
    return <div aria-label="Loading account" className="min-h-[70vh] animate-pulse bg-[#f1f1f1]" />;
  }
  if (status === 'unauthenticated' || !user) {
    return null;
  }
  return <ProfileContent key={user.id} user={user} />;
}

function ProfileContent({ user }: { user: User }) {
  const updateProfile = useUpdateProfile();
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    phone: user.phone || '',
  });
  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setIsDirty(true);
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: '' }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) {
      nextErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      nextErrors.lastName = 'Last name is required';
    }
    if (formData.phone && !/^[0-9+\-\s()]+$/.test(formData.phone)) {
      nextErrors.phone = 'Enter a valid phone number';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      return;
    }

    const form = new FormData();
    form.append('firstName', formData.firstName.trim());
    form.append('lastName', formData.lastName.trim());
    form.append('phone', formData.phone.trim());
    updateProfile.mutate(form, { onSuccess: () => setIsDirty(false) });
  };

  const initials = `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}` || 'PQ';

  return (
    <AccountShell
      action={
        <Link
          className="inline-flex min-h-12 items-center gap-2 border border-black px-5 text-[10px] font-semibold uppercase tracking-[0.13em]"
          href="/orders"
        >
          <Package size={15} /> View orders
        </Link>
      }
      description="Keep delivery details current, review past orders and manage how you access PickNQuicks."
      title="Your workspace account."
    >
      <div className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="border border-black/15 bg-white p-7 text-black sm:p-9">
          <div className="flex items-center gap-5">
            {user.avatarUrl ? (
              <Image
                alt="Profile"
                className="size-20 rounded-full object-cover"
                height={80}
                src={resolveAvatarUrl(user.avatarUrl) || user.avatarUrl}
                width={80}
              />
            ) : (
              <div className="flex size-20 items-center justify-center rounded-full bg-black text-xl font-semibold text-white">
                {initials}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-2xl font-normal uppercase tracking-[-0.02em]">
                {user.fullName}
              </p>
              <p className="mt-1 truncate text-xs text-black/55">{user.email}</p>
            </div>
          </div>
          <div className="mt-8 border-t border-black/15 pt-6">
            <p className="flex items-center gap-2 text-xs text-black/65">
              {user.emailVerified ? <Check size={14} /> : <AlertCircle size={14} />}
              {user.emailVerified ? 'Email verified' : 'Email confirmation pending'}
            </p>
            <p className="mt-4 flex items-center gap-2 text-xs text-black/65">
              <Mail size={14} /> Account active
            </p>
          </div>
          <Link
            className="mt-8 flex min-h-12 items-center justify-between bg-black px-5 text-[10px] font-semibold uppercase tracking-[0.13em] text-white hover:bg-black/80"
            href="/settings"
          >
            Account settings <Settings size={15} />
          </Link>
        </aside>

        <section
          aria-labelledby="profile-details-heading"
          className="bg-[#f1f1f1] p-7 sm:p-10 lg:p-12"
        >
          <div className="border-b border-black/15 pb-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/45">
              Personal details
            </p>
            <h2
              className="mt-2 text-3xl font-normal uppercase tracking-[-0.025em]"
              id="profile-details-heading"
            >
              Delivery-ready information
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-6 sm:grid-cols-2">
              <ProfileField
                error={errors.firstName}
                id="firstName"
                label="First name"
                value={formData.firstName}
                onChange={handleChange}
              />
              <ProfileField
                error={errors.lastName}
                id="lastName"
                label="Last name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <ProfileField
              error={errors.phone}
              id="phone"
              label="Phone number"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
            <button
              className={`${authPrimaryButtonClass} !bg-black hover:!bg-black/80 sm:w-auto sm:min-w-56`}
              disabled={
                updateProfile.isPending ||
                !isDirty ||
                !formData.firstName.trim() ||
                !formData.lastName.trim()
              }
              type="submit"
            >
              <Save size={15} />
              {updateProfile.isPending ? 'Saving changes…' : 'Save details'}
            </button>
          </form>

          <div className="mt-12 border-t border-black/15 pt-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/45">
              Profile image
            </p>
            <p className="mb-5 mt-2 text-sm leading-6 text-black/55">
              Add an image to make your account easier to recognise.
            </p>
            <AuthAvatarManager avatarUrl={user.avatarUrl} />
          </div>
        </section>
      </div>
    </AccountShell>
  );
}

function ProfileField({
  error,
  id,
  label,
  onChange,
  type = 'text',
  value,
}: {
  error?: string;
  id: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  value: string;
}) {
  return (
    <div>
      <label className={authLabelClass} htmlFor={id}>
        {label}
      </label>
      <input
        className={`${authInputClass} ${error ? 'border-red-700' : ''}`}
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
      />
      {error ? <p className="mt-2 text-xs text-red-700">{error}</p> : null}
    </div>
  );
}
