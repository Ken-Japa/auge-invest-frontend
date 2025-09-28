import { type FC } from 'react';

import { SearchBarSkeleton } from "./SearchBarSkeleton";
import { SearchContainer, StyledCloseIcon,StyledSearchIcon } from "./styled";

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    isLoading?: boolean;
}

export const SearchBar: FC<SearchBarProps> = ({ searchTerm, setSearchTerm, isLoading }) => {
    if (isLoading) {
        return <SearchBarSkeleton />;
    }

    const handleClear = () => setSearchTerm('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

    return (
        <SearchContainer>
            <div className="search-wrapper">
                <input
                    type="text"
                    placeholder="Buscar pergunta..."
                    value={searchTerm}
                    onChange={handleChange}
                    className="search-input"
                    id="faq-search"
                />
                <StyledSearchIcon className="search-icon" />
                {searchTerm && (
                    <button
                        onClick={handleClear}
                        className="clear-button"
                        aria-label="Limpar pesquisa"
                    >
                        <StyledCloseIcon />
                    </button>
                )}
            </div>
        </SearchContainer>
    );
};