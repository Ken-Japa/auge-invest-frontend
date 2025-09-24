import { type FC } from 'react';

import { visitorColors } from "@/theme/palette/visitor";

import { ContentSkeleton } from "@/components/Feedback/Skeletons/ContentSkeleton";
import { Stack } from "@mui/material";

export const CategoryTabsSkeleton: FC = () => (
    <Stack direction="row" spacing={2} className="overflow-hidden">
        {[...Array(4)].map((_, index) => (
            <ContentSkeleton
                key={index}
                type="text"
                textLines={1}
                className={`p-3 ${visitorColors.skeletonBackground} rounded-lg backdrop-blur-sm`}
                style={{ minHeight: "48px", width: "120px" }} // Adicionado para evitar layout shift
            />
        ))}
    </Stack>
);