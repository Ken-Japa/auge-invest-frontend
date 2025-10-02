import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const PosicaoContainer = styled(Box)`
  width: 100%;
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  background: ${({ theme }) =>
    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
`

export const PosicaoHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  width: 100%;
`

export const PosicaoTitle = styled(Box)`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.text.primary};
`

const ValueBase = styled(Typography)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
  font-weight: 700;

  svg {
    font-size: 20px;
  }
`

export const PositiveValue = styled(ValueBase)`
  color: ${({ theme }) => theme.palette.success.main};
`

export const NegativeValue = styled(ValueBase)`
  color: ${({ theme }) => theme.palette.error.main};
`
