import { styled } from "@mui/material/styles";
import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  Box,
  Typography,
} from "@mui/material";
import { borderRadius, transitions, spacing } from "@/theme/variables";

export const StyledCard = styled(MuiCard)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: transitions.medium,
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

export const StyledCardContent = styled(MuiCardContent)(({ theme }) => ({
  flexGrow: 1,
  padding: spacing.md,
}));

export const CardHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  padding: theme.spacing(1, 1, 0, 1),
  position: "absolute",
  top: 0,
  right: 0,
  zIndex: 1,
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: "1.25rem",
  marginBottom: theme.spacing(0.5),
  transition: "color 0.3s ease",
  "&:hover": {
    color: theme.palette.primary.main,
    textDecoration: "underline",
    cursor: "pointer",
  },
}));

export const CardSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: spacing.md,
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.text.secondary,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  height: "40px",
}));

export const ChipsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: spacing.xs,
  margin: `${spacing.md} 0`,
  padding: `${spacing.sm} 0`,
  borderTop: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.03)"
      : "rgba(0, 0, 0, 0.02)",
}));

export const InfoContainer = styled(Box)(({ theme }) => ({
  marginTop: spacing.md,
}));

export const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: spacing.sm,
  paddingBottom: spacing.xs,
  borderBottom: `1px dashed ${theme.palette.divider}`,

  "&:last-child": {
    marginBottom: 0,
    borderBottom: "none",
  },
}));

export const InfoLabel = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.text.primary,
}));

export const InfoValue = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  textAlign: "right",
  color: theme.palette.primary.main,
  fontWeight: theme.typography.fontWeightMedium,
}));
