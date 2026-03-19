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
    return <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />;
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center space-x-3">
        <Link
          className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
          href="/auth/login"
        >
          Sign in
        </Link>
        <Link
          className="bg-secondary text-primary-dark hover:bg-secondary-light rounded-xl px-4 py-2 text-sm font-semibold transition-all"
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
        className="flex items-center gap-2 rounded-xl p-1 transition-colors hover:bg-white/10 focus:outline-none"
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
          <div className="bg-linear-to-br from-primary-light to-primary flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white">
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </div>
        )}
        <span className="hidden text-sm font-medium text-gray-300 md:block">{user?.firstName}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen ? (
        <div className="absolute right-0 z-50 mt-3 w-60 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50">
          <div className="bg-linear-to-r from-primary to-primary-light p-4">
            <p className="text-sm font-semibold text-white">{user.fullName}</p>
            <p className="mt-0.5 truncate text-xs text-white/70">{user.email}</p>
          </div>

          <div className="py-1.5">
            <Link
              className="hover:bg-primary/3 flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 transition-colors hover:text-gray-900"
              href="/auth/profile"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-4 w-4 text-gray-400" />
              Profile
            </Link>

            <Link
              className="hover:bg-primary/3 flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 transition-colors hover:text-gray-900"
              href="/auth/orders"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingBag className="h-4 w-4 text-gray-400" />
              My Orders
            </Link>

            <Link
              className="hover:bg-primary/3 flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 transition-colors hover:text-gray-900"
              href="/settings"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4 text-gray-400" />
              Settings
            </Link>
          </div>

          {user.roles.includes(UserRole.ADMIN) ? (
            <div className="border-t border-gray-100 py-1.5">
              <Link
                className="text-primary hover:bg-primary/5 flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors"
                href="/admin"
                onClick={() => setIsOpen(false)}
              >
                <Shield className="h-4 w-4" />
                Admin Dashboard
              </Link>
            </div>
          ) : null}

          <div className="border-t border-gray-100 py-1.5">
            <button
              className="text-accent hover:bg-accent/5 flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors"
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
