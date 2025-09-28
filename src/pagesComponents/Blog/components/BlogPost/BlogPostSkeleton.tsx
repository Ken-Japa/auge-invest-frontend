import { Box, Container, Skeleton } from "@mui/material";

import { PostContainer } from "./styled";

export const BlogPostSkeleton = () => {
    return (
        <PostContainer>
            <Container maxWidth="lg">
                <Box className="mb-8">
                    <Skeleton
                        variant="text"
                        width="70%"
                        height={80}
                        sx={{
                            bgcolor: 'rgba(255,255,255,0.1)',
                            margin: '0 auto',
                            marginBottom: '2rem'
                        }}
                    />
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '2rem'
                    }}>
                        <Skeleton
                            variant="text"
                            width={200}
                            height={24}
                            sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}
                        />
                        <Skeleton
                            variant="text"
                            width={150}
                            height={24}
                            sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}
                        />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        gap: 1,
                        justifyContent: 'center'
                    }}>
                        {[1, 2, 3].map((i) => (
                            <Skeleton
                                key={i}
                                variant="rectangular"
                                width={80}
                                height={32}
                                sx={{
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                    borderRadius: '16px'
                                }}
                            />
                        ))}
                    </Box>
                </Box>
                <Box sx={{ mt: 4 }}>
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton
                            key={i}
                            variant="text"
                            width="100%"
                            height={24}
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.1)',
                                marginBottom: '1rem'
                            }}
                        />
                    ))}
                </Box>
            </Container>
        </PostContainer>
    );
};