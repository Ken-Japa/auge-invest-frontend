import { useEffect,useState } from 'react';

import GlobalSearchBar from '@/pagesComponents/Logado/components/SearchBar';

interface SearchBarProps {
    defaultValue?: string;
}

export const SearchBar = ({ defaultValue = '' }: SearchBarProps) => {
    return (
        <GlobalSearchBar type="Empresa" />
    );
};