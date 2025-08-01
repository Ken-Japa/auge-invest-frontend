import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { spacing } from "@/theme/variables";

export const ChartContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: spacing.md,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));

export const ChartHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: `${spacing.sm} 0`,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const ChartPlaceholder = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "300px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
  fontStyle: "italic",
  backgroundColor: theme.palette.mode === "dark" 
    ? "rgba(255, 255, 255, 0.02)" 
    : "rgba(0, 0, 0, 0.01)",
}));