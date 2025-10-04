import { Button, ButtonProps, Theme } from '@mui/material'
import { ButtonPropsColorOverrides, ButtonPropsSizeOverrides } from '@mui/material'
import { SxProps } from '@mui/system'
import { OverridableStringUnion } from '@mui/types'
import { HTMLMotionProps } from 'framer-motion'

import { borderRadius as themeBorderRadius } from '@/theme/variables'

interface CustomButtonProps extends Omit<ButtonProps, 'variant' | 'color' | 'size'> {
  value?: string
  Icon?: React.ComponentType
  color?: OverridableStringUnion<
    'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
    ButtonPropsColorOverrides
  >
  customColor?: string
  textColor?: string
  variant?: 'contained' | 'outlined' | 'text'
  size?: OverridableStringUnion<'small' | 'medium' | 'large', ButtonPropsSizeOverrides>
  margin?: string
  align?: string
  padding?: string
  borderRadius?: string
  disabled?: boolean
  component?: any
  whilehover?: HTMLMotionProps<'button'>['whileHover']
  whiletap?: HTMLMotionProps<'button'>['whileTap']
  initial?: HTMLMotionProps<'button'>['initial']
  animate?: HTMLMotionProps<'button'>['animate']
  transition?: HTMLMotionProps<'button'>['transition']
  ariaLabel?: string
  isSelected?: boolean
}

export const CustomButton = ({
  value,
  Icon,
  color = 'primary',
  customColor,
  textColor,
  variant = 'contained',
  size = 'medium',
  onClick,
  fullWidth,
  margin,
  align,
  padding = '10px 30px',
  borderRadius = themeBorderRadius.md,
  disabled = false,
  className,
  sx,
  children,
  startIcon,
  component,
  whilehover,
  whiletap,
  initial,
  animate,
  transition,
  ariaLabel,
  isSelected = false,
  ...props
}: CustomButtonProps) => {
  const customStyles: SxProps<Theme> = {
    margin,
    alignSelf: align,
    padding,
    borderRadius,
    textTransform: 'none',
    '&.Mui-disabled': {
      opacity: 0.7,
    },
    ...(customColor && {
      bgcolor: customColor,
      '&:hover': {
        bgcolor: customColor,
        filter: 'brightness(0.9)',
      },
    }),
    ...(textColor && {
      color: textColor,
    }),
    ...(isSelected && {
      bgcolor: (theme) => theme.palette.primary.main,
      color: (theme) => theme.palette.primary.contrastText,
      '&:hover': {
        bgcolor: (theme) => theme.palette.primary.dark,
      },
    }),
    ...sx,
  }

  return (
    <Button
      onClick={onClick}
      fullWidth={fullWidth}
      variant={variant}
      color={customColor ? undefined : color}
      size={size}
      disabled={disabled}
      className={className}
      sx={customStyles}
      startIcon={startIcon || (Icon && <Icon />)}
      component={component}
      whilehover={whilehover}
      whiletap={whiletap}
      initial={initial}
      animate={animate}
      transition={transition}
      aria-label={ariaLabel || children?.toString() || value}
      {...props}
    >
      {children || value}
    </Button>
  )
}
