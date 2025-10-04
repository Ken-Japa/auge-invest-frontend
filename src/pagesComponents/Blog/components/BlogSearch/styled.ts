import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import { borderRadius, shadows, spacing } from '@/theme/variables'

export const SearchInputContainer = styled(Box)(
  ({ theme }) => `
  margin-bottom: ${spacing.xl};

  .MuiOutlinedInput-root {
    border-radius: ${borderRadius.md};
    background-color: ${theme.palette.background.paper};
    transition: all 0.3s ease-in-out;

    &:hover {
      box-shadow: ${shadows.md};
    }

    &.Mui-focused {
      box-shadow: ${shadows.lg};
      border-color: ${theme.palette.primary.main};
    }
  }

  .MuiInputBase-input {
    padding: ${spacing.md} ${spacing.lg};
  }

  .MuiInputLabel-root {
    color: ${theme.palette.text.secondary};
  }

  .MuiInputAdornment-root {
    color: ${theme.palette.text.disabled};
  }
`,
)
