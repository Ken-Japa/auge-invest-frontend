import { Typography, TypographyProps } from '@mui/material'

interface NumberFormatProps extends Omit<TypographyProps, 'children'> {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  colored?: boolean
  variant?: TypographyProps['variant']
  percentage?: boolean
}

export const NumberFormat = ({
  value,
  prefix = '',
  suffix = '',
  decimals = 2,
  colored = false,
  percentage = false,
  variant = 'body1',
  ...props
}: NumberFormatProps) => {
  const formattedValue = value.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    style: percentage ? 'percent' : 'decimal',
  })

  return (
    <Typography
      component="span"
      variant={variant}
      color={colored ? (value >= 0 ? 'success.main' : 'error.main') : 'inherit'}
      {...props}
    >
      {prefix}
      {formattedValue}
      {suffix}
    </Typography>
  )
}
