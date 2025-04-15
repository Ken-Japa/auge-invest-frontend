import { Box, Typography, Grid, Card, CardContent, Chip } from '@mui/material';
import { FIIExtended } from '../../../types';

interface CardViewProps {
  fiis: FIIExtended[];
}

export const CardView = ({ fiis }: CardViewProps) => {
  return (
    <Box>
      <Grid container spacing={2}>
        {fiis.map((fii) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={fii._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" gutterBottom>
                  {fii.nomeFII}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {fii.nomeCompletoFII}
                </Typography>
                <Box mt={1} display="flex" gap={1} flexWrap="wrap">
                  {fii.codigo.map((code) => (
                    <Chip
                      key={code}
                      label={code}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
                <Box mt={2}>
                  <Typography variant="body2">
                    <strong>Segmento:</strong> {fii.segmento}
                  </Typography>
                  <Typography variant="body2">
                    <strong>CNPJ:</strong> {fii.informacoes?.cnpj || 'N/A'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Quantidade de Cotas:</strong> {fii.quotaCount}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Data de Aprovação:</strong> {fii.quotaDateApproved}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardView;