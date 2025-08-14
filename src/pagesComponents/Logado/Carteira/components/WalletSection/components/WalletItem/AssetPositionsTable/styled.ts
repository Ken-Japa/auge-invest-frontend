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
  border: "5px solid #1A3A5B",
  borderRadius: 100,
  boxShadow: theme.shadows[1],
}));

export const StyledAssetTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: "#1A3A5B",
}));

export const StyledAssetTableRow = styled(TableRow)(({ theme }) => ({
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

export const StyledAssetTableHeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
}));

export const StyledAssetTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "italic",
}));
