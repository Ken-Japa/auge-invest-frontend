import { Grid, Typography } from '@mui/material'

import { FEATURES } from '../../constants/features'
import { FeaturesGridSkeleton } from './FeaturesGridSkeleton'
import { FeatureCard, FeaturesContainer } from './styled'

interface FeaturesGridProps {
  hoveredCard: number | null
  setHoveredCard: (index: number | null) => void
  isLoading?: boolean
}

export const FeaturesGrid = ({ hoveredCard, setHoveredCard, isLoading }: FeaturesGridProps) => {
  if (isLoading) {
    return <FeaturesGridSkeleton />
  }
  return (
    <FeaturesContainer>
      <Grid container spacing={4}>
        {FEATURES.map((feature, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <FeatureCard
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={hoveredCard !== null && hoveredCard !== index ? 'dimmed' : ''}
            >
              <div className="icon-container">{feature.icon}</div>
              <Typography variant="h5" className="feature-title">
                {feature.title}
              </Typography>
              <Typography className="feature-description">{feature.description}</Typography>
              <div className="feature-details">
                <ul>
                  {feature.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            </FeatureCard>
          </Grid>
        ))}
      </Grid>
    </FeaturesContainer>
  )
}
