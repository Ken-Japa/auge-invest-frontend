import Link from 'next/link';

import { OpenInNew as OpenInNewIcon } from '@mui/icons-material';
import { Chip, Grid, IconButton } from '@mui/material';

import { formatCNPJ, formatDate, formatNumber } from '@/components/Utils/Formatters/formatters';
import { FIIExtended } from '../../../types';

import {
  CardHeader,
  CardSubtitle,
  CardTitle,
  ChipsContainer,
  InfoContainer,
  InfoItem,
  InfoLabel,
  InfoValue,
  StyledCard,
  StyledCardContent,
} from './styled';

interface FIICardProps {
  fii: FIIExtended;
}

export const FIICard = ({ fii }: FIICardProps) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={fii._id}>
      <StyledCard>
        <CardHeader>
          <IconButton
            component={Link}
            href={`/fii/${fii.nomeFII}`}
            aria-label="Ver detalhes do FII"
            color="primary"
            size="small"
          >
            <OpenInNewIcon />
          </IconButton>
        </CardHeader>
        <StyledCardContent>
          <Link href={`/fii/${fii.codigoFII}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <CardTitle variant="h4">
              {fii.nomeFII}
            </CardTitle>
          </Link>

          <CardSubtitle variant="body2" color="text.secondary">
            {fii.nomeCompletoFII}
          </CardSubtitle>

          <ChipsContainer>
            {fii.codigo.map((code) => (
              <Link key={code} href={`/fii/${code}`} style={{ textDecoration: 'none' }}>
                <Chip
                  label={code}
                  size="small"
                  color="primary"
                  variant="outlined"
                  clickable
                />
              </Link>
            ))}
          </ChipsContainer>

          <InfoContainer>
            <InfoItem>
              <InfoLabel>Quantidade de Cotas:</InfoLabel>
              <InfoValue>{formatNumber(fii.quotaCount)}</InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>CNPJ:</InfoLabel>
              <InfoValue>{formatCNPJ(fii.informacoes?.cnpj)}</InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>Desde:</InfoLabel>
              <InfoValue>{formatDate(fii.quotaDateApproved)}</InfoValue>
            </InfoItem>
          </InfoContainer>
        </StyledCardContent>
      </StyledCard>
    </Grid>
  );
};