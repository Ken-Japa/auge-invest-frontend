import { TableBody, TableSortLabel, Tooltip } from '@mui/material';
import { FIIExtended } from '../../../types';
import {
  StyledTableContainer,
  StyledTable,
  StyledTableHead,
  HeaderRow,
  HeaderCell
} from './styled';
import { useFIITableLogic } from '../../../hooks/useFIITableLogic';
import { FIITableRow } from './FIITableRow';

interface TableViewProps {
  fiis: FIIExtended[];
}

export const TableView = ({ fiis }: TableViewProps) => {
  const { sortedFiis, order, orderBy, handleRequestSort } = useFIITableLogic(fiis);

  return (
    <StyledTableContainer>
      <StyledTable aria-label="FIIs table">
        <StyledTableHead>
          <HeaderRow>
            <HeaderCell>Nome</HeaderCell>
            <HeaderCell>Código</HeaderCell>
            <HeaderCell>
              <TableSortLabel
                active={orderBy === 'quotaCount'}
                direction={orderBy === 'quotaCount' ? order : 'asc'}
                onClick={() => handleRequestSort('quotaCount')}
              >
                Cotas
              </TableSortLabel>
            </HeaderCell>
            <HeaderCell>
              <TableSortLabel
                active={orderBy === 'quotaDateApproved'}
                direction={orderBy === 'quotaDateApproved' ? order : 'asc'}
                onClick={() => handleRequestSort('quotaDateApproved')}
              >
                Data Aprovação
              </TableSortLabel>
            </HeaderCell>
            <HeaderCell>CNPJ</HeaderCell>
          </HeaderRow>
        </StyledTableHead>
        <TableBody>
          {sortedFiis.map((fii) => (
            <FIITableRow key={fii._id} fii={fii} />
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default TableView;