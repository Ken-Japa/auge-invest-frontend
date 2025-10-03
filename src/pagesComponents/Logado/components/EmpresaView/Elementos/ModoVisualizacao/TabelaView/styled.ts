import { Box, CircularProgress, Table as MuiTable } from '@mui/material'
import { styled } from '@mui/material/styles'

export const TableContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  width: '100%',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius,

  boxShadow: theme.shadows[1],
  '& .MuiTable-root': {
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
  '& .MuiCollapse-root': {
    boxShadow: 'none',
  },
  '& .MuiTableHead-root': {
    '& .MuiTableCell-root': {
      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
      fontWeight: 600,
    },
  },
  '& .MuiTableCell-root': {
    borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
  },
  '& .MuiTableRow-root:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.shortest,
    }),
  },
  '& .MuiTableSortLabel-root:hover': {
    color: theme.palette.primary.main,
  },
  '& .MuiTableSortLabel-root.Mui-active': {
    color: theme.palette.primary.main,
  },
}))

export const StyledTable = styled(MuiTable)({
  tableLayout: 'fixed',
  width: '100%',
})

export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(4),
  width: '100%',
  height: '200px',
}))

export const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.main,
}))

export const TableControlsContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}))

export const CheckboxesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}))

export const TableTitle = styled(Box)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
}))
