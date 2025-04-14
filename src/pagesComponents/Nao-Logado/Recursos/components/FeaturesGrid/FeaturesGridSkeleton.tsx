import { Grid } from "@mui/material";
import { ContentSkeleton } from "@/components/Feedback/Skeletons/ContentSkeleton";
import { FeaturesContainer, FeatureCard } from "./styled";

export const FeaturesGridSkeleton = () => (
    <FeaturesContainer>
        <Grid container spacing={4}>
            {Array(8).fill(0).map((_, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                    <FeatureCard style={{ height: '280px', minHeight: '280px' }}>
                        <ContentSkeleton
                            type="text"
                            textLines={1}
                            className="w-16 h-16 mb-6 bg-[#ffffff0a] backdrop-blur-sm"
                        />
                        <ContentSkeleton
                            type="text"
                            textLines={1}
                            className="w-48 mb-4 bg-[#ffffff0a] backdrop-blur-sm"
                        />
                        <ContentSkeleton
                            type="text"
                            textLines={3}
                            className="bg-[#ffffff0a] backdrop-blur-sm"
                        />
                    </FeatureCard>
                </Grid>
            ))}
        </Grid>
    </FeaturesContainer>
);