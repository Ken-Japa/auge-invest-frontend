import Link from 'next/link';
import { Tooltip } from '@mui/material';
import { formatDate } from '@/components/Utils/Formatters/formatters';
import { UnifiedBDR } from '../../../../types';
import {
  DataRow,
  DataCell,
  BDRName,
  CodeChip,
  DataText
} from '../styled';

interface BDRTableRowProps {
  bdr: UnifiedBDR;
}

export const BDRTableRow = ({ bdr }: BDRTableRowProps) => (
  <DataRow key={bdr._id}>
    <DataCell>
      <Tooltip title={bdr.nomeEmpresaCompleto || ''} placement="top">
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
);