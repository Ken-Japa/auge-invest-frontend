import { CircularProgress, Typography } from '@mui/material'
import React from 'react'

import { PaginationControls } from '@/components/Data-Display/PaginationControls'

import { VisualizacaoBDRsProps } from '../../types/index'
import { EmptyResultsContainer, ErrorContainer, LoadingContainer, VisualizationContainer } from './styled'
import { BDRFilterControls } from './utils/BDRFilterControls'
import { BDRVisualizationRenderer } from './utils/BDRVisualizationRenderer'
import { useBDRs } from './utils/useBDRs'

export const VisualizacaoBDRs = ({
  mode = 'card',
  filter = {},
  onError,
  defaultPageSize = 10,
}: VisualizacaoBDRsProps) => {
  const {
    bdrs,
    loading,
    error,
    page,
    totalPages,
    pageSize,
    bdrType,
    containerRef,
    validPageSizes,
    handlePageChange,
    handlePageSizeChange,
    handleBDRTypeChange,
  } = useBDRs({ filter, onError, defaultPageSize })

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

  if (bdrs.length === 0) {
    return (
      <EmptyResultsContainer>
        <Typography>Nenhum BDR encontrado com os filtros aplicados.</Typography>
      </EmptyResultsContainer>
    )
  }

  return (
    <VisualizationContainer ref={containerRef}>
      <BDRFilterControls bdrType={bdrType} handleBDRTypeChange={handleBDRTypeChange} />

      <BDRVisualizationRenderer mode={mode} bdrs={bdrs} />

      {totalPages > 1 && (
        <PaginationControls
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
          validPageSizes={validPageSizes}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
        />
      )}
    </VisualizationContainer>
  )
}

export default VisualizacaoBDRs
