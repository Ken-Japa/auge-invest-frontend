import { Grid, Typography, Chip } from '@mui/material';
import { CalendarToday as CalendarIcon, Business as BusinessIcon } from '@mui/icons-material';
import { UnifiedBDR } from '../../../../../components/BDR/types';
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
  bdr: UnifiedBDR;
}

export const BDRContent = ({ bdr }: BDRContentProps) => (
  <DetailContainer>
    <DetailPaper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HeaderContainer>
            <div>
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                {bdr.nomeEmpresa}
              </Typography>
              {bdr.nomeEmpresaCompleto && (
                <Typography variant="subtitle1" component="div" gutterBottom sx={{ color: 'text.secondary' }}>
                  {bdr.nomeEmpresaCompleto}
                </Typography>
              )}
            </div>
            <div>
              {bdr.codigo && (
                <CodeChip
                  key={bdr.codigo}
                  label={bdr.codigo}
                  color="primary"
                />
              )}
              <Chip
                label={bdr.isPatrocinado ? "Patrocinado" : "Não Patrocinado"}
                color={bdr.isPatrocinado ? "success" : "default"}
                sx={{ ml: 1 }}
                size="small"
              />
            </div>
          </HeaderContainer>
        </Grid>

        <Grid item xs={12}>
          <SectionDivider />
        </Grid>


        <Grid item xs={12} md={6}>
          {bdr.informações?.cnpj !== '0' && (
            <InfoContainer>
              <Typography variant="body2" component="div" sx={{ color: 'text.secondary', mb: 0.5 }}>
                CNPJ
              </Typography>
              <Typography variant="body1" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                {bdr.informações?.cnpj ? formatCNPJ(bdr.informações.cnpj) : 'Não informado'}
              </Typography>
            </InfoContainer>
          )}

          <InfoContainer>
            <Typography variant="body2" component="div" sx={{ color: 'text.secondary', mb: 0.5 }}>
              Data de Início
            </Typography>
            <Typography variant="body1" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
              <IconWrapper>
                <CalendarIcon fontSize="small" />
              </IconWrapper>
              {bdr.dataInicio ? formatDate(bdr.dataInicio) : 'Não informado'}
            </Typography>
          </InfoContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <InfoContainer>
            <Typography variant="body2" component="div" sx={{ color: 'text.secondary', mb: 0.5 }}>
              Tipo
            </Typography>
            <Typography variant="body1" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
              <IconWrapper>
                <BusinessIcon fontSize="small" />
              </IconWrapper>
              {bdr.tipoBDR || bdr.informações?.market || `Mercado ${bdr.tipoBDR || bdr.informações?.market}`}
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
    {bdr.nomeEmpresa && <BDRDividendos codigoEmpresa={bdr.codigoEmpresa} />}
  </DetailContainer>
);