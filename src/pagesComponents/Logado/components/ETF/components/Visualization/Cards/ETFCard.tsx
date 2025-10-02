import React from 'react'

import { formatCNPJ, formatNumber } from '@/components/Helpers/Formatters/formatters'

import { ETFExtended } from '../../../types'
import {
  CardContainer,
  CardHeader,
  CardInfo,
  CardInfoLabel,
  CardInfoValue,
  CardSubtitle,
  CardTitle,
  CodeChip,
} from './styled'

interface ETFCardProps {
  etf: ETFExtended
  handleCardClick: (nomeETF: string) => void
}

const ETFCard: React.FC<ETFCardProps> = ({ etf, handleCardClick }) => {
  return (
    <CardContainer onClick={() => handleCardClick(etf.nomeETF)} style={{ cursor: 'pointer' }}>
      <CardHeader>
        <CardTitle variant="h6">{etf.nomeETF}</CardTitle>
        {etf.codigo && <CodeChip label={etf.codigo} color="primary" size="small" />}
      </CardHeader>
      <CardSubtitle variant="body2">{etf.nomeCompletoETF}</CardSubtitle>

      <CardInfo>
        <CardInfoLabel variant="body2">Cotas:</CardInfoLabel>
        <CardInfoValue variant="body1">{formatNumber(etf.quotaCount) || 'N/A'}</CardInfoValue>
      </CardInfo>

      <CardInfo>
        <CardInfoLabel variant="body2">Aprovado em:</CardInfoLabel>
        <CardInfoValue variant="body1">{etf.quotaDateApproved || 'N/A'}</CardInfoValue>
      </CardInfo>

      <CardInfo>
        <CardInfoLabel variant="body2">CNPJ:</CardInfoLabel>
        <CardInfoValue variant="body1">{formatCNPJ(etf.informações?.cnpj)}</CardInfoValue>
      </CardInfo>
    </CardContainer>
  )
}

export default ETFCard
