import { ContentSkeleton } from "@/components/Feedback/Skeletons/ContentSkeleton";

import { ContentContainer } from "../../styled";

export const HeaderSkeleton = () => (
    <ContentContainer>
        <ContentSkeleton
            type="text"
            textLines={1}
            className="title bg-[#ffffff0a] backdrop-blur-sm"
            style={{ minHeight: '48px' }}
        />
    </ContentContainer>
);