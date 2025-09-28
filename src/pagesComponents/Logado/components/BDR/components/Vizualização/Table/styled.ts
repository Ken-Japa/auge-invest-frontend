import {
  Paper,
  Table as MuiTable,
  TableCell as MuiTableCell,
  TableContainer as MuiTableContainer,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledTableContainer = styled(MuiTableContainer)(({ theme }) => ({
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3),
  overflow: "hidden",
}));

export const StyledTable = styled(MuiTable)({
  minWidth: 650,
});

export const StyledTableHead = styled(MuiTableHead)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(0, 0, 0, 0.02)",
}));

export const HeaderRow = styled(MuiTableRow)({
  "& th": {
    fontWeight: "bold",
  },
});

export const HeaderCell = styled(MuiTableCell)({
  textAlign: "center",
  fontWeight: "bold",
});

export const DataRow = styled(MuiTableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.08)"
        : "rgba(0, 0, 0, 0.04)",
  },
}));

export const DataCell = styled(MuiTableCell)({
  textAlign: "center",
});

export const BDRName = styled("span")(({ theme }) => ({
  fontWeight: 600,
  transition: "color 0.3s ease",
  "&:hover": {
    color: theme.palette.primary.main,
    cursor: "pointer",
    textDecoration: "underline",
  },
}));

export const CodeChip = styled("span")(({ theme }) => ({
  display: "inline-block",
  padding: theme.spacing(0.5, 1),
  margin: theme.spacing(0.25),
  borderRadius: theme.shape.borderRadius,
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(58, 65, 111, 0.2)"
      : "rgba(63, 81, 181, 0.1)",
  border: `1px solid ${theme.palette.primary.main}`,
  fontSize: "0.75rem",
  fontWeight: 500,
  color: theme.palette.primary.main,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    cursor: "pointer",
  },
}));

export const DataText = styled(Typography)({
  fontSize: "0.875rem",
});
