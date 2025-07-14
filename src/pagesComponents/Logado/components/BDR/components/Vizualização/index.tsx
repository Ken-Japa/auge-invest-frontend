import { useState, useEffect, useRef } from 'react';
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
import { fetchBDRs } from '../../services/bdrsService';
import { BDRExtended, VisualizationMode } from '../../types';
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

interface VisualizacaoBDRsProps {
  mode?: VisualizationMode;
  filter?: {
    segmento?: string;
    nome?: string;
  };
  limit?: number;
  onError?: (message: string) => void;
}

export const VisualizacaoBDRs = ({
  mode = 'card',
  filter = {},
  limit = 10,
  onError
}: VisualizacaoBDRsProps) => {
  // Ensure limit is one of the valid options
  const validPageSizes = [10, 20, 50, 100];
  const initialPageSize = validPageSizes.includes(limit) ? limit : 20;

  const [bdrs, setBdrs] = useState<BDRExtended[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadBDRs = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchBDRs({
          segmento: filter.segmento,
          nome: filter.nome,
          page,
          pageSize
        });

        setBdrs(result.bdrs);
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

    loadBDRs();
  }, [filter.segmento, filter.nome, page, pageSize, onError]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage - 1);

    // Scroll to top of the container when page changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Alternative approach if window.scrollTo doesn't work well
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

    // Scroll to top when page size changes
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

  if (bdrs.length === 0) {
    return (
      <EmptyResultsContainer>
        <Typography>Nenhum BDR encontrado com os filtros aplicados.</Typography>
      </EmptyResultsContainer>
    );
  }

  const renderVisualization = () => {
    switch (mode) {
      case 'card':
        return <CardView bdrs={bdrs} />;
      case 'table':
        return <TableView bdrs={bdrs} />;
      case 'grid':
        return <GridView bdrs={bdrs} />;
      default:
        return <CardView bdrs={bdrs} />;
    }
  };

  return (
    <VisualizationContainer ref={containerRef}>
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

export default VisualizacaoBDRs;