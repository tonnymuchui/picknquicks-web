'use client';

import { ChevronDown, LogOut, Settings, Shield, ShoppingBag, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { useAuth } from '@/lib/auth/hooks';
import { useLogout } from '@/lib/auth/mutations';
import { resolveAvatarUrl } from '@/lib/utils/media';
import { UserRole } from '@/types/auth';

function getRoleBadge(roles: UserRole[]) {
  if (roles.includes(UserRole.ADMIN)) {
    return 'Admin';
  }
  if (roles.includes(UserRole.MANAGER)) {
    return 'Manager';
  }
  if (roles.includes(UserRole.STAFF)) {
    return 'Staff';
  }
  return null;
}

export function UserMenu() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const logout = useLogout();
  const avatarUrl = resolveAvatarUrl(user?.avatarUrl);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  if (isLoading) {
    return <div className="bg-primary-light/20 h-8 w-8 animate-pulse rounded-lg" />;
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          className="text-secondary/60 hover:text-secondary text-sm font-medium transition-colors"
          href="/auth/login"
        >
          Sign in
        </Link>
        <Link
          className="bg-secondary text-primary-dark hover:bg-secondary-light rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors"
          href="/auth/register"
        >
          Sign up
        </Link>
      </div>
    );
  }

  const roleBadge = getRoleBadge(user.roles);
  const isPrivileged = user.roles.some((r) =>
    [UserRole.ADMIN, UserRole.STAFF, UserRole.MANAGER].includes(r)
  );

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className={`flex items-center gap-2 rounded-lg p-1.5 transition-colors ${isOpen ? 'bg-primary-light/20' : 'hover:bg-primary-light/10'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {avatarUrl ? (
          <Image
            alt={user.fullName}
            className="h-7 w-7 rounded-md object-cover"
            height={28}
            src={avatarUrl}
            width={28}
          />
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#f2eee7] text-[#754329]">
            <User aria-hidden="true" className="h-4 w-4" />
          </div>
        )}
        <span className="text-secondary/75 hidden max-w-[72px] truncate text-sm font-medium md:block">
          {user.firstName}
        </span>
        <ChevronDown
          className={`text-secondary/40 h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen ? (
        <div
          aria-label="Account menu"
          className="absolute right-0 top-full z-50 mt-2 w-72 border border-[#d7d0c6] bg-white text-[#1f1c17]"
          role="menu"
        >
          <div className="flex items-center gap-3 border-b border-[#d7d0c6] p-4">
            {avatarUrl ? (
              <Image
                alt=""
                className="size-10 shrink-0 object-cover"
                height={40}
                src={avatarUrl}
                width={40}
              />
            ) : (
              <div className="flex size-10 shrink-0 items-center justify-center bg-[#f2eee7] text-[#754329]">
                <User aria-hidden="true" className="size-5" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[#1f1c17]">{user.fullName}</p>
              <p className="mt-0.5 truncate text-xs text-black/50">{user.email}</p>
            </div>
            {roleBadge ? (
              <span className="shrink-0 text-[9px] font-bold uppercase tracking-[.1em] text-[#9a5d3b]">
                {roleBadge}
              </span>
            ) : null}
          </div>

          <div className="p-2">
            <Link
              className="flex min-h-10 items-center gap-3 px-3 text-sm text-black/65 hover:bg-[#f1f1f1] hover:text-black"
              href="/auth/profile"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-4 w-4" /> Profile
            </Link>
            <Link
              className="flex min-h-10 items-center gap-3 px-3 text-sm text-black/65 hover:bg-[#f1f1f1] hover:text-black"
              href="/orders"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingBag className="h-4 w-4" /> My Orders
            </Link>
            <Link
              className="flex min-h-10 items-center gap-3 px-3 text-sm text-black/65 hover:bg-[#f1f1f1] hover:text-black"
              href="/settings"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4" /> Settings
            </Link>
          </div>

          {isPrivileged ? (
            <div className="border-t border-[#d7d0c6] p-2">
              <Link
                className="flex min-h-10 items-center gap-3 bg-[#1f1c17] px-3 text-sm font-semibold text-white hover:bg-black"
                href="/admin"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                <Shield className="h-4 w-4" /> Admin Dashboard
              </Link>
            </div>
          ) : null}

          <div className="border-t border-[#d7d0c6] p-2">
            <button
              className="flex min-h-10 w-full items-center gap-3 px-3 text-sm text-red-700 hover:bg-red-50"
              role="menuitem"
              type="button"
              onClick={() => {
                setIsOpen(false);
                logout.mutate();
              }}
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
