import { ContentSkeleton } from "@/components/Feedback/Skeletons/ContentSkeleton";
import { BaseSection, SectionTitle, ContentContainer } from "../../styled";

export const HistoriaSkeleton = () => (
    <BaseSection>
        <SectionTitle>
            <ContentSkeleton
                type="text"
                textLines={1}
                className="w-64 bg-[#ffffff0a] backdrop-blur-sm"
                style={{ minHeight: '48px' }}
            />
        </SectionTitle>
        <ContentSkeleton
            type="text"
            textLines={1}
            className="w-96 mb-8 bg-[#ffffff0a] backdrop-blur-sm"
            style={{ minHeight: '56px' }}
        />
        <ContentContainer>
            <ContentSkeleton
                type="text"
                textLines={9}
                className="bg-[#ffffff0a] backdrop-blur-sm"
                style={{ minHeight: '340px' }}
            />
        </ContentContainer>
    </BaseSection>
);