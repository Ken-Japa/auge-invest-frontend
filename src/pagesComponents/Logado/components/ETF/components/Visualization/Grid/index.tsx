import React from 'react';
import { Grid, Typography } from '@mui/material';
import { ETFExtended } from '../../../types';
import {
  GridContainer,
  GridItemPaper,
  GridHeader,
  GridTitle,
  GridSubtitle,
  GridInfo,
  GridInfoLabel,
  GridInfoValue,
  CodeChip,
} from './styled';
import { formatNumber } from '@/components/Utils/Formatters/formatters';

interface GridViewProps {
  etfs: ETFExtended[];
}

const GridView: React.FC<GridViewProps> = ({ etfs }) => {
  return (
    <GridContainer container spacing={2}>
      {etfs.map((etf) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={etf._id}>
          <GridItemPaper elevation={1}>
            <GridHeader>
              <GridTitle variant="subtitle1">{etf.nomeETF}</GridTitle>
              {etf.codigo && (
                <CodeChip label={etf.codigo} color="primary" size="small" />
              )}
            </GridHeader>
            <GridSubtitle variant="caption">
              {etf.nomeCompletoETF}
            </GridSubtitle>

            <GridInfo>
              <GridInfoLabel>Indústria:</GridInfoLabel>
              <GridInfoValue>{etf.indústria || 'N/A'}</GridInfoValue>
            </GridInfo>

            <GridInfo>
              <GridInfoLabel>Segmento:</GridInfoLabel>
              <GridInfoValue>{etf.segmento || 'N/A'}</GridInfoValue>
            </GridInfo>

            <GridInfo>
              <GridInfoLabel>Cotas:</GridInfoLabel>
              <GridInfoValue>{formatNumber(etf.quotaCount) || 'N/A'}</GridInfoValue>
            </GridInfo>

            <GridInfo>
              <GridInfoLabel>Aprovado em:</GridInfoLabel>
              <GridInfoValue>{etf.quotaDateApproved || 'N/A'}</GridInfoValue>
            </GridInfo>

            <GridInfo>
              <GridInfoLabel>CNPJ:</GridInfoLabel>
              <GridInfoValue>{etf.informações?.cnpj || 'N/A'}</GridInfoValue>
            </GridInfo>

            <GridInfo>
              <GridInfoLabel>Site:</GridInfoLabel>
              <GridInfoValue>{etf.informações?.site || 'N/A'}</GridInfoValue>
            </GridInfo>
          </GridItemPaper>
        </Grid>
      ))}
    </GridContainer>
  );
};

export default GridView;