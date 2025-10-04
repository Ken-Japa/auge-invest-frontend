import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import { CustomButton } from '@/components/Core/Button'
import { borderRadius, spacing, typography } from '@/theme/variables'

export const CategoriesContainer = styled(Box)(
  ({ theme }) => `
  background: ${theme.palette.background.paper};
  padding: ${spacing.lg};
  border-radius: ${borderRadius.md};
  border: 1px solid ${theme.palette.divider};
`,
)

interface CategoryButtonProps {
  isSelected: boolean
}

export const CategoryButton = styled(CustomButton)<CategoryButtonProps>(
  ({ isSelected, theme }) => `
  width: 100%;
  text-align: left;
  padding: ${spacing.sm} ${spacing.md};
  border-radius: ${borderRadius.md};
  background: ${isSelected ? theme.palette.primary.main : 'transparent'};
  color: ${isSelected ? theme.palette.primary.contrastText : theme.palette.text.secondary};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: ${typography.fontSizes.sm};

  &:hover {
    background: ${isSelected ? theme.palette.primary.main : 'rgba(13, 149, 249, 0.1)'};
    color: ${theme.palette.primary.contrastText};
  }
`,
)
