import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import { CustomButton } from '@/components/Core/Button'
import { borderRadius } from '@/theme/variables'

export const CategoriesContainer = styled(Box)`
  background: #1a1a1a;
  padding: 24px;
  border-radius: ${borderRadius.md};
  border: 1px solid rgba(255, 255, 255, 0.1);
`

interface CategoryButtonProps {
  isSelected: boolean
}

export const CategoryButton = styled(CustomButton)<CategoryButtonProps>`
  width: 100%;
  text-align: left;
  padding: 8px 16px;
  border-radius: ${borderRadius.md};
  background: ${({ isSelected }) => (isSelected ? '#0D95F9' : 'transparent')};
  color: ${({ isSelected }) => (isSelected ? 'white' : 'rgba(255, 255, 255, 0.8)')};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;

  &:hover {
    background: ${({ isSelected }) => (isSelected ? '#0D95F9' : 'rgba(13, 149, 249, 0.1)')};
    color: white;
  }
`
