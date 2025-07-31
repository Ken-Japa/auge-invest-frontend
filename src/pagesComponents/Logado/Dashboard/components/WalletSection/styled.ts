import { styled } from "@mui/material/styles";
import { Box, Accordion as MuiAccordion } from "@mui/material";
import { spacing, borderRadius, transitions } from "@/theme/variables";

export const WalletContainer = styled(Box)(({ theme }) => ({
  // Add any specific styles for the wallet section container here
  // For example:
  // padding: theme.spacing(2),
  // border: `1px solid ${theme.palette.divider}`,
  // borderRadius: theme.shape.borderRadius,
}));

export const WalletItem = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.grey[300]}`, // Example border color
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper, // Example background color
  boxShadow: theme.shadows[1], // Example shadow
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
