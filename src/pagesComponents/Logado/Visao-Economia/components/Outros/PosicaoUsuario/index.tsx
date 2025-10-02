'use client'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'

import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'

import { ContentSkeleton } from '../../../../../../components/Feedback/Skeletons/ContentSkeleton'

import { NegativeValue, PosicaoContainer, PosicaoHeader, PosicaoTitle, PositiveValue } from './styled'

// Mock data - will be replaced with API data
const mockPositions = [
  { id: 1, name: 'Carteira Principal', return: 12.5 },
  { id: 2, name: 'Carteira Dividendos', return: -3.2 },
  { id: 3, name: 'Carteira FIIs', return: 8.7 },
]

export const PosicaoUsuario = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedPosition, setSelectedPosition] = useState(mockPositions[0])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelectPosition = (position: (typeof mockPositions)[0]) => {
    setSelectedPosition(position)
    handleClose()
  }

  return (
    <SuspenseWrapper fallback={<ContentSkeleton height={120} />}>
      <PosicaoContainer>
        <PosicaoHeader>
          <PosicaoTitle>
            {selectedPosition.name}
            <IconButton size="small" onClick={handleClick}>
              <KeyboardArrowDownIcon />
            </IconButton>
          </PosicaoTitle>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            {mockPositions.map((position) => (
              <MenuItem
                key={position.id}
                onClick={() => handleSelectPosition(position)}
                selected={position.id === selectedPosition.id}
              >
                {position.name}
              </MenuItem>
            ))}
          </Menu>
        </PosicaoHeader>

        {selectedPosition.return >= 0 ? (
          <PositiveValue>
            <TrendingUpIcon />+{selectedPosition.return}%
          </PositiveValue>
        ) : (
          <NegativeValue>
            <TrendingDownIcon />
            {selectedPosition.return}%
          </NegativeValue>
        )}
      </PosicaoContainer>
    </SuspenseWrapper>
  )
}
