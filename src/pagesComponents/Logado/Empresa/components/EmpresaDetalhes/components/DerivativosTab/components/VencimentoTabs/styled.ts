import { Box, Tab, Tabs } from '@mui/material'
import { styled } from '@mui/material/styles'

export const TabsContainer = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(6),
  marginTop: theme.spacing(6),
  backgroundColor: theme.palette.background.paper,
  borderRadius: '12px',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out',
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
}))

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTab-root': {
    color: theme.palette.text.secondary,
  },
  '& .Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
  },
  // Add hover effect for scroll buttons
  '& .MuiTabs-scrollButtons': {
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      borderRadius: '4px',
    },
  },
}))

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
  },
}))
