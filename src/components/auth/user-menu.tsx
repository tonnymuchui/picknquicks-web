'use client';

import { ChevronDown, Crown, LogOut, Settings, Shield, ShoppingBag, Star, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { useAuth } from '@/lib/auth/hooks';
import { useLogout } from '@/lib/auth/mutations';
import { resolveAvatarUrl } from '@/lib/utils/media';
import { UserRole } from '@/types/auth';

function getRoleBadge(roles: UserRole[]) {
  if (roles.includes(UserRole.ADMIN)) {return { label: 'Admin', icon: Crown, bg: 'bg-highlight/15 text-highlight' };}
  if (roles.includes(UserRole.MANAGER)) {return { label: 'Manager', icon: Shield, bg: 'bg-accent/15 text-accent-light' };}
  if (roles.includes(UserRole.STAFF)) {return { label: 'Staff', icon: Star, bg: 'bg-secondary/15 text-secondary' };}
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
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {setIsOpen(false);}
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  if (isLoading) {return <div className="h-8 w-8 animate-pulse rounded-lg bg-primary-light/20" />;}

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center gap-3">
        <Link className="text-sm font-medium text-secondary/60 transition-colors hover:text-secondary" href="/auth/login">Sign in</Link>
        <Link className="rounded-lg bg-secondary px-4 py-1.5 text-sm font-semibold text-primary-dark transition-colors hover:bg-secondary-light" href="/auth/register">Sign up</Link>
      </div>
    );
  }

  const roleBadge = getRoleBadge(user.roles);
  const isPrivileged = user.roles.some((r) => [UserRole.ADMIN, UserRole.STAFF, UserRole.MANAGER].includes(r));

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className={`flex items-center gap-2 rounded-lg p-1.5 transition-colors ${isOpen ? 'bg-primary-light/20' : 'hover:bg-primary-light/10'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {avatarUrl ? (
          <Image alt={user.fullName} className="h-7 w-7 rounded-md object-cover" height={28} src={avatarUrl} width={28} />
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-light/25 text-[10px] font-bold text-secondary">
            {user.firstName?.[0]}{user.lastName?.[0]}
          </div>
        )}
        <span className="hidden max-w-[72px] truncate text-sm font-medium text-secondary/75 md:block">{user.firstName}</span>
        <ChevronDown className={`h-3 w-3 text-secondary/40 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen ? (
        <div className="absolute right-0 z-50 mt-2 w-56 animate-float-in overflow-hidden rounded-xl border border-primary-light/15 bg-primary-dark shadow-xl">
          {/* User info */}
          <div className="border-b border-primary-light/10 p-4">
            <p className="text-sm font-bold text-secondary">{user.fullName}</p>
            <p className="mt-0.5 truncate text-xs text-secondary/45">{user.email}</p>
            {roleBadge ? (
              <span className={`mt-2 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold ${roleBadge.bg}`}>
                <roleBadge.icon size={10} />
                {roleBadge.label}
              </span>
            ) : null}
          </div>

          {/* Links */}
          <div className="p-1.5">
            <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-secondary/65 transition-colors hover:bg-primary-light/12 hover:text-secondary" href="/auth/profile" onClick={() => setIsOpen(false)}>
              <User className="h-4 w-4" /> Profile
            </Link>
            <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-secondary/65 transition-colors hover:bg-primary-light/12 hover:text-secondary" href="/auth/orders" onClick={() => setIsOpen(false)}>
              <ShoppingBag className="h-4 w-4" /> My Orders
            </Link>
            <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-secondary/65 transition-colors hover:bg-primary-light/12 hover:text-secondary" href="/settings" onClick={() => setIsOpen(false)}>
              <Settings className="h-4 w-4" /> Settings
            </Link>
          </div>

          {isPrivileged ? (
            <div className="border-t border-primary-light/10 p-1.5">
              <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-secondary transition-colors hover:bg-primary-light/12" href="/admin" onClick={() => setIsOpen(false)}>
                <Shield className="h-4 w-4" /> Admin Dashboard
              </Link>
            </div>
          ) : null}

          <div className="border-t border-primary-light/10 p-1.5">
            <button
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-highlight transition-colors hover:bg-highlight/8"
              onClick={() => { setIsOpen(false); logout.mutate(); }}
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
