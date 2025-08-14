import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { spacing, borderRadius, transitions } from "@/theme/variables";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.background.paper,
    borderRadius: borderRadius.md,
  },
}));

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.primary,
  fontSize: "1.05rem",
  fontWeight: 600,
  padding: spacing.md,
  textAlign: "center",
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: spacing.lg,
  marginTop: theme.spacing(2),
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: spacing.md,
  gap: theme.spacing(2),
  borderTop: `1px dashed ${theme.palette.divider}`,
  marginBottom: theme.spacing(1),
}));

export const CancelButton = styled(Button)(({ theme }) => ({
  border: `1px solid`,
  color: theme.palette.text.secondary,
  transition: transitions.medium,

  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const SaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  transition: transitions.medium,

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));
