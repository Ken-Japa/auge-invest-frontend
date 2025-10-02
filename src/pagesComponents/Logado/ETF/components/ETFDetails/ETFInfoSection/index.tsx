import { Box, Typography } from '@mui/material'

import { formatCNPJ, formatLink, formatNumber } from '@/components/Helpers/Formatters/formatters'

import { BoxBody, BoxContent, BoxHeader } from '../styled'

interface ETFInfoSectionProps {
  etf: any
}

const ETFInfoSection = ({ etf }: ETFInfoSectionProps) => {
  return (
    <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4} mt={4}>
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
    </Box>
  )
}

export default ETFInfoSection
