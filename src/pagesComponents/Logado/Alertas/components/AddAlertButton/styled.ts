import { styled } from '@mui/material/styles'

import { CustomButton } from '@/components/Core/Button'

export const StyledAddAlertButton = styled(CustomButton)(({ theme }) => ({
  margin: theme.spacing(3, 0),
  fontSize: '1.1rem',
}))
