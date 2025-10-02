import { Grid } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'

import { formatNumber } from '@/components/Helpers/Formatters/formatters'

import { ETFExtended } from '../../../types'

import {
  CodeChip,
  GridContainer,
  GridHeader,
  GridInfo,
  GridInfoLabel,
  GridInfoValue,
  GridItemPaper,
  GridTitle,
} from './styled'

interface GridViewProps {
  etfs: ETFExtended[]
}

const GridView: React.FC<GridViewProps> = ({ etfs }) => {
  const router = useRouter()

  const sortedEtfs = [...etfs].sort((a, b) => {
    const quotaA = Number(a.quotaCount) || 0
    const quotaB = Number(b.quotaCount) || 0
    return quotaB - quotaA
  })

  const handleItemClick = (nomeETF: string) => {
    router.push(`/etf/${nomeETF}`)
  }

  return (
    <GridContainer container spacing={2}>
      {sortedEtfs.map((etf) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={etf._id}>
          <GridItemPaper
            elevation={1}
            onClick={() => handleItemClick(etf.nomeETF)}
            style={{ cursor: 'pointer' }}
          >
            <GridHeader>
              <GridTitle variant="subtitle1">{etf.nomeETF}</GridTitle>
              {etf.codigo && <CodeChip label={etf.codigo} color="primary" size="small" />}
            </GridHeader>
            <GridInfo>
              <GridInfoLabel>Cotas:</GridInfoLabel>
              <GridInfoValue>{formatNumber(etf.quotaCount) || 'N/A'}</GridInfoValue>
            </GridInfo>
          </GridItemPaper>
        </Grid>
      ))}
    </GridContainer>
  )
}

export default GridView
