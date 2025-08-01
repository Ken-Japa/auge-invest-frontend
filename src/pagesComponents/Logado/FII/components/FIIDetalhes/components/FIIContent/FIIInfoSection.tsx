import { Typography } from '@mui/material';
import { Business as BusinessIcon, CalendarToday as CalendarIcon, Link as LinkIcon } from '@mui/icons-material';
import { formatCNPJ, formatDate, formatNumber, formatLink } from '@/components/Utils/Formatters/formatters';
import { IconWrapper, InfoContainer } from '../../styled';

interface FIIInfoSectionProps {
  cnpj?: string;
  quotaDateApproved?: string;
  quotaCount?: string;
  link?: string;
}

const FIIInfoSection = ({ cnpj, quotaDateApproved, quotaCount, link }: FIIInfoSectionProps) => {
  return (
    <>
      <InfoContainer>
        <Typography variant="h4" component="div" sx={{ color: 'text.secondary', mb: 0.5 }}>
          CNPJ
        </Typography>
        <Typography variant="body1" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
          {cnpj ? formatCNPJ(cnpj) : 'Não informado'}
        </Typography>
      </InfoContainer>

      <InfoContainer>
        <Typography variant="h4" component="div" sx={{ color: 'text.secondary', mb: 0.5 }}>
          Data de Aprovação
        </Typography>
        <Typography variant="body1" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
          <IconWrapper>
            <CalendarIcon fontSize="small" />
          </IconWrapper>
          {quotaDateApproved ? formatDate(quotaDateApproved) : 'Não informado'}
        </Typography>
      </InfoContainer>

      <InfoContainer>
        <Typography variant="h4" component="div" sx={{ color: 'text.secondary', mb: 0.5 }}>
          Quantidade de Cotas
        </Typography>
        <Typography variant="body1" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
          <IconWrapper>
            <BusinessIcon fontSize="small" />
          </IconWrapper>
          {quotaCount ? formatNumber(quotaCount) : 'Não informado'}
        </Typography>
      </InfoContainer>

      {link && (
        <InfoContainer>
          <Typography variant="h4" component="div" sx={{ color: 'text.secondary', mb: 0.5 }}>
            Link
          </Typography>
          <Typography variant="body1" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
            <IconWrapper>
              <LinkIcon fontSize="small" />
            </IconWrapper>
            <Typography variant="body1" dangerouslySetInnerHTML={{ __html: formatLink(link, 'Acessar Link') }} />
          </Typography>
        </InfoContainer>
      )}

    </>
  );
};

export default FIIInfoSection;