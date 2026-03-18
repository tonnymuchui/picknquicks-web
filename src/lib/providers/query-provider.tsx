'use client';
import { QueryClient, QueryCache, MutationCache, QueryClientProvider } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { Toaster } from 'sonner';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            gcTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            retry: 1,
          },
          mutations: {
            onError: (error: any) => {
              toast.error(error?.response?.data?.message || 'Something went wrong');
            },
          },
        },
        queryCache: new QueryCache({
          onError: (error: any) => {
            console.error('Query error:', error);
          },
        }),
        mutationCache: new MutationCache({
          onError: (error: any) => {
            console.error('Mutation error:', error);
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ReactQueryDevtools initialIsOpen={false} />

      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}
