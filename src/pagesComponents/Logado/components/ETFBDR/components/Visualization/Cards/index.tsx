import { Grid } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'

import { ETFBDRExtended } from '../../../types'
import { CardContainer, CardHeader, CardSubtitle, CardTitle, CodeChip } from './styled'

interface CardViewProps {
  etfbdrs: ETFBDRExtended[]
}

const CardView: React.FC<CardViewProps> = ({ etfbdrs }) => {
  const router = useRouter()

  const handleCardClick = (nomeETF: string) => {
    router.push(`/etfbdr/${nomeETF}`)
  }

  return (
    <Grid container spacing={3}>
      {etfbdrs.map((etfbdr) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={etfbdr._id}>
          <CardContainer onClick={() => handleCardClick(etfbdr.nomeETF)} style={{ cursor: 'pointer' }}>
            <CardHeader>
              <CardTitle variant="h6">{etfbdr.nomeETF}</CardTitle>
              {etfbdr.codigo && <CodeChip label={etfbdr.codigo} color="primary" size="small" />}
            </CardHeader>
            <CardSubtitle variant="body2">{etfbdr.nomeCompletoETF}</CardSubtitle>
          </CardContainer>
        </Grid>
      ))}
    </Grid>
  )
}

export default CardView
