'use client';

import React from 'react';
import { ThemeProvider } from '@/theme/ThemeContext';
import { DateProvider } from './DateProvider';
import { AuthProvider } from './AuthProvider';
import { ApiProvider } from './ApiProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallbackComponent={<div>Something went wrong</div>}>
      <AuthProvider>
        <ApiProvider>
          <AppRouterCacheProvider>
            <ThemeProvider>
              <DateProvider>
                <QueryClientProvider client={queryClient}>
                  {children}
                </QueryClientProvider>
              </DateProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ApiProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}