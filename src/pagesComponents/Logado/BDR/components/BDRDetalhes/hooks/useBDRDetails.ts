import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { fetchBDRBySlugOrCode } from "../../../../components/BDR/services/bdrsService";
import { UnifiedBDR } from "../../../../components/BDR/types";

interface UseBDRDetailsProps {
  slug: string;
  codigo?: string;
  isCode?: boolean;
}

interface UseBDRDetailsResult {
  bdr: UnifiedBDR | null;
  loading: boolean;
  error: string | null;
}

export const useBDRDetails = ({
  slug,
  codigo,
  isCode = false,
}: UseBDRDetailsProps): UseBDRDetailsResult => {
  const [bdr, setBDR] = useState<UnifiedBDR | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBDR = async () => {
      try {
        setLoading(true);
        setError(null);

        const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(slug);

        let result: UnifiedBDR | null = null;

        if (isUUID) {
          try {
            // Try fetching by ID for both sponsored and non-sponsored BDRs
            const sponsoredResult = await api.bdrs.getBDR(slug);
            if (sponsoredResult?.success) {
              result = sponsoredResult.data;
            } else {
              const nonSponsoredResult = await api.bdrnp.getBDRNP(slug);
              if (nonSponsoredResult?.success) {
                result = nonSponsoredResult.data;
              }
            }
          } catch (idError) {
            console.warn("Failed to fetch BDR by ID, trying other methods:", idError);
            // Continue to other search methods if ID fetch fails
          }
        }

        const searchParam = codigo || slug;
        if (!result) {
          const isBDRCode = /^[A-Z]{4}11$/.test(searchParam.toUpperCase());

          if (isBDRCode) {
            result = await fetchBDRBySlugOrCode(searchParam, true);
          } else {
            result = await fetchBDRBySlugOrCode(searchParam, false);

            if (!result) {
              result = await fetchBDRBySlugOrCode(searchParam, true);
            }
          }
        }

        if (!result) {
          console.error("BDR não encontrado:", searchParam);
          setError("BDR não encontrado");
          return;
        }

        setBDR(result);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Ocorreu um erro desconhecido";
        console.error("Erro ao carregar BDR:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadBDR();
  }, [slug, codigo, isCode]);

  return { bdr, loading, error };
};
