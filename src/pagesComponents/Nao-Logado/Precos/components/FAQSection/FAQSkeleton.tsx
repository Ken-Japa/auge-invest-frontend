import { ContentSkeleton } from "@/components/Feedback/Skeletons/ContentSkeleton";
import { visitorColors } from "@/theme/palette/visitor";

import { BaseSection, ContentWrapper } from "../../styled";
import { FAQContainer } from "./styled";

export const FAQSkeleton = () => (
    <BaseSection>
        <ContentWrapper spacing={4}>
            <ContentSkeleton
                type="text"
                textLines={1}
                className={`w-64 ${visitorColors.skeletonBackground} backdrop-blur-sm`}
            />
            <FAQContainer>
                {Array(3).fill(0).map((_, index) => (
                    <ContentSkeleton
                        key={`faq-${index}`}
                        type="card"
                        cardHeight={100}
                        className={`${visitorColors.skeletonBackground} backdrop-blur-sm`}
                    />
                ))}
            </FAQContainer>
        </ContentWrapper>
    </BaseSection>
);