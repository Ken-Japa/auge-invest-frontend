import { Container, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}))

export const StyledStack = styled(Stack)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}))
