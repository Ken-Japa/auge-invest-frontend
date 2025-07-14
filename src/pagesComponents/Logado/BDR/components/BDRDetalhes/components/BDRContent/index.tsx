import { Grid, Typography } from '@mui/material';
import { CalendarToday as CalendarIcon, Business as BusinessIcon } from '@mui/icons-material';
import { BDRExtended } from '../../../../../components/BDR/types';
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
import BDRDividendos from '../BDRDividendos';

interface BDRContentProps {
  bdr: BDRExtended;
}

export const BDRContent = ({ bdr }: BDRContentProps) => (
  <DetailContainer>
    <DetailPaper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HeaderContainer>
            <div>
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                {bdr.nomeBDR}
              </Typography>
              {bdr.nomeCompletoBDR && (
                <Typography variant="subtitle1" component="div" gutterBottom sx={{ color: 'text.secondary' }}>
                  {bdr.nomeCompletoBDR}
                </Typography>
              )}
            </div>
            <div>
              {bdr.codigo && bdr.codigo.map((code) => (
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
              {bdr.informacoes?.cnpj ? formatCNPJ(bdr.informacoes.cnpj) : 'Não informado'}
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
              {bdr.quotaDateApproved ? formatDate(bdr.quotaDateApproved) : 'Não informado'}
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
              {bdr.quotaCount ? formatNumber(bdr.quotaCount) : 'Não informado'}
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
            Não há descrição disponível para este BDR.
          </Typography>
        </Grid>
      </Grid>
    </DetailPaper>
    {bdr.nomeBDR && <BDRDividendos nomeBDR={bdr.nomeBDR} />}
  </DetailContainer>
);