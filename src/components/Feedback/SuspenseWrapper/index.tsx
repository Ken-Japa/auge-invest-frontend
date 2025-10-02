import { Box, CircularProgress } from '@mui/material'
import { ReactNode, Suspense } from 'react'

interface SuspenseWrapperProps {
  children: ReactNode
  fallback?: ReactNode
  className?: string
}

export const SuspenseWrapper = ({ children, fallback, className = '' }: SuspenseWrapperProps) => {
  const defaultFallback = (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="fixed"
      top="50%"
      left="50%"
      sx={{
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
      }}
      className={className}
    >
      <CircularProgress color="primary" />
    </Box>
  )

  return <Suspense fallback={fallback || defaultFallback}>{children}</Suspense>
}
