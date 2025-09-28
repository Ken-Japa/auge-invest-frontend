import {
  Box,
  Table,
  TableBody,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import React from 'react';

import {
  CallHeaderCell,
  PaginationButton,
  PaginationContainer,
  PutHeaderCell,
  StrikeTableCell,
  StyledTableCell,
  StyledTableRow,
  TableContainer} from './styled';


interface DerivativoItem {
  "COD Opcao": string;
  "Call ou Put": string;
  "Tipo": string;
  "ON ou PN": string;
  "Strike": string;
  "Vencimento": string;
  "Ultimo Preco": number;
  "Data Negocio": string | null;
  "Hora Negocio": string;
  "Oferta Compra": number;
  "Oferta Venda": number;
  "Volume": number;
  "Contratos": number;
  "_id": string;
}

interface OpcoesTableProps {
  strikes: string[];
  callsMap: Record<string, DerivativoItem>;
  putsMap: Record<string, DerivativoItem>;
  formatCurrency: (value: number | string) => string;
  totalItems: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const OpcoesTable: React.FC<OpcoesTableProps> = ({
  strikes,
  callsMap,
  putsMap,
  formatCurrency,
  totalItems,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange
}) => {
  // Calculate pagination for client-side
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedStrikes = strikes.slice(startIndex, endIndex);

  // Navigation functions
  const goToFirstPage = () => {
    onPageChange({} as unknown, 0);
  };

  const goToLastPage = () => {
    const lastPage = Math.max(0, Math.ceil(strikes.length / rowsPerPage) - 1);
    onPageChange({} as unknown, lastPage);
  };

  return (
    <>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <CallHeaderCell align="center" colSpan={3} sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                OPÇÕES DE COMPRA (CALL)
              </CallHeaderCell>
              <StrikeTableCell align="center" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                STRIKE
              </StrikeTableCell>
              <PutHeaderCell align="center" colSpan={3} sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                OPÇÕES DE VENDA (PUT)
              </PutHeaderCell>
            </TableRow>
            <TableRow>
              <CallHeaderCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Volume</CallHeaderCell>
              <CallHeaderCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Último Preço</CallHeaderCell>
              <CallHeaderCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Código</CallHeaderCell>
              <StrikeTableCell></StrikeTableCell>
              <PutHeaderCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Código</PutHeaderCell>
              <PutHeaderCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Último Preço</PutHeaderCell>
              <PutHeaderCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Volume</PutHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStrikes.map(strike => {
              const call = callsMap[strike];
              const put = putsMap[strike];

              return (
                <StyledTableRow key={strike}>
                  {/* CALL */}
                  <StyledTableCell sx={{ textAlign: 'center' }}>
                    {call ? call["Volume"].toLocaleString('pt-BR') : '-'}
                  </StyledTableCell>
                  <StyledTableCell sx={{ textAlign: 'center' }}>
                    {call && call["Ultimo Preco"] > 0
                      ? formatCurrency(call["Ultimo Preco"])
                      : '-'}
                  </StyledTableCell>
                  <StyledTableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {call ? call["COD Opcao"].substring(4) : '-'}
                  </StyledTableCell>

                  {/* STRIKE */}
                  <StrikeTableCell>
                    {formatCurrency(strike)}
                  </StrikeTableCell>

                  {/* PUT */}
                  <StyledTableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {put ? put["COD Opcao"].substring(4) : '-'}
                  </StyledTableCell>
                  <StyledTableCell sx={{ textAlign: 'center' }}>
                    {put && put["Ultimo Preco"] > 0
                      ? formatCurrency(put["Ultimo Preco"])
                      : '-'}
                  </StyledTableCell>
                  <StyledTableCell sx={{ textAlign: 'center' }}>
                    {put ? put["Volume"].toLocaleString('pt-BR') : '-'}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <PaginationContainer>
        <Box sx={{ display: 'flex', mr: 2 }}>
          <PaginationButton
            onClick={goToFirstPage}
            disabled={page === 0}
          >
            {'<<'}
          </PaginationButton>
          <PaginationButton
            onClick={goToLastPage}
            disabled={page >= Math.ceil(strikes.length / rowsPerPage) - 1}
          >
            {'>>'}
          </PaginationButton>
        </Box>

        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={strikes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          labelRowsPerPage="Itens por página:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
          }
        />
      </PaginationContainer>
    </>
  );
};