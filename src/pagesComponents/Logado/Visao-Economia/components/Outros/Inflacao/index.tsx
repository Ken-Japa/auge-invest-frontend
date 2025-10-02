import { Typography } from '@mui/material'

import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'

import { ContentSkeleton } from '../../../../../../components/Feedback/Skeletons/ContentSkeleton'
import {
  ChartContainer,
  ChartPlaceholderBox,
  InflacaoCard,
  InflacaoColorType,
  InflacaoContainer,
  InflacaoDate,
  InflacaoValue,
  InflacaoWrapper,
} from './styled'

// Temporary mock data - will be replaced with API data
const mockSelic = {
  current: 10.75,
  date: 'Jan/2024',
  history: [13.75, 13.25, 12.75, 12.25, 11.75, 11.25, 10.75],
}

const getSelicColor = (rate: number): InflacaoColorType => {
  if (rate >= 13) return 'error'
  if (rate >= 11) return 'warning'
  if (rate >= 8) return 'info'
  return 'success'
}

export const Inflacao = () => {
  return (
    <SuspenseWrapper fallback={<ContentSkeleton height={120} />}>
      <InflacaoContainer>
        <InflacaoWrapper>
          <ChartContainer>
            {/* Chart placeholder - will be replaced with actual chart */}
            <ChartPlaceholderBox>
              Inflacao <br />
              Mini gráfico será implementado
            </ChartPlaceholderBox>
          </ChartContainer>

          <InflacaoCard>
            <Typography variant="subtitle2" color="text.secondary">
              Inflacao
            </Typography>
            <InflacaoValue color={getSelicColor(mockSelic.current)}>{mockSelic.current}%</InflacaoValue>
            <InflacaoDate>{mockSelic.date}</InflacaoDate>
          </InflacaoCard>
        </InflacaoWrapper>
      </InflacaoContainer>
    </SuspenseWrapper>
  )
}
