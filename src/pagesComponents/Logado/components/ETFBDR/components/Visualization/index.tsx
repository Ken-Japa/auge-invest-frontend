import { SelectChangeEvent, Typography } from '@mui/material'
import React, { useRef } from 'react'

import { PaginationControls } from '@/components/Data-Display/PaginationControls'
import { ETFBDRFilter } from '@/services/api/types/etfbdr'

import CardView from './Cards'
import GridView from './Grid'
import { useETFBDRData } from './hooks/useETFBDRData'
import { ErrorContainer, VisualizationContainer } from './styled'
import TableView from './Table'
import { ETFBDRLoading } from './utils/ETFBDRLoading'
import { ETFBDRNotFound } from './utils/ETFBDRNotFound'

interface VisualizationETFBDRsProps {
  view: 'card' | 'table' | 'grid'
  filters: ETFBDRFilter
}

export const VisualizationETFBDRs = ({ view, filters }: VisualizationETFBDRsProps) => {
  const validPageSizes = [10, 20, 50, 100]
  const initialPageSize = validPageSizes.includes(filters.pageSize || 20) ? filters.pageSize || 20 : 20

  const { etfbdrs, loading, error, page, totalPages, pageSize, setPage, setPageSize } = useETFBDRData({
    filters,
    initialPageSize,
  })

  const containerRef = useRef<HTMLDivElement>(null)

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage - 1)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    const newPageSize = Number(event.target.value)
    setPageSize(newPageSize)
    setPage(0)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (loading) {
    return <ETFBDRLoading />
  }

  if (error) {
    return (
      <ErrorContainer>
        <Typography color="error">{error}</Typography>
      </ErrorContainer>
    )
  }

  if (etfbdrs.length === 0) {
    return <ETFBDRNotFound />
  }

  const renderVisualization = () => {
    switch (view) {
      case 'card':
        return <CardView etfbdrs={etfbdrs} />
      case 'table':
        return <TableView etfbdrs={etfbdrs} />
      case 'grid':
        return <GridView etfbdrs={etfbdrs} />
      default:
        return <CardView etfbdrs={etfbdrs} />
    }
  }

  return (
    <VisualizationContainer ref={containerRef}>
      {renderVisualization()}

      {totalPages > 1 && (
        <PaginationControls
          totalPages={totalPages}
          page={page}
          pageSize={pageSize}
          validPageSizes={validPageSizes}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
        />
      )}
    </VisualizationContainer>
  )
}
