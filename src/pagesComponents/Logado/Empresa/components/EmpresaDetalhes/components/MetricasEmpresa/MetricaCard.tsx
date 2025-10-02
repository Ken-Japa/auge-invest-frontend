import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'

interface MetricaCardProps {
  label: string
  value: string
  isPositive?: boolean
}

interface StyledMetricaCardProps {
  isPositive?: boolean
}

export const MetricaCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isPositive',
})<StyledMetricaCardProps>(({ theme, isPositive }) => ({
  textAlign: 'center',
  p: 2,
  borderRadius: '12px',
  padding: theme.spacing(2),
  bgcolor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  border: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create(['transform', 'box-shadow', 'border-color'], {
    duration: theme.transitions.duration.standard,
  }),
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[8],
    borderColor: theme.palette.primary.main,
  },
  '& .MuiTypography-body1': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:
      isPositive !== undefined
        ? isPositive
          ? theme.palette.success.main
          : theme.palette.error.main
        : theme.palette.text.primary,
  },
}))

export const MetricaLabel = styled(Typography)(({ theme }) => ({
  variant: 'body2',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(0.5),
}))

export const MetricaValue = styled(Box)<{
  theme?: Theme
}>`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`

export const MetricaArrow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: theme.spacing(0.5),
}))

export const MetricaCardComponent = ({ label, value, isPositive }: MetricaCardProps) => {
  return (
    <MetricaCard isPositive={isPositive}>
      <MetricaLabel>{label}</MetricaLabel>
      <MetricaValue>
        <Typography component="div">{value}</Typography>
        {isPositive !== undefined && (
          <MetricaArrow>
            {isPositive ? <ArrowDropUp color="success" /> : <ArrowDropDown color="error" />}
          </MetricaArrow>
        )}
      </MetricaValue>
    </MetricaCard>
  )
}
