import { formatCurrency } from '@/components/Utils/Formatters/formatters';
import { BDRDividendItem as Dividend } from '@/services/api';

import { HeaderCell, StatusChip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from './styled';

interface BDRDividendTableProps {
  dividends: Dividend[];
}

const BDRDividendTable = ({ dividends }: BDRDividendTableProps) => {
  const getStatusColor = (tipoDividendo: string) => {
    switch (tipoDividendo.toUpperCase()) {
      case 'DIVIDENDO':
        return 'success';
      case 'RENDIMENTO':
        return 'warning';
      case 'AMORTIZAÇÃO':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <HeaderCell align="center">Data Base</HeaderCell>
            <HeaderCell align="center">Data Pagamento</HeaderCell>
            <HeaderCell align="center">Valor (R$)</HeaderCell>
            <HeaderCell align="center">Tipo</HeaderCell>
            <HeaderCell align="center">Último Dia com</HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dividends.map((dividend, index) => {
            const valor = typeof dividend.valor === 'string' ?
              parseFloat(dividend.valor.replace(',', '.')) :
              dividend.valor;

            const key = dividend._id || `row-${index}`;

            return (
              <TableRow key={key}>
                <TableCell>{dividend.dataAprovacao}</TableCell>
                <TableCell>{dividend.dataPagamento}</TableCell>
                <TableCell align="right">{formatCurrency(valor)}</TableCell>
                <TableCell align="center">
                  <StatusChip
                    label={dividend.tipo}
                    color={getStatusColor(dividend.tipo) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell >{dividend.ultimoDiaCom}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BDRDividendTable;