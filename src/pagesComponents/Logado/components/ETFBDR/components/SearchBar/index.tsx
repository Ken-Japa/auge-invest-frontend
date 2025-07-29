import React from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from '@/pagesComponents/Logado/components/SearchBar';
import { api } from '@/services/api';
import { SearchOption } from '@/pagesComponents/Logado/components/SearchBar/search';
import { ETFBDR } from '@/services/api/types/etfbdr';


const ETFBDRSearchBar: React.FC = () => {
  const router = useRouter();

  const fetchETFBDRs = async (): Promise<SearchOption[]> => {
    try {
      const response = await api.etfbdr.getAllETFBDRs();
      const searchOptions: SearchOption[] = [];

      if (response?.result?.length) {
        response.result.forEach((etfbdr: ETFBDR) => {
          if (etfbdr.nomeETF) {
            searchOptions.push({
              label: `${etfbdr.nomeETF} (${etfbdr.codigo})`,
              value: etfbdr.nomeETF,
              id: etfbdr._id || '',
            });
          }
          if (etfbdr.codigo) {
            searchOptions.push({
              label: `${etfbdr.codigo} (${etfbdr.nomeETF})`,
              value: etfbdr.codigo,
              id: etfbdr._id || '',
            });
          }
        });
      }
      return searchOptions;
    } catch (error) {
      console.error('Error fetching ETFBDRs:', error);
      return [];
    }
  };

  const handleETFBDRSearch = (option: SearchOption | null) => {
    if (option && option.id) {
      router.push(`/etfbdr/${option.id}`);
    }
  };

  return (
    <SearchBar
      placeholder="Buscar ETF de BDRs..."
      fetchOptions={fetchETFBDRs}
      onSearch={handleETFBDRSearch}
    />
  );
};

export default ETFBDRSearchBar;