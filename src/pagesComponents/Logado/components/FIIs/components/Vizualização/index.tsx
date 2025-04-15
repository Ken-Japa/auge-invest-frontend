import { useState, useEffect } from 'react';
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
import { fetchFIIs } from '../../services/fiisService';
import { FIIExtended, VisualizationMode } from '../../types';
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

interface VisualizacaoFIIsProps {
  mode?: VisualizationMode;
  filter?: {
    segmento?: string;
    nome?: string;
  };
  limit?: number;
  onError?: (message: string) => void;
}

export const VisualizacaoFIIs = ({
  mode = 'card',
  filter = {},
  limit = 10,
  onError
}: VisualizacaoFIIsProps) => {
  const [fiis, setFiis] = useState<FIIExtended[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(limit);

  useEffect(() => {
    const loadFIIs = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchFIIs({
          segmento: filter.segmento,
          nome: filter.nome,
          page,
          pageSize
        });

        setFiis(result.fiis);
        setTotalPages(result.pagination.pages);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido';
        setError(errorMessage);
        if (onError) {
          onError(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    loadFIIs();
  }, [filter.segmento, filter.nome, page, pageSize, onError]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage - 1);
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    const newPageSize = Number(event.target.value);
    setPageSize(newPageSize);
    setPage(0);
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

  if (fiis.length === 0) {
    return (
      <EmptyResultsContainer>
        <Typography>Nenhum FII encontrado com os filtros aplicados.</Typography>
      </EmptyResultsContainer>
    );
  }

  const renderVisualization = () => {
    switch (mode) {
      case 'card':
        return <CardView fiis={fiis} />;
      case 'table':
        return <TableView fiis={fiis} />;
      case 'grid':
        return <GridView fiis={fiis} />;
      default:
        return <CardView fiis={fiis} />;
    }
  };

  return (
    <VisualizationContainer>
      {renderVisualization()}

      {totalPages > 1 && (
        <PaginationContainer
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems="center"
          justifyContent="center"
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

          <PageSizeSelector variant="outlined" size="small">
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

export default VisualizacaoFIIs;