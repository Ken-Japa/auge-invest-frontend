import { type FC } from 'react';

import { ContentSkeleton } from "@/components/Feedback/Skeletons/ContentSkeleton";
import { visitorColors } from "@/theme/palette/visitor";

const SKELETON_PROPS = {
    type: "text" as const,
    textLines: 1,
    className: `p-3 ${visitorColors.skeletonBackground} rounded-lg backdrop-blur-sm`,
    style: { minHeight: "48px" }
} as const;

export const SearchBarSkeleton: FC = () => (
    <ContentSkeleton {...SKELETON_PROPS} />
);