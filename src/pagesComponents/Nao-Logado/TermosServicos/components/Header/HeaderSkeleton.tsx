import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'
import { visitorColors } from '@/theme/palette/visitor'

import { HeaderContainer } from './styled'

export const HeaderSkeleton = () => (
  <HeaderContainer>
    <div className="header-icon-container">
      <ContentSkeleton
        type="text"
        textLines={1}
        className={`w-64 ${visitorColors.skeletonBackground} backdrop-blur-sm`}
      />
    </div>
    <ContentSkeleton
      type="text"
      textLines={2}
      className={`${visitorColors.skeletonBackground} backdrop-blur-sm`}
    />
  </HeaderContainer>
)
