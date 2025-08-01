import { Grid, IconButton } from '@mui/material';
import { OpenInNew as OpenInNewIcon } from '@mui/icons-material';
import Link from 'next/link';

import { UnifiedBDR } from '../../../types';

import { StyledCard } from './styled';
import { BDRCardContent } from './BDRCardContent';

interface CardViewProps {
  bdrs: UnifiedBDR[];
}



export const CardView = ({ bdrs }: CardViewProps) => {

  return (
    <Grid container spacing={3}>
      {bdrs.map((bdr) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={bdr._id}>
          <StyledCard>
            <IconButton
              component={Link}
              href={`/bdr/${bdr.nomeEmpresa}`}
              aria-label="Ver detalhes do BDR"
              color="primary"
              size="small"
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <OpenInNewIcon />
            </IconButton>
            <BDRCardContent bdr={bdr} />
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardView;