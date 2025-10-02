import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export type SelicColorType = 'error' | 'warning' | 'info' | 'success'

export const SelicContainer = styled(Box)`
  width: 100%;
  height: 100%;
  min-height: 120px;
  padding: 16px;
`

export const SelicWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: 24px;
  height: 100%;
`

export const ChartContainer = styled(Box)`
  flex: 1;
  height: 100%;
  min-height: 80px;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  background: ${({ theme }) =>
    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
`

export const ChartPlaceholderBox = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.palette.text.secondary};
  font-style: italic;
`

export const SelicCard = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  background: ${({ theme }) =>
    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
  min-width: 120px;
`

export const SelicValue = styled(Typography)<{ color: SelicColorType }>`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme, color }) => theme.palette[color].main};
`

export const SelicDate = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 12px;
  margin-top: 4px;
`
