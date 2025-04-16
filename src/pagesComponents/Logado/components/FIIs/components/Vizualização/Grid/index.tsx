import { Grid } from '@mui/material';
import Link from 'next/link';
import { FIIExtended } from '../../../types';
import {
  StyledCard,
  StyledCardContent,
  FIIName,
  CodeChip,
  GridContainer
} from './styled';

interface GridViewProps {
  fiis: FIIExtended[];
}

export const GridView = ({ fiis }: GridViewProps) => {
  return (
    <GridContainer>
      <Grid container spacing={2}>
        {fiis.map((fii) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={fii._id}>
            <StyledCard>
              <StyledCardContent>
                <Link href={`/fii/${fii.nomeFII}`} style={{ textDecoration: 'none' }}>
                  <FIIName>
                    {fii.nomeFII}
                  </FIIName>
                </Link>
                
                {fii.codigo && fii.codigo.length > 0 && fii.codigo[0] && (
                  <Link href={`/fii/${fii.codigo[0]}`} style={{ textDecoration: 'none' }}>
                    <CodeChip 
                      label={fii.codigo[0]} 
                      size="small" 
                      variant="filled"
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