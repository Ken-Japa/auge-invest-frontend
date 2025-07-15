import { styled } from "@mui/material/styles";
import {
  Box,
  Paper,
  Typography,
  Table as MuiTable,
  TableContainer as MuiTableContainer,
  TableCell as MuiTableCell,
  TableRow as MuiTableRow,
  TableHead as MuiTableHead,
  TableBody as MuiTableBody,
  Chip as MuiChip,
} from "@mui/material";

export const DividendContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  display: "flex",
}));

export const DividendPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

export const TableContainer = styled(MuiTableContainer)({
  overflowY: "auto",
  display: "flex",
});

export const Table = styled(MuiTable)({
  minWidth: 650,
});

export const TableHead = styled(MuiTableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  "& th": {
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
  },
}));

export const TableBody = styled(MuiTableBody)({});

export const TableRow = styled(MuiTableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));

export const TableCell = styled(MuiTableCell)({
  fontSize: "0.875rem",
  textAlign: "center",
});

export const HeaderCell = styled(MuiTableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: "bold",
}));

export const StatusChip = styled(MuiChip)(({ theme, color }) => ({
  fontWeight: "bold",
  fontSize: "0.75rem",
}));

export const NoDataContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const LoadingContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
}));

export const ErrorContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.error.main,
}));

export const DividendTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: theme.typography.fontWeightMedium,
  textAlign: "center",
}));

export const DividendSummary = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  marginBottom: theme.spacing(3),
  gap: theme.spacing(2),
}));

export const SummaryItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  minWidth: "150px",
  flex: "1 1 auto",
}));

export const SummaryLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.875rem",
}));

export const SummaryValue = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: "1.25rem",
  color: theme.palette.primary.main,
}));
