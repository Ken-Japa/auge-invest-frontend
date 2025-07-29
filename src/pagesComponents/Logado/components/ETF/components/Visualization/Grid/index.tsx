import React from 'react';
import { Grid, Typography } from '@mui/material';
import { ETFExtended } from '../../../types';
import {
  GridContainer,
  GridItemPaper,
  GridHeader,
  GridTitle,
  GridInfo,
  GridInfoLabel,
  GridInfoValue,
  CodeChip,
} from './styled';
import { formatNumber } from '@/components/Utils/Formatters/formatters';
import { useRouter } from 'next/navigation';

interface GridViewProps {
  etfs: ETFExtended[];
}

const GridView: React.FC<GridViewProps> = ({ etfs }) => {
  const router = useRouter();

  const sortedEtfs = [...etfs].sort((a, b) => {
    const quotaA = Number(a.quotaCount) || 0;
    const quotaB = Number(b.quotaCount) || 0;
    return quotaB - quotaA;
  });

  const handleItemClick = (nomeETF: string) => {
    router.push(`/etf/${nomeETF}`);
  };

  return (
    <GridContainer container spacing={2}>
      {sortedEtfs.map((etf) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={etf._id}>
          <GridItemPaper elevation={1} onClick={() => handleItemClick(etf.nomeETF)} style={{ cursor: 'pointer' }}>
            <GridHeader>
              <GridTitle variant="subtitle1">{etf.nomeETF}</GridTitle>
              {etf.codigo && (
                <CodeChip label={etf.codigo} color="primary" size="small" />
              )}
            </GridHeader>
            <GridInfo>
              <GridInfoLabel>Cotas:</GridInfoLabel>
              <GridInfoValue>{formatNumber(etf.quotaCount) || 'N/A'}</GridInfoValue>
            </GridInfo>
          </GridItemPaper>
        </Grid>
      ))}
    </GridContainer>
  );
};

export default GridView;