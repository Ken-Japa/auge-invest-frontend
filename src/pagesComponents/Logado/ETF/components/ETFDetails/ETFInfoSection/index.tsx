import { Box, Typography } from '@mui/material';
import { BoxBody, BoxContent, BoxHeader } from '../styled';
import { formatCNPJ, formatLink, formatNumber } from '@/components/Utils/Formatters/formatters';

interface ETFInfoSectionProps {
  etf: any; // Consider defining a more specific type for etf
}

const ETFInfoSection = ({ etf }: ETFInfoSectionProps) => {
  return (
    <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4} mt={4}>
      <Box>
        <BoxHeader>
          <Typography variant="h4" component="h4" gutterBottom >Informações básicas</Typography>
        </BoxHeader>
        <BoxContent>
          <BoxBody>
            <Typography variant="body1"><strong>Cotas disponíveis:</strong></Typography>
            <Typography variant="body1">{formatNumber(etf.quotaCount)}</Typography>
          </BoxBody>
          <BoxBody>
            <Typography variant="body1"><strong>Indústria:</strong></Typography>
            <Typography variant="body1">{etf.indústria}</Typography>
          </BoxBody>
          <BoxBody>
            <Typography variant="body1"><strong>Segmento:</strong></Typography>
            <Typography variant="body1">{etf.segmento}</Typography>
          </BoxBody>
        </BoxContent>
      </Box>

      <Box>
        <BoxHeader>
          <Typography variant="h4" component="h4" gutterBottom >Detalhes</Typography>
        </BoxHeader>
        <BoxContent>
          <BoxBody>
            <Typography variant="body1"><strong>CNPJ:</strong></Typography>
            <Typography variant="body1">{formatCNPJ(etf.informações?.cnpj || '')}</Typography>
          </BoxBody>
          <BoxBody>
            <Typography variant="body1"><strong>Site:</strong></Typography>
            <Typography variant="body1" dangerouslySetInnerHTML={{ __html: formatLink(etf.informações?.site, 'Acessar Link') }} />
          </BoxBody>
        </BoxContent>
      </Box>
    </Box>
  );
};

export default ETFInfoSection;