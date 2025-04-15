import { styled } from '@mui/material/styles';
import { 
  TableContainer as MuiTableContainer, 
  Table as MuiTable,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
  Paper as MuiPaper,
  Typography
} from '@mui/material';

export const StyledTableContainer = styled(MuiTableContainer)(({ theme }) => ({
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3),
  overflow: 'hidden'
}));

export const StyledTable = styled(MuiTable)({
  minWidth: 650,
});

export const StyledTableHead = styled(MuiTableHead)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.05)' 
    : 'rgba(0, 0, 0, 0.02)'
}));

export const HeaderRow = styled(MuiTableRow)({
  '& th': {
    fontWeight: 'bold',
  }
});

export const HeaderCell = styled(MuiTableCell)({
  textAlign: 'center',
  fontWeight: 'bold',
});

export const DataRow = styled(MuiTableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': { 
    border: 0 
  },
  '&:hover': { 
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.08)' 
      : 'rgba(0, 0, 0, 0.04)' 
  }
}));

export const DataCell = styled(MuiTableCell)({
  textAlign: 'center',
});

export const CodeChip = styled(Typography)(({ theme }) => ({
  display: 'inline-block',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: '4px',
  padding: '2px 8px',
  marginRight: '4px',
  marginBottom: '4px',
  fontSize: '0.75rem'
}));

export const FIIName = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.body2.fontSize,
}));

export const DataText = styled(Typography)({
  fontSize: '0.875rem',
});