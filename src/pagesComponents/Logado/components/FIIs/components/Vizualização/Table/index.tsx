import { Box, Typography, Tooltip } from '@mui/material';
import { FIIExtended } from '../../../types';

interface TableViewProps {
  fiis: FIIExtended[];
}

export const TableView = ({ fiis }: TableViewProps) => {
  return (
    <Box sx={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Nome</th>
            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Código</th>
            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Segmento</th>
            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Cotas</th>
            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Data Aprovação</th>
            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>CNPJ</th>
          </tr>
        </thead>
        <tbody>
          {fiis.map((fii) => (
            <tr key={fii._id}>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                <Tooltip title={fii.nomeCompletoFII}>
                  <Typography>{fii.nomeFII}</Typography>
                </Tooltip>
              </td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                {fii.codigo.join(', ')}
              </td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{fii.segmento}</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{fii.quotaCount}</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{fii.quotaDateApproved}</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{fii.informacoes?.cnpj || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default TableView;