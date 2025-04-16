import { useState, useEffect } from 'react';
import { fetchFIIBySlugOrCode } from '../../../../components/FIIs/services/fiisService';
import { FIIExtended } from '../../../../components/FIIs/types';

interface UseFIIDetailsProps {
  slug: string;
  codigo?: string;
  isCode?: boolean;
}

interface UseFIIDetailsResult {
  fii: FIIExtended | null;
  loading: boolean;
  error: string | null;
}

export const useFIIDetails = ({ slug, codigo, isCode = false }: UseFIIDetailsProps): UseFIIDetailsResult => {
  const [fii, setFII] = useState<FIIExtended | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFII = async () => {
      try {
        setLoading(true);
        setError(null);

        const searchParam = codigo || slug;
        const shouldSearchByCode = isCode || /^\w+\d+$/.test(searchParam);

        const result = await fetchFIIBySlugOrCode(searchParam, shouldSearchByCode);

        if (!result) {
          setError('FII não encontrado');
          return;
        }

        setFII(result);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadFII();
  }, [slug, codigo, isCode]);

  return { fii, loading, error };
};