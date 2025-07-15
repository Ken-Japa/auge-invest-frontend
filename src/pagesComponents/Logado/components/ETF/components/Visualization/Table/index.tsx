import React from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { ETFExtended } from '../../../types';
import { StyledTableHead, StyledTableRow, StyledTableCell } from './styled';
import { formatNumber } from '@/components/Utils/Formatters/formatters';
import { useRouter } from 'next/navigation';

interface TableViewProps {
  etfs: ETFExtended[];
}

const TableView: React.FC<TableViewProps> = ({ etfs }) => {
  const router = useRouter();



  const handleRowClick = (nomeETF: string) => {
    router.push(`/etf/${nomeETF}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="ETF table">
        <StyledTableHead>
          <TableRow>
            <StyledTableCell align="center">Nome ETF</StyledTableCell>
            <StyledTableCell align="center">Código</StyledTableCell>
            <StyledTableCell align="center">Cotas</StyledTableCell>
            <StyledTableCell align="center">Aprovado em</StyledTableCell>

          </TableRow>
        </StyledTableHead>
        <TableBody>
          {etfs.map((etf) => (
            <StyledTableRow key={etf._id} onClick={() => handleRowClick(etf.nomeETF)} style={{ cursor: 'pointer' }}>
              <StyledTableCell component="th" scope="row" align="center">
                <Typography variant="subtitle2" fontWeight="bold">
                  {etf.nomeETF}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {etf.nomeCompletoETF}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">{etf.codigo || 'N/A'}</StyledTableCell>

              <StyledTableCell align="center">
                {formatNumber(etf.quotaCount) || 'N/A'}
              </StyledTableCell>
              <StyledTableCell align="center">{etf.quotaDateApproved || 'N/A'}</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableView;