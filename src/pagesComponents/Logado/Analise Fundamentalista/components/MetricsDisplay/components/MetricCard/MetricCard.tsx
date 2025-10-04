import { Grid, Tooltip, Typography } from '@mui/material'

import { FormulaText } from '../../styled'
import { MetricCardProps } from '../../types/types'
import { getMetricColor } from '../../utils/metricFormatting'
import { formatMetricValue } from '../../utils/utils'
import { StyledPaper, StyledValueTypography } from './styled'

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
      <StyledPaper
        sx={{
          bgcolor: missingFields.length > 0 ? 'action.disabledBackground' : 'background.paper',
        }}
      >
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <StyledValueTypography
          variant="h5"
          sx={{
            color: !isInvalid && !missingFields.length ? getMetricColor(metricKey, value) : 'text.primary',
          }}
        >
          {missingFields.length > 0 ? '---' : isInvalid ? 'N/A' : formatMetricValue(value, type)}
        </StyledValueTypography>
      </StyledPaper>
    </Tooltip>
  </Grid>
)
