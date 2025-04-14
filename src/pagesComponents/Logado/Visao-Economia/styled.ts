import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const BackgroundContainer = styled(Box)({
  width: '100%',
  position: 'relative',
  willChange: 'transform',
  '& .MuiGrid-item': {
    minHeight: '50px',
  },

  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(0, 0, 0, 0.1)',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
  },
});

export const DashboardItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  height: '100%',
  minHeight: '100px', 
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden', 

  willChange: 'transform',
 
  transition: 'box-shadow 0.2s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[3],
  },
}));
