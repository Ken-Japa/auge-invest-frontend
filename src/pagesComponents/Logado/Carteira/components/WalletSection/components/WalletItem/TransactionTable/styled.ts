import { styled } from "@mui/material/styles";
import { Table, TableHead, TableCell, TableRow } from "@mui/material";

export const StyledTransactionTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
  marginTop: theme.spacing(2),
}));

export const StyledTransactionTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#3A3A3A" : "#F5F5F5",
}));

export const StyledTransactionTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
}));

export const StyledTransactionTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.success.A100 : "#F5F5F5",
  },
  "&:nth-of-type(even)": {
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.success.A200 : "#F5F5F5",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
