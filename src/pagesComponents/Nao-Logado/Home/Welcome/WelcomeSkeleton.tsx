import { Container, Grid,Stack } from "@mui/material";

import { ContentSkeleton } from "@/components/Feedback/Skeletons/ContentSkeleton";

export const WelcomeSkeleton = () => {
    return (
        <Container maxWidth="xl">
            <Stack spacing={4} className="home">
                <Stack spacing={4} className="welcome">
                    <ContentSkeleton
                        type="text"
                        textLines={2}
                        className="p-4 bg-[#ffffff0a] rounded-lg backdrop-blur-sm"
                    />
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <ContentSkeleton
                            type="text"
                            textLines={1}
                            className="w-40 p-3 bg-[#ffffff0a] rounded-lg backdrop-blur-sm"
                        />
                        <ContentSkeleton
                            type="text"
                            textLines={1}
                            className="w-40 p-3 bg-[#ffffff0a] rounded-lg backdrop-blur-sm"
                        />
                    </Stack>
                </Stack>
                <Grid container spacing={3}>
                    {Array(3).fill(0).map((_, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <ContentSkeleton
                                type="card"
                                cardHeight={200}
                                className="bg-[#ffffff0a] backdrop-blur-sm"
                            />
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </Container>
    );
};