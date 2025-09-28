import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { transitions } from "@/theme/variables";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "100%",
    maxWidth: "400px",
    borderRadius: 16,
    boxShadow: theme.shadows[5],
  },
}));

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.error.dark : "#fff0f5",
  color:
    theme.palette.mode === "dark"
      ? theme.palette.primary.contrastText
      : "#660033",
  padding: theme.spacing(2),
  fontSize: "1.1rem",
  fontWeight: "bold",
  textAlign: "center",
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  gap: theme.spacing(2),
  borderTop: `1px dashed ${theme.palette.divider}`,
  justifyContent: "flex-end",
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

export const DeleteButton = styled(Button)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.error.dark : "#fff0f5",
  color:
    theme.palette.mode === "dark"
      ? theme.palette.primary.contrastText
      : "#660033",
  "&:hover": {
    backgroundColor: theme.palette.error.main,
  },
  transition: transitions.medium,
}));
