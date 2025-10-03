import { Divider } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledDivider = styled(Divider)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.primary.main}`,
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(3),
}))
