'use client'

import { Container, Typography } from '@mui/material'
import { useState, lazy, Suspense } from 'react'

import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary'
import { ProgressiveLoad } from '@/components/Feedback/ProgressiveLoad'
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'
import { Snackbar } from '@/components/Feedback/Snackbar'
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'
import { PageTransition } from '@/components/Helpers/PageTransition'
import { PageBackground } from '@/components/Layout/PageBackground'
import { useApi } from '@/providers/ApiProvider'

import { AddAlertButton } from './components/AddAlertButton'
import { useAlerts } from './hooks/useAlerts'
import { ActionContainer, PageHeader } from './styled'

const AlertsTable = lazy(() =>
  import('./components/AlertsTable').then(module => ({ default: module.AlertsTable })),
)

export const Alertas = () => {
  const { alerts, loading, error, refreshAlerts, toggleAlert, deleteAlert } = useAlerts()
  const { revalidateAlerts } = useApi()

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>(
    'success',
  )

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    console.log('showSnackbar called with:', { message, severity })
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

  const handleDeleteAlert = async (alertId: string) => {
    await deleteAlert(alertId)
    revalidateAlerts()
  }

  const handleToggleAlert = async (alertId: string, field: 'recurring' | 'triggered', value: boolean) => {
    await toggleAlert(alertId, field, value)
    revalidateAlerts()
  }

  return (
    <PageTransition direction="up" duration={0.4} distance={30}>
      <ErrorBoundary>
        <PageBackground imageName="Alertas" opacity={0.2}>
          <Container maxWidth="xl">
            <PageHeader>
              <Typography variant="h2" component="h2">
                Alertas de Preço
              </Typography>
            </PageHeader>

            <ActionContainer>
              <Suspense fallback={<ContentSkeleton type="card" cardHeight={50} />}>
                <AddAlertButton refreshAlerts={refreshAlerts} showSnackbar={showSnackbar} />
              </Suspense>
            </ActionContainer>

            <SuspenseWrapper fallback={<ContentSkeleton type="card" cardHeight={400} />}>
              <ProgressiveLoad delay={0.2}>
                <AlertsTable
                  key={alerts.length}
                  alerts={alerts}
                  loading={loading}
                  error={error}
                  refreshAlerts={refreshAlerts}
                  toggleAlert={handleToggleAlert}
                  deleteAlert={handleDeleteAlert}
                  showSnackbar={showSnackbar}
                />
              </ProgressiveLoad>
            </SuspenseWrapper>
          </Container>
        </PageBackground>
      </ErrorBoundary>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </PageTransition>
  )
}
