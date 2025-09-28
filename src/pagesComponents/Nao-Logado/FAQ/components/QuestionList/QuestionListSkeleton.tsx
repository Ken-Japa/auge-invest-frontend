import { Stack } from "@mui/material";
import { type FC } from 'react';

import { ContentSkeleton } from "@/components/Feedback/Skeletons/ContentSkeleton";
import { visitorColors } from "@/theme/palette/visitor";

const SKELETON_COUNT = 8;

const SKELETON_PROPS = {
    type: "card" as const,
    cardHeight: 120,
    className: `${visitorColors.skeletonBackground} backdrop-blur-sm`,
    style: { minHeight: "120px" }
} as const;

export const QuestionListSkeleton: FC = () => (
    <Stack spacing={2}>
        {Array(SKELETON_COUNT).fill(0).map((_, index) => (
            <ContentSkeleton
                key={`skeleton-${index}`}
                {...SKELETON_PROPS}
            />
        ))}
    </Stack>
);