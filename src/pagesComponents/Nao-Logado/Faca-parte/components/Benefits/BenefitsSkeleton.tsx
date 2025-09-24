import { type FC } from 'react';

import { Stack } from "@mui/material";

import { ContentSkeleton } from "@/components/Feedback/Skeletons/ContentSkeleton";
import { visitorColors } from "@/theme/palette/visitor";

export const BenefitsSkeleton: FC = () => (
    <Stack spacing={2}>
        <ContentSkeleton
            type="card"
            cardHeight={300}
            className={`${visitorColors.skeletonBackground} backdrop-blur-sm`}
            style={{ minHeight: "300px" }}
        />
    </Stack>
);