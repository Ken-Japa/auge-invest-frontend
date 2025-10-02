import { Box, Typography } from '@mui/material'
import { Point } from '@nivo/line'
import React from 'react'

interface TooltipContentProps {
  point: Point
  valueFormatter: (value: number) => [string] | [string, string]
  labelFormatter: (label: string) => string
}

export const TooltipContent: React.FC<TooltipContentProps> = ({ point, valueFormatter, labelFormatter }) => {
  const value = Number(point.data.y)
  const label = point.data.x as string
  const [formattedValue, valueLabel] = valueFormatter(value)
  const formattedLabel = labelFormatter(label)

  return (
    <Box sx={{ p: 1, bgcolor: 'background.paper', boxShadow: 1, borderRadius: 1 }}>
      <Typography variant="body2">{formattedLabel}</Typography>
      <Typography variant="body1" fontWeight="bold">
        {formattedValue} {valueLabel && `(${valueLabel})`}
      </Typography>
    </Box>
  )
}
