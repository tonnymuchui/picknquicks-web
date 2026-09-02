'use client';

import { Check, Eye, EyeOff, LockKeyhole, LogOut, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { AccountShell } from '@/components/auth/account-shell';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { useAuth } from '@/lib/auth/hooks';
import { useChangePassword, useLogout } from '@/lib/auth/mutations';

type PasswordField = 'current' | 'new' | 'confirm';

function SettingsContent() {
  const { user } = useAuth();
  const changePassword = useChangePassword();
  const logout = useLogout();
  const [showPasswords, setShowPasswords] = useState<Record<PasswordField, boolean>>({
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

  const validatePasswordForm = () => {
    const errors: Record<string, string> = {};
    if (!passwordForm.currentPassword) {errors.currentPassword = 'Current password is required';}
    if (!passwordForm.newPassword) {errors.newPassword = 'New password is required';}
    else if (passwordForm.newPassword.length < 8) {errors.newPassword = 'Use at least 8 characters';}
    if (!passwordForm.confirmPassword) {errors.confirmPassword = 'Confirm your new password';}
    else if (passwordForm.newPassword !== passwordForm.confirmPassword)
      {errors.confirmPassword = 'Passwords do not match';}
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPasswordForm((current) => ({ ...current, [name]: value }));
    setIsPasswordDirty(true);
    if (passwordErrors[name]) {setPasswordErrors((current) => ({ ...current, [name]: '' }));}
  };

  const handlePasswordSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validatePasswordForm()) {return;}
    changePassword.mutate(passwordForm, {
      onSuccess: () => {
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setPasswordErrors({});
        setIsPasswordDirty(false);
      },
    });
  };

  const passwordStrength = (() => {
    const password = passwordForm.newPassword;
    if (password.length < 8) {return { label: 'Weak', width: '33%', danger: true };}
    if (
      password.length >= 12 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    )
      {return { label: 'Strong', width: '100%', danger: false };}
    return { label: 'Medium', width: '66%', danger: false };
  })();

  const handleLogout = () => {
    if (window.confirm('Log out of PickNQuicks on this device?')) {logout.mutate();}
  };

  return (
    <AccountShell
      action={
        <Link
          className="inline-flex min-h-12 items-center border border-black px-5 text-[10px] font-semibold uppercase tracking-[0.13em]"
          href="/auth/profile"
        >
          Return to profile
        </Link>
      }
      description="Update your password and review the security status of your PickNQuicks account."
      title="Security settings."
    >
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <section aria-labelledby="password-heading" className="border border-black/15 bg-white">
          <header className="border-b border-black/15 bg-[#f1f1f1] px-6 py-6 sm:px-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/45">
              Account access
            </p>
            <h2
              className="mt-2 flex items-center gap-3 text-2xl font-normal uppercase tracking-[-0.025em]"
              id="password-heading"
            >
              <LockKeyhole aria-hidden="true" size={21} strokeWidth={1.5} /> Change password
            </h2>
            <p className="mt-2 text-sm leading-6 text-black/55">
              Choose a password you do not use for another service.
            </p>
          </header>

          <form className="p-6 sm:p-8" onSubmit={handlePasswordSubmit}>
            <div className="grid gap-6">
              <PasswordInput
                error={passwordErrors.currentPassword}
                field="current"
                id="currentPassword"
                label="Current password"
                show={showPasswords.current}
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                onToggle={() =>
                  setShowPasswords((current) => ({ ...current, current: !current.current }))
                }
              />
              <div className="border-t border-black/10 pt-6">
                <PasswordInput
                  error={passwordErrors.newPassword}
                  field="new"
                  id="newPassword"
                  label="New password"
                  show={showPasswords.new}
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  onToggle={() =>
                    setShowPasswords((current) => ({ ...current, new: !current.new }))
                  }
                />
                {passwordForm.newPassword ? (
                  <div className="mt-4">
                    <div className="flex items-center gap-3">
                      <div className="h-1 flex-1 bg-black/10">
                        <div
                          className={
                            passwordStrength.danger ? 'h-full bg-red-700' : 'h-full bg-black'
                          }
                          style={{ width: passwordStrength.width }}
                        />
                      </div>
                      <span
                        className={`text-xs font-semibold ${passwordStrength.danger ? 'text-red-700' : 'text-black'}`}
                      >
                        {passwordStrength.label}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-black/45">
                      Use 12+ characters with uppercase letters, numbers and symbols.
                    </p>
                  </div>
                ) : null}
              </div>
              <PasswordInput
                error={passwordErrors.confirmPassword}
                field="confirm"
                id="confirmPassword"
                label="Confirm new password"
                show={showPasswords.confirm}
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                onToggle={() =>
                  setShowPasswords((current) => ({ ...current, confirm: !current.confirm }))
                }
              />
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-black/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-black/45">You will remain signed in on this device.</p>
              <button
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-black px-6 text-[10px] font-semibold uppercase tracking-[0.13em] text-white transition-colors hover:bg-black/75 disabled:cursor-not-allowed disabled:opacity-35"
                disabled={changePassword.isPending || !isPasswordDirty}
                type="submit"
              >
                <ShieldCheck aria-hidden="true" size={16} />
                {changePassword.isPending ? 'Updating…' : 'Update password'}
              </button>
            </div>
          </form>
        </section>

        <aside className="space-y-5">
          <section className="bg-[#1f1c17] p-6 text-white sm:p-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
              Account overview
            </p>
            {user ? (
              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="text-xs text-white/50">Signed in as</dt>
                  <dd className="mt-1 break-all font-medium">{user.email}</dd>
                </div>
                <div className="border-t border-white/15 pt-5">
                  <dt className="text-xs text-white/50">Member since</dt>
                  <dd className="mt-1 font-medium">
                    {new Date(user.createdAt).toLocaleDateString('en-KE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </dd>
                </div>
                <div className="flex items-center gap-2 border-t border-white/15 pt-5">
                  {user.emailVerified ? <Check size={15} /> : <ShieldCheck size={15} />}
                  <span>{user.emailVerified ? 'Email verified' : 'Verification pending'}</span>
                </div>
              </dl>
            ) : null}
          </section>

          <section className="border border-black/15 bg-[#f1f1f1] p-6">
            <h2 className="text-sm font-semibold text-black">End this session</h2>
            <p className="mt-2 text-xs leading-5 text-black/55">
              Log out when using a shared or public device.
            </p>
            <button
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 border border-black text-xs font-semibold text-black transition-colors hover:bg-black hover:text-white disabled:opacity-50"
              disabled={logout.isPending}
              type="button"
              onClick={handleLogout}
            >
              <LogOut aria-hidden="true" size={15} />
              {logout.isPending ? 'Logging out…' : 'Log out'}
            </button>
          </section>
        </aside>
      </div>
    </AccountShell>
  );
}

function PasswordInput({
  error,
  field,
  id,
  label,
  onChange,
  onToggle,
  show,
  value,
}: {
  error?: string;
  field: PasswordField;
  id: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onToggle: () => void;
  show: boolean;
  value: string;
}) {
  return (
    <div>
      <label className="text-[11px] font-semibold uppercase tracking-[0.1em]" htmlFor={id}>
        {label}
      </label>
      <div className="relative mt-2">
        <LockKeyhole
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/35"
          size={17}
        />
        <input
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={Boolean(error)}
          autoComplete={field === 'current' ? 'current-password' : 'new-password'}
          className={`min-h-12 w-full border bg-white pl-11 pr-12 text-sm outline-none transition-colors focus:border-black ${error ? 'border-red-700 bg-red-50' : 'border-black/20'}`}
          id={id}
          name={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
        />
        <button
          aria-label={`${show ? 'Hide' : 'Show'} ${label.toLowerCase()}`}
          className="absolute right-1 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center text-black/45 hover:text-black"
          type="button"
          onClick={onToggle}
        >
          {show ? <EyeOff aria-hidden="true" size={17} /> : <Eye aria-hidden="true" size={17} />}
        </button>
      </div>
      {error ? (
        <p className="mt-2 text-xs text-red-700" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  );
}
