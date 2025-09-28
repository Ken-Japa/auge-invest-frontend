import { ContentSkeleton } from "@/components/Feedback/Skeletons/ContentSkeleton";

import { HeaderContainer } from "./styled";

export const FormHeaderSkeleton = () => {
    return (
        <HeaderContainer>
            <ContentSkeleton
                type="text"
                textLines={1}
                className="mb-2 bg-[#ffffff0a] backdrop-blur-sm"
            />
            <ContentSkeleton
                type="text"
                textLines={1}
                className="w-3/4 bg-[#ffffff0a] backdrop-blur-sm"
            />
        </HeaderContainer>
    );
};