import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { spacing, typography } from '@/theme/variables'

export const HeaderContainer = styled(Box)(
  () => `
  padding: ${spacing.xl} 0;
  position: relative;
  overflow: hidden;
  text-align: center;
`,
)

export const HeaderContent = styled(Box)(
  () => `
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;

  h2 {
    margin: 0 auto;
  }
`,
)

export const HeaderTitle = styled(Typography)(
  ({ theme }) => `
  font-size: ${typography.fontSizes.xxl};
  font-weight: ${typography.fontWeights.bold};
  color: ${theme.palette.primary.main};
  margin-bottom: ${spacing.xxl};

  @media (min-width: 900px) {
    font-size: ${typography.fontSizes.xxl};
  }
`,
)

export const HeaderSubtitle = styled(Typography)(
  ({ theme }) => `
  font-size: ${typography.fontSizes.lg};
  color: ${theme.palette.text.secondary};
  max-width: 32rem;
  margin: 0 auto;

  @media (min-width: 900px) {
    font-size: ${typography.fontSizes.lg};
  }
`,
)
