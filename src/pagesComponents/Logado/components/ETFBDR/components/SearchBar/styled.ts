import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const SearchBarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  width: '100%',
  justifyContent: 'flex-end',
}));