import { useState, useEffect } from "react";
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

        const searchParam = codigo || slug;

        const isBDRCode = /^[A-Z]{4}11$/.test(searchParam.toUpperCase());

        let result: BDRExtended | null;
        if (isBDRCode) {
          result = await fetchBDRBySlugOrCode(searchParam, true);
        } else {
          result = await fetchBDRBySlugOrCode(searchParam, false);

          if (!result) {
            result = await fetchBDRBySlugOrCode(searchParam, true);
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
