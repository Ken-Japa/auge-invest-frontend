import BusinessIcon from '@mui/icons-material/Business'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Box, Tooltip } from '@mui/material'
import React from 'react'

import { formatCurrency } from '../../../../utils/formatters'

import { ChipsContainer, EsgScoreChip, InfoChip, ValorMercadoChip } from './styled'

interface EmpresaChipsProps {
  empresaInfo: any
  valorMercado: number
}

export const EmpresaChips: React.FC<EmpresaChipsProps> = ({ empresaInfo, valorMercado }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mb: 3 }}>
      <ChipsContainer>
        {empresaInfo?.foundation && (
          <InfoChip
            icon={<CalendarTodayIcon />}
            label={`Fundação: ${empresaInfo.foundation}`}
            variant="outlined"
            size="medium"
          />
        )}

        {empresaInfo?.headquarters && (
          <InfoChip
            icon={<LocationOnIcon />}
            label={`Sede: ${empresaInfo.headquarters}`}
            variant="outlined"
            size="medium"
          />
        )}

        {empresaInfo?.sustainability?.esg_score && (
          <Tooltip title="Pontuação ESG (Environmental, Social, Governance)">
            <EsgScoreChip
              esgscore={empresaInfo.sustainability.esg_score}
              icon={
                <EmojiEventsIcon
                  sx={{
                    color:
                      empresaInfo.sustainability.esg_score > 80
                        ? '#2e7d32'
                        : empresaInfo.sustainability.esg_score > 60
                          ? '#0288d1'
                          : '#ed6c02',
                  }}
                />
              }
              label={`ESG Score: ${empresaInfo.sustainability.esg_score}`}
              variant="outlined"
              size="medium"
            />
          </Tooltip>
        )}
      </ChipsContainer>

      <ValorMercadoChip
        icon={<BusinessIcon />}
        label={`Valor de Mercado: ${formatCurrency(valorMercado)}`}
        color="primary"
        variant="outlined"
        size="medium"
      />
    </Box>
  )
}
