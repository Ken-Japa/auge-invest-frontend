import { styled } from "@mui/material/styles";
import { Box, Accordion as MuiAccordion } from "@mui/material";
import { spacing, borderRadius, transitions } from "@/theme/variables";

export const WalletSectionContainer = styled(Box)({
  my: 4,
});

export const WalletSectionHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  my: 4,
});

export const LoadingContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "200px",
});

export const NoWalletsMessage = styled(Box)({
  textAlign: "center",
  my: 4,
});

export const WalletContainer = styled(Box)(({ theme }) => ({}));

export const WalletItem = styled(Box)(({ theme }) => ({
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

export const Accordion = styled(MuiAccordion)(({ theme }) => ({
  marginBottom: spacing.md,
  borderRadius: borderRadius.md,
  overflow: "hidden",
  boxShadow: theme.shadows[1],
  "&:before": {
    display: "none",
  },
  "& .MuiAccordionSummary-root": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(0, 0, 0, 0.02)",
  },
}));
