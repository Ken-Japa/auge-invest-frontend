import { type FC } from 'react';

import { visitorColors } from "@/theme/palette/visitor";

import { ContentSkeleton } from "@/components/Feedback/Skeletons/ContentSkeleton";
import { Stack } from "@mui/material";

export const ContactSupportSkeleton: FC = () => (
    <Stack spacing={2} className="items-center">
        <ContentSkeleton
            type="text"
            textLines={1}
            className={`p-3 ${visitorColors.skeletonBackground} rounded-lg backdrop-blur-sm`}
            style={{ minHeight: "24px", width: "80%" }}
        />
        <ContentSkeleton
            type="text"
            textLines={1}
            className={`p-3 ${visitorColors.skeletonBackground} rounded-lg backdrop-blur-sm`}
            style={{ minHeight: "24px", width: "60%" }}
        />
        <ContentSkeleton
            type="text"
            textLines={1}
            className={`p-3 ${visitorColors.skeletonBackground} rounded-lg backdrop-blur-sm`}
            style={{ minHeight: "48px", width: "200px" }}
        />
    </Stack>
);