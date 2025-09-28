import { ContentSkeleton } from "@/components/Feedback/Skeletons/ContentSkeleton";
import { visitorColors } from "@/theme/palette/visitor";

import { ContentContainer } from "./styled";

export const TermsContentSkeleton = () => (
  <ContentContainer>
    {Array(10).fill(0).map((_, index) => (
      <div key={`section-${index}`} className="terms-section">
        <ContentSkeleton
          type="text"
          textLines={1}
          className={`w-64 mb-4 ${visitorColors.skeletonBackground} backdrop-blur-sm`}
        />
        <ContentSkeleton
          type="text"
          textLines={4}
          className={`${visitorColors.skeletonBackground} backdrop-blur-sm`}
        />
      </div>
    ))}
  </ContentContainer>
);