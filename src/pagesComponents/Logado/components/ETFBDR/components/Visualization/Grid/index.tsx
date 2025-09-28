import { Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

import { ETFBDRExtended } from '../../../types';
import {
  CodeChip,
  GridContainer,
  GridHeader,
  GridItemPaper,
  GridTitle,
} from './styled';

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
              {etfbdr.codigoETF && (
                <CodeChip label={etfbdr.codigoETF} color="primary" size="small" />
              )}
            </GridHeader>

          </GridItemPaper>
        </Grid>
      ))}
    </GridContainer>
  );
};

export default GridView;