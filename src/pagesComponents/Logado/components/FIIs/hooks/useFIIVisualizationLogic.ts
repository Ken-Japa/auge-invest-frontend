import { useEffect, useMemo, useRef, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { fetchFIIs } from '../services/fiisService';
import { FIIExtended, FIIFilter } from '../types';

interface UseFIIVisualizationLogicProps {
  filters: FIIFilter;
  onError?: (message: string) => void;
  defaultPageSize?: number;
}

export const useFIIVisualizationLogic = ({
  filters,
  onError,
  defaultPageSize = 20
}: UseFIIVisualizationLogicProps) => {
  const validPageSizes = useMemo(() => [10, 20, 50, 100], []);
  const initialPageSize = validPageSizes.includes(defaultPageSize) ? defaultPageSize : 20;

  const [allFiis, setAllFiis] = useState<FIIExtended[]>([]);
  const [fiis, setFiis] = useState<FIIExtended[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadFIIs = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchFIIs({
          ...filters,
        });

        setAllFiis(result.result);
        setPage(0);
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
  }, [filters, onError]);

  useEffect(() => {
    if (allFiis.length > 0) {
      const sortedEtfs = [...allFiis].sort((a, b) => {
        const quotaA = Number(a.quotaCount);
        const quotaB = Number(b.quotaCount);
        return quotaB - quotaA;
      });

      const newTotalPages = Math.ceil(sortedEtfs.length / pageSize);
      setTotalPages(newTotalPages);

      const startIndex = page * pageSize;
      const endIndex = startIndex + pageSize;
      setFiis(sortedEtfs.slice(startIndex, endIndex));
    } else {
      setFiis([]);
      setTotalPages(0);
    }
  }, [allFiis, page, pageSize]);

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
    const newPageSize = Number(event.target.value); // event.target.value is already a string, so Number() is fine
    setPageSize(newPageSize);
    setPage(0);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return {
    fiis,
    loading,
    error,
    page,
    totalPages,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    containerRef,
    validPageSizes
  };
};