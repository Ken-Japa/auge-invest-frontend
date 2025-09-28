import { Box, Tab,Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TabsContainer = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTab-root': { 
    color: theme.palette.text.secondary
  },
  '& .Mui-selected': { 
    color: theme.palette.primary.main, 
    fontWeight: 'bold' 
  },
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
  }
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  transition: theme.transitions.create('color', {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    color: theme.palette.primary.light,
  }
}));