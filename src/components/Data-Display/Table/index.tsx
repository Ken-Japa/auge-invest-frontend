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
import { ReactNode, memo } from 'react'

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

/**
 * @function StyledTable
 * @description Componente de tabela estilizado que exibe dados ou uma mensagem de "nenhum dado encontrado".
 * @param {StyledTableProps} props - As propriedades do componente.
 * @param {string[]} props.headers - Um array de strings para os cabeçalhos da tabela.
 * @param {ReactNode} props.children - O conteúdo da tabela (geralmente `TableBody` com `TableRow`s e `TableCell`s).
 * @param {string} [props.noDataMessage='Nenhum dado encontrado'] - Mensagem a ser exibida quando não há dados.
 * @param {string} [props.noDataDescription] - Descrição adicional para a mensagem de "nenhum dado".
 * @param {('left' | 'center' | 'right')[]} [props.alignments] - Alinhamentos para cada célula do cabeçalho.
 * @param {boolean} props.showData - Se `true`, exibe a tabela; caso contrário, exibe a mensagem de "nenhum dado".
 * @param {boolean} [props.loading=false] - Se `true`, a tabela está em estado de carregamento.
 */
export const StyledTable = memo(
  ({
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
  },
)

StyledTable.displayName = 'StyledTable'
