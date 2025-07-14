import { useState, useEffect } from "react";
import { fetchETFBySlugOrCode } from "../../../../components/ETF/services/etfsService";
import { ETFExtended } from "../../../../components/ETF/types";

interface UseETFDetailsProps {
  slug: string;
  codigo?: string;
  isCode?: boolean;
}

interface UseETFDetailsResult {
  etf: ETFExtended | null;
  loading: boolean;
  error: string | null;
}

export const useETFDetails = ({
  slug,
  codigo,
  isCode = false,
}: UseETFDetailsProps): UseETFDetailsResult => {
  const [etf, setEtf] = useState<ETFExtended | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadETF = async () => {
      try {
        setLoading(true);
        setError(null);

        const searchParam = codigo || slug;

        // Assuming ETF codes also follow a similar pattern or can be identified
        // This part might need adjustment based on actual ETF code patterns
        const isETFCode = isCode; // Use the provided isCode prop

        let result: ETFExtended | null;
        if (isETFCode) {
          result = await fetchETFBySlugOrCode(searchParam, true);
        } else {
          result = await fetchETFBySlugOrCode(searchParam, false);

          if (!result) {
            // Fallback to search by code if slug search fails
            result = await fetchETFBySlugOrCode(searchParam, true);
          }
        }

        if (!result) {
          console.error("ETF não encontrado:", searchParam);
          setError("ETF não encontrado");
          return;
        }

        setEtf(result);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Ocorreu um erro desconhecido";
        console.error("Erro ao carregar ETF:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadETF();
  }, [slug, codigo, isCode]);

  return { etf, loading, error };
};
