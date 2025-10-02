import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { useRouter } from 'next/navigation'
import React from 'react'

import { formatPercentage } from '../../../utils/currency'
import { CodeChip } from '../../styled'

import { CodeContainer, CodeText, PriceText, VariationContainer, VariationText } from './styled'

interface CodeItemProps {
  codigo: {
    codigo: string
    variacao?: number
    preco?: number
  }
}

export const CodeItem: React.FC<CodeItemProps> = ({ codigo }) => {
  const router = useRouter()
  const ispositive = codigo.variacao !== undefined && codigo.variacao > 0
  const iszero = codigo.variacao !== undefined && codigo.variacao === 0

  const handleDoubleClick = () => {
    router.push(`/empresa/${codigo.codigo}`)
  }

  return (
    <CodeChip
      label={
        <CodeContainer>
          <CodeText variant="caption" onDoubleClick={handleDoubleClick}>
            {codigo.codigo}
          </CodeText>

          {codigo.preco !== undefined && (
            <PriceText variant="caption">R$ {codigo.preco.toFixed(2)}</PriceText>
          )}

          {codigo.variacao !== undefined && (
            <VariationContainer>
              {ispositive ? (
                <TrendingUpIcon fontSize="small" color="success" />
              ) : iszero ? (
                <TrendingFlatIcon fontSize="small" color="inherit" />
              ) : (
                <TrendingDownIcon fontSize="small" color="error" />
              )}
              <VariationText variant="caption" ispositive={ispositive} iszero={iszero}>
                {formatPercentage(codigo.variacao)}
              </VariationText>
            </VariationContainer>
          )}
        </CodeContainer>
      }
    />
  )
}
