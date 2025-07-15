import React, { useState, useEffect, useRef } from 'react';
import { ETFFilter } from '@/services/api/types/etf';
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
import { fetchETFs } from '../../services/etfsService';
import { ETFExtended } from '../../types';
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
  const validPageSizes = [10, 20, 50, 100];
  const initialPageSize = validPageSizes.includes(defaultPageSize) ? defaultPageSize : 20;

  const [allEtfs, setAllEtfs] = useState<ETFExtended[]>([]); // Armazenar todas as ETFs
  const [etfs, setETFs] = useState<ETFExtended[]>([]); // ETFs da página atual
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadETFs = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchETFs({
          ...filters,
          // page e pageSize não são passados aqui para que a API retorne todos os dados
        });

        setAllEtfs(result.result); // Armazenar todas as ETFs
        setPage(0); // Resetar a página para 0 ao carregar novos filtros
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadETFs();
  }, [filters]); // Depende apenas dos filtros, para buscar todos os dados novamente quando os filtros mudarem

  // Novo useEffect para lidar com a paginação e ordenação no frontend
  useEffect(() => {
    if (allEtfs.length > 0) {
      // Aplicar ordenação antes de fatiar para a página
      const sortedEtfs = [...allEtfs].sort((a, b) => {
        // Converter quotaCount para número para garantir ordenação numérica
        const quotaA = Number(a.quotaCount);
        const quotaB = Number(b.quotaCount);
        return quotaB - quotaA; // Ordenação decrescente
      });

      const newTotalPages = Math.ceil(sortedEtfs.length / pageSize);
      setTotalPages(newTotalPages);

      const startIndex = page * pageSize;
      const endIndex = startIndex + pageSize;
      setETFs(sortedEtfs.slice(startIndex, endIndex));
    } else {
      setETFs([]);
      setTotalPages(0);
    }
  }, [allEtfs, page, pageSize]);

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