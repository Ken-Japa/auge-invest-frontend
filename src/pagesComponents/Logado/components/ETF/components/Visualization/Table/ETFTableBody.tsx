import React from 'react';
import { TableBody, Typography } from '@mui/material';
import { ETFExtended } from '../../../types';
import { StyledTableRow, StyledTableCell } from './styled';
import { formatNumber } from '@/components/Utils/Formatters/formatters';

interface ETFTableBodyProps {
  etfs: ETFExtended[];
  handleRowClick: (nomeETF: string) => void;
}

const ETFTableBody: React.FC<ETFTableBodyProps> = ({ etfs, handleRowClick }) => {
  return (
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
  );
};

export default ETFTableBody;