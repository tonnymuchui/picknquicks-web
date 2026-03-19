'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const router = useRouter();

  if (!isOpen) {return null;}

  const handleLogin = () => {
    onClose();
    router.push('/auth/login');
  };

  const handleRegister = () => {
    onClose();
    router.push('/auth/register');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <button
          className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-gray-600"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <div className="mb-4 flex justify-center">
          <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-xl">
            <span className="text-secondary text-sm font-bold">PQ</span>
          </div>
        </div>

        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Welcome to PickNQuicks
        </h2>

        <div className="space-y-4">
          <button
            className="bg-primary hover:bg-primary-light shadow-primary/25 w-full rounded-xl py-3.5 font-semibold text-white shadow-lg transition-all"
            onClick={handleLogin}
          >
            Sign In
          </button>

          <button
            className="border-primary text-primary hover:bg-primary/5 w-full rounded-xl border-2 py-3.5 font-semibold transition-all"
            onClick={handleRegister}
          >
            Create Account
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
}
