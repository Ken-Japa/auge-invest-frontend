import { Skeleton } from "@mui/material";

import { SearchContainer } from "./styled";

export const BlogSearchSkeleton = () => {
    return (
        <SearchContainer>
            <Skeleton 
                variant="rectangular" 
                width="100%" 
                height={48} 
                sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                }} 
            />
        </SearchContainer>
    );
};