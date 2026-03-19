'use client';
import { QueryClient, QueryCache, MutationCache, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';

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
            onError: (error: unknown) => {
              const err = error as { response?: { data?: { message?: string } } };
              toast.error(err?.response?.data?.message || 'Something went wrong');
            },
          },
        },
        queryCache: new QueryCache({
          onError: (error: unknown) => {
            console.error('Query error:', error);
          },
        }),
        mutationCache: new MutationCache({
          onError: (error: unknown) => {
            console.error('Mutation error:', error);
            if (error instanceof Error) {
              console.error('Error message:', error.message);
              console.error('Error stack:', error.stack);
            }
            const axiosError = error as { response?: { status?: number; data?: unknown } };
            if (axiosError?.response) {
              console.error('API Response Status:', axiosError.response.status);
              console.error('API Response Data:', axiosError.response.data);
            }
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ReactQueryDevtools initialIsOpen={false} />

      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
