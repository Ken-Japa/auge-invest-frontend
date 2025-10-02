import { Grid } from '@mui/material'
import { forwardRef, useImperativeHandle } from 'react'

import { DadosAnaliseFundamental } from '../../types'
import { MetricCard } from './components/MetricCard'
import { metricCategories } from './constants/categories'
import { FIELD_LABELS } from './constants/constants'
import { calculateMetrics } from './constants/metrics'
import { CategoryContainer, CategoryTitle, MetricsGrid } from './styled'

interface MetricsDisplayProps {
  data: DadosAnaliseFundamental
}

export const MetricsDisplay = forwardRef<{ getMetrics: () => any }, MetricsDisplayProps>(({ data }, ref) => {
  const getFieldLabel = (field: keyof DadosAnaliseFundamental): string => FIELD_LABELS[field] || field

  const metrics = calculateMetrics(data, getFieldLabel)
  const categories = metricCategories(metrics)

  useImperativeHandle(ref, () => ({
    getMetrics: () => metrics,
  }))

  return (
    <Grid container spacing={3}>
      {categories.map((category, idx) => (
        <CategoryContainer item xs={12} key={idx}>
          <CategoryTitle variant="h4" gutterBottom>
            {category.title}
          </CategoryTitle>
          <MetricsGrid container spacing={2}>
            {category.metrics.map((metric, metricIdx) => (
              <MetricCard key={metricIdx} {...metric} />
            ))}
          </MetricsGrid>
        </CategoryContainer>
      ))}
    </Grid>
  )
})

MetricsDisplay.displayName = 'MetricsDisplay'
