'use client'

import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'

import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'

import { ContentSkeleton } from '../../../../../../components/Feedback/Skeletons/ContentSkeleton'
import { SearchDialog } from './components/SearchDialog'
import {
  ChartContainer,
  ChartPlaceholderBox,
  DebenturesContainer,
  DebenturesInfo,
  DebenturesName,
  DebenturesValue,
  DebenturesVariation,
  SearchIconButton,
} from './styled'

// Mock data - will be replaced with API data
const mockDebentures = [
  {
    id: 'Debentures',
    name: 'Debentures',
    value: 2024.15,
    variation: 1.2,
    history: [2000, 2010, 2015, 2020, 2024.15],
  },
  {
    id: 'GOLD',
    name: 'Ouro',
    value: 2024.15,
    variation: 1.2,
    history: [2000, 2010, 2015, 2020, 2024.15],
  },
  {
    id: 'SILVER',
    name: 'Prata',
    value: 23.45,
    variation: 0.5,
    history: [23, 23.2, 23.3, 23.4, 23.45],
  },
]

export const Debentures = () => {
  const [selectedDebenture, setSelectedDebenture] = useState(mockDebentures[0])
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <SuspenseWrapper fallback={<ContentSkeleton height={480} />}>
      <DebenturesContainer>
        <SearchIconButton size="small" onClick={() => setIsSearchOpen(true)}>
          <SearchIcon fontSize="small" />
        </SearchIconButton>

        <DebenturesInfo>
          <DebenturesName>{selectedDebenture.name}</DebenturesName>
          <DebenturesValue>
            US${' '}
            {selectedDebenture.value.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </DebenturesValue>
          <DebenturesVariation $isPositive={selectedDebenture.variation >= 0}>
            {selectedDebenture.variation >= 0 ? '+' : ''}
            {selectedDebenture.variation}%
          </DebenturesVariation>
        </DebenturesInfo>

        <ChartContainer>
          {/* Chart placeholder - will be replaced with actual chart */}
          <ChartPlaceholderBox>Gráfico será implementado</ChartPlaceholderBox>
        </ChartContainer>

        <SearchDialog
          open={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelect={(debenture) => {
            setSelectedDebenture(debenture)
            setIsSearchOpen(false)
          }}
          commodities={mockDebentures}
        />
      </DebenturesContainer>
    </SuspenseWrapper>
  )
}
