import { TableBody, TableSortLabel } from '@mui/material'

import { UnifiedBDR } from '../../../types'
import { BDRTableRow } from './components/BDRTableRow'
import { getComparator, useTableSort } from './components/useTableSort'
import { HeaderCell, HeaderRow, StyledTable, StyledTableContainer, StyledTableHead } from './styled'

interface TableViewProps {
  bdrs: UnifiedBDR[]
}

type OrderBy = 'dataInicio'

export const TableView = ({ bdrs }: TableViewProps) => {
  const { order, orderBy, handleRequestSort, sortedData } = useTableSort<UnifiedBDR, OrderBy>('dataInicio')

  const sortedBdrs = sortedData(
    bdrs,
    getComparator({
      order,
      orderBy,
    }),
  )

  return (
    <StyledTableContainer>
      <StyledTable aria-label="BDRs table">
        <StyledTableHead>
          <HeaderRow>
            <HeaderCell>Nome</HeaderCell>
            <HeaderCell>Código</HeaderCell>
            <HeaderCell>
              <TableSortLabel
                active={orderBy === 'dataInicio'}
                direction={orderBy === 'dataInicio' ? order : 'asc'}
                onClick={() => handleRequestSort('dataInicio')}
              >
                Data Início
              </TableSortLabel>
            </HeaderCell>
            <HeaderCell>Tipo</HeaderCell>
          </HeaderRow>
        </StyledTableHead>
        <TableBody>
          {sortedBdrs.map((bdr) => (
            <BDRTableRow key={bdr._id} bdr={bdr} />
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  )
}

export default TableView
