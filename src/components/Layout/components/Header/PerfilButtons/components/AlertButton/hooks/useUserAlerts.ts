import { useCallback, useEffect, useMemo, useState } from 'react'

import { useApi } from '@/providers/ApiProvider'
import { api } from '@/services/api'
import { Alert } from '@/services/api/types/alert-types'

export const useUserAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { alertsRevalidationKey, revalidateAlerts } = useApi()

  const fetchAlerts = useCallback(async () => {
    try {
      setLoading(true)
      const response = await api.alerts.getAlertsByUser()
      const sortedAlerts = response.result.sort((a: Alert, b: Alert) => {
        // Prioritize triggered alerts first
        if (a.triggered && !b.triggered) return -1
        if (!a.triggered && b.triggered) return 1

        // Then sort by creation date (most recent first)
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      })
      setAlerts(sortedAlerts)
    } catch (err) {
      setError('Failed to fetch alerts.')
      console.error('Failed to fetch alerts:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAlerts()
  }, [fetchAlerts, alertsRevalidationKey])

  const markAlertAsRead = useCallback(
    async (alertId: string) => {
      try {
        await api.alerts.updateAlert(alertId, { triggered: false })
        setAlerts((prevAlerts) =>
          prevAlerts.map((alert) => (alert._id === alertId ? { ...alert, triggered: false } : alert)),
        )
        revalidateAlerts() // Call revalidateAlerts after marking an alert as read
      } catch (err) {
        console.error('Failed to mark alert as read:', err)
      }
    },
    [revalidateAlerts],
  )

  const triggeredAlertCount = useMemo(() => {
    return alerts.filter((alert) => alert.triggered).length
  }, [alerts])

  return {
    alerts,
    loading,
    error,
    markAlertAsRead,
    triggeredAlertCount,
    fetchAlerts,
  }
}
