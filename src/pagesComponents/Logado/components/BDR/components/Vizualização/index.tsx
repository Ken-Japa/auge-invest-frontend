import { useState, useEffect, useRef } from 'react';
import {
  Typography,
  CircularProgress,
  Pagination,
  PaginationItem,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup
} from '@mui/material';
import {
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,

} from '@mui/icons-material';
import { fetchBDRs } from '../../services/bdrsService';
import { UnifiedBDR, VisualizationMode, BDRType } from '../../types';
import CardView from './Cards';
import TableView from './Table';
import GridView from './Grid';
import {
  VisualizationContainer,
  LoadingContainer,
  ErrorContainer,
  EmptyResultsContainer,
  PaginationContainer,
  PageSizeSelector,
  FilterContainer,
} from './styled';

interface VisualizacaoBDRsProps {
  mode?: VisualizationMode;
  filter?: {
    segmento?: string;
    nome?: string;
    isPatrocinado?: boolean;
    searchQuery?: string;
  };
  onError?: (message: string) => void;
  viewMode?: string;
  onChangeView?: (mode: string) => void;
  defaultPageSize?: number;
}

export const VisualizacaoBDRs = ({
  mode = 'card',
  filter = {},
  onError,
  viewMode = 'cartao',
  onChangeView = () => { },
  defaultPageSize = 10,
}: VisualizacaoBDRsProps) => {
  const validPageSizes = [10, 20, 50, 100];
  const initialPageSize = validPageSizes.includes(defaultPageSize) ? defaultPageSize : 10;

  const [bdrs, setBdrs] = useState<UnifiedBDR[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [bdrType, setBdrType] = useState<BDRType>('todos');
  const containerRef = useRef<HTMLDivElement>(null);



  useEffect(() => {
    const loadBDRs = async () => {
      try {
        setLoading(true);
        setError(null);

        let isPatrocinado;
        if (bdrType === 'patrocinado') {
          isPatrocinado = true;
        } else if (bdrType === 'nao-patrocinado') {
          isPatrocinado = false;
        }

        const result = await fetchBDRs({
          segmento: filter.segmento,
          nomeEmpresa: filter.nome || filter.searchQuery,
          page,
          pageSize,
          isPatrocinado
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
  }, [filter.segmento, filter.nome, filter.searchQuery, page, pageSize, bdrType, onError]);

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

  const handleBDRTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBdrType(event.target.value as BDRType);
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

      <FilterContainer>
        <FormControl component="fieldset">
          <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center' }}>
            Tipo de BDR
          </Typography>
          <RadioGroup
            row
            aria-label="tipo-bdr"
            name="tipo-bdr"
            value={bdrType}
            onChange={handleBDRTypeChange}
          >
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel value="patrocinado" control={<Radio />} label="Patrocinados" />
            <FormControlLabel value="nao-patrocinado" control={<Radio />} label="Não Patrocinados" />
          </RadioGroup>
        </FormControl>

      </FilterContainer>

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