import { Grid, Typography } from '@mui/material'
import React, { lazy, Suspense } from 'react'

import { Alert } from '@/services/api/types'

const LazyGlobalSearchBar = lazy(() => import('@/pagesComponents/Logado/components/SearchBar'))

interface AlertAssetFieldProps {
  formData: {
    asset: string
  }
  handleAssetChange: (newValue: string | null) => void
  alert: Alert | null
}

/**
 * Componente para seleção de ativos no formulário de alerta.
 * Exibe o ativo selecionado se o alerta já existir, ou um campo de busca global para selecionar um novo ativo.
 * @param {AlertAssetFieldProps} props - As props do componente.
 */
export const AlertAssetField: React.FC<AlertAssetFieldProps> = ({ formData, handleAssetChange, alert }) => {
  return (
    <Grid item xs={12}>
      {alert ? (
        <Typography variant="h3" align="center">
          {formData.asset}
        </Typography>
      ) : (
        <Suspense fallback={<div>Carregando busca...</div>}>
          <LazyGlobalSearchBar
            type="TodosSimplificado"
            onSelect={(item) => {
              if (item.id) {
                handleAssetChange(item.id)
              }
            }}
          />
        </Suspense>
      )}
    </Grid>
  )
}
