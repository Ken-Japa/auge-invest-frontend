import { useCallback, useEffect, useState } from 'react'

export interface UserSettings {
  notifications: {
    email: boolean
    push: boolean
    priceAlerts: boolean
  }
  defaultPercentages: {
    buy: number
    sell: number
  }
}

export const useSettings = () => {
  const [settings, setSettings] = useState<UserSettings>({
    notifications: {
      email: true,
      push: true,
      priceAlerts: true,
    },
    defaultPercentages: {
      buy: 5,
      sell: 5,
    },
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUserSettings = useCallback(async () => {
    try {
      setIsLoading(true)
      // TODO: Replace with actual API call
      // const response = await api.get('/user/settings');
      // setSettings(response.data);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // For now, we'll use the default settings
      setIsLoading(false)
    } catch (err) {
      setError('Falha ao carregar configurações')
      setIsLoading(false)
    }
  }, [])

  const updateSettings = useCallback(async (newSettings: Partial<UserSettings>) => {
    try {
      setIsLoading(true)
      // TODO: Replace with actual API call
      // await api.put('/user/settings', newSettings);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      setSettings((prev) => ({ ...prev, ...newSettings }))
      setIsLoading(false)
      return true
    } catch (err) {
      setError('Falha ao atualizar configurações')
      setIsLoading(false)
      return false
    }
  }, [])

  const updateNotifications = useCallback(
    async (type: keyof UserSettings['notifications'], value: boolean) => {
      const success = await updateSettings({
        notifications: { ...settings.notifications, [type]: value },
      })
      return success
    },
    [settings.notifications, updateSettings],
  )

  const updatePercentages = useCallback(
    async (type: keyof UserSettings['defaultPercentages'], value: number) => {
      const success = await updateSettings({
        defaultPercentages: { ...settings.defaultPercentages, [type]: value },
      })
      return success
    },
    [settings.defaultPercentages, updateSettings],
  )

  useEffect(() => {
    fetchUserSettings()
  }, [fetchUserSettings])

  return {
    settings,
    isLoading,
    error,
    updateNotifications,
    updatePercentages,
  }
}
