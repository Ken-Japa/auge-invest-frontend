import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const SearchInputContainer = styled(Box)`
  margin-bottom: 2rem;

  .MuiOutlinedInput-root {
    border-radius: 8px;
    background-color: #f5f5f5;
    transition: all 0.3s ease-in-out;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    &.Mui-focused {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      border-color: #0d95f9;
    }
  }

  .MuiInputBase-input {
    padding: 12px 14px;
  }

  .MuiInputLabel-root {
    color: #666;
  }

  .MuiInputAdornment-root {
    color: #999;
  }
`
