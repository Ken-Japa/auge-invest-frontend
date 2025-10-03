import { Grid, Paper, Tooltip, Typography } from '@mui/material'

import { FormulaText } from '../styled'
import { MetricCardProps } from '../types/types'
import { getMetricColor } from '../utils/metricFormatting'
import { formatMetricValue } from '../utils/utils'

export const MetricCard = ({
  title,
  value,
  formula,
  description,
  missingFields = [],
  type,
  isInvalid = false,
  metricKey,
}: MetricCardProps) => (
  <Grid item xs={12} sm={6}>
    <Tooltip
      title={
        missingFields.length > 0 ? (
          `Preencha os campos: ${missingFields.join(', ')}`
        ) : (
          <span>
            {description}
            <br />
            <FormulaText>Fórmula: {formula}</FormulaText>
          </span>
        )
      }
    >
      <Paper
        sx={{
          p: 3,
          height: '100%',
          cursor: 'pointer',
          bgcolor: missingFields.length > 0 ? 'action.disabledBackground' : 'background.paper',
          boxShadow: 3,
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: 6,
          },
        }}
      >
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: !isInvalid && !missingFields.length ? getMetricColor(metricKey, value) : 'text.primary',
            fontWeight: 600,
          }}
        >
          {missingFields.length > 0 ? '---' : isInvalid ? 'N/A' : formatMetricValue(value, type)}
        </Typography>
      </Paper>
    </Tooltip>
  </Grid>
)
