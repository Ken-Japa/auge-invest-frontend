import { Clear,Search } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { ChangeEvent } from "react";

import { BlogSearchSkeleton } from "./BlogSearchSkeleton";
import { ClearButtonWrapper,SearchContainer, SearchIconWrapper, SearchInput } from "./styled";

interface BlogSearchProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    isLoading?: boolean;
}

export const BlogSearch = ({ value, onChange, isLoading }: BlogSearchProps) => {
    if (isLoading) {
        return <BlogSearchSkeleton />;
    }

    const handleClear = () => {
        const event = {
            target: { value: '' }
        } as ChangeEvent<HTMLInputElement>;
        onChange(event);
    };

    return (
        <SearchContainer>
            <SearchIconWrapper>
                <Search className="text-white/60" />
            </SearchIconWrapper>
            <SearchInput
                placeholder="Pesquisar artigos..."
                value={value}
                onChange={onChange}
                id="blog-search"
            />
            {value && (
                <ClearButtonWrapper>
                    <IconButton
                        onClick={handleClear}
                        sx={{
                            color: 'white',
                            opacity: 0.6,
                            padding: '4px',
                            '&:hover': {
                                opacity: 1,
                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                        }}
                        size="small"
                    >
                        <Clear fontSize="small" />
                    </IconButton>
                </ClearButtonWrapper>
            )}
        </SearchContainer>
    );
};