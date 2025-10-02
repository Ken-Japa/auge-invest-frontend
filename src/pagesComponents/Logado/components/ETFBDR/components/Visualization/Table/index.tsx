import { Paper, Table, TableBody, TableContainer, TableRow, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'

import { ETFBDRExtended } from '../../../types'

import { StyledTableCell, StyledTableHead, StyledTableRow } from './styled'

interface TableViewProps {
  etfbdrs: ETFBDRExtended[]
}

const TableView: React.FC<TableViewProps> = ({ etfbdrs }) => {
  const router = useRouter()

  const handleRowClick = (nomeETF: string) => {
    router.push(`/etfbdr/${nomeETF}`)
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="ETFBDR table">
        <StyledTableHead>
          <TableRow>
            <StyledTableCell align="center">Nome ETFBDR</StyledTableCell>
            <StyledTableCell align="center">Código</StyledTableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {etfbdrs.map((etfbdr) => (
            <StyledTableRow
              key={etfbdr._id}
              onClick={() => handleRowClick(etfbdr.nomeETF)}
              style={{ cursor: 'pointer' }}
            >
              <StyledTableCell component="th" scope="row" align="center">
                <Typography variant="subtitle2" fontWeight="bold">
                  {etfbdr.nomeETF}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {etfbdr.nomeCompletoETF}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">{etfbdr.codigoETF || 'N/A'}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableView
