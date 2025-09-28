import { ContentSkeleton } from "@/components/Feedback/Skeletons/ContentSkeleton";
import { visitorColors } from "@/theme/palette/visitor";

import { BaseSection, ContentWrapper } from "../../styled";

export const EmbaixadorSkeleton = () => (
    <BaseSection>
        <ContentWrapper spacing={4}>
            <ContentSkeleton
                type="text"
                textLines={1}
                className={`w-64 ${visitorColors.skeletonBackground} backdrop-blur-sm`}
            />
            <ContentSkeleton
                type="text"
                textLines={2}
                className={`max-w-2xl mx-auto ${visitorColors.skeletonBackground} backdrop-blur-sm`}
            />
            <ContentSkeleton
                type="card"
                cardHeight={400}
                className={`max-w-md mx-auto ${visitorColors.skeletonBackground} backdrop-blur-sm`}
            />
        </ContentWrapper>
    </BaseSection>
);