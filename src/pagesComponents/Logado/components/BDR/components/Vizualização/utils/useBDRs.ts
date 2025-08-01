import { useState, useEffect, useRef } from "react";
import { SelectChangeEvent } from "@mui/material";
import { fetchBDRs } from "../../../services/bdrsService";
import { UnifiedBDR, BDRType } from "../../../types";

interface UseBDRsProps {
  filter?: {
    segmento?: string;
    nome?: string;
    isPatrocinado?: boolean;
    searchQuery?: string;
  };
  onError?: (message: string) => void;
  defaultPageSize?: number;
}

export const useBDRs = ({
  filter = {},
  onError,
  defaultPageSize = 10,
}: UseBDRsProps) => {
  const validPageSizes = [10, 20, 50, 100];
  const initialPageSize = validPageSizes.includes(defaultPageSize)
    ? defaultPageSize
    : 10;

  const [bdrs, setBdrs] = useState<UnifiedBDR[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [bdrType, setBdrType] = useState<BDRType>("todos");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadBDRs = async () => {
      try {
        setLoading(true);
        setError(null);

        let isPatrocinado;
        if (bdrType === "patrocinado") {
          isPatrocinado = true;
        } else if (bdrType === "nao-patrocinado") {
          isPatrocinado = false;
        }

        const result = await fetchBDRs({
          segmento: filter.segmento,
          nomeEmpresa: filter.nome || filter.searchQuery,
          page,
          pageSize,
          isPatrocinado,
        });

        setBdrs(result.bdrs);
        setTotalPages(result.pagination.pages);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Ocorreu um erro desconhecido";
        setError(errorMessage);
        if (onError) {
          onError(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    loadBDRs();
  }, [
    filter.segmento,
    filter.nome,
    filter.searchQuery,
    page,
    pageSize,
    bdrType,
    onError,
  ]);

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

  const handleBDRTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBdrType(event.target.value as BDRType);
    setPage(0);
  };

  return {
    bdrs,
    loading,
    error,
    page,
    totalPages,
    pageSize,
    bdrType,
    containerRef,
    validPageSizes,
    handlePageChange,
    handlePageSizeChange,
    handleBDRTypeChange,
  };
};
