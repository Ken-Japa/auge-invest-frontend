import { Chip, Typography } from '@mui/material';

import { Header, NomeETF, SubHeader } from '../styled';

interface ETFHeaderProps {
  nomeETF: string;
  nomeCompletoETF: string;
  quotaDateApproved: string;
  codigo: string | undefined;
}

const ETFHeader = ({ nomeETF, nomeCompletoETF, quotaDateApproved, codigo }: ETFHeaderProps) => {
  return (
    <Header>
      <NomeETF>
        <Typography variant="h3" component="h3" gutterBottom>{nomeETF}</Typography>
      </NomeETF>
      <Typography variant="h5" color="textSecondary" gutterBottom>{nomeCompletoETF}</Typography>
      <SubHeader >
        <Typography variant="body1">Aprovação: {quotaDateApproved}</Typography>
        <Chip
          label={codigo || 'N/A'}
          size="medium"
          color="success"
          variant="outlined"
          clickable
        />
      </SubHeader>
    </Header>
  );
};

export default ETFHeader;