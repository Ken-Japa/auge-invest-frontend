import { styled } from "@mui/material/styles";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { transitions } from "@/theme/variables";

export const StyledAssetTableContainer = styled(TableContainer)(
  ({ theme }) => ({
    marginTop: theme.spacing(2),
  })
);

export const StyledAssetTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
}));

export const StyledAssetTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: "#000000",
}));

export const StyledAssetTableRow = styled(TableRow)(({ theme }) => ({
  transition: transitions.medium,
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.mode === "dark" ? "#1A2234" : "#F5F5F5",
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.mode === "dark" ? "#2A3244" : "#F5F5F5",
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const StyledAssetHeaderTableRow = styled(TableRow)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.primary.main}`,
}));

export const StyledAssetTableHeaderCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontWeight: "bold",
}));

export const StyledAssetTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "italic",
}));
