'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { api } from '@/services/api';

// Context type
type ApiContextType = {
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
  revalidateAlerts: () => void;
  revalidateFavorites: () => void;
};

// Create context with default values
const ApiContext = createContext<ApiContextType>({
  isLoading: false,
  error: null,
  clearError: () => {},
  revalidateAlerts: () => {},
  revalidateFavorites: () => {},
});

export const useApi = () => useContext(ApiContext);

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alertsRevalidationKey, setAlertsRevalidationKey] = useState(0);
  const [favoritesRevalidationKey, setFavoritesRevalidationKey] = useState(0);

  // Clear error helper
  const clearError = () => setError(null);

  // Revalidation functions
  const revalidateAlerts = () => setAlertsRevalidationKey(prev => prev + 1);
  const revalidateFavorites = () => setFavoritesRevalidationKey(prev => prev + 1);

  // Set up global error handling for API
  useEffect(() => {
    // This could be expanded to include global API error handling
    // For example, setting up global interceptors or event listeners
    
    // Clean up on unmount
    return () => {
      // Any cleanup needed
    };
  }, [session]);

  const value = {
    isLoading,
    error,
    clearError,
    revalidateAlerts,
    revalidateFavorites,
  };

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
}