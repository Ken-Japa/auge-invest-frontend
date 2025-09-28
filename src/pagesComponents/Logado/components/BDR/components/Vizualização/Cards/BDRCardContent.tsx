import { Star } from '@mui/icons-material';
import { Chip } from '@mui/material';
import Link from 'next/link';

import { formatDate } from '@/components/Utils/Formatters/formatters';

import { UnifiedBDR } from '../../../types';
import {
  CardSubtitle,
  CardTitle,
  ChipsContainer,
  InfoContainer,
  InfoItem,
  InfoLabel,
  InfoValue,
  StyledCardContent,
} from './styled';

interface BDRCardContentProps {
  bdr: UnifiedBDR;
}

export const BDRCardContent = ({ bdr }: BDRCardContentProps) => (
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
);