import React from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { ETFBDRExtended } from '../../../types';
import { StyledTableHead, StyledTableRow, StyledTableCell } from './styled';
import { formatNumber } from '@/components/Utils/Formatters/formatters';
import { useRouter } from 'next/navigation';

interface TableViewProps {
  etfbdrs: ETFBDRExtended[];
}

const TableView: React.FC<TableViewProps> = ({ etfbdrs }) => {
  const router = useRouter();

  const sortedEtfbdrs = [...etfbdrs].sort((a, b) => {
    const quotaA = Number(a.quotaCount) || 0;
    const quotaB = Number(b.quotaCount) || 0;
    return quotaB - quotaA;
  });

  const handleRowClick = (nomeETF: string) => {
    router.push(`/etfbdr/${nomeETF}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="ETFBDR table">
        <StyledTableHead>
          <TableRow>
            <StyledTableCell align="center">Nome ETFBDR</StyledTableCell>
            <StyledTableCell align="center">Código</StyledTableCell>
            <StyledTableCell align="center">Cotas</StyledTableCell>
            <StyledTableCell align="center">Aprovado em</StyledTableCell>

          </TableRow>
        </StyledTableHead>
        <TableBody>
          {sortedEtfbdrs.map((etfbdr) => (
            <StyledTableRow key={etfbdr._id} onClick={() => handleRowClick(etfbdr.nomeETF)} style={{ cursor: 'pointer' }}>
              <StyledTableCell component="th" scope="row" align="center">
                <Typography variant="subtitle2" fontWeight="bold">
                  {etfbdr.nomeETF}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {etfbdr.nomeCompletoETF}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">{etfbdr.codigo || 'N/A'}</StyledTableCell>

              <StyledTableCell align="center">
                {formatNumber(etfbdr.quotaCount) || 'N/A'}
              </StyledTableCell>
              <StyledTableCell align="center">{etfbdr.quotaDateApproved || 'N/A'}</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableView;