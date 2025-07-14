import { useState, useEffect } from "react";
import { fetchETFBDRBySlugOrCode } from "../../../../components/ETFBDR/services/etfbdrService";
import { ETFBDRExtended } from "../../../../components/ETFBDR/types";

interface UseETFDetailsProps {
  slug: string;
  codigo?: string;
  isCode?: boolean;
}

interface UseETFBDRDetailsResult {
  etf: ETFBDRExtended | null;
  loading: boolean;
  error: string | null;
}

export const useETFBDRDetails = ({
  slug,
  codigo,
  isCode = false,
}: UseETFDetailsProps): UseETFBDRDetailsResult => {
  const [etf, setEtf] = useState<ETFBDRExtended | null>(null);
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

        let result: ETFBDRExtended | null;
        if (isETFCode) {
          result = await fetchETFBDRBySlugOrCode(searchParam, true);
        } else {
          result = await fetchETFBDRBySlugOrCode(searchParam, false);

          if (!result) {
            // Fallback to search by code if slug search fails
            result = await fetchETFBDRBySlugOrCode(searchParam, true);
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
