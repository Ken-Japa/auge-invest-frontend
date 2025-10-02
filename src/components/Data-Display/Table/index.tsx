import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { ReactNode } from 'react'

import { NoDataMessage, TableWrapper } from './styled'

interface StyledTableProps {
  headers: string[]
  children: ReactNode
  noDataMessage?: string
  noDataDescription?: string
  alignments?: ('left' | 'center' | 'right')[]
  showData: boolean
  loading?: boolean
}

export const StyledTable = ({
  headers,
  children,
  noDataMessage = 'Nenhum dado encontrado',
  noDataDescription,
  alignments,
  showData,
  loading = false,
}: StyledTableProps) => {
  if (!showData && !loading) {
    return (
      <NoDataMessage>
        <Typography variant="h6">{noDataMessage}</Typography>
        {noDataDescription && <Typography variant="body2">{noDataDescription}</Typography>}
      </NoDataMessage>
    )
  }

  return (
    <TableWrapper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index} align={alignments ? alignments[index] : 'left'}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
    </TableWrapper>
  )
}
