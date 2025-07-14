import { Grid, Chip, IconButton } from '@mui/material';
import { OpenInNew as OpenInNewIcon } from '@mui/icons-material';
import Link from 'next/link';
import { BDRExtended } from '../../../types';
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
  bdrs: BDRExtended[];
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

  const formatCNPJ = (cnpj: string | undefined): string => {
    if (!cnpj) return 'N/A';

    const numericCNPJ = cnpj.replace(/\D/g, '');

    if (numericCNPJ.length !== 14) return cnpj;

    return `${numericCNPJ.slice(0, 2)}.${numericCNPJ.slice(2, 5)}.${numericCNPJ.slice(5, 8)}/${numericCNPJ.slice(8, 12)}-${numericCNPJ.slice(12)}`;
  };

  const formatNumber = (num: number | string | undefined): string => {
    if (num === undefined) return 'N/A';
    return new Intl.NumberFormat('pt-BR').format(Number(num));
  };

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

                {/* Additional info chips */}
                {bdr.informacoes?.tipo && (
                  <Chip
                    label={typeMap[bdr.informacoes.tipo] || `Tipo ${bdr.informacoes.tipo}`}
                    size="small"
                    color="secondary"
                  />
                )}

                {(bdr.tipoBDR || bdr.informacoes?.market) && (
                  <Chip
                    label={marketMap[bdr.tipoBDR || bdr.informacoes?.market] || `Mercado ${bdr.tipoBDR || bdr.informacoes?.market}`}
                    size="small"
                  />
                )}

                {bdr.informacoes?.status === 'A' && (
                  <Chip label="Ativo" size="small" color="success" />
                )}

                {bdr.informacoes?.marketIndicator && (
                  <Chip
                    label={`Ind. ${bdr.informacoes.marketIndicator}`}
                    size="small"
                    variant="outlined"
                  />
                )}
              </ChipsContainer>

              <InfoContainer>
                <InfoItem>
                  <InfoLabel>CNPJ:</InfoLabel>
                  <InfoValue>{formatCNPJ(bdr.informacoes?.cnpj)}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>Desde:</InfoLabel>
                  <InfoValue>{formatDate(bdr.dataInicio)}</InfoValue>
                </InfoItem>

                <InfoItem>
                  <InfoLabel>Segmento:</InfoLabel>
                  <InfoValue>{bdr.segmento || 'N/A'}</InfoValue>
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