import { CircularProgress, Typography } from '@mui/material'

import { PaginationControls } from '@/components/Data-Display/PaginationControls'
import { VisualizationContainer } from '@/components/Shared-Styles/AtivosStyledComponents'

import { useFIIVisualizationLogic } from '../../hooks/useFIIVisualizationLogic'
import { VisualizacaoFIIsProps } from '../../types'

import { FIIViewRenderer } from './FIIViewRenderer'
import {
  EmptyResultsContainer,
  ErrorContainer,
  LoadingContainer,
  PaginationContainer,
} from './styled'



export const VisualizacaoFIIs = ({
  mode = 'card',
  filter = {},
  onError,
  defaultPageSize = 10,
}: VisualizacaoFIIsProps) => {
  const {
    fiis,
    loading,
    error,
    page,
    totalPages,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    containerRef,
    validPageSizes,
  } = useFIIVisualizationLogic({ filter, onError, defaultPageSize })

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    )
  }

  if (error) {
    return (
      <ErrorContainer>
        <Typography color="error">{error}</Typography>
      </ErrorContainer>
    )
  }

  if (fiis.length === 0) {
    return (
      <EmptyResultsContainer>
        <Typography>Nenhum FII encontrado com os filtros aplicados.</Typography>
      </EmptyResultsContainer>
    )
  }

  return (
    <VisualizationContainer ref={containerRef}>
      <FIIViewRenderer mode={mode} fiis={fiis} />

      {totalPages > 1 && (
        <PaginationContainer
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <PaginationControls
            page={page}
            totalPages={totalPages}
            pageSize={pageSize}
            validPageSizes={validPageSizes}
            handlePageChange={handlePageChange}
            handlePageSizeChange={handlePageSizeChange}
          />
        </PaginationContainer>
      )}
    </VisualizationContainer>
  )
}

export default VisualizacaoFIIs
