import { Grid, Chip, IconButton } from '@mui/material';
import { OpenInNew as OpenInNewIcon } from '@mui/icons-material';
import Link from 'next/link';
import { UnifiedBDR } from '../../../types';
import {
  StyledCard,
  StyledCardContent,
  CardTitle,
  CardSubtitle,
  ChipsContainer,
  InfoContainer,
  InfoItem,
  InfoLabel,
  InfoValue,
  CardHeader
} from './styled';

interface CardViewProps {
  bdrs: UnifiedBDR[];
}

const typeMap: Record<string, string> = {
  '1': 'BDR Nível I',
  '2': 'BDR Nível II',
  '3': 'BDR Nível III'
};

const marketMap: Record<string, string> = {
  'DR1': 'BOVESPA',
  'DRN': 'NYSE',
  'DR3': 'NASDAQ'
};

export const CardView = ({ bdrs }: CardViewProps) => {


  const formatDate = (dateStr: string | undefined): string => {
    if (!dateStr) return 'N/A';

    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('pt-BR').format(date);
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <Grid container spacing={3}>
      {bdrs.map((bdr) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={bdr._id}>
          <StyledCard>
            <CardHeader>
              <IconButton
                component={Link}
                href={`/bdr/${bdr.nomeEmpresa}`}
                aria-label="Ver detalhes do BDR"
                color="primary"
                size="small"
              >
                <OpenInNewIcon />
              </IconButton>
            </CardHeader>
            <StyledCardContent>
              <Link href={`/bdr/${bdr.nomeEmpresa}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardTitle variant="h4">
                  {bdr.nomeEmpresa}
                </CardTitle>
              </Link>

              <CardSubtitle variant="body2" color="text.secondary">
                {bdr.nomeEmpresaCompleto}
              </CardSubtitle>

              <ChipsContainer>

                <Link href={`/bdr/${bdr.codigo}`} style={{ textDecoration: 'none' }}>
                  <Chip
                    label={bdr.codigo || 'N/A'}
                    size="small"
                    color="primary"
                    variant="outlined"
                    clickable
                  />
                </Link>

                <Chip
                  label={bdr.isPatrocinado ? 'Patrocinado' : 'Não Patrocinado'}
                  size="small"
                  variant="outlined"
                  color={bdr.isPatrocinado ? 'primary' : 'secondary'}
                />

                {/* Additional info chips */}


                {(bdr.tipoBDR || bdr.informações?.market) && (
                  <Chip
                    label={marketMap[bdr.tipoBDR || bdr.informações?.market] || `Mercado ${bdr.tipoBDR || bdr.informações?.market}`}
                    size="small"
                  />
                )}

                {bdr.informações?.tipo && (
                  <Chip
                    label={typeMap[bdr.informações.tipo] || `Tipo ${bdr.informações.tipo}`}
                    size="small"
                    color="primary"
                  />
                )}

              </ChipsContainer>

              <InfoContainer>
                {bdr.indústria !== 'Não Classificados' && (
                  <InfoItem>
                    <InfoLabel>Segmento:</InfoLabel>
                    <InfoValue>{bdr.indústria || 'N/A'}</InfoValue>
                  </InfoItem>
                )}

                <InfoItem>
                  <InfoLabel>Desde:</InfoLabel>
                  <InfoValue>{formatDate(bdr.dataInicio)}</InfoValue>
                </InfoItem>

              </InfoContainer>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardView;