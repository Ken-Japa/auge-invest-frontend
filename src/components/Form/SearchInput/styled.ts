import { Box, InputBase } from '@mui/material'
import { styled } from '@mui/material/styles'

export const SearchContainer = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background: ${({ theme }) => theme.palette.background.paper};
  border-radius: 8px;
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  transition: all 0.3s ease;
  position: relative;

  &:hover,
  &:focus-within {
    border-color: ${({ theme }) => theme.palette.primary.main};
    box-shadow: 0 0 0 2px rgba(13, 149, 249, 0.1);
  }
`

export const SearchInput = styled(InputBase)`
  width: 100%;
  color: ${({ theme }) => theme.palette.text.primary};
  margin-left: 8px;
  margin-right: 24px;

  input::placeholder {
    color: ${({ theme }) => theme.palette.text.secondary};
    opacity: 1;
  }
`

export const SearchIconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ClearButtonWrapper = styled(Box)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
`
