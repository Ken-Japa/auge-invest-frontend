import { Grid, Typography } from '@mui/material';
import { CalendarToday as CalendarIcon, Business as BusinessIcon } from '@mui/icons-material';
import { FIIExtended } from '../../../../../components/FIIs/types';
import { formatCNPJ, formatDate, formatNumber } from '@/components/Utils/Formatters/formatters';
import {
  DetailContainer,
  DetailPaper,
  HeaderContainer,
  CodeChip,
  SectionDivider,
  InfoContainer,
  IconWrapper
} from '../../styled';
import FIIDividendos from '../FIIDividendos';

interface FIIContentProps {
  fii: FIIExtended;
}

export const FIIContent = ({ fii }: FIIContentProps) => (
  <DetailContainer>
    <DetailPaper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HeaderContainer>
            <div>
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                {fii.nomeFII}
              </Typography>
              {fii.nomeCompletoFII && (
                <Typography variant="subtitle1" component="div" gutterBottom sx={{ color: 'text.secondary' }}>
                  {fii.nomeCompletoFII}
                </Typography>
              )}
            </div>
            <div>
              {fii.codigo && fii.codigo.map((code) => (
                <CodeChip
                  key={code}
                  label={code}
                  color="primary"
                />
              ))}
            </div>
          </HeaderContainer>
        </Grid>

        <Grid item xs={12}>
          <SectionDivider />
        </Grid>

        <Grid item xs={12} md={6}>
          <InfoContainer>
            <Typography variant="body2" component="div" sx={{ color: 'text.secondary', mb: 0.5 }}>
              CNPJ
            </Typography>
            <Typography variant="body1" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
              {fii.informacoes?.cnpj ? formatCNPJ(fii.informacoes.cnpj) : 'Não informado'}
            </Typography>
          </InfoContainer>

          <InfoContainer>
            <Typography variant="body2" component="div" sx={{ color: 'text.secondary', mb: 0.5 }}>
              Data de Aprovação
            </Typography>
            <Typography variant="body1" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
              <IconWrapper>
                <CalendarIcon fontSize="small" />
              </IconWrapper>
              {fii.quotaDateApproved ? formatDate(fii.quotaDateApproved) : 'Não informado'}
            </Typography>
          </InfoContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <InfoContainer>
            <Typography variant="body2" component="div" sx={{ color: 'text.secondary', mb: 0.5 }}>
              Quantidade de Cotas
            </Typography>
            <Typography variant="body1" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
              <IconWrapper>
                <BusinessIcon fontSize="small" />
              </IconWrapper>
              {fii.quotaCount ? formatNumber(fii.quotaCount) : 'Não informado'}
            </Typography>
          </InfoContainer>
        </Grid>

        <Grid item xs={12}>
          <SectionDivider />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'medium' }}>
            Descrição
          </Typography>
          <Typography variant="body1" component="div">
            Não há descrição disponível para este FII.
          </Typography>
        </Grid>
      </Grid>
    </DetailPaper>
    {fii.nomeFII && <FIIDividendos nomeFII={fii.nomeFII} />}
  </DetailContainer>
);