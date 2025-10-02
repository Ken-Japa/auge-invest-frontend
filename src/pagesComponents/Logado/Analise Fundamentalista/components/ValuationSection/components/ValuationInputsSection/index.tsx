import { Grid, Typography } from '@mui/material'
import { FC } from 'react'

import { NumberInput } from '@/components/Form/NumberInput'

import { ValuationInputs } from '../../types'

import { InputsContainer } from './styled'

interface ValuationInputsSectionProps {
  inputs: ValuationInputs
  fco: number
  fcl: number
  onInputChange: (field: keyof ValuationInputs, value: number) => void
  onFcoChange: (value: number | null) => void
  onFclChange: (value: number | null) => void
}

export const ValuationInputsSection: FC<ValuationInputsSectionProps> = ({
  inputs,
  fco,
  fcl,
  onInputChange,
  onFcoChange,
  onFclChange,
}) => {
  return (
    <InputsContainer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Fluxo de Caixa
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <NumberInput label="Fluxo de Caixa Operacional" value={fco} onChange={onFcoChange} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <NumberInput label="Fluxo de Caixa Livre" value={fcl} onChange={onFclChange} fullWidth />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Parâmetros de Valuation
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput
            label="WACC (%)"
            value={inputs.wacc}
            onChange={(value) => onInputChange('wacc', value ?? 0)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput
            label="Crescimento Terminal (%)"
            value={inputs.crescimentoTerminal}
            onChange={(value) => onInputChange('crescimentoTerminal', value ?? 0)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput
            label="Crescimento Projeção (%)"
            value={inputs.crescimentoProjecao}
            onChange={(value) => onInputChange('crescimentoProjecao', value ?? 0)}
            fullWidth
          />
        </Grid>
      </Grid>
    </InputsContainer>
  )
}
