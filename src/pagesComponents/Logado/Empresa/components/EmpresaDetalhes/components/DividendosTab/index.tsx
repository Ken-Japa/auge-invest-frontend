import { Table, TableBody, Typography } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { useState } from 'react'

import { PaginationControls } from '@/components/Data-Display/PaginationControls'

import { Dividendo } from '../../../../types'

import {
  StyledDividendosPaper,
  StyledTableContainer,
  StyledTableHead,
  StyledTableRow,
  StyledTableCell,
} from './styled'

interface DividendosTabProps {
  dividendos: Dividendo[]
}

export const DividendosTab: React.FC<DividendosTabProps> = ({ dividendos }) => {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)

  const totalPages = Math.ceil(dividendos.length / pageSize)
  const paginatedDividendos = dividendos.slice(page * pageSize, (page + 1) * pageSize)

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1)
  }

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    setPageSize(event.target.value as number)
    setPage(0)
  }
  if (!dividendos || dividendos.length === 0) {
    return (
      <StyledDividendosPaper>
        <Typography variant="h6">Nenhum dividendo encontrado para esta empresa.</Typography>
      </StyledDividendosPaper>
    )
  }

  return (
    <StyledTableContainer>
      <Table aria-label="tabela de dividendos">
        <StyledTableHead>
          <StyledTableRow>
            <StyledTableCell>Tipo</StyledTableCell>
            <StyledTableCell>Tipo Dividendo</StyledTableCell>
            <StyledTableCell>Valor</StyledTableCell>
            <StyledTableCell>Yield</StyledTableCell>
            <StyledTableCell>Data Com</StyledTableCell>
            <StyledTableCell>Data Aprovação</StyledTableCell>
          </StyledTableRow>
        </StyledTableHead>
        <TableBody>
          {paginatedDividendos.map((dividendo, index) => {
            const valor = parseFloat(dividendo.valor.replace(',', '.'))
            const valorAcao = parseFloat(dividendo.valorUltimoDiaCom)
            const yield_ = (valor / valorAcao) * 100

            return (
              <StyledTableRow key={index}>
                <StyledTableCell>{dividendo.tipo}</StyledTableCell>
                <StyledTableCell>{dividendo.tipoDividendo}</StyledTableCell>
                <StyledTableCell>R$ {valor.toFixed(4)}</StyledTableCell>
                <StyledTableCell>{yield_.toFixed(2)}%</StyledTableCell>
                <StyledTableCell>{dividendo.ultimoDiaCom}</StyledTableCell>
                <StyledTableCell>{dividendo.dataAprovacao}</StyledTableCell>
              </StyledTableRow>
            )
          })}
        </TableBody>
      </Table>
      <PaginationControls
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
        validPageSizes={[5, 10, 20, 50]}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
      />
    </StyledTableContainer>
  )
}
