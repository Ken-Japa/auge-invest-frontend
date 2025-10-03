import ClearIcon from '@mui/icons-material/Clear'
import { Box, Grid, IconButton } from '@mui/material'
import React, { lazy, Suspense } from 'react'

import { Alert } from '@/services/api/types'

import { StyledAssetTypography } from './styled'

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
      {alert || formData.asset ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <StyledAssetTypography align="center">{formData.asset}</StyledAssetTypography>
          {!alert && (
            <IconButton onClick={() => handleAssetChange(null)} size="small">
              <ClearIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
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
