import { styled } from "@mui/material/styles";
import { Table, TableHead, TableCell, TableRow } from "@mui/material";

export const StyledTransactionTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
  marginTop: theme.spacing(2),
}));

export const StyledTransactionTableHead = styled(TableHead)(({ theme }) => ({
  background: `linear-gradient(to right, #0A1929, #1A3A5B 80%)`,
}));

export const StyledTransactionTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
}));

export const StyledTransactionTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.mode === "dark" ? "#20283A" : "#F5F5F5",
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.mode === "dark" ? "#30384A" : "#F5F5F5",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
