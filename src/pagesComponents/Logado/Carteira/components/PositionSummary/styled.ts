import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { spacing } from "@/theme/variables";

export const SummaryContainer = styled(Box)(({ theme }) => ({
  padding: spacing.md,
}));

export const SummaryItem = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: `${spacing.sm} 0`,
  padding: `${spacing.xs} 0`,
  borderBottom: `1px dashed ${theme.palette.divider}`,
  "&:last-child": {
    borderBottom: "none",
  },
}));

export const SummaryLabel = styled(Box)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.875rem",
}));

export const SummaryValue = styled(Box)(({ theme }) => ({
  fontWeight: 500,
  fontSize: "1rem",
}));