import { Box, Chip } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React from 'react'

import { StyledTab, StyledTabs, TabsContainer } from './styled'

interface VencimentoTabsProps {
  vencimentos: string[]
  selectedVencimento: string
  onVencimentoChange: (event: React.SyntheticEvent, newValue: string) => void
  formatarVencimento: (data: string) => string
  calcularDiasAteVencimento: (vencimento: string) => number
  getVencimentoColor: (dias: number) => string
}

export const VencimentoTabs: React.FC<VencimentoTabsProps> = ({
  vencimentos,
  selectedVencimento,
  onVencimentoChange,
  formatarVencimento,
  calcularDiasAteVencimento,
  getVencimentoColor,
}) => {
  const theme = useTheme()

  return (
    <TabsContainer>
      <StyledTabs
        value={selectedVencimento}
        onChange={onVencimentoChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="vencimentos tabs"
      >
        {vencimentos.map((vencimento) => {
          const diasAteVencimento = calcularDiasAteVencimento(vencimento)
          const color = getVencimentoColor(diasAteVencimento)

          return (
            <StyledTab
              key={vencimento}
              value={vencimento}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>{formatarVencimento(vencimento)}</span>
                  <Chip
                    label={`${diasAteVencimento} DIAS`}
                    size="small"
                    sx={{
                      backgroundColor: color,
                      color: theme.palette.getContrastText(color),
                      fontWeight: 'bold',
                    }}
                  />
                </Box>
              }
            />
          )
        })}
      </StyledTabs>
    </TabsContainer>
  )
}
