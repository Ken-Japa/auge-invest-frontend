import { Box, Typography } from '@mui/material'

import { formatCNPJ, formatLink, formatNumber } from '@/components/Helpers/Formatters/formatters'

import { BoxBody, BoxContent, BoxHeader, InfoSectionGrid } from '../styled'

interface ETFInfoSectionProps {
  etf: any
}

const ETFInfoSection = ({ etf }: ETFInfoSectionProps) => {
  return (
    <InfoSectionGrid>
      <Box>
        <BoxHeader>
          <Typography variant="h4" component="h4" gutterBottom>
            Informações básicas
          </Typography>
        </BoxHeader>
        <BoxContent>
          <BoxBody>
            <Typography variant="body1">
              <strong>Cotas disponíveis:</strong>
            </Typography>
            <Typography variant="body1">{formatNumber(etf.quotaCount)}</Typography>
          </BoxBody>
          <BoxBody>
            <Typography variant="body1">
              <strong>Indústria:</strong>
            </Typography>
            <Typography variant="body1">{etf.indústria}</Typography>
          </BoxBody>
          <BoxBody>
            <Typography variant="body1">
              <strong>Segmento:</strong>
            </Typography>
            <Typography variant="body1">{etf.segmento}</Typography>
          </BoxBody>
        </BoxContent>
      </Box>

      <Box>
        <BoxHeader>
          <Typography variant="h4" component="h4" gutterBottom>
            Detalhes
          </Typography>
        </BoxHeader>
        <BoxContent>
          <BoxBody>
            <Typography variant="body1">
              <strong>CNPJ:</strong>
            </Typography>
            <Typography variant="body1">{formatCNPJ(etf.informações?.cnpj || '')}</Typography>
          </BoxBody>
          <BoxBody>
            <Typography variant="body1">
              <strong>Site:</strong>
            </Typography>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: formatLink(etf.informações?.site, 'Acessar Link') }}
            />
          </BoxBody>
        </BoxContent>
      </Box>
    </InfoSectionGrid>
  )
}

export default ETFInfoSection
