import { styled } from "@mui/material/styles";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";

export const StyledAssetTableContainer = styled(TableContainer)(
  ({ theme }) => ({
    marginTop: theme.spacing(2),
  })
);

export const StyledAssetTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
}));

export const StyledAssetTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#3A3A3A" : "#F5F5F5",
}));

export const StyledAssetTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.success.A100 : "#F5F5F5",
  },
  "&:nth-of-type(even)": {
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.success.A200 : "#F5F5F5",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const StyledAssetTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
}));
