import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { spacing, transitions } from "@/theme/variables";

export const WalletContainer = styled(Box)(({ theme }) => ({}));

export const WalletItemContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
}));

export const WalletActions = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: theme.spacing(2),
}));

export const PositionsContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: spacing.md,
}));

export const EditButton = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  transition: transitions.medium,
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));
