import React from 'react';
import { ETFFilter } from '@/services/api/types/etf';
import { Typography, CircularProgress } from '@mui/material';
import CardView from './Cards';
import TableView from './Table';
import GridView from './Grid';
import { PaginationControls } from '@/components/Data-Display/PaginationControls';
import { useETFVisualizationLogic } from './hooks/useETFVisualizationLogic';
import {
  VisualizationContainer,
  LoadingContainer,
  ErrorContainer,
  EmptyResultsContainer
} from './styled';

interface VisualizationETFsProps {
  view: 'card' | 'table' | 'grid';
  filters: ETFFilter;
  defaultPageSize?: number;
}

export const VisualizationETFs = ({
  view,
  filters,
  defaultPageSize = 20
}: VisualizationETFsProps) => {
  const {
    etfs,
    loading,
    error,
    page,
    totalPages,
    pageSize,
    validPageSizes,
    containerRef,
    handlePageChange,
    handlePageSizeChange
  } = useETFVisualizationLogic({ filters, defaultPageSize });

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <Typography color="error">{error}</Typography>
      </ErrorContainer>
    );
  }

  if (etfs.length === 0) {
    return (
      <EmptyResultsContainer>
        <Typography>Nenhum ETF encontrado com os filtros aplicados.</Typography>
      </EmptyResultsContainer>
    );
  }

  const renderVisualization = () => {
    switch (view) {
      case 'card':
        return <CardView etfs={etfs} />;
      case 'table':
        return <TableView etfs={etfs} />;
      case 'grid':
        return <GridView etfs={etfs} />;
      default:
        return <CardView etfs={etfs} />;
    }
  };

  return (
    <VisualizationContainer ref={containerRef}>
      {renderVisualization()}

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
  );
};