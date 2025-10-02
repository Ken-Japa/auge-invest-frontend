import { Alert, Box, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(3),
}))

interface DerivativosStatusDisplayProps {
  loading: boolean
  error: string | null
  hasDerivatives: boolean
  children: React.ReactNode
}

/**
 * Componente para exibir o status de carregamento, erro ou ausência de derivativos.
 * Renderiza os filhos apenas se não houver carregamento, erro ou ausência de derivativos.
 * @param loading Indica se os dados estão sendo carregados.
 * @param error Mensagem de erro, se houver.
 * @param hasDerivatives Indica se há derivativos disponíveis.
 * @param children Conteúdo a ser renderizado quando os dados estiverem prontos.
 */
export const DerivativosStatusDisplay: React.FC<DerivativosStatusDisplayProps> = ({
  loading,
  error,
  hasDerivatives,
  children,
}) => {
  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    )
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  if (!hasDerivatives) {
    return <Alert severity="info">Não há derivativos disponíveis para este ativo.</Alert>
  }

  return <>{children}</>
}
