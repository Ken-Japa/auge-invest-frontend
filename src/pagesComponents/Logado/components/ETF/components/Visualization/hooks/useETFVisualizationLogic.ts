import { useState, useEffect, useRef } from "react";
import { ETFFilter } from "@/services/api/types/etf";
import { ETFExtended } from "../../../types";
import { fetchETFs } from "../../../services/etfsService";
import { SelectChangeEvent } from "@mui/material";

interface UseETFVisualizationLogicProps {
  filters: ETFFilter;
  defaultPageSize?: number;
}

export const useETFVisualizationLogic = ({
  filters,
  defaultPageSize = 20,
}: UseETFVisualizationLogicProps) => {
  const validPageSizes = [10, 20, 50, 100];
  const initialPageSize = validPageSizes.includes(defaultPageSize)
    ? defaultPageSize
    : 20;

  const [allEtfs, setAllEtfs] = useState<ETFExtended[]>([]);
  const [etfs, setETFs] = useState<ETFExtended[]>([]);
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
        });

        setAllEtfs(result.result);
        setPage(0);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Ocorreu um erro desconhecido";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadETFs();
  }, [filters]);

  useEffect(() => {
    if (allEtfs.length > 0) {
      const sortedEtfs = [...allEtfs].sort((a, b) => {
        const quotaA = Number(a.quotaCount);
        const quotaB = Number(b.quotaCount);
        return quotaB - quotaA;
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
      behavior: "smooth",
    });

    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    const newPageSize = Number(event.target.value);
    setPageSize(newPageSize);
    setPage(0);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return {
    etfs,
    loading,
    error,
    page,
    totalPages,
    pageSize,
    validPageSizes,
    containerRef,
    handlePageChange,
    handlePageSizeChange,
  };
};
