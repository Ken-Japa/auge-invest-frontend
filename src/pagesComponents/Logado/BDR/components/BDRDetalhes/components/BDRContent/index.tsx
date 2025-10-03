import { Business as BusinessIcon, CalendarToday as CalendarIcon } from '@mui/icons-material'
import { Chip, Grid, Typography } from '@mui/material'

import { formatCNPJ, formatDate } from '@/components/Helpers/Formatters/formatters'

import { UnifiedBDR } from '../../../../../components/BDR/types'
import {
  BDRSubtitle,
  BDRTitle,
  CodeChip,
  DetailContainer,
  DetailPaper,
  HeaderContainer,
  IconWrapper,
  InfoContainer,
  InfoLabel,
  InfoValue,
  SectionDivider,
  SectionTitle,
} from '../../styled'
import BDRDividendos from '../BDRDividendos'

interface BDRContentProps {
  bdr: UnifiedBDR
}

export const BDRContent = ({ bdr }: BDRContentProps) => (
  <DetailContainer>
    <DetailPaper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HeaderContainer>
            <div>
              <BDRTitle variant="h3" component="h1" gutterBottom>
                {bdr.nomeEmpresa}
              </BDRTitle>
              {bdr.nomeEmpresaCompleto && (
                <BDRSubtitle variant="subtitle1" component="div" gutterBottom>
                  {bdr.nomeEmpresaCompleto}
                </BDRSubtitle>
              )}
            </div>
            <div>
              {bdr.codigo && <CodeChip key={bdr.codigo} label={bdr.codigo} color="primary" />}
              <Chip
                label={bdr.isPatrocinado ? 'Patrocinado' : 'Não Patrocinado'}
                color={bdr.isPatrocinado ? 'success' : 'default'}
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
              <InfoLabel variant="body2" component="div">
                CNPJ
              </InfoLabel>
              <InfoValue variant="body1" component="div">
                {bdr.informações?.cnpj ? formatCNPJ(bdr.informações.cnpj) : 'Não informado'}
              </InfoValue>
            </InfoContainer>
          )}

          <InfoContainer>
            <InfoLabel variant="body2" component="div">
              Data de Início
            </InfoLabel>
            <InfoValue variant="body1" component="div">
              <IconWrapper>
                <CalendarIcon fontSize="small" />
              </IconWrapper>
              {bdr.dataInicio ? formatDate(bdr.dataInicio) : 'Não informado'}
            </InfoValue>
          </InfoContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <InfoContainer>
            <InfoLabel variant="body2" component="div">
              Tipo
            </InfoLabel>
            <InfoValue variant="body1" component="div">
              <IconWrapper>
                <BusinessIcon fontSize="small" />
              </IconWrapper>
              {bdr.tipoBDR || bdr.informações?.market || `Mercado ${bdr.tipoBDR || bdr.informações?.market}`}
            </InfoValue>
          </InfoContainer>
        </Grid>

        <Grid item xs={12}>
          <SectionDivider />
        </Grid>

        <Grid item xs={12}>
          <SectionTitle variant="h5" component="h2">
            Descrição
          </SectionTitle>
          <Typography variant="body1" component="div">
            Não há descrição disponível para este BDR.
          </Typography>
        </Grid>
      </Grid>
    </DetailPaper>
    {bdr.nomeEmpresa && <BDRDividendos codigoEmpresa={bdr.codigoEmpresa} />}
  </DetailContainer>
)
