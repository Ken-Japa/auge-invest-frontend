import { Grid } from '@mui/material';
import Link from 'next/link';

import { UnifiedBDR } from '../../../types';
import {
  BDRName,
  CodeChip,
  GridContainer,
  StyledCard,
  StyledCardContent} from './styled';

interface GridViewProps {
  bdrs: UnifiedBDR[];
}

export const GridView = ({ bdrs }: GridViewProps) => {
  return (
    <GridContainer>
      <Grid container spacing={2}>
        {bdrs.map((bdr) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={bdr._id}>
            <StyledCard>
              <StyledCardContent>
                <Link href={`/bdr/${bdr.nomeEmpresaCompleto}`} style={{ textDecoration: 'none' }}>
                  <BDRName>
                    {bdr.nomeEmpresaCompleto}
                  </BDRName>
                </Link>

                {bdr.codigo && (
                  <Link href={`/bdr/${bdr.codigo}`} style={{ textDecoration: 'none' }}>
                    <CodeChip
                      label={bdr.codigo}
                      size="small"
                      variant="filled"
                      color="primary"
                    />
                  </Link>
                )}



              </StyledCardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </GridContainer>
  );
};

export default GridView;