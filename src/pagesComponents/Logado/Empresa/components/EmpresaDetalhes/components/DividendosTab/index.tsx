import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

import { Dividendo } from '../../../../types'

interface DividendosTabProps {
  dividendos: Dividendo[]
}

export const DividendosTab: React.FC<DividendosTabProps> = ({ dividendos }) => {
  if (!dividendos || dividendos.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Não há dividendos registrados para esta empresa.</Typography>
      </Paper>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tipo</TableCell>
            <TableCell>Data Com</TableCell>
            <TableCell>Data Aprovação</TableCell>
            <TableCell>Tipo Dividendo</TableCell>
            <TableCell align="right">Valor</TableCell>
            <TableCell align="right">Yield</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dividendos.map((dividendo, index) => {
            // Calcular o yield
            const valor = parseFloat(dividendo.valor.replace(',', '.'))
            const valorAcao = parseFloat(dividendo.valorUltimoDiaCom)
            const yield_ = (valor / valorAcao) * 100

            return (
              <TableRow key={index}>
                <TableCell>{dividendo.tipo}</TableCell>
                <TableCell>{dividendo.ultimoDiaCom}</TableCell>
                <TableCell>{dividendo.dataAprovacao}</TableCell>
                <TableCell>{dividendo.tipoDividendo}</TableCell>
                <TableCell align="right">R$ {valor.toFixed(4)}</TableCell>
                <TableCell align="right">{yield_.toFixed(2)}%</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
