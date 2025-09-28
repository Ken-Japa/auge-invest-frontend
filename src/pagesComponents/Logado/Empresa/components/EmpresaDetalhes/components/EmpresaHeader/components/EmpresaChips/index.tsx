import BusinessIcon from '@mui/icons-material/Business';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Chip,Tooltip } from '@mui/material';
import React from 'react';

import { formatCurrency } from '../../../../utils/formatters';
import { ChipsContainer, InfoChip, ValorMercadoChip } from './styled';

interface EmpresaChipsProps {
  empresaInfo: any;
  valorMercado: number;
}

export const EmpresaChips: React.FC<EmpresaChipsProps> = ({ empresaInfo, valorMercado }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mb: 3 }}>
      <ChipsContainer>
        {empresaInfo?.fundacao && (
          <InfoChip
            icon={<CalendarTodayIcon />}
            label={`Fundação: ${empresaInfo.fundacao}`}
            variant="outlined"
            size="medium"
          />
        )}

        {empresaInfo?.sede && (
          <InfoChip
            icon={<LocationOnIcon />}
            label={`Sede: ${empresaInfo.sede}`}
            variant="outlined"
            size="medium"
          />
        )}

        {empresaInfo?.sustentabilidade?.esg_score && (
          <Tooltip title="Pontuação ESG (Environmental, Social, Governance)">
            <Chip
              icon={
                <EmojiEventsIcon
                  style={{
                    color: empresaInfo.sustentabilidade.esg_score > 80 ? '#2e7d32' :
                      empresaInfo.sustentabilidade.esg_score > 60 ? '#0288d1' :
                        '#ed6c02'
                  }}
                />
              }
              label={`ESG Score: ${empresaInfo.sustentabilidade.esg_score}`}
              variant="outlined"
              size="medium"
              sx={{
                margin: 0.5,
                padding: 1,
                backgroundColor:
                  empresaInfo.sustentabilidade.esg_score > 80 ? 'rgba(46, 125, 50, 0.1)' :
                    empresaInfo.sustentabilidade.esg_score > 60 ? 'rgba(2, 136, 209, 0.1)' :
                      'rgba(237, 108, 2, 0.1)',
                borderColor:
                  empresaInfo.sustentabilidade.esg_score > 80 ? 'rgba(46, 125, 50, 0.5)' :
                    empresaInfo.sustentabilidade.esg_score > 60 ? 'rgba(2, 136, 209, 0.5)' :
                      'rgba(237, 108, 2, 0.5)',
                color:
                  empresaInfo.sustentabilidade.esg_score > 80 ? '#2e7d32' :
                    empresaInfo.sustentabilidade.esg_score > 60 ? '#0288d1' :
                      '#ed6c02',
                "& .MuiChip-icon": {
                  color: 'inherit' // This ensures the icon inherits the color from the chip
                }
              }}
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
  );
};