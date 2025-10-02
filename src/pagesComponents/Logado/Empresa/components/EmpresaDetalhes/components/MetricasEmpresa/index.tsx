import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import { Box, Grid, Paper, Typography } from '@mui/material'

import { MetricaCardComponent } from './MetricaCard'

interface MetricasEmpresaProps {
  valor: number
  variacao: number
  minimo52: number
  maximo52: number
  dividendYield: number
  valorizacao12m: number
}

export const MetricasEmpresa = ({
  valor,
  variacao,
  minimo52,
  maximo52,
  dividendYield,
  valorizacao12m,
}: MetricasEmpresaProps) => {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4">R$ {valor.toFixed(2)}</Typography>
            <Typography
              color={variacao >= 0 ? 'success.main' : 'error.main'}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {variacao >= 0 ? <ArrowDropUp /> : <ArrowDropDown />}
              {Math.abs(variacao)}%
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <MetricaCardComponent label="Mín. 52 sem" value={`R$ ${minimo52.toFixed(2)}`} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <MetricaCardComponent label="Máx. 52 sem" value={`R$ ${maximo52.toFixed(2)}`} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <MetricaCardComponent label="Dividend Yield" value={`${dividendYield.toFixed(2)}%`} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <MetricaCardComponent
                label="Valorização 12M"
                value={`${valorizacao12m.toFixed(2)}%`}
                isPositive={valorizacao12m >= 0}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}
