import React from 'react';
import { Grid, Typography } from '@mui/material';
import { ETFBDRExtended } from '../../../types';
import {
  CardContainer,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardInfo,
  CardInfoLabel,
  CardInfoValue,
  CodeChip,
} from './styled';
import { formatNumber } from '@/components/Utils/Formatters/formatters';
import { useRouter } from 'next/navigation';

interface CardViewProps {
  etfbdrs: ETFBDRExtended[];
}

const formatCNPJ = (cnpj: string | undefined) => {
  if (!cnpj) return 'N/A';
  const cnpjDigits = cnpj.replace(/\D/g, '');
  if (cnpjDigits.length !== 14) return cnpj;
  return cnpjDigits.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
};

const CardView: React.FC<CardViewProps> = ({ etfbdrs }) => {
  const router = useRouter();

  const sortedEtfbdrs = [...etfbdrs].sort((a, b) => {
    const quotaA = Number(a.quotaCount) || 0;
    const quotaB = Number(b.quotaCount) || 0;
    return quotaB - quotaA;
  });

  const handleCardClick = (nomeETF: string) => {
    router.push(`/etfbdr/${nomeETF}`);
  };

  return (
    <Grid container spacing={3}>
      {sortedEtfbdrs.map((etfbdr) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={etfbdr._id}>
          <CardContainer onClick={() => handleCardClick(etfbdr.nomeETF)} style={{ cursor: 'pointer' }}>

            <CardHeader>
              <CardTitle variant="h6">{etfbdr.nomeETF}</CardTitle>
              {etfbdr.codigo && (
                <CodeChip label={etfbdr.codigo} color="primary" size="small" />
              )}
            </CardHeader>
            <CardSubtitle variant="body2">
              {etfbdr.nomeCompletoETF}
            </CardSubtitle>


            <CardInfo>
              <CardInfoLabel variant="body2">Cotas:</CardInfoLabel>
              <CardInfoValue variant="body1">{formatNumber(etfbdr.quotaCount) || 'N/A'}</CardInfoValue>
            </CardInfo>

            <CardInfo>
              <CardInfoLabel variant="body2">Aprovado em:</CardInfoLabel>
              <CardInfoValue variant="body1">{etfbdr.quotaDateApproved || 'N/A'}</CardInfoValue>
            </CardInfo>

            <CardInfo>
              <CardInfoLabel variant="body2">CNPJ:</CardInfoLabel>
              <CardInfoValue variant="body1">{formatCNPJ(etfbdr.informações?.cnpj)}</CardInfoValue>
            </CardInfo>

          </CardContainer>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardView;