import { Box, Button,Typography } from "@mui/material";
import { alpha,styled } from "@mui/material/styles";

import { CustomButton } from "@/components/Core/Button";
import { transitions } from "@/theme/variables";

export const InfoContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
}));

export const InfoRow = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 0),
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-start",
  justifyContent: "space-between",
  borderBottom: `1px solid ${
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)"
  }`,
  "&:last-child": {
    borderBottom: "none",
  },
}));

export const InfoLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 500,
  fontSize: "0.9rem",
  marginBottom: theme.spacing(1),
  width: "100%",
  variant: "subtitle2",
}));

export const InfoValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
  fontSize: "1rem",
  flexGrow: 1,
  variant: "body1",
}));

export const EditButton = styled(Button)(({ theme }) => ({
  minWidth: "auto",
  padding: theme.spacing(0.5, 1),
  color:
    theme.palette.mode === "light"
      ? theme.palette.primary.main
      : theme.palette.primary.light,
  border: `1px solid ${theme.palette.primary.main}`,
  transition: transitions.medium,
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "light"
        ? alpha(theme.palette.primary.main, 0.1)
        : alpha(theme.palette.primary.light, 0.1),
  },
}));

export const PasswordButton = styled(CustomButton)(({ theme }) => ({
  marginTop: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 2),
  backgroundColor: "transparent",
  border: `1px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  transition: transitions.medium,
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

export const StyledDivider = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)",
}));
