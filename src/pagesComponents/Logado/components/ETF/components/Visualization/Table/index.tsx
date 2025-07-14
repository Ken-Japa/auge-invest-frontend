import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { ETFExtended } from '../../../types';
import { StyledTableHead, StyledTableRow, StyledTableCell } from './styled';
import { formatNumber } from '@/components/Utils/Formatters/formatters';

interface TableViewProps {
  etfs: ETFExtended[];
}

const TableView: React.FC<TableViewProps> = ({ etfs }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="ETF table">
        <StyledTableHead>
          <TableRow>
            <StyledTableCell>Nome ETF</StyledTableCell>
            <StyledTableCell>Código</StyledTableCell>
            <StyledTableCell>Indústria</StyledTableCell>
            <StyledTableCell>Segmento</StyledTableCell>
            <StyledTableCell align="right">Cotas</StyledTableCell>
            <StyledTableCell>Aprovado em</StyledTableCell>
            <StyledTableCell>CNPJ</StyledTableCell>
            <StyledTableCell>Site</StyledTableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {etfs.map((etf) => (
            <StyledTableRow key={etf._id}>
              <StyledTableCell component="th" scope="row">
                <Typography variant="subtitle2" fontWeight="bold">
                  {etf.nomeETF}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {etf.nomeCompletoETF}
                </Typography>
              </StyledTableCell>
              <StyledTableCell>{etf.codigo || 'N/A'}</StyledTableCell>
              <StyledTableCell>{etf.indústria || 'N/A'}</StyledTableCell>
              <StyledTableCell>{etf.segmento || 'N/A'}</StyledTableCell>
              <StyledTableCell align="right">
                {formatNumber(etf.quotaCount) || 'N/A'}
              </StyledTableCell>
              <StyledTableCell>{etf.quotaDateApproved || 'N/A'}</StyledTableCell>
              <StyledTableCell>{etf.informações?.cnpj || 'N/A'}</StyledTableCell>
              <StyledTableCell>{etf.informações?.site || 'N/A'}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableView;