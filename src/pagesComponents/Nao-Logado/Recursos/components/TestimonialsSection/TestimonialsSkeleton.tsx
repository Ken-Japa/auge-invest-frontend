import { Stack, Grid } from "@mui/material";
import { ContentSkeleton } from "@/components/Feedback/Skeletons/ContentSkeleton";
import { TestimonialCard } from "./styled";

export const TestimonialsSkeleton = () => (
    <div className="w-full">
        <Stack spacing={4} alignItems="center">
            <ContentSkeleton
                type="text"
                textLines={1}
                className="w-64 bg-[#ffffff0a] backdrop-blur-sm"
                style={{ minHeight: '48px' }}
            />
            <Grid container spacing={4} justifyContent="center">
                {Array(3).fill(0).map((_, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <TestimonialCard>
                            <ContentSkeleton
                                type="text"
                                textLines={3}
                                className="testimonial-text bg-[#ffffff0a] backdrop-blur-sm"
                                style={{ minHeight: '72px' }}
                            />
                            <ContentSkeleton
                                type="text"
                                textLines={1}
                                className="w-32 mt-4 bg-[#ffffff0a] backdrop-blur-sm"
                                style={{ minHeight: '24px' }}
                            />
                            <ContentSkeleton
                                type="text"
                                textLines={1}
                                className="w-48 mt-2 bg-[#ffffff0a] backdrop-blur-sm"
                                style={{ minHeight: '24px' }}
                            />
                        </TestimonialCard>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    </div>
);