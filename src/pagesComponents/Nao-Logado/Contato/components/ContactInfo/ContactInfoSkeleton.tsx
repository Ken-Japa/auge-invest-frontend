import { type FC } from 'react';

import { ContentSkeleton } from "@/components/Feedback/Skeletons/ContentSkeleton";
import { visitorColors } from "@/theme/palette/visitor";

import { ContactInfoSkeletonStyled } from "./styled";

export const ContactInfoSkeleton: FC = () => (
    <ContactInfoSkeletonStyled spacing={3}>
        <ContentSkeleton
            type="text"
            textLines={3}
            className={`p-4 ${visitorColors.skeletonBackground} rounded-lg backdrop-blur-sm`}
            style={{ minHeight: "150px" }}
        />
    </ContactInfoSkeletonStyled>
);