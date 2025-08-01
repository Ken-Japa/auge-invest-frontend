import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { spacing, borderRadius, transitions } from "@/theme/variables";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.background.paper,
    borderRadius: borderRadius.md,
  }
}));

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' 
    ? theme.palette.grey[800] 
    : theme.palette.grey[100],
  color: theme.palette.text.primary,
  fontWeight: 600,
  padding: spacing.md,
}));

export const StyledDialogContent = styled(DialogContent)({
  padding: spacing.lg,
});

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: spacing.md,
  borderTop: `1px solid ${theme.palette.divider}`,
}));

export const CancelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  transition: transitions.medium,
  
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  }
}));

export const SaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  transition: transitions.medium,
  
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  }
}));