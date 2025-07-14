import React from 'react';
import { Grid } from '@mui/material';
import { ETFBDRExtended } from '../../../types';
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
import { useRouter } from 'next/navigation';

interface GridViewProps {
  etfbdrs: ETFBDRExtended[];
}

const GridView: React.FC<GridViewProps> = ({ etfbdrs }) => {
  const router = useRouter();



  const handleItemClick = (nomeETF: string) => {
    router.push(`/etfbdr/${nomeETF}`);
  };

  return (
    <GridContainer container spacing={2}>
      {etfbdrs.map((etfbdr) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={etfbdr._id}>
          <GridItemPaper elevation={1} onClick={() => handleItemClick(etfbdr.nomeETF)} style={{ cursor: 'pointer' }}>
            <GridHeader>
              <GridTitle variant="subtitle1">{etfbdr.nomeETF}</GridTitle>
              {etfbdr.codigo && (
                <CodeChip label={etfbdr.codigo} color="primary" size="small" />
              )}
            </GridHeader>

          </GridItemPaper>
        </Grid>
      ))}
    </GridContainer>
  );
};

export default GridView;