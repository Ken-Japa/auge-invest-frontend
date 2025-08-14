import { styled } from "@mui/material/styles";
import { Table, TableHead, TableCell, TableRow } from "@mui/material";
import { borderRadius, transitions } from "@/theme/variables";

export const StyledTransactionTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
  borderRadius: borderRadius.md,
}));

export const StyledTransactionTableHead = styled(TableHead)(({ theme }) => ({
  background: "#121820",
}));

export const StyledTransactionTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
}));

export const StyledTransactionTableRow = styled(TableRow)(({ theme }) => ({
  transition: transitions.medium,
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.mode === "dark" ? "#242C3E" : "#F5F5F5",
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.mode === "dark" ? "#343C4E" : "#F5F5F5",
  },
  "&:hover": {
    backgroundColor: theme.palette.background.default,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
