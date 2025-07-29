"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from '@/pagesComponents/Logado/components/SearchBar';
import { api } from '@/services/api';
import { SearchOption } from '@/pagesComponents/Logado/components/SearchBar/search';
import { FII } from '@/services/api/types/fii';


const FIISearchBar: React.FC = () => {
    const router = useRouter();

    const fetchFIIs = async (): Promise<SearchOption[]> => {
        try {
            const response = await api.fiis.getFIIs({ pageSize: 1000 });
            const searchOptions: SearchOption[] = [];

            if (response?.result?.length) {
                response.result.forEach((fii: FII) => {
                    if (fii.nomeFII) {
                        searchOptions.push({
                            label: `${fii.nomeFII} (${fii.codigoFII})`,
                            value: fii.nomeFII,
                            id: `${fii.codigoFII}` || '',
                        });
                    }
                    if (fii.codigo) {
                        searchOptions.push({
                            label: `${fii.codigo} (${fii.nomeFII})`,
                            value: `${fii.codigo}`,
                            id: `${fii.codigo}` || '',
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

    const handleFIISearch = (option: SearchOption | null) => {
        if (option && option.id) {
            router.push(`/fii/${option.id}`);
        }
    };

    return (
        <SearchBar
            placeholder="Buscar FIIs..."
            fetchOptions={fetchFIIs}
            onSearch={handleFIISearch}
        />
    );
};

export default FIISearchBar;