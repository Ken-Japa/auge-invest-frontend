import React from 'react';
import { Grid, Typography } from '@mui/material';
import { ETFExtended } from '../../../types';
import {
  CardContainer,
  CardContent,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardInfo,
  CardInfoLabel,
  CardInfoValue,
  CardFooter,
  CodeChip,
} from './styled';
import { formatNumber } from '@/components/Utils/Formatters/formatters';

interface CardViewProps {
  etfs: ETFExtended[];
}

const CardView: React.FC<CardViewProps> = ({ etfs }) => {
  return (
    <Grid container spacing={3}>
      {etfs.map((etf) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={etf._id}>
          <CardContainer>
            <CardContent>
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
                <CardInfoLabel variant="body2">Indústria:</CardInfoLabel>
                <CardInfoValue variant="body1">{etf.indústria || 'N/A'}</CardInfoValue>
              </CardInfo>

              <CardInfo>
                <CardInfoLabel variant="body2">Segmento:</CardInfoLabel>
                <CardInfoValue variant="body1">{etf.segmento || 'N/A'}</CardInfoValue>
              </CardInfo>

              <CardInfo>
                <CardInfoLabel variant="body2">Cotas:</CardInfoLabel>
                <CardInfoValue variant="body1">{formatNumber(etf.quotaCount) || 'N/A'}</CardInfoValue>
              </CardInfo>

              <CardInfo>
                <CardInfoLabel variant="body2">Aprovado em:</CardInfoLabel>
                <CardInfoValue variant="body1">{etf.quotaDateApproved || 'N/A'}</CardInfoValue>
              </CardInfo>
            </CardContent>
            <CardFooter>
              <Typography variant="caption" color="textSecondary">
                CNPJ: {etf.informações?.cnpj || 'N/A'}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Site: {etf.informações?.site || 'N/A'}
              </Typography>
            </CardFooter>
          </CardContainer>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardView;