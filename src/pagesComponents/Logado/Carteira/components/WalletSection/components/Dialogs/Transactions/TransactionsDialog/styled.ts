import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { spacing, transitions } from "@/theme/variables";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 18,
  },
}));

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.mode === "dark" ? theme.palette.text.primary : "#fff",
  fontSize: "1.1rem",
  fontWeight: 600,
  padding: spacing.md,
  textAlign: "center",
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: spacing.lg,
  marginTop: theme.spacing(4),
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: spacing.md,
  borderTop: `1px dashed ${theme.palette.divider}`,
}));

export const CloseButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  transition: transitions.medium,
  border: `1px solid`,

  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
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

export const StyledAssetTableHeaderCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontWeight: "bold",
  color: "#fff",
}));
