import { Box, Skeleton } from '@mui/material'
import React from 'react'

import { borderRadius } from '@/theme/variables'

interface ContentSkeletonProps {
  type?: 'text' | 'card' | 'avatar' | 'chart' | 'form'
  textLines?: number
  height?: number | string
  width?: number | string
  className?: string
  variant?: 'rectangular' | 'circular' | 'rounded' | 'text'
  cardHeight?: number
  formFields?: number
  style?: React.CSSProperties
}

export const ContentSkeleton: React.FC<ContentSkeletonProps> = ({
  type = 'text',
  textLines = 1,
  height,
  width,
  className,
  variant,
  cardHeight,
  formFields = 1,
  style,
}) => {
  const getDefaultHeight = () => {
    switch (type) {
      case 'card':
        return cardHeight || height || 200
      case 'avatar':
        return height || 40
      case 'chart':
        return height || 300
      case 'form':
        return height || 56
      case 'text':
      default:
        return height || 20
    }
  }

  const getDefaultWidth = () => {
    switch (type) {
      case 'avatar':
        return width || 40
      default:
        return width || '100%'
    }
  }

  const getVariant = () => {
    switch (type) {
      case 'avatar':
        return 'circular'
      case 'card':
      case 'chart':
      case 'form':
        return 'rectangular'
      case 'text':
      default:
        return variant || 'text'
    }
  }

  if (type === 'text') {
    return (
      <Box className={className} sx={{ width: getDefaultWidth(), ...style }}>
        {Array(textLines)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              key={index}
              variant={getVariant() as any}
              height={getDefaultHeight()}
              width={index === textLines - 1 && textLines > 1 ? '80%' : '100%'}
              sx={{ my: 0.5 }}
              animation="wave"
            />
          ))}
      </Box>
    )
  }

  if (type === 'form') {
    return (
      <Box className={className} sx={{ width: getDefaultWidth(), ...style }}>
        {Array(formFields)
          .fill(0)
          .map((_, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Skeleton variant="text" width="30%" height={24} sx={{ mb: 1 }} animation="wave" />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={56}
                animation="wave"
                sx={{
                  borderRadius: borderRadius.md,
                  transform: 'none',
                  transformOrigin: 'center',
                }}
              />
            </Box>
          ))}
      </Box>
    )
  }

  return (
    <Skeleton
      variant={getVariant() as any}
      height={getDefaultHeight()}
      width={getDefaultWidth()}
      className={className}
      animation="wave"
      sx={{
        transform: 'none',
        transformOrigin: 'center',
        ...style,
      }}
    />
  )
}
