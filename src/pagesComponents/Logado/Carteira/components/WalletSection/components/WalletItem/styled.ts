import { styled } from "@mui/material/styles";
import {
  AccordionSummary,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

export const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#282828" : "#F0F0F0",
  "& .MuiAccordionSummary-content": {
    margin: "12px 0",
  },
}));

export const StyledAssetTableContainer = styled(TableContainer)(
  ({ theme }) => ({
    marginBottom: theme.spacing(2),
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius,
    overflow: "hidden",
  })
);

export const StyledAssetTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
}));

export const StyledAssetTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#333333" : "#E8E8E8",

  "& .MuiTableCell-root": {
    fontWeight: "bold",
    color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
  },
}));

export const StyledAssetTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.mode === "dark" ? "#222222" : "#F5F5F5",
  },
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "#2F2F2F" : "#E0E0E0",
  },
}));

export const StyledAssetTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const StyledTransactionTableContainer = styled(TableContainer)(
  ({ theme }) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    boxShadow: theme.shadows[1],
    borderRadius: theme.shape.borderRadius,
    overflow: "hidden",
  })
);

export const StyledTransactionTable = styled(Table)(({ theme }) => ({
  minWidth: 500,
}));

export const StyledTransactionTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#3A3A3A" : "#E0E0E0",

  "& .MuiTableCell-root": {
    fontWeight: "bold",
    color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
  },
}));

export const StyledTransactionTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.mode === "dark" ? "#2A2A2A" : "#EBEBEB",
  },
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "#383838" : "#DDDDDD",
  },
}));

export const StyledTransactionTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
}));
