import { Box, Skeleton } from "@mui/material";

import { CategoriesContainer } from "./styled";

export const BlogCategoriesSkeleton = () => {
    return (
        <CategoriesContainer>
            <Skeleton 
                variant="text" 
                width={120} 
                height={32} 
                sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 4, mx: 'auto' }} 
            />
            <Box className="flex flex-col gap-2">
                {[1, 2, 3, 4, 5].map((_, index) => (
                    <Skeleton 
                        key={index}
                        variant="rectangular" 
                        height={40} 
                        sx={{ 
                            bgcolor: 'rgba(255,255,255,0.1)',
                            borderRadius: 1
                        }} 
                    />
                ))}
            </Box>
        </CategoriesContainer>
    );
};