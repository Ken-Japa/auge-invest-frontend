import { Grid, Chip, IconButton } from '@mui/material';
import { OpenInNew as OpenInNewIcon, Star } from '@mui/icons-material';
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

                <Link href={`/bdr/${bdr.nomeEmpresa}`} style={{ textDecoration: 'none' }}>
                  <Chip
                    label={bdr.codigo || 'N/A'}
                    size="small"
                    color="primary"
                    variant="outlined"
                    clickable
                  />
                </Link>

                {(bdr.tipoBDR || bdr.informações?.market) && (
                  <Chip
                    label={bdr.tipoBDR || bdr.informações?.market || `Mercado ${bdr.tipoBDR || bdr.informações?.market}`}
                    size="small"
                    color="primary"
                  />
                )}

                {bdr.isPatrocinado ? <Star color="warning" /> : ''}

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