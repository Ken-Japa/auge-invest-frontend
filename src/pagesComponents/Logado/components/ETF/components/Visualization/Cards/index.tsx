import React from 'react';
import { Grid, Typography } from '@mui/material';
import { ETFExtended } from '../../../types';
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
  etfs: ETFExtended[];
}

const formatCNPJ = (cnpj: string | undefined) => {
  if (!cnpj) return 'N/A';
  const cnpjDigits = cnpj.replace(/\D/g, '');
  if (cnpjDigits.length !== 14) return cnpj;
  return cnpjDigits.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
};

const CardView: React.FC<CardViewProps> = ({ etfs }) => {
  const router = useRouter();

  const sortedEtfs = [...etfs].sort((a, b) => {
    const quotaA = Number(a.quotaCount) || 0;
    const quotaB = Number(b.quotaCount) || 0;
    return quotaB - quotaA;
  });

  const handleCardClick = (nomeETF: string) => {
    router.push(`/etf/${nomeETF}`);
  };

  return (
    <Grid container spacing={3}>
      {sortedEtfs.map((etf) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={etf._id}>
          <CardContainer onClick={() => handleCardClick(etf.nomeETF)} style={{ cursor: 'pointer' }}>

            <CardHeader>
              <CardTitle variant="h6">{etf.nomeETF}</CardTitle>
              {etf.codigo && (
                <CodeChip label={etf.codigo} color="primary" size="small" />
              )}
            </CardHeader>
            <CardSubtitle variant="body2">
              {etf.nomeCompletoETF}
            </CardSubtitle>


            <CardInfo>
              <CardInfoLabel variant="body2">Cotas:</CardInfoLabel>
              <CardInfoValue variant="body1">{formatNumber(etf.quotaCount) || 'N/A'}</CardInfoValue>
            </CardInfo>

            <CardInfo>
              <CardInfoLabel variant="body2">Aprovado em:</CardInfoLabel>
              <CardInfoValue variant="body1">{etf.quotaDateApproved || 'N/A'}</CardInfoValue>
            </CardInfo>

            <CardInfo>
              <CardInfoLabel variant="body2">CNPJ:</CardInfoLabel>
              <CardInfoValue variant="body1">{formatCNPJ(etf.informações?.cnpj)}</CardInfoValue>
            </CardInfo>

          </CardContainer>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardView;