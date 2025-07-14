import React, { useState, useEffect, useRef } from 'react';
import { ETFBDRFilter } from '@/services/api/types/etfbdr';
import {
  Typography,
  CircularProgress,
  Pagination,
  PaginationItem,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import {
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon
} from '@mui/icons-material';
import { fetchETFBDRs } from '../../services/etfbdrService';
import { ETFBDRExtended } from '../../types';
import CardView from './Cards';
import TableView from './Table';
import GridView from './Grid';
import {
  VisualizationContainer,
  LoadingContainer,
  ErrorContainer,
  EmptyResultsContainer,
  PaginationContainer,
  PageSizeSelector
} from './styled';

interface VisualizationETFBDRsProps {
  view: 'card' | 'table' | 'grid';
  filters: ETFBDRFilter;
}

export const VisualizationETFBDRs = ({
  view,
  filters
}: VisualizationETFBDRsProps) => {
  const validPageSizes = [10, 20, 50, 100];
  const initialPageSize = validPageSizes.includes(filters.pageSize || 20) ? (filters.pageSize || 20) : 20;

  const [etfbdrs, setETFBDRs] = useState<ETFBDRExtended[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadETFBDRs = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchETFBDRs({
          ...filters,
          page,
          pageSize
        });

        setETFBDRs(result.result);
        setTotalPages(result.pagination.pages);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido';
        setError(errorMessage);

      } finally {
        setLoading(false);
      }
    };

    loadETFBDRs();
  }, [filters, page, pageSize]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage - 1);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    const newPageSize = Number(event.target.value);
    setPageSize(newPageSize);
    setPage(0);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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

  if (etfbdrs.length === 0) {
    return (
      <EmptyResultsContainer>
        <Typography>Nenhum ETFBDR encontrado com os filtros aplicados.</Typography>
      </EmptyResultsContainer>
    );
  }

  const renderVisualization = () => {
    switch (view) {
      case 'card':
        return <CardView etfbdrs={etfbdrs} />; // Changed etfs to etfbdrs
      case 'table':
        return <TableView etfbdrs={etfbdrs} />; // Changed etfs to etfbdrs
      case 'grid':
        return <GridView etfbdrs={etfbdrs} />; // Changed etfs to etfbdrs
      default:
        return <CardView etfbdrs={etfbdrs} />; // Changed etfs to etfbdrs
    }
  };

  return (
    <VisualizationContainer ref={containerRef}>
      {renderVisualization()}

      {totalPages > 1 && (
        <PaginationContainer
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
          >
          <Pagination
            count={totalPages}
            page={page + 1}
            onChange={handlePageChange}
            color="primary"
            renderItem={(item) => (
              <PaginationItem
                slots={{
                  first: FirstPageIcon,
                  last: LastPageIcon
                }}
                {...item}
              />
            )}
            showFirstButton
            showLastButton
          />

          <PageSizeSelector>
            <InputLabel id="page-size-select-label">Por página</InputLabel>
            <Select
              labelId="page-size-select-label"
              id="page-size-select"
              value={pageSize}
              onChange={handlePageSizeChange}
              label="Por página"
              displayEmpty={false}
              renderValue={(value) => `${value}`}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </PageSizeSelector>
        </PaginationContainer>
      )}
    </VisualizationContainer>
  );
};