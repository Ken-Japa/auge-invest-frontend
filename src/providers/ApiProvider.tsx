import React, { createContext, useCallback, useContext, useState } from 'react'

interface ApiContextType {
  revalidateAlerts: () => void
  alertsRevalidationKey: number
  revalidateFavorites: () => void
  favoritesRevalidationKey: number
}

const ApiContext = createContext<ApiContextType | undefined>(undefined)

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alertsRevalidationKey, setAlertsRevalidationKey] = useState(0)
  const [favoritesRevalidationKey, setFavoritesRevalidationKey] = useState(0)

  const revalidateAlerts = useCallback(() => {
    setAlertsRevalidationKey((prev) => prev + 1)
  }, [])

  const revalidateFavorites = useCallback(() => {
    setFavoritesRevalidationKey((prev) => prev + 1)
  }, [])

  const value = {
    revalidateAlerts,
    alertsRevalidationKey,
    revalidateFavorites,
    favoritesRevalidationKey,
  }

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}

export const useApi = () => {
  const context = useContext(ApiContext)
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider')
  }
  return context
}
