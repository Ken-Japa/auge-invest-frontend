import { useState, useEffect } from 'react';
import GlobalSearchBar from '@/pagesComponents/Logado/components/SearchBar/Global';

interface SearchBarProps {
    defaultValue?: string;
}

export const SearchBar = ({ defaultValue = '' }: SearchBarProps) => {
    return (
        <GlobalSearchBar type="Empresa" />
    );
};