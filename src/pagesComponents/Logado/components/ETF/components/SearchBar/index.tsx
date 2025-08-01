import React from 'react';
import SearchBar from '@/pagesComponents/Logado/components/SearchBar';
import { useETFSearchBarLogic } from './hooks/useETFSearchBarLogic';

const ETFSearchBar: React.FC = () => {
  const { fetchETFs, handleETFSearch } = useETFSearchBarLogic();

  return (
    <SearchBar
      placeholder="Buscar ETFs..."
      fetchOptions={fetchETFs}
      onSearch={handleETFSearch}
    />
  );
};

export default ETFSearchBar;