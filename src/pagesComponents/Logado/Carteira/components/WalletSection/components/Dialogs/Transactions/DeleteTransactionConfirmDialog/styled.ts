import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { transitions } from "@/theme/variables";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  boxShadow: theme.shadows[5],
  borderRadius: 18,
}));

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.error.dark,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
  fontSize: "1.1rem",
  fontWeight: "bold",
  textAlign: "center",
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  justifyContent: "space-between",
}));

export const CancelButton = styled(Button)(({ theme }) => ({
  border: `1px solid`,
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.primary.main : "#0D95F9",
  color: theme.palette.mode === "dark" ? "#fff" : "#fff",

  transition: transitions.medium,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const DeleteButton = styled(Button)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.error.dark : "#FF0000",
  color:
    theme.palette.mode === "dark" ? theme.palette.primary.contrastText : "#fff",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.error.main : "#B80404",
  },
  transition: transitions.medium,
}));
