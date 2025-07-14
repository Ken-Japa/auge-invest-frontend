import { styled } from "@mui/material/styles";
import {
  CardContent as MuiCardContent,
  Box,
  Typography,
  Chip,
  Card as MuiCard,
} from "@mui/material";
import { borderRadius, transitions, spacing } from "@/theme/variables";

export const CardContainer = styled(MuiCard)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: transitions.medium,
  padding: spacing.md,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 8px 16px rgba(0, 0, 0, 0.4)"
      : "0 8px 16px rgba(0, 0, 0, 0.1)",
  borderRadius: borderRadius.md,
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(30, 40, 60, 0.8)"
      : theme.palette.background.paper,
  border: `1px solid ${
    theme.palette.mode === "dark"
      ? "rgba(100, 120, 180, 0.2)"
      : theme.palette.divider
  }`,

  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 12px 24px rgba(0, 0, 0, 0.6)"
        : "0 12px 24px rgba(0, 0, 0, 0.15)",
    borderColor: theme.palette.primary.main,
  },
}));

export const CardHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "8px",
});

export const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: "1.25rem",
  textAlign: "center",
  color: theme.palette.primary.main,
  lineHeight: 1.2,
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
}));

export const CardSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1.5),
  fontSize: "0.875rem",
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
}));

export const CardInfo = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "4px",
  padding: "4px",
});

export const CardInfoLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.8rem",
  fontWeight: "bold",
  minWidth: "80px",
}));

export const CardInfoValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "0.875rem",
  textAlign: "right",
  flexGrow: 1,
}));

export const CodeChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  fontWeight: "bold",
  fontSize: "0.7rem",
  height: "20px",
}));
