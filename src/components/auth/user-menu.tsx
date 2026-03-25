'use client';

import { User, ShoppingBag, Settings, LogOut, Shield, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

import { useAuth } from '@/lib/auth/hooks';
import { useLogout } from '@/lib/auth/mutations';
import { resolveAvatarUrl } from '@/lib/utils/media';
import { UserRole } from '@/types/auth';

export function UserMenu() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const logout = useLogout();
  const avatarUrl = resolveAvatarUrl(user?.avatarUrl);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menuItemClass =
    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-secondary/85 transition-colors hover:bg-primary-light/20 hover:text-secondary';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isLoading) {
    return <div className="bg-primary-light/35 h-8 w-8 animate-pulse rounded-full" />;
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center space-x-3">
        <Link
          className="text-secondary/80 hover:text-secondary text-sm font-medium transition-colors"
          href="/auth/login"
        >
          Sign in
        </Link>
        <Link
          className="bg-secondary text-primary-dark hover:bg-secondary-light rounded-xl px-4 py-2 text-sm font-semibold transition-colors"
          href="/auth/register"
        >
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className="hover:bg-primary-light/25 flex items-center gap-2 rounded-xl p-1 transition-colors focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {avatarUrl && user ? (
          <Image
            alt={user.fullName}
            className="h-8 w-8 rounded-lg object-cover"
            height={32}
            src={avatarUrl}
            width={32}
          />
        ) : (
          <div className="bg-primary-light flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white">
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </div>
        )}
        <span className="text-secondary/85 hidden text-sm font-medium md:block">
          {user?.firstName}
        </span>
        <ChevronDown
          className={`text-secondary/60 h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen ? (
        <div className="border-primary-light/30 bg-primary-dark absolute right-0 z-50 mt-3 w-60 overflow-hidden rounded-2xl border shadow-xl">
          <div className="border-primary-light/30 bg-primary border-b p-4">
            <p className="text-secondary text-sm font-semibold">{user.fullName}</p>
            <p className="text-secondary/70 mt-0.5 truncate text-xs">{user.email}</p>
          </div>

          <div className="space-y-1 p-2">
            <Link className={menuItemClass} href="/auth/profile" onClick={() => setIsOpen(false)}>
              <User className="h-4 w-4" />
              Profile
            </Link>

            <Link className={menuItemClass} href="/auth/orders" onClick={() => setIsOpen(false)}>
              <ShoppingBag className="h-4 w-4" />
              My Orders
            </Link>

            <Link className={menuItemClass} href="/settings" onClick={() => setIsOpen(false)}>
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </div>

          {user.roles.includes(UserRole.ADMIN) ? (
            <div className="border-primary-light/30 border-t px-2 py-1.5">
              <Link
                className="text-secondary hover:bg-primary-light/20 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition-colors"
                href="/admin"
                onClick={() => setIsOpen(false)}
              >
                <Shield className="h-4 w-4" />
                Admin Dashboard
              </Link>
            </div>
          ) : null}

          <div className="border-primary-light/30 border-t px-2 py-1.5">
            <button
              className="text-highlight hover:bg-highlight/10 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors"
              onClick={() => {
                setIsOpen(false);
                logout.mutate();
              }}
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
