import { ContentSkeleton } from "@/components/Feedback/Skeletons/ContentSkeleton";
import { visitorColors } from "@/theme/palette/visitor";

import { NavigationContainer } from "./styled";

export const QuickNavigationSkeleton = () => (
  <NavigationContainer>
    <ContentSkeleton
      type="text"
      textLines={1}
      className={`w-48 ${visitorColors.skeletonBackground} backdrop-blur-sm`}
    />
    <div className="navigation-content">
      <div className="navigation-grid">
        {Array(10).fill(0).map((_, index) => (
          <ContentSkeleton
            key={`nav-item-${index}`}
            type="text"
            textLines={1}
            className={`${visitorColors.skeletonBackground} backdrop-blur-sm`}
          />
        ))}
      </div>
    </div>
  </NavigationContainer>
);