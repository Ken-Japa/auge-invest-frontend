import { Grid } from '@mui/material';

import { FIIExtended } from '../../../types';
import { FIICard } from './FIICard';

interface CardViewProps {
  fiis: FIIExtended[];
}

export const CardView = ({ fiis }: CardViewProps) => {
  return (
    <Grid container spacing={3}>
      {fiis.map((fii) => (
        <FIICard key={fii._id} fii={fii} />
      ))}
    </Grid>
  );
};

export default CardView;