import { Grid } from '@mui/material';
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
                <FIIName>
                  {fii.nomeFII}
                </FIIName>
                
                {fii.codigo && fii.codigo.length > 0 && fii.codigo[0] && (
                  <CodeChip 
                    label={fii.codigo[0]} 
                    size="small" 
                    variant="filled"
                  />
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