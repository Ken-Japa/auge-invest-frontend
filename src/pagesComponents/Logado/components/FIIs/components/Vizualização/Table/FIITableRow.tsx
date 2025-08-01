import { Tooltip } from '@mui/material';
import Link from 'next/link';
import { FIIExtended } from '../../../types';
import { formatCNPJ, formatNumber, formatDate } from '@/components/Utils/Formatters/formatters';
import {
  DataRow,
  DataCell,
  CodeChip,
  FIIName,
  DataText
} from './styled';

interface FIITableRowProps {
  fii: FIIExtended;
}

export const FIITableRow = ({ fii }: FIITableRowProps) => (
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
);