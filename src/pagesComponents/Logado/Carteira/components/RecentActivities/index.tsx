import 'dayjs/locale/pt-br'

import { CircularProgress, Divider, Typography } from '@mui/material'
import { lazy, Suspense } from 'react'

import { useFocus } from './components/FocusContext/FocusContext'
import { useSearchRecentActivities } from './hooks/searchRecentActivites'
import { ActivityContainer, CenteredTypography, LoadingBox } from './styled'

const LazyActivityListRenderer = lazy(() =>
  import('./components/ActivityListRenderer').then((mod) => ({ default: mod.ActivityListRenderer })),
)

export const RecentActivities = ({ type }: { type: 'real' | 'virtual' }) => {
  const { recentRealActivities, recentVirtualActivities, loading, error } = useSearchRecentActivities()
  const { setFocusedItem, focusedWalletId, focusedAssetCode } = useFocus()

  const handleActivityClick = (walletId: string, identifier: string | null) => {
    if (focusedWalletId === walletId && focusedAssetCode === identifier) {
      setFocusedItem(null, null)
    } else {
      setFocusedItem(walletId, identifier)
    }
  }

  return (
    <ActivityContainer>
      <CenteredTypography variant="h3" gutterBottom>
        Atividades Recentes
      </CenteredTypography>
      <Divider />

      {loading && (
        <LoadingBox>
          <CircularProgress />
        </LoadingBox>
      )}

      {error && <Typography color="error">Erro ao carregar atividades: {error}</Typography>}

      {!loading && !error && type === 'real' && recentRealActivities.length === 0 && (
        <Typography>Nenhuma atividade recente encontrada.</Typography>
      )}

      {!loading && !error && type === 'real' && recentRealActivities.length > 0 && (
        <Suspense fallback={<CircularProgress />}>
          <LazyActivityListRenderer
            activities={recentRealActivities}
            handleActivityClick={handleActivityClick}
            type="real"
          />
        </Suspense>
      )}
      {!loading && !error && type === 'virtual' && recentVirtualActivities.length === 0 && (
        <Typography>Nenhuma atividade recente encontrada.</Typography>
      )}
      {!loading && !error && type === 'virtual' && recentVirtualActivities.length > 0 && (
        <Suspense fallback={<CircularProgress />}>
          <LazyActivityListRenderer
            activities={recentVirtualActivities}
            handleActivityClick={handleActivityClick}
            type="virtual"
          />
        </Suspense>
      )}
    </ActivityContainer>
  )
}
