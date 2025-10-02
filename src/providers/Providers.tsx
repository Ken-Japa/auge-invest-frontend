'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

import { ThemeProvider } from '@/theme/ThemeContext'

import { ApiProvider } from './ApiProvider'
import { AuthProvider } from './AuthProvider'
import { DateProvider } from './DateProvider'

const queryClient = new QueryClient()
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'

import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallbackComponent={<div>Something went wrong</div>}>
      <AuthProvider>
        <ApiProvider>
          <AppRouterCacheProvider>
            <ThemeProvider>
              <DateProvider>
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
              </DateProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ApiProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}
