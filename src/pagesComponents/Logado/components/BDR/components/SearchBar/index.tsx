import React from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from '@/pagesComponents/Logado/components/SearchBar';
import { api } from '@/services/api';
import { SearchOption } from '@/pagesComponents/Logado/components/SearchBar/search';
import { BDR } from '@/services/api/types/bdr';


const BDRSearchBar: React.FC = () => {
    const router = useRouter();

    const fetchBDRs = async (): Promise<SearchOption[]> => {
        try {
            const response = await api.bdrs.getAllBDRs();
            const searchOptions: SearchOption[] = [];

            if (response?.result?.length) {
                response.result.forEach((bdr: BDR) => {
                    if (bdr.nomeEmpresa) {
                        searchOptions.push({
                            label: `${bdr.nomeEmpresa} (${bdr.codigo})`,
                            value: bdr.nomeEmpresa,
                            id: bdr.nomeEmpresa || '',
                        });
                    }
                    if (bdr.codigo) {
                        searchOptions.push({
                            label: `${bdr.codigo} (${bdr.nomeEmpresa})`,
                            value: bdr.codigo,
                            id: bdr.nomeEmpresa || '',
                        });
                    }
                });
            }
            return searchOptions;
        } catch (error) {
            console.error('Error fetching BDRs:', error);
            return [];
        }
    };

    const handleBDRSearch = (option: SearchOption | null) => {
        if (option && option.id) {
            router.push(`/bdr/${option.id}`);
        }
    };

    return (
        <SearchBar
            placeholder="Buscar BDRs..."
            fetchOptions={fetchBDRs}
            onSearch={handleBDRSearch}
        />
    );
};

export default BDRSearchBar;