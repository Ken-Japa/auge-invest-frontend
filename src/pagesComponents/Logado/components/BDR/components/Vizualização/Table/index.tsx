import { useState } from 'react';
import { TableBody, TableSortLabel, Tooltip } from '@mui/material';
import Link from 'next/link';
import { FIIExtended } from '../../../types';
import {
  StyledTableContainer,
  StyledTable,
  StyledTableHead,
  HeaderRow,
  HeaderCell,
  DataRow,
  DataCell,
  CodeChip,
  FIIName,
  DataText
} from './styled';

interface TableViewProps {
  fiis: FIIExtended[];
}

type Order = 'asc' | 'desc';
type OrderBy = 'quotaCount' | 'quotaDateApproved';

export const TableView = ({ fiis }: TableViewProps) => {
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

  const sortedFiis = [...fiis].sort((a, b) => {
    if (orderBy === 'quotaCount') {
      const aValue = a.quotaCount ? Number(a.quotaCount) : 0;
      const bValue = b.quotaCount ? Number(b.quotaCount) : 0;
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    } else if (orderBy === 'quotaDateApproved') {

      let aDate = 0;
      let bDate = 0;

      if (a.quotaDateApproved) {
        try {
          aDate = new Date(a.quotaDateApproved).getTime();
        } catch (e) {
          aDate = 0;
        }
      }

      if (b.quotaDateApproved) {
        try {
          bDate = new Date(b.quotaDateApproved).getTime();
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
            <DataRow key={fii._id}>
              <DataCell>
                <Tooltip title={fii.nomeCompletoFII || ''} placement="top">
                  <Link href={`/fii/${fii.nomeFII}`} style={{ textDecoration: 'none' }}>
                    <FIIName>{fii.nomeFII}</FIIName>
                  </Link>
                </Tooltip>
              </DataCell>
              <DataCell>
                {fii.codigo.map((code) => (
                  <Link key={code} href={`/fii/${code}`} style={{ textDecoration: 'none' }}>
                    <CodeChip>{code}</CodeChip>
                  </Link>
                ))}
              </DataCell>
              <DataCell>
                <DataText>{formatNumber(fii.quotaCount)}</DataText>
              </DataCell>
              <DataCell>
                <DataText>{formatDate(fii.quotaDateApproved)}</DataText>
              </DataCell>
              <DataCell>
                <DataText>{formatCNPJ(fii.informacoes?.cnpj)}</DataText>
              </DataCell>
            </DataRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default TableView;