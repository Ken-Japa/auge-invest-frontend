import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

interface ChartStatusDisplayProps {
  loading: boolean
  hasData: boolean
  height: number | string
}

export const ChartStatusDisplay: React.FC<ChartStatusDisplayProps> = ({ loading, hasData, height }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!hasData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height }}>
        <Typography>Sem dados disponíveis</Typography>
      </Box>
    )
  }

  return null
}
