import { Stack } from "@mui/material";
import { type FC } from 'react';

import { ContentSkeleton } from "@/components/Feedback/Skeletons/ContentSkeleton";
import { visitorColors } from "@/theme/palette/visitor";

const SKELETON_PROPS = {
    type: "text" as const,
    textLines: 2,
    className: `p-4 ${visitorColors.skeletonBackground} rounded-lg backdrop-blur-sm`,
    style: { minHeight: "100px" }
} as const;

export const HeaderSkeleton: FC = () => (
    <Stack spacing={2}>
        <ContentSkeleton {...SKELETON_PROPS} />
    </Stack>
);