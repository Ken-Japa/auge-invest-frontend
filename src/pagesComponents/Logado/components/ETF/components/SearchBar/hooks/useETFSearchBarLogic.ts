import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { SearchOption } from '@/pagesComponents/Logado/components/SearchBar/search';
import { ETF } from '@/services/api/types/etf';

export const useETFSearchBarLogic = () => {
  const router = useRouter();

  const fetchETFs = async (): Promise<SearchOption[]> => {
    try {
      const response = await api.etf.getAllETFs();
      const searchOptions: SearchOption[] = [];

      if (response?.result?.length) {
        response.result.forEach((etf: ETF) => {
          if (etf.nomeETF) {
            searchOptions.push({
              label: `${etf.nomeETF} (${etf.codigo})`,
              value: etf.nomeETF,
              id: etf.nomeETF || '',
            });
          }
          if (etf.codigo) {
            searchOptions.push({
              label: `${etf.codigo} (${etf.nomeETF})`,
              value: etf.codigo,
              id: etf.codigo || '',
            });
          }
        });
      }
      return searchOptions;
    } catch (error) {
      console.error('Error fetching ETFs:', error);
      return [];
    }
  };

  const handleETFSearch = (option: SearchOption | null) => {
    if (option && option.id) {
      router.push(`/etf/${option.id}`);
    }
  };

  return {
    fetchETFs,
    handleETFSearch,
  };
};