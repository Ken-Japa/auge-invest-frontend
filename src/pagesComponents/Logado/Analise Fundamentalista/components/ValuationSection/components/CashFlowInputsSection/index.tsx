import { Grid } from '@mui/material'
import { FC } from 'react'

import { NumberInput } from '@/components/Form/NumberInput'

import { CashFlowContainer } from './styled'

interface CashFlowInputsSectionProps {
  fco: number
  fcl: number
  onFcoChange: (value: number | null) => void
  onFclChange: (value: number | null) => void
}

export const CashFlowInputsSection: FC<CashFlowInputsSectionProps> = ({
  fco,
  fcl,
  onFcoChange,
  onFclChange,
}) => {
  return (
    <CashFlowContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <NumberInput label="Fluxo de Caixa Operacional" value={fco} onChange={onFcoChange} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <NumberInput label="Fluxo de Caixa Livre" value={fcl} onChange={onFclChange} fullWidth />
        </Grid>
      </Grid>
    </CashFlowContainer>
  )
}
