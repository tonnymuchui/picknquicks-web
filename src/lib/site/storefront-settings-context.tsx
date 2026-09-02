'use client';

import { createContext, useContext, type ReactNode } from 'react';

import type { StorefrontSettings } from './storefront-settings';

const StorefrontSettingsContext = createContext<StorefrontSettings | null>(null);

export function StorefrontSettingsProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: StorefrontSettings;
}) {
  return (
    <StorefrontSettingsContext.Provider value={value}>
      {children}
    </StorefrontSettingsContext.Provider>
  );
}

export function useStorefrontSettings() {
  return useContext(StorefrontSettingsContext);
}
