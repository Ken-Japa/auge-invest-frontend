import { type FC } from 'react'

import type { CategoryType } from '../../constants/faqData'
import { faqCategories } from '../../constants/faqData'
import { TabsContainer } from './styled'

interface CategoryTabsProps {
  activeCategory: CategoryType
  setActiveCategory: (category: CategoryType) => void
}

export const CategoryTabs: FC<CategoryTabsProps> = ({ activeCategory, setActiveCategory }) => (
  <TabsContainer>
    {Object.entries(faqCategories).map(([key, label]) => (
      <button
        key={key}
        onClick={() => setActiveCategory(key as CategoryType)}
        className={`category-button ${activeCategory === key ? 'active' : 'inactive'}`}
      >
        {label}
      </button>
    ))}
  </TabsContainer>
)
