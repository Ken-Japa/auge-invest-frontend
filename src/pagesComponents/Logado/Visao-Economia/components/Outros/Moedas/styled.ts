import { Box, IconButton, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const MoedasContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  position: relative;
`

export const SearchIconButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
`

export const MainCurrency = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  flex: 1;
`

export const SideCurrencies = styled(Box)<{ side: 'left' | 'right' }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  ${({ side }) => (side === 'left' ? 'margin-right: 16px;' : 'margin-left: 16px;')}
  min-width: 120px;
`

export const CurrencyOption = styled(Box)<{ selected?: boolean }>`
  padding: 8px;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ theme, selected }) =>
    selected
      ? theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.05)'
      : 'transparent'};

  &:hover {
    background: ${({ theme }) =>
      theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  }
`

export const CurrencyName = styled(Typography)`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.text.secondary};
`

export const CurrencyValue = styled(Typography)`
  font-size: 14px;
  font-weight: 500;
`

export const MainCurrencyValue = styled(Typography)`
  font-size: 32px;
  font-weight: 700;
`

interface MainCurrencyVariationProps {
  $isPositive: boolean
}

export const MainCurrencyVariation = styled('div')<MainCurrencyVariationProps>`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${(props) => (props.$isPositive ? '#4caf50' : '#f44336')};
`
