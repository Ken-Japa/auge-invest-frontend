import { Paper, Table, TableContainer, TableRow } from '@mui/material'
import React from 'react'

import { useETFTableLogic } from '../../../hooks/useETFTableLogic'
import { ETFExtended } from '../../../types'

import ETFTableBody from './ETFTableBody'
import { StyledTableCell, StyledTableHead } from './styled'

interface TableViewProps {
  etfs: ETFExtended[]
}

const TableView: React.FC<TableViewProps> = ({ etfs }) => {
  const { handleRowClick } = useETFTableLogic()

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
  )
}

export default TableView
