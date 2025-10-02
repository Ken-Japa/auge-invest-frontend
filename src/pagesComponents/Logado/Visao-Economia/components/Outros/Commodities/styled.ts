import { Box, IconButton, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const CommoditiesContainer = styled(Box)`
  width: 100%;
  height: 100%;
  padding: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const ChartContainer = styled(Box)`
  flex: 1;
  min-height: 150px;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  background: ${({ theme }) =>
    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
`

export const CommodityInfo = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`

export const CommodityName = styled(Typography)`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.text.secondary};
`

export const CommodityValue = styled(Typography)`
  font-size: 24px;
  font-weight: 700;
`

interface CommodityVariationProps {
  $isPositive: boolean
}

export const CommodityVariation = styled('div')<CommodityVariationProps>`
  color: ${(props) => (props.$isPositive ? '#4caf50' : '#f44336')};
  font-weight: 500;
`

export const SearchIconButton = styled(IconButton)({
  position: 'absolute',
  top: 8,
  right: 8,
})

export const ChartPlaceholderBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  fontStyle: 'italic',
}))
