import { useState } from 'react';
import { TableBody, TableSortLabel, Tooltip, Chip } from '@mui/material';
import Link from 'next/link';
import { UnifiedBDR } from '../../../types';
import {
  StyledTableContainer,
  StyledTable,
  StyledTableHead,
  HeaderRow,
  HeaderCell,
  DataRow,
  DataCell,
  CodeChip,
  BDRName,
  DataText
} from './styled';

interface TableViewProps {
  bdrs: UnifiedBDR[];
}

type Order = 'asc' | 'desc';
type OrderBy = 'quotaCount' | 'quotaDateApproved';

export const TableView = ({ bdrs }: TableViewProps) => {
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<OrderBy>('quotaCount');

  const formatCNPJ = (cnpj: string | undefined): string => {
    if (!cnpj) return 'N/A';

    const numericCNPJ = cnpj.replace(/\D/g, '');

    if (numericCNPJ.length !== 14) return cnpj;

    return `${numericCNPJ.slice(0, 2)}.${numericCNPJ.slice(2, 5)}.${numericCNPJ.slice(5, 8)}/${numericCNPJ.slice(8, 12)}-${numericCNPJ.slice(12)}`;
  };

  const formatNumber = (num: number | string | undefined): string => {
    if (num === undefined) return 'N/A';
    return new Intl.NumberFormat('pt-BR').format(Number(num));
  };

  const formatDate = (dateStr: string | undefined): string => {
    if (!dateStr) return 'N/A';

    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('pt-BR').format(date);
    } catch (e) {
      return dateStr;
    }
  };

  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedBdrs = [...bdrs].sort((a, b) => {
    if (orderBy === 'quotaCount') {
      const aValue = a.dataInicio ? Number(a.dataInicio) : 0;
      const bValue = b.dataInicio ? Number(b.dataInicio) : 0;
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    } else if (orderBy === 'quotaDateApproved') {

      let aDate = 0;
      let bDate = 0;

      if (a.dataInicio) {
        try {
          aDate = new Date(a.dataInicio).getTime();
        } catch (e) {
          aDate = 0;
        }
      }

      if (b.dataInicio) {
        try {
          bDate = new Date(b.dataInicio).getTime();
        } catch (e) {
          bDate = 0;
        }
      }

      return order === 'asc' ? aDate - bDate : bDate - aDate;
    }
    return 0;
  });

  return (
    <StyledTableContainer>
      <StyledTable aria-label="BDRs table">
        <StyledTableHead>
          <HeaderRow>
            <HeaderCell>Nome</HeaderCell>
            <HeaderCell>Código</HeaderCell>
            <HeaderCell>
              <TableSortLabel
                active={orderBy === 'quotaDateApproved'}
                direction={orderBy === 'quotaDateApproved' ? order : 'asc'}
                onClick={() => handleRequestSort('quotaDateApproved')}
              >
                Data Início
              </TableSortLabel>
            </HeaderCell>
            <HeaderCell>Tipo</HeaderCell>
          </HeaderRow>
        </StyledTableHead>
        <TableBody>
          {sortedBdrs.map((bdr) => (
            <DataRow key={bdr._id}>
              <DataCell>
                <Tooltip title={bdr.nomeEmpresa || ''} placement="top">
                  <Link href={`/bdr/${bdr.nomeEmpresa}`} style={{ textDecoration: 'none' }}>
                    <BDRName>{bdr.nomeEmpresa}</BDRName>
                  </Link>
                </Tooltip>
              </DataCell>
              <DataCell>

                <Link key={bdr.codigo} href={`/bdr/${bdr.codigo}`} style={{ textDecoration: 'none' }}>
                  <CodeChip>{bdr.codigo}</CodeChip>
                </Link>

              </DataCell>
              <DataCell>
                <DataText>{formatDate(bdr.dataInicio)}</DataText>
              </DataCell>
              <DataCell>
                <DataText>{(bdr.informações?.market)}</DataText>
              </DataCell>

            </DataRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default TableView;