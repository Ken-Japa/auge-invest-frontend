import { styled } from '@mui/material/styles'

import { CustomButton } from '@/components/Core/Button'

export const StyledAddAlertButton = styled(CustomButton)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  fontSize: '1rem',
}))
