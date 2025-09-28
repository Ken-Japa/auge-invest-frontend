import { Stack } from "@mui/material";
import { type FC } from 'react';

import { ContentSkeleton } from "@/components/Feedback/Skeletons/ContentSkeleton";
import { visitorColors } from "@/theme/palette/visitor";

const SKELETON_FIELDS = [
    { lines: 1 },
    { lines: 1 },
    { lines: 1 },
    { lines: 1 },
    { lines: 3 },
    { lines: 1 },
    { lines: 1 },
    { lines: 4 },
    { lines: 1 }
] as const;

export const ApplicationFormSkeleton: FC = () => (
    <Stack spacing={3}>
        {SKELETON_FIELDS.map((field, index) => (
            <ContentSkeleton
                key={index}
                type="text"
                textLines={field.lines}
                className={`${visitorColors.skeletonBackground} backdrop-blur-sm`}
                style={{ minHeight: `${field.lines * 24 + 16}px` }}
            />
        ))}
    </Stack>
);