import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { FIIExtended } from '../../../types';

interface GridViewProps {
  fiis: FIIExtended[];
}

export const GridView = ({ fiis }: GridViewProps) => {
  return (
    <Box>
      <Grid container spacing={1}>
        {fiis.map((fii) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={fii._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ padding: 1 }}>
                <Typography variant="subtitle1" component="div" noWrap>
                  {fii.nomeFII}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {fii.codigo[0]}
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary" noWrap>
                  {fii.segmento}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GridView;