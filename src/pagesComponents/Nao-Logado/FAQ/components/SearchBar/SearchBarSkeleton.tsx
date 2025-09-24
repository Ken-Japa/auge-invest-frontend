import { type FC } from 'react';
import { visitorColors } from "@/theme/palette/visitor";

import { ContentSkeleton } from "@/components/Feedback/Skeletons/ContentSkeleton";

const SKELETON_PROPS = {
    type: "text" as const,
    textLines: 1,
    className: `p-3 ${visitorColors.skeletonBackground} rounded-lg backdrop-blur-sm`,
    style: { minHeight: "48px" }
} as const;

export const SearchBarSkeleton: FC = () => (
    <ContentSkeleton {...SKELETON_PROPS} />
);