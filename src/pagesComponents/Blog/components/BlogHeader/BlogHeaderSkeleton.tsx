import { Box, Container, Skeleton } from "@mui/material";

import { HeaderContainer, HeaderContent } from "./styled";

export const BlogHeaderSkeleton = () => {
    return (
        <HeaderContainer>
            <Container maxWidth="lg">
                <HeaderContent>
                    <Box>
                        <Skeleton 
                            variant="text" 
                            width={300} 
                            height={80} 
                            sx={{ 
                                bgcolor: 'rgba(255,255,255,0.1)',
                                marginBottom: '3rem'
                            }} 
                        />
                        <Skeleton 
                            variant="text" 
                            width={500} 
                            height={40} 
                            sx={{ 
                                bgcolor: 'rgba(255,255,255,0.1)',
                                margin: '0 auto'
                            }} 
                        />
                    </Box>
                </HeaderContent>
            </Container>
        </HeaderContainer>
    );
};