import { formatCurrency } from '@/components/Utils/Formatters/formatters';
import { FIIDividendItem as Dividend } from '@/services/api/types'

import { HeaderCell, StatusChip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '../styled';

interface FIIDividendTableProps {
  dividends: Dividend[];
}

const FIIDividendTable = ({ dividends }: FIIDividendTableProps) => {
  const getStatusColor = (tipoDividendo: string) => {
    switch (tipoDividendo.toUpperCase()) {
      case 'RENDIMENTO':
        return 'success';
      case 'DIVIDENDO':
        return 'warning';
      case 'AMORTIZAÇÃO':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <HeaderCell>Data Pagamento</HeaderCell>
            <HeaderCell>Valor</HeaderCell>
            <HeaderCell>Relativo</HeaderCell>
            <HeaderCell>Data Aprovação</HeaderCell>
            <HeaderCell>Tipo</HeaderCell>
            <HeaderCell>Último Dia Com</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dividends.map((dividend, index) => (
            <TableRow key={dividend._id || index}>
              <TableCell>{dividend.dataPagamento}</TableCell>
              <TableCell>{formatCurrency(parseFloat(String(dividend.valor).replace(',', '.')))}</TableCell>
              <TableCell>{dividend.relativo}</TableCell>
              <TableCell>{dividend.dataAprovacao}</TableCell>
              <TableCell>
                <StatusChip
                  label={dividend.tipoDividendo}
                  color={getStatusColor(dividend.tipoDividendo)}
                  size="small"
                />
              </TableCell>
              <TableCell>{dividend.ultimoDiaCom || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FIIDividendTable;