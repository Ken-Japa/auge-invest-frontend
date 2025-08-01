import React from 'react';
import {
  Table,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';
import { ETFExtended } from '../../../types';
import { useETFTableLogic } from '../../../hooks/useETFTableLogic';
import { StyledTableHead, StyledTableCell } from './styled';
import ETFTableBody from './ETFTableBody';

interface TableViewProps {
  etfs: ETFExtended[];
}

const TableView: React.FC<TableViewProps> = ({ etfs }) => {
  const { handleRowClick } = useETFTableLogic();

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
        <ETFTableBody etfs={etfs} handleRowClick={handleRowClick} />
      </Table>
    </TableContainer>
  );
};

export default TableView;