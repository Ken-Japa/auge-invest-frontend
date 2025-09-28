import { Container, Grid,Stack } from "@mui/material";

import { ContentSkeleton } from "@/components/Feedback/Skeletons/ContentSkeleton";

export const FeaturesSkeleton = () => {
    return (
        <Container maxWidth="xl">
            <Stack spacing={6}>
                <ContentSkeleton
                    type="text"
                    textLines={2}
                    className="p-4 bg-[#ffffff0a] rounded-lg backdrop-blur-sm"
                />
                <Grid container spacing={4}>
                    {Array(3).fill(0).map((_, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <ContentSkeleton
                                type="card"
                                cardHeight={300}
                                className="bg-[#ffffff0a] backdrop-blur-sm"
                            />
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </Container>
    );
};