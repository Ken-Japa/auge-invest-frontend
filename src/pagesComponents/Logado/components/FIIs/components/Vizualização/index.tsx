import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Pagination } from '@mui/material';
import { fetchFIIs } from '../../services/fiisService';
import { FIIExtended, VisualizationMode } from '../../types';
import CardView from './Cards';
import TableView from './Table';
import GridView from './Grid';

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

  useEffect(() => {
    const loadFIIs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Add a small delay to prevent too many API calls while typing
        const result = await fetchFIIs({
          segmento: filter.segmento,
          nome: filter.nome,
          page,
          pageSize: limit
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

    // Use a debounce to prevent too many API calls while typing
    const timeoutId = setTimeout(() => {
      loadFIIs();
    }, 300); // 300ms delay

    return () => clearTimeout(timeoutId);
  }, [filter, page, limit, onError]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage - 1); // MUI Pagination é 1-indexed, nossa API é 0-indexed
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (fiis.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <Typography>Nenhum FII encontrado com os filtros aplicados.</Typography>
      </Box>
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
    <Box>
      {renderVisualization()}
      
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination 
            count={totalPages} 
            page={page + 1} 
            onChange={handlePageChange} 
            color="primary" 
          />
        </Box>
      )}
    </Box>
  );
};

export default VisualizacaoFIIs;